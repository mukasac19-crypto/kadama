import type { Locale } from "@/lib/i18n";

/**
 * Per-emirate landing pages served at /maids/<slug> (dispatched from the
 * /maids/[code] route). Each targets the "maids in <city>" cluster.
 * `dbName` MUST match the emirate value stored on the maids table
 * (see EMIRATES in config.ts) so the listing filter works.
 */

export const EMIRATE_SLUGS = [
  "dubai",
  "abu-dhabi",
  "sharjah",
  "ajman",
  "ras-al-khaimah",
  "fujairah",
  "umm-al-quwain",
] as const;

export type EmirateSlug = (typeof EMIRATE_SLUGS)[number];

const DB_NAME: Record<EmirateSlug, string> = {
  dubai: "Dubai",
  "abu-dhabi": "Abu Dhabi",
  sharjah: "Sharjah",
  ajman: "Ajman",
  "ras-al-khaimah": "Ras Al Khaimah",
  fujairah: "Fujairah",
  "umm-al-quwain": "Umm Al Quwain",
};

const SLUG_BY_DB: Record<string, EmirateSlug> = Object.fromEntries(
  Object.entries(DB_NAME).map(([slug, name]) => [name, slug as EmirateSlug])
);

export function isEmirateSlug(v: string): v is EmirateSlug {
  return (EMIRATE_SLUGS as readonly string[]).includes(v);
}

export function emirateDbName(slug: EmirateSlug): string {
  return DB_NAME[slug];
}

/** Reverse lookup: DB emirate value -> URL slug (for internal links). */
export function slugForEmirate(dbName: string | null | undefined): EmirateSlug | null {
  if (!dbName) return null;
  return SLUG_BY_DB[dbName] ?? null;
}

type Faq = { q: string; a: string };

export type LocationContent = {
  dbName: string;
  displayName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faqs: Faq[];
};

/** Unique English intro paragraph per emirate (avoids thin/duplicate pages). */
const INTRO_EN: Record<EmirateSlug, string> = {
  dubai:
    "Looking for a maid in Dubai? Browse verified, full-time and live-in maids, nannies and housekeepers available across Dubai — from Marina and JVC to Downtown and Mirdif. Every helper is documented and ready to interview, and our MOHRE-licensed team handles the visa end to end.",
  "abu-dhabi":
    "Hire a trusted maid or nanny in Abu Dhabi with confidence. We connect families across the capital — Khalifa City, Al Reem, Yas Island and beyond — with vetted, full-time and live-in domestic helpers. Salary, visa and government paperwork are all handled by our licensed team.",
  sharjah:
    "Find a reliable maid in Sharjah for full-time, live-in or live-out work. Browse documented housemaids and nannies available for families across Al Nahda, Muwaileh, Al Majaz and the wider emirate, with visa sponsorship taken care of for you.",
  ajman:
    "Hire a maid in Ajman without the hassle. Browse verified full-time and live-in housemaids and nannies ready to start with families across Ajman, all sponsored legally through our MOHRE licence.",
  "ras-al-khaimah":
    "Looking for a maid in Ras Al Khaimah? Meet vetted full-time and live-in maids and nannies available for families across RAK, with the visa, medicals and paperwork handled by our licensed team.",
  fujairah:
    "Find a trusted maid or nanny in Fujairah. Browse documented, full-time and live-in domestic helpers ready to join families on the east coast, with legal visa sponsorship arranged for you.",
  "umm-al-quwain":
    "Hire a reliable maid in Umm Al Quwain. Browse verified full-time and live-in housemaids and nannies available to families across UAQ, sponsored end to end by our MOHRE-licensed team.",
};

