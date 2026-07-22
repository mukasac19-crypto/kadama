import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageAlternates } from "@/lib/seo";
import { guide, guidesBundle, isGuideSlug } from "@/lib/content/guides";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { isLocale, lp, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/config";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isGuideSlug(slug)) return {};
  const g = guide(slug, locale);
  return {
    title: g.metaTitle,
    description: g.description,
    alternates: pageAlternates(locale, `/guides/${slug}`),
    openGraph: {
      type: "article",
      title: g.metaTitle,
      description: g.description,
      url: lp(locale, `/guides/${slug}`),
    },
  };
}

export default async function GuidePage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw) || !isGuideSlug(slug)) notFound();
  const locale = raw as Locale;
  const b = guidesBundle(locale);
  const g = guide(slug, locale);
  const base = SITE.url;
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeLabel, item: `${base}${lp(locale)}` },
          { "@type": "ListItem", position: 2, name: b.indexTitle, item: `${base}${lp(locale, "/guides")}` },
          { "@type": "ListItem", position: 3, name: g.title, item: `${base}${lp(locale, `/guides/${slug}`)}` },
        ],
      },
      {
        "@type": "Article",
        headline: g.title,
        description: g.description,
        inLanguage: locale,
        author: { "@type": "Organization", name: SITE.name },
        publisher: { "@type": "Organization", name: SITE.name },
        mainEntityOfPage: `${base}${lp(locale, `/guides/${slug}`)}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: g.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
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
        <Link href={lp(locale, "/guides")} className="hover:text-brand-800">
          {b.indexTitle}
        </Link>
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{g.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-neutral-600">{g.intro}</p>

      {g.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-xl font-bold text-neutral-900">{s.heading}</h2>
          {s.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-neutral-700">
              {p}
            </p>
          ))}
        </section>
      ))}

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">{locale === "ar" ? "أسئلة شائعة" : "Frequently asked"}</h2>
        <dl className="mt-5 divide-y divide-neutral-200 border-t border-neutral-200">
          {g.faqs.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-semibold text-neutral-900">{f.q}</dt>
              <dd className="mt-2 text-neutral-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <div className="mt-12 rounded-3xl bg-brand-800 p-8 text-white">
        <h2 className="text-xl font-semibold">{b.ctaTitle}</h2>
        <p className="mt-1 text-brand-100">{b.ctaText}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <WhatsAppButton src="home" lang={locale} label={b.ctaButton} />
          <Link
            href={lp(locale, "/pricing")}
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
          >
            {locale === "ar" ? "الأسعار" : "Pricing"}
          </Link>
        </div>
      </div>
    </article>
  );
}
