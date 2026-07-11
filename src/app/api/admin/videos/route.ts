import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin-auth";

const BUCKET = "maid-videos";
const ALLOWED_EXT = new Set(["mp4", "webm", "mov", "m4v"]);

/**
 * Videos are too large for Vercel's request-body limit, so the browser
 * uploads them straight to Supabase with a one-time signed upload URL:
 *
 *   1. POST { action: "sign", maidId, filename }   -> { path, token }
 *   2. browser: supabase.storage.uploadToSignedUrl(path, token, file)
 *   3. POST { action: "confirm", maidId, path }    -> verifies + registers
 *
 * The confirm step reads the stored file's first bytes server-side and
 * rejects anything that isn't a real video (same anti-corruption guard
 * as photo uploads).
 */
export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.maidId !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const admin = createAdminClient();

  if (body.action === "sign") {
    const ext = String(body.filename ?? "")
      .split(".")
      .pop()
      ?.toLowerCase();
    if (!ext || !ALLOWED_EXT.has(ext)) {
      return NextResponse.json(
        { error: "Only MP4, WebM or MOV videos are supported" },
        { status: 400 }
      );
    }
    const path = `${body.maidId}/${randomUUID()}.${ext}`;
    const { data, error } = await admin.storage
      .from(BUCKET)
      .createSignedUploadUrl(path);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ path, token: data.token });
  }

  if (body.action === "confirm") {
    const path = String(body.path ?? "");
    if (!path.startsWith(`${body.maidId}/`)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    // Fetch the first bytes of the stored object and verify it's a video.
    const head = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          Range: "bytes=0-15",
        },
      }
    );
    const bytes = new Uint8Array(await head.arrayBuffer());
    const isMp4 =
      bytes.length >= 12 &&
      bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70; // "ftyp"
    const isWebm =
      bytes.length >= 4 &&
      bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3;

    if (!head.ok || (!isMp4 && !isWebm)) {
      await admin.storage.from(BUCKET).remove([path]);
      return NextResponse.json(
        { error: "Upload verification failed — the stored video was invalid. Please try again." },
        { status: 500 }
      );
    }

    const { data: video, error } = await admin
      .from("maid_videos")
      .insert({ maid_id: body.maidId, video_path: path })
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ video });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function DELETE(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { videoId } = await request.json().catch(() => ({}));
  if (typeof videoId !== "string") {
    return NextResponse.json({ error: "videoId is required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: video } = await admin
    .from("maid_videos")
    .select("*")
    .eq("id", videoId)
    .maybeSingle();
  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  await admin.storage.from(BUCKET).remove([video.video_path]);
  await admin.from("maid_videos").delete().eq("id", videoId);
  return NextResponse.json({ ok: true });
}
