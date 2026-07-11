import { redirect } from "next/navigation";
import { isLocale, lp } from "@/lib/i18n";

/**
 * Sign-in and sign-up were merged into one page (/login with tabs).
 * Old /signup links land here and get forwarded, preserving `next`.
 */
export default async function SignupRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
}) {
  const { locale } = await params;
  const { next } = await searchParams;
  const safeLocale = isLocale(locale) ? locale : "en";
  const nextParam = next ? `&next=${encodeURIComponent(next)}` : "";
  redirect(lp(safeLocale, `/login?mode=signup${nextParam}`));
}
