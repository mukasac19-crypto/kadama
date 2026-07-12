import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageAlternates } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";
import { photoUrlsFor } from "@/lib/photos";
import { MaidCard } from "@/components/MaidCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { EMIRATES, NATIONALITIES, SKILLS } from "@/lib/config";
import { getDict, isLocale, lp } from "@/lib/i18n";
import type { Maid } from "@/lib/types";

type Search = { [key: string]: string | string[] | undefined };

function param(search: Search, key: string): string {
  const value = search[key];
  return typeof value === "string" ? value : "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    title: dict.browse.title,
    description: dict.meta.description,
    alternates: pageAlternates(locale, "/maids"),
  };
}

export default async function MaidsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Search>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  const search = await searchParams;
  const filters = {
    nationality: param(search, "nationality"),
    emirate: param(search, "emirate"),
    visa: param(search, "visa"),
    live: param(search, "live"),
    skill: param(search, "skill"),
    maxSalary: param(search, "maxSalary"),
  };

  const supabase = await createClient();
  let query = supabase
    .from("maids")
    .select("*, maid_photos(*)")
    .in("status", ["published", "reserved"])
    .order("last_confirmed_at", { ascending: false })
    .limit(48);

  if (filters.nationality) query = query.eq("nationality", filters.nationality);
  if (filters.emirate) query = query.eq("emirate", filters.emirate);
  if (filters.visa) query = query.eq("visa_status", filters.visa);
  if (filters.live) query = query.in("live_arrangement", [filters.live, "either"]);
  if (filters.skill) query = query.contains("skills", [filters.skill]);
  const maxSalary = Number(filters.maxSalary);
  if (maxSalary > 0) query = query.lte("expected_salary_aed", maxSalary);

  const { data } = await query;
  const maids = (data ?? []) as Maid[];
  const photoUrls = await photoUrlsFor(maids);

  const selectClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">{dict.browse.title}</h1>
      <p className="mt-1 text-sm text-neutral-500">{dict.browse.subtitle(maids.length)}</p>

      {/* Filters — plain GET form, works without JavaScript */}
      <form
        method="get"
        action={lp(locale, "/maids")}
        className="mt-6 grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        <select name="nationality" defaultValue={filters.nationality} className={selectClass}>
          <option value="">{dict.browse.nationality}</option>
          {NATIONALITIES.map((n) => (
            <option key={n} value={n}>
              {dict.values.nationalities[n] ?? n}
            </option>
          ))}
        </select>
        <select name="emirate" defaultValue={filters.emirate} className={selectClass}>
          <option value="">{dict.browse.emirate}</option>
          {EMIRATES.map((e) => (
            <option key={e} value={e}>
              {dict.values.emirates[e] ?? e}
            </option>
          ))}
        </select>
        <select name="visa" defaultValue={filters.visa} className={selectClass}>
          <option value="">{dict.browse.visaStatus}</option>
          {Object.entries(dict.values.visa).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select name="live" defaultValue={filters.live} className={selectClass}>
          <option value="">{dict.browse.liveInOut}</option>
          {Object.entries(dict.values.live)
            .filter(([value]) => value !== "either")
            .map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
        </select>
        <select name="skill" defaultValue={filters.skill} className={selectClass}>
          <option value="">{dict.browse.skill}</option>
          {SKILLS.map((s) => (
            <option key={s} value={s}>
              {dict.values.skills[s] ?? s}
            </option>
          ))}
        </select>
        {/* Salary filter hidden from the public site for now — re-enable later if needed:
        <input
          type="number"
          name="maxSalary"
          defaultValue={filters.maxSalary}
          placeholder={dict.browse.maxSalary}
          min={500}
          step={100}
          className={selectClass}
        /> */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            {dict.browse.filterBtn}
          </button>
          <a
            href={lp(locale, "/maids")}
            className="rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-500 transition hover:bg-neutral-50"
          >
            {dict.browse.clear}
          </a>
        </div>
      </form>

      {maids.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {maids.map((maid) => (
            <MaidCard
              key={maid.id}
              maid={maid}
              photoUrl={photoUrls.get(maid.id) ?? null}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
          <h2 className="text-lg font-semibold">{dict.browse.noMatchTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
            {dict.browse.noMatchText}
          </p>
          <div className="mt-6 flex justify-center">
            <WhatsAppButton src="empty" lang={locale} label={dict.browse.askWhatsapp} />
          </div>
        </div>
      )}
    </div>
  );
}
