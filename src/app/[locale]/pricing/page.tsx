import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageAlternates } from "@/lib/seo";
import { pricingContent } from "@/lib/content/pricing";
import { waDirectLink } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDict, isLocale, lp, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = pricingContent(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(locale, "/pricing"),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: lp(locale, "/pricing"),
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDict(locale);
  const c = pricingContent(locale);
  const base = SITE.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: c.breadcrumbHome,
            item: `${base}${lp(locale)}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: c.breadcrumbPricing,
            item: `${base}${lp(locale, "/pricing")}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: SITE.name,
        serviceType: "Domestic worker recruitment and visa services",
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
        provider: { "@type": "Organization", name: SITE.name, url: base },
        offers: c.plans.map((p) => ({
          "@type": "Offer",
          name: p.name,
          priceCurrency: "AED",
          ...(p.amount ? { price: p.amount } : {}),
          url: `${base}${lp(locale, "/pricing")}#${p.id}`,
        })),
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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500">
        <Link href={lp(locale)} className="hover:text-brand-800">
          {c.breadcrumbHome}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-700">{c.breadcrumbPricing}</span>
      </nav>

      {/* Header */}
      <div className="mt-6 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          {c.licensedBadge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{c.h1}</h1>
        <p className="mt-3 text-lg text-neutral-600">{c.intro}</p>
      </div>

      {/* Plans */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {c.plans.map((p) => (
          <div
            key={p.id}
            id={p.id}
            className={`flex scroll-mt-24 flex-col rounded-3xl border bg-white p-6 ${
              p.featured
                ? "border-brand-600 shadow-lg ring-1 ring-brand-600"
                : "border-neutral-200 shadow-sm"
            }`}
          >
            <h2 className="text-lg font-semibold text-neutral-900">{p.name}</h2>
            <p className="mt-1 text-sm text-neutral-500">{p.tagline}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-neutral-900">{p.price}</span>
              {p.unit && <span className="text-sm text-neutral-500">{p.unit}</span>}
            </div>
            {p.priceNote && <p className="mt-1 text-xs text-neutral-500">{p.priceNote}</p>}
            <ul className="mt-5 flex-1 space-y-2.5 text-sm text-neutral-700">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span aria-hidden className="mt-0.5 text-brand-600">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={waDirectLink(p.ctaMessage)}
              target="_blank"
              rel="noopener"
              className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                p.featured
                  ? "bg-brand-700 text-white hover:bg-brand-800"
                  : "border border-brand-600 text-brand-800 hover:bg-brand-50"
              }`}
            >
              {c.ctaButton}
            </a>
          </div>
        ))}
      </div>

      {/* Guarantees */}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-4 text-sm">
        {c.guarantees.map((g) => (
          <span key={g} className="flex items-center gap-1.5 font-medium text-neutral-700">
            <span aria-hidden className="text-brand-600">
              ✓
            </span>
            {g}
          </span>
        ))}
        <span className="text-neutral-400">·</span>
        <span className="text-neutral-500">{c.vatNote}</span>
      </div>

      {/* FAQ */}
      <div className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold">{c.faqTitle}</h2>
        <dl className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
          {c.faqs.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-semibold text-neutral-900">{f.q}</dt>
              <dd className="mt-2 text-neutral-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-3xl bg-brand-800 p-8 text-white">
        <h2 className="text-xl font-semibold">{c.ctaTitle}</h2>
        <p className="mt-1 text-brand-100">{c.ctaText}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <WhatsAppButton src="home" lang={locale} label={c.ctaButton} />
          <Link
            href={lp(locale, "/maids")}
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
          >
            {dict.nav.findMaid}
          </Link>
        </div>
      </div>
    </div>
  );
}
