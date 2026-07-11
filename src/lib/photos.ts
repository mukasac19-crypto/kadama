import type { Maid, MaidPhoto } from "./types";

/**
 * All photo URLs go through our same-origin proxy (/api/img/...) so the
 * browser never talks to supabase.co directly — see api/img/[...key].
 * Originals stay in the private bucket; the proxy checks the session
 * before streaming them.
 */

export function blurredPublicUrl(path: string): string {
  return `/api/img/blur/${path}`;
}

export function fullPhotoUrl(photoId: string): string {
  return `/api/img/full/${photoId}`;
}

export function primaryPhoto(maid: Maid): MaidPhoto | null {
  const photos = maid.maid_photos ?? [];
  return photos.find((p) => p.is_primary) ?? photos[0] ?? null;
}

/**
 * Resolve the photo URL each maid card should show: signed-in users get
 * the original (session enforced by the proxy), visitors get the blur.
 */
export async function photoUrlsFor(
  maids: Maid[],
  isSignedIn: boolean
): Promise<Map<string, string>> {
  const urls = new Map<string, string>();
  for (const maid of maids) {
    const photo = primaryPhoto(maid);
    if (!photo) continue;
    urls.set(
      maid.id,
      isSignedIn ? fullPhotoUrl(photo.id) : blurredPublicUrl(photo.blurred_path)
    );
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
