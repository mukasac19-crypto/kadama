import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, lp } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDict(locale).pagesNav.how };
}

export default async function HowItWorksPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale).howPage;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">{t.intro}</p>

      <ol className="mt-10 space-y-4">
        {t.steps.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400 text-base font-bold text-brand-900">
              {i + 1}
            </span>
            <div>
              <h2 className="font-semibold">{step.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 text-2xl font-bold">{t.faqTitle}</h2>
      <div className="mt-6 space-y-4">
        {t.faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-2xl border border-neutral-200 bg-white p-5"
          >
            <summary className="cursor-pointer list-none font-semibold text-neutral-800 marker:content-none">
              {faq.q}
            </summary>
            <p className="mt-3 text-sm text-neutral-600">{faq.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href={lp(locale, "/maids")}
          className="inline-block rounded-full bg-brand-700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          {t.ctaBtn}
        </Link>
      </div>
    </div>
  );
}
