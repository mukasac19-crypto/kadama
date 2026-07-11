import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Photo upload pipeline: normalize the image (max 1200px JPEG) and store
 * it in the 'maid-photos' bucket, served to everyone via the /api/img proxy.
 */

export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const formData = await request.formData();
  const maidId = formData.get("maidId");
  const file = formData.get("file");

  if (typeof maidId !== "string" || !(file instanceof File)) {
    return NextResponse.json({ error: "maidId and file are required" }, { status: 400 });
  }

  const input = Buffer.from(await file.arrayBuffer());

  let original: Buffer;
  try {
    original = await sharp(input)
      .rotate()
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "Could not process image" }, { status: 400 });
  }

  const admin = createAdminClient();
  const objectPath = `${maidId}/${randomUUID()}.jpg`;

  // Wrap buffers in Blobs: passing raw Node Buffers through the storage
  // client gets text-mangled on some serverless runtimes (Vercel),
  // silently corrupting the stored file. Blobs are binary-safe everywhere.
  const toBlob = (buf: Buffer) =>
    new Blob([new Uint8Array(buf)], { type: "image/jpeg" });

  const originalRes = await admin.storage
    .from("maid-photos")
    .upload(objectPath, toBlob(original), { contentType: "image/jpeg" });

  if (originalRes.error) {
    return NextResponse.json({ error: originalRes.error.message }, { status: 500 });
  }

  // Read the stored file back and verify it is still a real JPEG
  // (starts with FF D8 FF) — never silently keep a corrupted upload.
  const { data: storedBlob } = await admin.storage
    .from("maid-photos")
    .download(objectPath);
  const stored = storedBlob ? new Uint8Array(await storedBlob.arrayBuffer()) : null;
  const isValidJpeg =
    stored && stored[0] === 0xff && stored[1] === 0xd8 && stored[2] === 0xff;
  if (!isValidJpeg) {
    await admin.storage.from("maid-photos").remove([objectPath]);
    return NextResponse.json(
      { error: "Upload verification failed — the stored file was corrupted. Please try again." },
      { status: 500 }
    );
  }

  const { count } = await admin
    .from("maid_photos")
    .select("id", { count: "exact", head: true })
    .eq("maid_id", maidId);

  const { data: photo, error } = await admin
    .from("maid_photos")
    .insert({
      maid_id: maidId,
      original_path: objectPath,
      // Legacy column (NOT NULL); blurred variants are no longer generated.
      blurred_path: objectPath,
      is_primary: (count ?? 0) === 0,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ photo });
}

export async function DELETE(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { photoId } = await request.json();
  if (typeof photoId !== "string") {
    return NextResponse.json({ error: "photoId is required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: photo } = await admin
    .from("maid_photos")
    .select("*")
    .eq("id", photoId)
    .maybeSingle();

  if (!photo) {
    return NextResponse.json({ error: "Photo not found" }, { status: 404 });
  }

  await Promise.all([
    admin.storage.from("maid-photos").remove([photo.original_path]),
    admin.storage.from("maid-photos-public").remove([photo.blurred_path]),
  ]);
  await admin.from("maid_photos").delete().eq("id", photoId);

  // Keep one primary photo if any remain.
  if (photo.is_primary) {
    const { data: next } = await admin
      .from("maid_photos")
      .select("id")
      .eq("maid_id", photo.maid_id)
      .order("created_at")
      .limit(1)
      .maybeSingle();
    if (next) {
      await admin.from("maid_photos").update({ is_primary: true }).eq("id", next.id);
    }
  }

  return NextResponse.json({ ok: true });
}
