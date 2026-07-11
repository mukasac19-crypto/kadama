"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { setPrimaryPhoto } from "@/app/admin/actions";

export interface AdminPhoto {
  id: string;
  url: string | null;
  is_primary: boolean;
}

export function PhotoManager({
  maidId,
  photos,
}: {
  maidId: string;
  photos: AdminPhoto[];
}) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.set("maidId", maidId);
      formData.set("file", file);
      const res = await fetch("/api/admin/photos", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? "Upload failed");
        break;
      }
    }
    setBusy(false);
    if (fileInput.current) fileInput.current.value = "";
    router.refresh();
  }

  async function remove(photoId: string) {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "Delete failed");
    }
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">
          Photos{" "}
          <span className="text-xs font-normal text-neutral-400">
            — original stays private; a blurred copy is generated for visitors
          </span>
        </h2>
        <label className="cursor-pointer rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-700">
          {busy ? "Working…" : "+ Upload photos"}
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            disabled={busy}
            onChange={(e) => upload(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {photos.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-400">
          No photos yet — the public card shows a placeholder until you upload one.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden rounded-xl border border-neutral-200">
              <div className="aspect-square bg-neutral-100">
                {photo.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              {photo.is_primary && (
                <span className="absolute left-2 top-2 rounded-full bg-brand-700 px-2 py-0.5 text-[10px] font-bold text-white">
                  PRIMARY
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-black/50 p-1.5 opacity-0 transition group-hover:opacity-100">
                {!photo.is_primary && (
                  <form action={setPrimaryPhoto}>
                    <input type="hidden" name="photoId" value={photo.id} />
                    <input type="hidden" name="maidId" value={maidId} />
                    <button className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-neutral-800">
                      Make primary
                    </button>
                  </form>
                )}
                <button
                  onClick={() => remove(photo.id)}
                  disabled={busy}
                  className="ml-auto rounded-full bg-red-500/90 px-2 py-1 text-[10px] font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
