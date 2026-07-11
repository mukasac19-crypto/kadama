import { en, type Dictionary } from "./en";
import { ar } from "./ar";

export type Locale = "en" | "ar";
export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function getDict(locale: Locale): Dictionary {
  return locale === "ar" ? ar : en;
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Prefix a site path with the locale: lp("ar", "/maids") -> "/ar/maids" */
export function lp(locale: Locale, path = "/"): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

/** Translate a stored DB value (e.g. "Filipina", "live_in") for display. */
export function labelFor(
  map: Record<string, string>,
  value: string | null | undefined
): string {
  if (!value) return "—";
  return map[value] ?? value;
}

export type { Dictionary };
