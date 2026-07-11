import Link from "next/link";
import { SITE } from "@/lib/config";
import { getDict, lp, type Locale } from "@/lib/i18n";
import { WhatsAppButton } from "./WhatsAppButton";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDict(locale);

  const explore = [
    { href: lp(locale, "/maids"), label: dict.footer.browseMaids },
    { href: lp(locale, "/how-it-works"), label: dict.pagesNav.how },
    { href: lp(locale, "/login?mode=signup"), label: dict.footer.createAccount },
    // Hidden for now — agencies page will be re-enabled later:
    // { href: lp(locale, "/list-your-maids"), label: dict.footer.listYourMaids },
  ];

  const company = [
    { href: lp(locale, "/about"), label: dict.pagesNav.about },
    { href: lp(locale, "/contact"), label: dict.pagesNav.contact },
    { href: lp(locale, "/terms"), label: dict.pagesNav.terms },
    { href: lp(locale, "/privacy"), label: dict.pagesNav.privacy },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-baseline text-xl font-extrabold tracking-tight">
            <span className="text-brand-900">{SITE.name.split(" ")[0]}</span>
            <span className="ms-1 text-brand-600">{SITE.name.split(" ")[1]}</span>
            <span aria-hidden className="ms-1 inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
          </p>
          <p className="mt-2 max-w-xs text-sm text-neutral-500">
            {dict.meta.description}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-neutral-900">{dict.footer.explore}</p>
          <ul className="mt-3 space-y-2 text-neutral-600">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-800">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-neutral-900">{dict.footer.company}</p>
          <ul className="mt-3 space-y-2 text-neutral-600">
            {company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-800">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-neutral-900">{dict.footer.talkToUs}</p>
          <p className="mt-3 text-neutral-600">{dict.footer.fastest}</p>
          <div className="mt-4">
            <WhatsAppButton
              src="floating"
              lang={locale}
              variant="outline"
              label={dict.footer.whatsappUs}
            />
          </div>
          <p className="mt-4 text-neutral-500">
            <a href={`mailto:${SITE.email}`} className="hover:text-brand-800">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-neutral-100 py-4 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} {SITE.name}. {dict.footer.rights}
      </div>
    </footer>
  );
}
