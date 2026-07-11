import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE } from "@/lib/config";
import { getDict, isLocale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDict(locale).pagesNav.contact };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale).contactPage;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">{t.intro}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {/* WhatsApp — the primary channel */}
        <div className="rounded-2xl bg-brand-800 p-6 text-white sm:col-span-2">
          <h2 className="text-lg font-bold">{t.whatsappTitle}</h2>
          <p className="mt-1 text-sm text-brand-100">{t.whatsappText}</p>
          <div className="mt-4">
            <WhatsAppButton src="floating" lang={locale} label={t.whatsappBtn} />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="font-semibold text-neutral-900">{t.emailTitle}</h2>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-2 block text-brand-800 hover:underline"
          >
            {SITE.email}
          </a>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="font-semibold text-neutral-900">{t.hoursTitle}</h2>
          <p className="mt-2 text-neutral-600">{t.hoursText}</p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:col-span-2">
          <h2 className="font-semibold text-neutral-900">{t.locationTitle}</h2>
          <p className="mt-2 text-neutral-600">{SITE.location}</p>
        </div>
      </div>
    </div>
  );
}
