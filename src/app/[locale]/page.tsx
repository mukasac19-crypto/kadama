import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageAlternates } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";
import { photoUrlsFor } from "@/lib/photos";
import { MaidCard } from "@/components/MaidCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { EMIRATES, NATIONALITIES } from "@/lib/config";
import { getDict, isLocale, lp } from "@/lib/i18n";
import type { Maid } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    // `absolute` bypasses the "%s | Maid Link" template so the brand isn't doubled.
    title: { absolute: dict.meta.title },
    alternates: pageAlternates(locale, "/"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  const supabase = await createClient();
  const { data } = await supabase
    .from("maids")
    .select("*, maid_photos(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(6);

  const maids = (data ?? []) as Maid[];
  const photoUrls = await photoUrlsFor(maids);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-transparent">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -end-24 h-80 w-80 rounded-full bg-gold-100 opacity-70 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-40 -start-32 h-80 w-80 rounded-full bg-brand-100 opacity-70 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.home.heroTitle}
              <span className="text-gold-600">{dict.home.heroHighlight}</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-600">{dict.home.heroText}</p>
          </div>

          {/* Quick search */}
          <form
            action={lp(locale, "/maids")}
            method="get"
            className="mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row"
          >
            <select
              name="nationality"
              defaultValue=""
              className="flex-1 rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
            >
              <option value="">{dict.home.anyNationality}</option>
              {NATIONALITIES.map((n) => (
                <option key={n} value={n}>
                  {dict.values.nationalities[n] ?? n}
                </option>
              ))}
            </select>
            <select
              name="emirate"
              defaultValue=""
              className="flex-1 rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
            >
              <option value="">{dict.home.anyEmirate}</option>
              {EMIRATES.map((e) => (
                <option key={e} value={e}>
                  {dict.values.emirates[e] ?? e}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-xl bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              {dict.home.searchBtn}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            <span>{dict.home.preferAsk}</span>
            <WhatsAppButton
              src="home"
              lang={locale}
              variant="outline"
              label={dict.home.tellUs}
            />
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-700 via-gold-400 to-brand-700"
        />
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <h2 className="text-2xl font-bold">{dict.home.servicesTitle}</h2>
        <p className="mt-1 text-sm text-neutral-500">{dict.home.servicesSub}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/hire-maid", label: dict.servicesNav.hireMaid, price: locale === "ar" ? "من 2,980 درهم/شهر" : "From AED 2,980/mo" },
            { href: "/maid-visa", label: dict.servicesNav.maidVisa, price: locale === "ar" ? "من 8,500 درهم" : "From AED 8,500" },
            { href: "/part-time-maids", label: dict.servicesNav.partTime, price: locale === "ar" ? "من 35 درهم/ساعة" : "From AED 35/hr" },
            { href: "/nannies", label: dict.servicesNav.nannies, price: locale === "ar" ? "من 2,980 درهم/شهر" : "From AED 2,980/mo" },
          ].map((s) => (
            <Link
              key={s.href}
              href={lp(locale, s.href)}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-md"
            >
              <span className="text-base font-semibold text-neutral-900 group-hover:text-brand-800">
                {s.label}
              </span>
              <span className="mt-3 text-sm font-medium text-brand-700">{s.price} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest maids */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">{dict.home.recentTitle}</h2>
            <p className="mt-1 text-sm text-neutral-500">{dict.home.recentSub}</p>
          </div>
          <Link
            href={lp(locale, "/maids")}
            className="text-sm font-semibold text-brand-800 hover:underline"
          >
            {dict.home.viewAll}
          </Link>
        </div>
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
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 p-10 text-center text-neutral-500">
            <p>{dict.home.emptyText}</p>
            <div className="mt-4 flex justify-center">
              <WhatsAppButton src="empty" lang={locale} label={dict.home.chatWithUs} />
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
