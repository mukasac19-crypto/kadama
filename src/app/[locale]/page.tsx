import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { photoUrlsFor } from "@/lib/photos";
import { MaidCard } from "@/components/MaidCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { EMIRATES, NATIONALITIES } from "@/lib/config";
import { getDict, isLocale, lp } from "@/lib/i18n";
import type { Maid } from "@/lib/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("maids")
    .select("*, maid_photos(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(6);

  const maids = (data ?? []) as Maid[];
  const photoUrls = await photoUrlsFor(maids, Boolean(user));

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
                locked={!user}
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

      {/* Trust */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.trust.map((point) => (
            <div key={point.title}>
              <h3 className="font-semibold text-brand-800">{point.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold">{dict.home.howTitle}</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {dict.home.steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-sm font-bold text-brand-900">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Agency CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-800 p-8 text-white sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="text-2xl font-bold">{dict.home.agencyTitle}</h2>
            <p className="mt-2 max-w-xl text-brand-100">{dict.home.agencyText}</p>
          </div>
          <Link
            href={lp(locale, "/list-your-maids")}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            {dict.home.agencyCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
