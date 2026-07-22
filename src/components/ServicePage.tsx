import Link from "next/link";
import { serviceContent, type ServiceSlug } from "@/lib/content/services";
import { waDirectLink } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDict, lp, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/config";

export function ServicePage({
  slug,
  locale,
}: {
  slug: ServiceSlug;
  locale: Locale;
}) {
  const c = serviceContent(slug, locale);
  const dict = getDict(locale);
  const base = SITE.url;
  const path = `/${slug}`;
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeLabel, item: `${base}${lp(locale)}` },
          { "@type": "ListItem", position: 2, name: c.h1, item: `${base}${lp(locale, path)}` },
        ],
      },
      {
        "@type": "Service",
        name: c.h1,
        serviceType: c.serviceType,
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
        provider: { "@type": "Organization", name: SITE.name, url: base },
        url: `${base}${lp(locale, path)}`,
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {c.eyebrow}
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            {c.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">{c.intro}</p>

          <div className="mt-6 inline-flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <span className="text-2xl font-bold text-neutral-900">{c.priceLine}</span>
            <span className="mt-1 text-sm text-neutral-500">{c.priceSub}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton src="home" lang={locale} label={c.primaryCta} />
            <Link
              href={lp(locale, "/maids")}
              className="inline-flex items-center justify-center rounded-full border border-brand-600 px-6 py-3 text-base font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              {dict.nav.findMaid}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14">
        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-bold">{c.benefitsTitle}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {c.benefits.map((b) => (
              <li
                key={b}
                className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-700"
              >
                <span aria-hidden className="mt-0.5 text-brand-600">
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">{c.stepsTitle}</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold text-neutral-900">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold">{c.faqTitle}</h2>
          <dl className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
            {c.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-semibold text-neutral-900">{f.q}</dt>
                <dd className="mt-2 text-neutral-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Closing CTA */}
        <section className="mt-12 rounded-3xl bg-brand-800 p-8 text-white">
          <h2 className="text-xl font-semibold">{c.closingTitle}</h2>
          <p className="mt-1 text-brand-100">{c.closingText}</p>
          <div className="mt-5">
            <a
              href={waDirectLink(c.ctaMessage)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              {c.primaryCta}
            </a>
          </div>
        </section>

        {/* Related links (internal linking) */}
        <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {c.related.map((r) => (
            <Link
              key={r.path}
              href={lp(locale, r.path)}
              className="font-medium text-brand-800 hover:underline"
            >
              {r.label} →
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
