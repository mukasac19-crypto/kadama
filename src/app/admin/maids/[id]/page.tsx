import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signedUrlsForPhotos } from "@/lib/photos";
import { confirmedLabel } from "@/lib/format";
import { MaidForm } from "@/components/admin/MaidForm";
import { PhotoManager } from "@/components/admin/PhotoManager";
import { confirmAvailability, setMaidStatus } from "../../actions";
import type { Agency, Maid } from "@/lib/types";

export default async function EditMaidPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: maidData }, { data: agencies }] = await Promise.all([
    supabase.from("maids").select("*, maid_photos(*)").eq("id", id).maybeSingle(),
    supabase.from("agencies").select("*").order("name"),
  ]);

  if (!maidData) notFound();
  const maid = maidData as Maid;
  const photos = maid.maid_photos ?? [];
  const photoUrls = await signedUrlsForPhotos(photos);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">
            {maid.full_name}{" "}
            <span className="font-normal text-neutral-400">#{maid.code}</span>
          </h2>
          <p className="text-sm text-neutral-500">
            {confirmedLabel(maid.last_confirmed_at)} · status:{" "}
            <span className="font-semibold capitalize">{maid.status}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <form action={confirmAvailability}>
            <input type="hidden" name="id" value={maid.id} />
            <button className="rounded-full bg-brand-700 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-800">
              Confirm available
            </button>
          </form>
          {maid.status !== "published" && (
            <form action={setMaidStatus}>
              <input type="hidden" name="id" value={maid.id} />
              <input type="hidden" name="status" value="published" />
              <button className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-700">
                Publish
              </button>
            </form>
          )}
          {maid.status === "published" && (
            <>
              <form action={setMaidStatus}>
                <input type="hidden" name="id" value={maid.id} />
                <input type="hidden" name="status" value="reserved" />
                <button className="rounded-full border border-amber-400 px-4 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50">
                  Mark reserved
                </button>
              </form>
              <form action={setMaidStatus}>
                <input type="hidden" name="id" value={maid.id} />
                <input type="hidden" name="status" value="hired" />
                <button className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50">
                  Mark hired
                </button>
              </form>
            </>
          )}
          {["published", "reserved"].includes(maid.status) && (
            <Link
              href={`/en/maids/${maid.code}`}
              target="_blank"
              className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
            >
              View public page ↗
            </Link>
          )}
        </div>
      </div>

      <PhotoManager
        maidId={maid.id}
        photos={photos.map((photo) => ({
          id: photo.id,
          url: photoUrls.get(photo.id) ?? null,
          is_primary: photo.is_primary,
        }))}
      />

      <MaidForm maid={maid} agencies={(agencies ?? []) as Agency[]} />
    </div>
  );
}
