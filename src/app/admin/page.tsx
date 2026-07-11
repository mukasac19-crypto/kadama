import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { STALE_AFTER_DAYS } from "@/lib/config";
import { daysSince } from "@/lib/format";
import { confirmAvailability, setMaidStatus } from "./actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const staleCutoff = new Date(
    Date.now() - STALE_AFTER_DAYS * 86_400_000
  ).toISOString();
  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();

  const [published, drafts, newInquiries, clicks7d, staleRes, unpaidRes] =
    await Promise.all([
      supabase.from("maids").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("maids").select("id", { count: "exact", head: true }).in("status", ["draft", "review"]),
      supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("wa_clicks").select("id", { count: "exact", head: true }).gte("created_at", weekAgo),
      supabase
        .from("maids")
        .select("id, code, full_name, last_confirmed_at, status, agencies(name)")
        .in("status", ["published", "reserved"])
        .lt("last_confirmed_at", staleCutoff)
        .order("last_confirmed_at", { ascending: true })
        .limit(25),
      supabase
        .from("inquiries")
        .select("commission_aed")
        .eq("status", "hired")
        .eq("commission_paid", false),
    ]);

  const unpaidTotal = (unpaidRes.data ?? []).reduce(
    (sum, row) => sum + (row.commission_aed ?? 0),
    0
  );

  const stats = [
    { label: "Published maids", value: published.count ?? 0, href: "/admin/maids?status=published" },
    { label: "Drafts awaiting review", value: drafts.count ?? 0, href: "/admin/maids?status=draft" },
    { label: "New inquiries", value: newInquiries.count ?? 0, href: "/admin/inquiries" },
    { label: "WhatsApp clicks (7 days)", value: clicks7d.count ?? 0, href: "/admin/inquiries" },
    { label: "Unpaid commissions", value: `AED ${unpaidTotal.toLocaleString()}`, href: "/admin/inquiries" },
  ];

  const stale = staleRes.data ?? [];

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-brand-300"
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="text-lg font-bold">
          Stale listings{" "}
          <span className="text-sm font-normal text-neutral-400">
            — not confirmed in {STALE_AFTER_DAYS}+ days. Ping the agency on
            WhatsApp, then update below.
          </span>
        </h2>
        {stale.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
            All listings are fresh. Nothing to chase 🎉
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-400">
                <tr>
                  <th className="px-4 py-3">Maid</th>
                  <th className="px-4 py-3">Agency</th>
                  <th className="px-4 py-3">Last confirmed</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {stale.map((maid) => (
                  <tr key={maid.id}>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/maids/${maid.id}`}
                        className="font-medium hover:text-brand-800"
                      >
                        {maid.full_name}
                      </Link>{" "}
                      <span className="text-neutral-400">#{maid.code}</span>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">
                      {(maid.agencies as unknown as { name: string } | null)?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-amber-600">
                      {daysSince(maid.last_confirmed_at)} days ago
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <form action={confirmAvailability}>
                          <input type="hidden" name="id" value={maid.id} />
                          <SubmitButton
                            pendingLabel="Confirming…"
                            doneLabel="✓ Confirmed"
                            className="rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white hover:bg-brand-800"
                          >
                            Confirmed available
                          </SubmitButton>
                        </form>
                        <form action={setMaidStatus}>
                          <input type="hidden" name="id" value={maid.id} />
                          <input type="hidden" name="status" value="reserved" />
                          <SubmitButton
                            pendingLabel="Updating…"
                            doneLabel="✓ Reserved"
                            className="rounded-full border border-amber-400 px-3 py-1 text-xs font-semibold text-amber-600 hover:bg-amber-50"
                          >
                            Reserved
                          </SubmitButton>
                        </form>
                        <form action={setMaidStatus}>
                          <input type="hidden" name="id" value={maid.id} />
                          <input type="hidden" name="status" value="hired" />
                          <SubmitButton
                            pendingLabel="Updating…"
                            doneLabel="✓ Hired"
                            className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-500 hover:bg-neutral-50"
                          >
                            Hired
                          </SubmitButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
