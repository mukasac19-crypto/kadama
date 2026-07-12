import type { Metadata } from "next";
import { locales, lp, type Locale } from "./i18n";

/**
 * Canonical + hreflang alternates for a public page. Paths are relative;
 * metadataBase (root layout) resolves them to absolute URLs.
 */
export function pageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: lp(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, lp(l, path)])),
      "x-default": lp("en", path),
    },
  };
}
