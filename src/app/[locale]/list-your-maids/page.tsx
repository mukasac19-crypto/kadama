import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDict, isLocale } from "@/lib/i18n";

export default async function ListYourMaidsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  const t = dict.agenciesPage;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.title}
        <span className="text-brand-700">{t.titleHighlight}</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">{t.intro}</p>

      <div className="mt-8">
        <WhatsAppButton src="agency" lang={locale} label={t.cta} />
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {t.benefits.map((benefit) => (
          <div key={benefit.title} className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="font-semibold text-brand-800">{benefit.title}</h2>
            <p className="mt-2 text-sm text-neutral-600">{benefit.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-neutral-900 p-8 text-white sm:p-10">
        <h2 className="text-xl font-bold">{t.checklistTitle}</h2>
        <ul className="mt-5 space-y-3">
          {t.checklist.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-neutral-200">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-neutral-900">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-neutral-400">{t.checklistNote}</p>
        <div className="mt-6">
          <WhatsAppButton src="agency" lang={locale} label={t.startCta} />
        </div>
      </div>
    </div>
  );
}
