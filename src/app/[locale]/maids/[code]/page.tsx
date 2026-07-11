import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { primaryPhoto, signedUrlsForPhotos } from "@/lib/photos";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDict, isLocale, labelFor, lp, type Locale } from "@/lib/i18n";
import { ageFrom, daysSince, formatAed, formatDate } from "@/lib/format";
import type { Maid } from "@/lib/types";

type Params = Promise<{ locale: string; code: string }>;

async function getMaid(code: string): Promise<Maid | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("maids")
    .select("*, maid_photos(*), maid_videos(*)")
    .eq("code", code)
    .in("status", ["published", "reserved"])
    .maybeSingle();
  return data as Maid | null;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, code } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  const maid = await getMaid(code);
  if (!maid) return { title: dict.profile.notFoundTitle };
  const firstName = maid.full_name.split(" ")[0];
  const nationality = labelFor(dict.values.nationalities, maid.nationality);
  const emirate = maid.emirate ? labelFor(dict.values.emirates, maid.emirate) : null;
  return {
    title: `${firstName} (#${maid.code}) — ${nationality}${emirate ? ` · ${emirate}` : ""}`,
    description: maid.bio ?? undefined,
  };
}

export default async function MaidProfilePage({ params }: { params: Params }) {
  const { locale: rawLocale, code } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDict(locale);

  const maid = await getMaid(code);
  if (!maid) notFound();

  const firstName = maid.full_name.split(" ")[0];
  const age = ageFrom(maid.date_of_birth);
  const photos = maid.maid_photos ?? [];
  const videos = maid.maid_videos ?? [];
  const primary = primaryPhoto(maid);
  const dateLocale = locale === "ar" ? "ar-AE" : "en-GB";

  const photoUrls = await signedUrlsForPhotos(photos);

  const f = dict.profile.facts;
  const facts: Array<[string, string]> = [
    [f.nationality, labelFor(dict.values.nationalities, maid.nationality)],
    [f.age, age ? dict.profile.years(age) : "—"],
    [f.location, maid.emirate ? labelFor(dict.values.emirates, maid.emirate) : "—"],
    [f.visaStatus, labelFor(dict.values.visa, maid.visa_status)],
    [f.liveInOut, labelFor(dict.values.live, maid.live_arrangement)],
    [f.experience, dict.profile.years(maid.experience_years)],
    // Salary hidden from the public site for now — re-enable later if needed:
    // [f.expectedSalary, `${formatAed(maid.expected_salary_aed)} ${dict.profile.perMonth}`],
    [f.availableFrom, formatDate(maid.available_from, dateLocale)],
    [f.religion, labelFor(dict.values.religions, maid.religion)],
    [f.maritalStatus, labelFor(dict.values.marital, maid.marital_status)],
    [f.children, maid.children_count != null ? String(maid.children_count) : "—"],
    [
      f.languages,
      maid.languages.length
        ? maid.languages.map((l) => labelFor(dict.values.languages, l)).join("، ")
        : "—",
    ],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href={lp(locale, "/maids")}
        className="text-sm text-neutral-500 hover:text-brand-800"
      >
        {dict.profile.back}
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[2fr_3fr]">
        {/* Photos */}
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
            <div className="aspect-4/5">
              {primary ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrls.get(primary.id) ?? ""}
                  alt={firstName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-brand-50 text-8xl font-bold text-brand-200">
                  {firstName.charAt(0)}
                </div>
              )}
            </div>
            {maid.status === "reserved" && (
              <span className="absolute start-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-white">
                {dict.profile.reserved}
              </span>
            )}
          </div>

          {photos.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {photos.slice(0, 4).map((photo) => (
                <div key={photo.id} className="aspect-square overflow-hidden rounded-xl bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoUrls.get(photo.id) ?? ""}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Intro videos */}
          {videos.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                {dict.profile.videosTitle}
              </h2>
              <div className="mt-3 space-y-3">
                {videos.map((video) => (
                  <video
                    key={video.id}
                    src={`/api/img/video/${video.id}`}
                    controls
                    preload="metadata"
                    className="aspect-video w-full rounded-2xl border border-neutral-200 bg-black"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold sm:text-3xl">
              {firstName}
              {age ? <span className="font-normal text-neutral-400">, {age}</span> : null}
            </h1>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-500">
              #{maid.code}
            </span>
          </div>

          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-800">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {dict.profile.confirmed(daysSince(maid.last_confirmed_at))}
          </p>

          {maid.bio && <p className="mt-4 leading-relaxed text-neutral-700">{maid.bio}</p>}

          {maid.skills.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {maid.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-800"
                >
                  {labelFor(dict.values.skills, skill)}
                </span>
              ))}
            </div>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:grid-cols-3">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wide text-neutral-400">{label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-neutral-800">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-2xl bg-brand-800 p-6 text-white">
            <h2 className="text-lg font-semibold">{dict.profile.interestedIn(firstName)}</h2>
            <p className="mt-1 text-sm text-brand-100">{dict.profile.interestedSub}</p>
            <div className="mt-4">
              <WhatsAppButton
                src="profile"
                maidCode={maid.code}
                lang={locale}
                label={dict.profile.whatsappAbout(firstName)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
