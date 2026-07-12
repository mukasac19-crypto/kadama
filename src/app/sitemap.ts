import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { SITE } from "@/lib/config";
import { locales, lp } from "@/lib/i18n";

// Re-generate hourly so newly published maids show up without a redeploy.
export const revalidate = 3600;

const STATIC_PATHS = [
  "/",
  "/maids",
  "/about",
  "/how-it-works",
  "/contact",
  "/list-your-maids",
  "/terms",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE.url}${lp(locale, path)}`,
        changeFrequency: path === "/" || path === "/maids" ? "daily" : "monthly",
        priority: path === "/" ? 1 : path === "/maids" ? 0.9 : 0.5,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE.url}${lp(l, path)}`])
          ),
        },
      });
    }
  }

  const admin = createAdminClient();
  const { data: maids } = await admin
    .from("maids")
    .select("code, last_confirmed_at")
    .in("status", ["published", "reserved"]);

  for (const maid of maids ?? []) {
    const path = `/maids/${maid.code}`;
    for (const locale of locales) {
      entries.push({
        url: `${SITE.url}${lp(locale, path)}`,
        lastModified: maid.last_confirmed_at ?? undefined,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE.url}${lp(l, path)}`])
          ),
        },
      });
    }
  }

  return entries;
}
