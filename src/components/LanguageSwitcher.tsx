"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const other: Locale = locale === "ar" ? "en" : "ar";
  const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  const href = `/${other}${rest}` || `/${other}`;

  return (
    <Link
      href={href}
      onClick={() => {
        document.cookie = `NEXT_LOCALE=${other};path=/;max-age=31536000`;
      }}
      className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm font-semibold text-neutral-700 transition hover:border-brand-700 hover:text-brand-800"
    >
      {locale === "ar" ? "English" : "العربية"}
    </Link>
  );
}
