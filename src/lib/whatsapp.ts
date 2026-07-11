import { SITE } from "./config";
import type { Locale } from "./i18n";

export type WaSource =
  | "card"
  | "profile"
  | "floating"
  | "empty"
  | "agency"
  | "home";

/**
 * Every WhatsApp button routes through /api/wa so the click is logged
 * (which maid, which page, which user) before redirecting to wa.me.
 * `lang` localizes the pre-filled message the visitor sends.
 */
export function waTrackedHref(opts: {
  src: WaSource;
  maidCode?: string;
  lang?: Locale;
}): string {
  const params = new URLSearchParams({ src: opts.src });
  if (opts.maidCode) params.set("maid", opts.maidCode);
  if (opts.lang && opts.lang !== "en") params.set("lang", opts.lang);
  return `/api/wa?${params.toString()}`;
}

export function waDirectLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
