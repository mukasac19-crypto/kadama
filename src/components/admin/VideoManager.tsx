"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const MAX_SIZE_MB = 50; // Supabase free-tier per-file limit

export interface AdminVideo {
  id: string;
}

export function VideoManager({
  maidId,
  videos,
}: {
  maidId: string;
  videos: AdminVideo[];
}) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function upload(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Video is too large — maximum ${MAX_SIZE_MB} MB. Tip: 30–60 seconds is ideal.`);
      return;
    }
    setBusy(true);
    setError(null);

    try {
      // 1. Get a one-time signed upload slot.
      setProgress("Preparing upload…");
      const signRes = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sign", maidId, filename: file.name }),
      });
      const signed = await signRes.json();
      if (!signRes.ok) throw new Error(signed.error ?? "Could not prepare upload");

      // 2. Upload straight to storage (bypasses server size limits).
      setProgress("Uploading video…");
      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from("maid-videos")
        .uploadToSignedUrl(signed.path, signed.token, file);
      if (uploadError) throw new Error(uploadError.message);

      // 3. Server verifies the stored file and registers it.
      setProgress("Verifying…");
      const confirmRes = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "confirm", maidId, path: signed.path }),
      });
      const confirmed = await confirmRes.json();
      if (!confirmRes.ok) throw new Error(confirmed.error ?? "Verification failed");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      setProgress(null);
      if (fileInput.current) fileInput.current.value = "";
      router.refresh();
    }
  }

  async function remove(videoId: string) {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/videos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId }),
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
          Intro videos{" "}
          <span className="text-xs font-normal text-neutral-400">
            — visible to signed-in members only · MP4/WebM/MOV, max {MAX_SIZE_MB} MB
          </span>
        </h2>
        <label className="cursor-pointer rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-700">
          {busy ? (progress ?? "Working…") : "+ Upload video"}
          <input
            ref={fileInput}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            disabled={busy}
            onChange={(e) => upload(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {videos.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-400">
          No videos yet. A 30–60 second self-introduction is the single biggest
          trust-builder for families.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="overflow-hidden rounded-xl border border-neutral-200">
              <video
                src={`/api/img/video/${video.id}`}
                controls
                preload="metadata"
                className="aspect-video w-full bg-black"
              />
              <div className="flex justify-end p-2">
                <button
                  onClick={() => remove(video.id)}
                  disabled={busy}
                  className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100"
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
