import Link from "next/link";
import type { Maid } from "@/lib/types";
import { ageFrom, formatAed } from "@/lib/format";
import { getDict, labelFor, lp, type Locale } from "@/lib/i18n";
import { WhatsAppButton } from "./WhatsAppButton";

function LockOverlay({ text }: { text: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/25 text-white">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" />
      </svg>
      <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium">{text}</span>
    </div>
  );
}

export function MaidCard({
  maid,
  photoUrl,
  locked,
  locale,
}: {
  maid: Maid;
  photoUrl: string | null;
  locked: boolean;
  locale: Locale;
}) {
  const dict = getDict(locale);
  const firstName = maid.full_name.split(" ")[0];
  const age = ageFrom(maid.date_of_birth);
  const profileHref = lp(locale, `/maids/${maid.code}`);

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={profileHref} className="relative block aspect-4/5 bg-neutral-100">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={locked ? dict.card.signInToView : firstName}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-50 text-5xl font-bold text-brand-300">
            {firstName.charAt(0)}
          </div>
        )}
        {locked && photoUrl && <LockOverlay text={dict.card.signInToView} />}
        {maid.status === "reserved" && (
          <span className="absolute start-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white">
            {dict.card.reserved}
          </span>
        )}
        {maid.visa_status && (
          <span className="absolute bottom-3 start-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-700">
            {labelFor(dict.values.visa, maid.visa_status)}
          </span>
        )}
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-base font-semibold">
              {firstName}
              {age ? <span className="font-normal text-neutral-500">, {age}</span> : null}
            </h3>
            <span className="text-xs text-neutral-400">#{maid.code}</span>
          </div>
          <p className="text-sm text-neutral-500">
            {labelFor(dict.values.nationalities, maid.nationality)}
            {maid.emirate ? ` · ${labelFor(dict.values.emirates, maid.emirate)}` : ""}
            {` · ${dict.card.expYears(maid.experience_years)}`}
          </p>
        </div>

        <p className="text-sm font-semibold text-brand-800">
          {formatAed(maid.expected_salary_aed)}
          <span className="font-normal text-neutral-400"> {dict.card.perMonth}</span>
        </p>

        {maid.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {maid.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600"
              >
                {labelFor(dict.values.skills, skill)}
              </span>
            ))}
            {maid.skills.length > 3 && (
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-400">
                +{maid.skills.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <WhatsAppButton
            src="card"
            maidCode={maid.code}
            lang={locale}
            variant="card"
            label={dict.card.whatsapp}
          />
          <Link
            href={profileHref}
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-brand-700 hover:text-brand-800"
          >
            {dict.card.viewProfile}
          </Link>
        </div>
      </div>
    </div>
  );
}
