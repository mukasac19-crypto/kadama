import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Same-origin image proxy. Browsers only ever load photos from our own
 * domain — never from supabase.co directly — so ad blockers, DNS filters
 * and interfering proxies between visitors and Supabase can't break them.
 *
 *   /api/img/blur/<maidId>/<file>.jpg  -> blurred variant (public)
 *   /api/img/full/<photoId>            -> original (signed-in users only)
 */
export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ key: string[] }> }
) {
  const { key } = await ctx.params;
  const [kind, ...rest] = key;

  if (kind === "blur" && rest.length >= 2) {
    const path = rest.join("/");
    const upstream = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/maid-photos-public/${path}`
    );
    if (!upstream.ok || !upstream.body) {
      return new NextResponse(null, { status: upstream.status || 502 });
    }
    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
        // Immutable filenames (UUIDs) — cache hard at the browser and CDN.
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    });
  }

  if (kind === "full" && rest.length === 1) {
    const photoId = rest[0];

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return new NextResponse(null, { status: 403 });
    }

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
        "Cache-Control": "private, max-age=3600",
      },
    });
  }

  return new NextResponse(null, { status: 404 });
}
