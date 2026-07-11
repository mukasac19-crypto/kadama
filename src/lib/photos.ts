import { createAdminClient } from "./supabase/admin";
import type { Maid, MaidPhoto } from "./types";

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour

export function blurredPublicUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/maid-photos-public/${path}`;
}

export function primaryPhoto(maid: Maid): MaidPhoto | null {
  const photos = maid.maid_photos ?? [];
  return photos.find((p) => p.is_primary) ?? photos[0] ?? null;
}

/**
 * Resolve the photo URL each maid card/profile should show.
 * Signed-in users get a short-lived signed URL to the original;
 * anonymous visitors get the genuinely blurred public variant.
 */
export async function photoUrlsFor(
  maids: Maid[],
  isSignedIn: boolean
): Promise<Map<string, string>> {
  const urls = new Map<string, string>();
  const withPhoto = maids
    .map((m) => ({ maid: m, photo: primaryPhoto(m) }))
    .filter((x): x is { maid: Maid; photo: MaidPhoto } => x.photo !== null);

  if (withPhoto.length === 0) return urls;

  if (!isSignedIn) {
    for (const { maid, photo } of withPhoto) {
      urls.set(maid.id, blurredPublicUrl(photo.blurred_path));
    }
    return urls;
  }

  const admin = createAdminClient();
  const { data } = await admin.storage
    .from("maid-photos")
    .createSignedUrls(
      withPhoto.map((x) => x.photo.original_path),
      SIGNED_URL_TTL_SECONDS
    );

  const byPath = new Map(
    (data ?? [])
      .filter((d) => d.signedUrl && d.path)
      .map((d) => [d.path as string, d.signedUrl])
  );
  for (const { maid, photo } of withPhoto) {
    const url = byPath.get(photo.original_path);
    if (url) urls.set(maid.id, url);
  }
  return urls;
}

/** Signed URLs for every photo of one maid (profile gallery, admin). */
export async function signedUrlsForPhotos(
  photos: MaidPhoto[]
): Promise<Map<string, string>> {
  const urls = new Map<string, string>();
  if (photos.length === 0) return urls;
  const admin = createAdminClient();
  const { data } = await admin.storage
    .from("maid-photos")
    .createSignedUrls(
      photos.map((p) => p.original_path),
      SIGNED_URL_TTL_SECONDS
    );
  (data ?? []).forEach((d, i) => {
    if (d.signedUrl) urls.set(photos[i].id, d.signedUrl);
  });
  return urls;
}
