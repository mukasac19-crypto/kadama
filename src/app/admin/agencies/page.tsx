import { createClient } from "@/lib/supabase/server";
import { EMIRATES } from "@/lib/config";
import { createAgency } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

const inputClass =
  "rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none";

export default async function AdminAgenciesPage() {
  const supabase = await createClient();
  const { data: agencies } = await supabase
    .from("agencies")
    .select("*, maids(count)")
    .order("name");

  return (
    <div className="space-y-8">
      <form
        action={createAgency}
        className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-5 sm:grid-cols-3 lg:grid-cols-4"
      >
        <input name="name" required placeholder="Agency name *" className={inputClass} />
        <input name="contact_name" placeholder="Contact person" className={inputClass} />
        <input name="whatsapp" placeholder="WhatsApp (9715…)" className={inputClass} />
        <input name="email" placeholder="Email" className={inputClass} />
        <input name="license_no" placeholder="License no." className={inputClass} />
        <select name="emirate" defaultValue="" className={inputClass}>
          <option value="">Emirate</option>
          {EMIRATES.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <input
          name="commission_terms"
          placeholder="Commission terms (e.g. AED 1,500 / placement)"
          className={inputClass}
        />
        <SubmitButton
          pendingLabel="Adding…"
          doneLabel="✓ Added"
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          + Add agency
        </SubmitButton>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-400">
            <tr>
              <th className="px-4 py-3">Agency</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">WhatsApp</th>
              <th className="px-4 py-3">Emirate</th>
              <th className="px-4 py-3">Commission terms</th>
              <th className="px-4 py-3">Maids</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {(agencies ?? []).map((agency) => (
              <tr key={agency.id}>
                <td className="px-4 py-3 font-medium">
                  {agency.name}
                  {agency.is_house && (
                    <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-800">
                      OWN POOL
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-500">{agency.contact_name ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-500">
                  {agency.whatsapp ? (
                    <a
                      href={`https://wa.me/${agency.whatsapp}`}
                      target="_blank"
                      rel="noopener"
                      className="text-brand-800 hover:underline"
                    >
                      {agency.whatsapp}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-500">{agency.emirate ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-500">{agency.commission_terms ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-500">
                  {(agency.maids as Array<{ count: number }> | null)?.[0]?.count ?? 0}
                </td>
              </tr>
            ))}
            {(agencies ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-400">
                  No agencies yet — add the ones you work with, plus a &quot;Maid Link
                  (own pool)&quot; record for your own candidates.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
