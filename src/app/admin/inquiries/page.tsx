import { createClient } from "@/lib/supabase/server";
import { INQUIRY_STATUSES } from "@/lib/config";
import { formatDate } from "@/lib/format";
import { createInquiry, updateInquiry } from "../actions";
import type { Inquiry } from "@/lib/types";

const inputClass =
  "rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("inquiries")
    .select("*, maids(code, full_name), agencies(name)")
    .order("created_at", { ascending: false })
    .limit(200);
  const inquiries = (data ?? []) as Inquiry[];

  return (
    <div className="space-y-8">
      {/* Quick add — log a lead the moment a family messages on WhatsApp */}
      <form
        action={createInquiry}
        className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-5 sm:grid-cols-5"
      >
        <input name="maid_code" placeholder="Maid code (ML-0101)" className={inputClass} />
        <input name="family_name" placeholder="Family name" className={inputClass} />
        <input name="family_phone" placeholder="Family phone / WhatsApp" className={inputClass} />
        <input name="notes" placeholder="Notes" className={inputClass} />
        <button className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">
          + Log inquiry
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-400">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Maid</th>
              <th className="px-4 py-3">Agency</th>
              <th className="px-4 py-3">Family</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Commission (AED)</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="align-middle">
                <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                  {formatDate(inquiry.created_at)}
                </td>
                <td className="px-4 py-3">
                  {inquiry.maids ? (
                    <>
                      <span className="font-medium">{inquiry.maids.full_name}</span>{" "}
                      <span className="text-neutral-400">#{inquiry.maids.code}</span>
                    </>
                  ) : (
                    <span className="text-neutral-400">General</span>
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-500">{inquiry.agencies?.name ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-500">
                  {inquiry.family_name ?? "—"}
                  {inquiry.family_phone && (
                    <span className="block text-xs text-neutral-400">{inquiry.family_phone}</span>
                  )}
                </td>
                {/* One inline form per row — change fields, hit Save */}
                <td className="px-4 py-3" colSpan={4}>
                  <form action={updateInquiry} className="flex flex-wrap items-center gap-2">
                    <input type="hidden" name="id" value={inquiry.id} />
                    <select name="status" defaultValue={inquiry.status} className={inputClass}>
                      {INQUIRY_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="commission_aed"
                      defaultValue={inquiry.commission_aed ?? ""}
                      placeholder="Commission"
                      className={`${inputClass} w-28`}
                    />
                    <label className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <input
                        type="checkbox"
                        name="commission_paid"
                        defaultChecked={inquiry.commission_paid}
                        className="h-4 w-4 accent-brand-700"
                      />
                      Paid
                    </label>
                    <input
                      name="notes"
                      defaultValue={inquiry.notes ?? ""}
                      placeholder="Notes"
                      className={`${inputClass} w-40`}
                    />
                    <button className="rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-neutral-700">
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-neutral-400">
                  No inquiries logged yet. When a family messages on WhatsApp, log it
                  here — this table is your revenue ledger.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
