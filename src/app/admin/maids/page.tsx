import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MAID_STATUSES } from "@/lib/config";
import { daysSince } from "@/lib/format";

const statusColors: Record<string, string> = {
  draft: "bg-neutral-100 text-neutral-600",
  review: "bg-blue-100 text-blue-700",
  published: "bg-brand-100 text-brand-800",
  reserved: "bg-amber-100 text-amber-700",
  hired: "bg-purple-100 text-purple-700",
  archived: "bg-neutral-100 text-neutral-400",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColors[status] ?? "bg-neutral-100 text-neutral-600"}`}
    >
      {status}
    </span>
  );
}

export default async function AdminMaidsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("maids")
    .select("id, code, full_name, nationality, emirate, status, last_confirmed_at, agencies(name)")
    .order("updated_at", { ascending: false })
    .limit(200);
  if (status && (MAID_STATUSES as readonly string[]).includes(status)) {
    query = query.eq("status", status);
  }
  const { data: maids } = await query;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1 text-sm">
          <Link
            href="/admin/maids"
            className={`rounded-full px-3 py-1.5 ${!status ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100"}`}
          >
            All
          </Link>
          {MAID_STATUSES.map((s) => (
            <Link
              key={s}
              href={`/admin/maids?status=${s}`}
              className={`rounded-full px-3 py-1.5 capitalize ${status === s ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100"}`}
            >
              {s}
            </Link>
          ))}
        </div>
        <Link
          href="/admin/maids/new"
          className="rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          + Add maid
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-400">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Nationality</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Agency</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Confirmed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {(maids ?? []).map((maid) => (
              <tr key={maid.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 text-neutral-400">#{maid.code}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/maids/${maid.id}`}
                    className="font-medium hover:text-brand-800"
                  >
                    {maid.full_name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-neutral-500">{maid.nationality}</td>
                <td className="px-4 py-3 text-neutral-500">{maid.emirate ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-500">
                  {(maid.agencies as unknown as { name: string } | null)?.name ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={maid.status} />
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {daysSince(maid.last_confirmed_at)}d ago
                </td>
              </tr>
            ))}
            {(maids ?? []).length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-neutral-400">
                  No maids here yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
