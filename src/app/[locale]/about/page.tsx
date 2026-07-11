import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDict, isLocale, lp } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDict(locale).pagesNav.about };
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale).aboutPage;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
        Maid Link
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">{t.intro}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {t.points.map((point) => (
          <div key={point.title} className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="font-semibold text-brand-800">{point.title}</h2>
            <p className="mt-2 text-sm text-neutral-600">{point.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 rounded-2xl bg-brand-50 p-5 text-sm font-medium text-brand-900">
        {t.compliance}
      </p>

      <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl bg-brand-800 p-8 text-white sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold">{t.ctaTitle}</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={lp(locale, "/maids")}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            {t.ctaBrowse}
          </Link>
          <WhatsAppButton src="home" lang={locale} variant="primary" label={t.ctaWhatsapp} />
        </div>
      </div>
    </div>
  );
}