/** Unique Arabic intro paragraph per emirate. */
const INTRO_AR: Record<EmirateSlug, string> = {
  dubai:
    "تبحث عن خادمة في دبي؟ تصفّح خادمات ومربيات وعاملات منزل موثوقات بدوام كامل وبإقامة داخل المنزل، متاحات في جميع أنحاء دبي — من المارينا وقرية الجميرا إلى وسط المدينة ومردف. كل مساعِدة موثّقة وجاهزة للمقابلة، وفريقنا المرخّص من وزارة الموارد البشرية يتولّى التأشيرة بالكامل.",
  "abu-dhabi":
    "استقدم خادمة أو مربية موثوقة في أبوظبي بكل ثقة. نربط الأسر في العاصمة — مدينة خليفة والريم وجزيرة ياس وما بعدها — بمساعِدات منزليات موثوقات بدوام كامل وبإقامة داخل المنزل. الراتب والتأشيرة والمعاملات الحكومية يتولّاها فريقنا المرخّص.",
  sharjah:
    "اعثر على خادمة موثوقة في الشارقة للعمل بدوام كامل أو بإقامة داخل المنزل أو خارجه. تصفّح عاملات منزل ومربيات موثّقات متاحات للأسر في النهدة ومويلح والمجاز وسائر الإمارة، مع تولّينا كفالة التأشيرة نيابةً عنك.",
  ajman:
    "استقدم خادمة في عجمان بلا عناء. تصفّح عاملات منزل ومربيات موثوقات بدوام كامل وبإقامة داخل المنزل جاهزات للبدء مع الأسر في عجمان، جميعهن مكفولات قانونياً عبر ترخيصنا من وزارة الموارد البشرية.",
  "ras-al-khaimah":
    "تبحث عن خادمة في رأس الخيمة؟ قابل خادمات ومربيات موثوقات بدوام كامل وبإقامة داخل المنزل متاحات للأسر في رأس الخيمة، مع تولّينا التأشيرة والفحوصات والمعاملات.",
  fujairah:
    "اعثر على خادمة أو مربية موثوقة في الفجيرة. تصفّح مساعِدات منزليات موثّقات بدوام كامل وبإقامة داخل المنزل جاهزات للانضمام إلى الأسر على الساحل الشرقي، مع ترتيب كفالة التأشيرة القانونية نيابةً عنك.",
  "umm-al-quwain":
    "استقدم خادمة موثوقة في أم القيوين. تصفّح عاملات منزل ومربيات موثوقات بدوام كامل وبإقامة داخل المنزل متاحات للأسر في أم القيوين، مكفولات بالكامل من فريقنا المرخّص.",
};

export function locationContent(slug: EmirateSlug, locale: Locale): LocationContent {
  const dbName = DB_NAME[slug];
  if (locale === "ar") {
    const displayName = AR_NAME[slug];
    return {
      dbName,
      displayName,
      metaTitle: `خادمات في ${displayName} — استقدم خادمة أو مربية موثوقة`,
      metaDescription: `استقدم خادمة أو مربية موثوقة في ${displayName}. تصفّح ملفات موثّقة، وتحدّث عبر واتساب، ووظّف بثقة. مرخّصون من وزارة الموارد البشرية، التأشيرة مشمولة.`,
      h1: `خادمات في ${displayName}`,
      intro: INTRO_AR[slug],
      faqs: [
        {
          q: `كم تكلفة خادمة في ${displayName}؟`,
          a: "تبدأ الخادمة بدوام كامل من 2,980 درهم شهرياً شامل الراتب وتأشيرة سنتين والرسوم الحكومية، أو تأشيرة خادمة فقط من 8,500 درهم. الأسعار غير شاملة الضريبة.",
        },
        {
          q: `كيف أستقدم خادمة في ${displayName}؟`,
          a: `تصفّح الملفات المتاحة أدناه، ثم راسلنا على واتساب بشأن من تفضّل. نرتّب المقابلة ونتولّى التأشيرة والفحوصات وكل المعاملات في ${displayName}.`,
        },
        {
          q: "هل الخادمات بإقامة داخل المنزل أم خارجه؟",
          a: "كلاهما متاح. أخبرنا بتفضيلك ونطابقك مع خادمات تناسب هذا الترتيب.",
        },
      ],
    };
  }
  const displayName = dbName;
  return {
    dbName,
    displayName,
    metaTitle: `Maids in ${displayName} — Hire a Trusted Maid or Nanny`,
    metaDescription: `Hire a trusted maid or nanny in ${displayName}. Browse verified profiles, chat on WhatsApp and hire with confidence. MOHRE-licensed, visa included.`,
    h1: `Maids in ${displayName}`,
    intro: INTRO_EN[slug],
    faqs: [
      {
        q: `How much does a maid cost in ${displayName}?`,
        a: "A full-time maid starts from AED 2,980/month, including salary, a 2-year visa and government fees — or a maid visa alone from AED 8,500. Prices are ex-VAT.",
      },
      {
        q: `How do I hire a maid in ${displayName}?`,
        a: `Browse the available profiles below, then message us on WhatsApp about the one you like. We arrange the interview and handle the visa, medicals and all paperwork in ${displayName}.`,
      },
      {
        q: "Are the maids live-in or live-out?",
        a: "Both are available. Tell us your preference and we'll match you with maids who suit that arrangement.",
      },
    ],
  };
}

const AR_NAME: Record<EmirateSlug, string> = {
  dubai: "دبي",
  "abu-dhabi": "أبوظبي",
  sharjah: "الشارقة",
  ajman: "عجمان",
  "ras-al-khaimah": "رأس الخيمة",
  fujairah: "الفجيرة",
  "umm-al-quwain": "أم القيوين",
};
