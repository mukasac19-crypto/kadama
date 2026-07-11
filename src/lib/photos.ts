import type { Maid, MaidPhoto } from "./types";

/**
 * All photo URLs go through our same-origin proxy (/api/img/...) so the
 * browser never talks to supabase.co directly — see api/img/[...key].
 */

export function fullPhotoUrl(photoId: string): string {
  return `/api/img/full/${photoId}`;
}

export function primaryPhoto(maid: Maid): MaidPhoto | null {
  const photos = maid.maid_photos ?? [];
  return photos.find((p) => p.is_primary) ?? photos[0] ?? null;
}

/** Resolve the photo URL each maid card should show. */
export async function photoUrlsFor(maids: Maid[]): Promise<Map<string, string>> {
  const urls = new Map<string, string>();
  for (const maid of maids) {
    const photo = primaryPhoto(maid);
    if (!photo) continue;
    urls.set(maid.id, fullPhotoUrl(photo.id));
  }
  return urls;
}

/** URLs for every photo of one maid (profile gallery, admin). */
export async function signedUrlsForPhotos(
  photos: MaidPhoto[]
): Promise<Map<string, string>> {
  const urls = new Map<string, string>();
  for (const photo of photos) {
    urls.set(photo.id, fullPhotoUrl(photo.id));
  }
  return urls;
}
