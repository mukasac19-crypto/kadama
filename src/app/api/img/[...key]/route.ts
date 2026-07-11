import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Same-origin image proxy. Browsers only ever load photos from our own
 * domain — never from supabase.co directly — so ad blockers, DNS filters
 * and interfering proxies between visitors and Supabase can't break them.
 *
 *   /api/img/full/<photoId>   -> full photo (public)
 *   /api/img/video/<videoId>  -> intro video (public)
 */
export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ key: string[] }> }
) {
  const { key } = await ctx.params;
  const [kind, ...rest] = key;

  if (kind === "video" && rest.length === 1) {
    const videoId = rest[0];

    const admin = createAdminClient();
    const { data: video } = await admin
      .from("maid_videos")
      .select("video_path")
      .eq("id", videoId)
      .maybeSingle();
    if (!video) {
      return new NextResponse(null, { status: 404 });
    }

    // Stream from the private bucket, forwarding Range so <video> can seek.
    const upstreamHeaders: Record<string, string> = {
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    };
    const range = request.headers.get("range");
    if (range) upstreamHeaders["Range"] = range;

    const upstream = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/maid-videos/${video.video_path}`,
      { headers: upstreamHeaders }
    );
    if (!upstream.ok && upstream.status !== 206) {
      return new NextResponse(null, { status: upstream.status });
    }

    const headers = new Headers({ "Cache-Control": "public, max-age=3600" });
    for (const name of ["content-type", "content-length", "content-range", "accept-ranges"]) {
      const value = upstream.headers.get(name);
      if (value) headers.set(name, value);
    }
    return new NextResponse(upstream.body, { status: upstream.status, headers });
  }

  if (kind === "full" && rest.length === 1) {
    const photoId = rest[0];

    const admin = createAdminClient();
    const { data: photo } = await admin
      .from("maid_photos")
      .select("original_path")
      .eq("id", photoId)
      .maybeSingle();
    if (!photo) {
      return new NextResponse(null, { status: 404 });
    }

    const { data: blob, error } = await admin.storage
      .from("maid-photos")
      .download(photo.original_path);
    if (error || !blob) {
      return new NextResponse(null, { status: 502 });
    }

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
      },
    });
  }

  return new NextResponse(null, { status: 404 });
}
