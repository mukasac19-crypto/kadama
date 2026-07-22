import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { serviceContent } from "@/lib/content/services";
import { pageAlternates } from "@/lib/seo";
import { isLocale, lp, type Locale } from "@/lib/i18n";

const SLUG = "part-time-maids" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = serviceContent(SLUG, locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(locale, `/${SLUG}`),
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: lp(locale, `/${SLUG}`) },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ServicePage slug={SLUG} locale={locale as Locale} />;
}
