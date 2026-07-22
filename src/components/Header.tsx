import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SITE } from "@/lib/config";
import { getDict, lp, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav, type MobileNavItem } from "./MobileNav";

export async function Header({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    isAdmin = profile?.role === "admin";
  }

  const mobileItems: MobileNavItem[] = [
    { href: lp(locale, "/maids"), label: dict.nav.findMaid },
    { href: lp(locale, "/pricing"), label: dict.pagesNav.pricing },
    { href: lp(locale, "/guides"), label: dict.pagesNav.guides },
    { href: lp(locale, "/how-it-works"), label: dict.pagesNav.how },
    // Hidden for now — agencies page will be re-enabled later:
    // { href: lp(locale, "/list-your-maids"), label: dict.nav.forAgencies },
    { href: lp(locale, "/about"), label: dict.pagesNav.about },
    { href: lp(locale, "/contact"), label: dict.pagesNav.contact },
    ...(isAdmin ? [{ href: "/admin", label: dict.nav.admin }] : []),
    ...(user
      ? []
      : [{ href: lp(locale, "/login"), label: dict.nav.signIn, highlight: true }]),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href={lp(locale)}
          className="group flex shrink-0 items-baseline text-2xl font-extrabold tracking-tight"
        >
          <span className="text-brand-900">{SITE.name.split(" ")[0]}</span>
          <span className="ms-1.5 text-brand-600">{SITE.name.split(" ")[1]}</span>
          <span
            aria-hidden
            className="ms-1 inline-block h-2 w-2 rounded-full bg-gold-400 transition-transform group-hover:scale-125"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex lg:gap-2">
          <Link
            href={lp(locale, "/maids")}
            className="rounded-full px-3 py-2 text-neutral-700 transition hover:bg-neutral-100"
          >
            {dict.nav.findMaid}
          </Link>
          <Link
            href={lp(locale, "/pricing")}
            className="rounded-full px-3 py-2 text-neutral-700 transition hover:bg-neutral-100"
          >
            {dict.pagesNav.pricing}
          </Link>
          <Link
            href={lp(locale, "/guides")}
            className="rounded-full px-3 py-2 text-neutral-700 transition hover:bg-neutral-100"
          >
            {dict.pagesNav.guides}
          </Link>
          <Link
            href={lp(locale, "/how-it-works")}
            className="rounded-full px-3 py-2 text-neutral-700 transition hover:bg-neutral-100"
          >
            {dict.pagesNav.how}
          </Link>
          {/* Hidden for now — agencies page will be re-enabled later:
          <Link
            href={lp(locale, "/list-your-maids")}
            className="rounded-full px-3 py-2 text-neutral-700 transition hover:bg-neutral-100"
          >
            {dict.nav.forAgencies}
          </Link> */}
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-full px-3 py-2 text-brand-800 transition hover:bg-brand-50"
            >
              {dict.nav.admin}
            </Link>
          )}
          {user ? (
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-full px-3 py-2 text-neutral-500 transition hover:bg-neutral-100"
              >
                {dict.nav.signOut}
              </button>
            </form>
          ) : (
            <Link
              href={lp(locale, "/login")}
              className="rounded-full bg-brand-700 px-4 py-2 text-white transition hover:bg-brand-800"
            >
              {dict.nav.signIn}
            </Link>
          )}
          <LanguageSwitcher locale={locale} />
        </nav>

        {/* Mobile: language switcher always visible + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} />
          <MobileNav
            items={mobileItems}
            signedIn={Boolean(user)}
            signOutLabel={dict.nav.signOut}
          />
        </div>
      </div>
    </header>
  );
}
