import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageAlternates } from "@/lib/seo";
import { guidesBundle, GUIDE_SLUGS } from "@/lib/content/guides";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { isLocale, lp, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const b = guidesBundle(locale);
  return {
    title: b.indexMetaTitle,
    description: b.indexDescription,
    alternates: pageAlternates(locale, "/guides"),
    openGraph: { title: b.indexMetaTitle, description: b.indexDescription, url: lp(locale, "/guides") },
  };
}

export default async function GuidesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const b = guidesBundle(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{b.indexTitle}</h1>
      <p className="mt-3 max-w-2xl text-lg text-neutral-600">{b.indexIntro}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {GUIDE_SLUGS.map((slug) => {
          const g = b.guides[slug];
          return (
            <Link
              key={slug}
              href={lp(locale, `/guides/${slug}`)}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-brand-800">
                {g.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-neutral-600">{g.description}</p>
              <span className="mt-4 text-sm font-semibold text-brand-800">{b.readMore} →</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl bg-brand-800 p-8 text-white">
        <h2 className="text-xl font-semibold">{b.ctaTitle}</h2>
        <p className="mt-1 text-brand-100">{b.ctaText}</p>
        <div className="mt-5">
          <WhatsAppButton src="home" lang={locale} label={b.ctaButton} />
        </div>
      </div>
    </div>
  );
}
