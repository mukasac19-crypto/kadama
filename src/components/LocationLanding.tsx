import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { photoUrlsFor } from "@/lib/photos";
import { locationContent, emirateDbName, type EmirateSlug } from "@/lib/content/locations";
import { MaidCard } from "@/components/MaidCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDict, lp, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/config";
import type { Maid } from "@/lib/types";

export async function LocationLanding({
  slug,
  locale,
}: {
  slug: EmirateSlug;
  locale: Locale;
}) {
  const dict = getDict(locale);
  const c = locationContent(slug, locale);
  const base = SITE.url;
  const path = `/maids/${slug}`;
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  const supabase = await createClient();
  const { data } = await supabase
    .from("maids")
    .select("*, maid_photos(*)")
    .eq("emirate", emirateDbName(slug))
    .in("status", ["published", "reserved"])
    .order("last_confirmed_at", { ascending: false })
    .limit(48);

  const maids = (data ?? []) as Maid[];
  const photoUrls = await photoUrlsFor(maids);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeLabel, item: `${base}${lp(locale)}` },
          { "@type": "ListItem", position: 2, name: dict.nav.findMaid, item: `${base}${lp(locale, "/maids")}` },
          { "@type": "ListItem", position: 3, name: c.h1, item: `${base}${lp(locale, path)}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500">
        <Link href={lp(locale)} className="hover:text-brand-800">
          {homeLabel}
        </Link>
        <span className="mx-2">/</span>
        <Link href={lp(locale, "/maids")} className="hover:text-brand-800">
          {dict.nav.findMaid}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-700">{c.displayName}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{c.h1}</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-neutral-600">{c.intro}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <WhatsAppButton src="home" lang={locale} label={dict.card.whatsapp} />
        <Link
          href={lp(locale, "/pricing")}
          className="inline-flex items-center justify-center rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
        >
          {dict.pagesNav.pricing}
        </Link>
      </div>

      {/* Listings */}
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
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">{dict.browse.noMatchText}</p>
          <div className="mt-6 flex justify-center">
            <WhatsAppButton src="empty" lang={locale} label={dict.browse.askWhatsapp} />
          </div>
        </div>
      )}

      {/* FAQ */}
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold">{locale === "ar" ? "أسئلة شائعة" : "Frequently asked"}</h2>
        <dl className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
          {c.faqs.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-semibold text-neutral-900">{f.q}</dt>
              <dd className="mt-2 text-neutral-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
