import type { Locale } from "@/lib/i18n";
import type { LandingContent } from "@/components/MaidsFilterLanding";

/**
 * Per-nationality landing pages served at /maids/<slug> (dispatched from the
 * /maids/[code] route). Curated to nationalities with real UAE search demand.
 * `dbName` MUST match the nationality value stored on the maids table
 * (see NATIONALITIES in config.ts).
 */

export const NATIONALITY_SLUGS = [
  "filipina",
  "indian",
  "indonesian",
  "nepali",
  "ethiopian",
  "sri-lankan",
  "kenyan",
  "ugandan",
  "ghanaian",
] as const;

export type NationalitySlug = (typeof NATIONALITY_SLUGS)[number];

const DB_NAME: Record<NationalitySlug, string> = {
  filipina: "Filipina",
  indian: "Indian",
  indonesian: "Indonesian",
  nepali: "Nepali",
  ethiopian: "Ethiopian",
  "sri-lankan": "Sri Lankan",
  kenyan: "Kenyan",
  ugandan: "Ugandan",
  ghanaian: "Ghanaian",
};

const SLUG_BY_DB: Record<string, NationalitySlug> = Object.fromEntries(
  Object.entries(DB_NAME).map(([slug, name]) => [name, slug as NationalitySlug])
);

export function isNationalitySlug(v: string): v is NationalitySlug {
  return (NATIONALITY_SLUGS as readonly string[]).includes(v);
}

export function nationalityDbName(slug: NationalitySlug): string {
  return DB_NAME[slug];
}

export function slugForNationality(dbName: string | null | undefined): NationalitySlug | null {
  if (!dbName) return null;
  return SLUG_BY_DB[dbName] ?? null;
}

/** Adjective + short, respectful, factual English intro per nationality. */
const EN: Record<NationalitySlug, { adjective: string; intro: string }> = {
  filipina: {
    adjective: "Filipina",
    intro:
      "Hire an experienced Filipina (Filipino) maid or nanny in the UAE. Many speak fluent English and have strong childcare, newborn and housekeeping experience — a popular choice for families who want easy communication at home. Every helper is documented and our MOHRE-licensed team handles the visa.",
  },
  indian: {
    adjective: "Indian",
    intro:
      "Find a reliable Indian maid or nanny in the UAE. Indian helpers are well-regarded for cooking, cleaning and family care, and many speak English, Hindi and Malayalam. Browse verified profiles below and we'll handle the visa and paperwork end to end.",
  },
  indonesian: {
    adjective: "Indonesian",
    intro:
      "Hire a trusted Indonesian maid in the UAE. Indonesian helpers are known for being caring, hardworking and experienced with children and elderly care. All profiles are documented, with visa sponsorship arranged by our licensed team.",
  },
  nepali: {
    adjective: "Nepali",
    intro:
      "Looking for a Nepali maid or nanny in the UAE? Nepali helpers are valued for their reliability and gentle care with children and elderly family members. Browse available, documented profiles and we'll take care of the visa.",
  },
  ethiopian: {
    adjective: "Ethiopian",
    intro:
      "Hire an experienced Ethiopian maid in the UAE. Ethiopian helpers are hardworking and well-suited to housekeeping, cooking and childcare. Every profile is verified and our MOHRE-licensed team handles the visa and medicals.",
  },
  "sri-lankan": {
    adjective: "Sri Lankan",
    intro:
      "Find a caring Sri Lankan maid or nanny in the UAE. Sri Lankan helpers are experienced in cooking, cleaning and looking after children. Browse documented profiles below, with legal visa sponsorship arranged for you.",
  },
  kenyan: {
    adjective: "Kenyan",
    intro:
      "Hire a Kenyan maid or nanny in the UAE. Many Kenyan helpers speak good English and have solid housekeeping and childcare experience. All profiles are verified and sponsored legally through our MOHRE licence.",
  },
  ugandan: {
    adjective: "Ugandan",
    intro:
      "Looking for a Ugandan maid or nanny in the UAE? Ugandan helpers are known for being warm, reliable and English-speaking, and are experienced with children and housework. Browse available profiles and we'll handle the visa.",
  },
  ghanaian: {
    adjective: "Ghanaian",
    intro:
      "Hire a Ghanaian maid or nanny in the UAE. Ghanaian helpers often speak English and are experienced in childcare and housekeeping. Every profile is documented, with visa and paperwork handled by our licensed team.",
  },
};

const AR: Record<NationalitySlug, { name: string; intro: string }> = {
  filipina: {
    name: "فلبينية",
    intro:
      "استقدم خادمة أو مربية فلبينية ذات خبرة في الإمارات. كثيرات منهن يتحدثن الإنجليزية بطلاقة ولديهن خبرة قوية في رعاية الأطفال وحديثي الولادة والأعمال المنزلية — خيار مفضّل للأسر التي تريد تواصلاً سهلاً في المنزل. كل مساعِدة موثّقة وفريقنا المرخّص يتولّى التأشيرة.",
  },
  indian: {
    name: "هندية",
    intro:
      "اعثر على خادمة أو مربية هندية موثوقة في الإمارات. تشتهر المساعِدات الهنديات بالطبخ والتنظيف ورعاية الأسرة، وكثيرات يتحدثن الإنجليزية والهندية والمالايالامية. تصفّح الملفات الموثّقة أدناه ونتولّى التأشيرة والمعاملات بالكامل.",
  },
  indonesian: {
    name: "إندونيسية",
    intro:
      "استقدم خادمة إندونيسية موثوقة في الإمارات. تشتهر المساعِدات الإندونيسيات بالعناية والاجتهاد والخبرة مع الأطفال وكبار السن. جميع الملفات موثّقة، مع ترتيب كفالة التأشيرة من فريقنا المرخّص.",
  },
  nepali: {
    name: "نيبالية",
    intro:
      "تبحث عن خادمة أو مربية نيبالية في الإمارات؟ تتميّز المساعِدات النيباليات بالموثوقية والعناية اللطيفة بالأطفال وكبار السن. تصفّح الملفات المتاحة الموثّقة ونتولّى نحن التأشيرة.",
  },
  ethiopian: {
    name: "إثيوبية",
    intro:
      "استقدم خادمة إثيوبية ذات خبرة في الإمارات. المساعِدات الإثيوبيات مجتهدات ومناسبات للأعمال المنزلية والطبخ ورعاية الأطفال. كل ملف موثّق وفريقنا المرخّص يتولّى التأشيرة والفحوصات.",
  },
  "sri-lankan": {
    name: "سريلانكية",
    intro:
      "اعثر على خادمة أو مربية سريلانكية حنونة في الإمارات. المساعِدات السريلانكيات ذوات خبرة في الطبخ والتنظيف ورعاية الأطفال. تصفّح الملفات الموثّقة أدناه، مع ترتيب كفالة التأشيرة القانونية نيابةً عنك.",
  },
  kenyan: {
    name: "كينية",
    intro:
      "استقدم خادمة أو مربية كينية في الإمارات. كثير من المساعِدات الكينيات يتحدثن الإنجليزية جيداً ولديهن خبرة جيدة في الأعمال المنزلية ورعاية الأطفال. جميع الملفات موثّقة ومكفولة قانونياً عبر ترخيصنا.",
  },
  ugandan: {
    name: "أوغندية",
    intro:
      "تبحث عن خادمة أو مربية أوغندية في الإمارات؟ تشتهر المساعِدات الأوغنديات بالدفء والموثوقية والتحدّث بالإنجليزية، ولديهن خبرة مع الأطفال والأعمال المنزلية. تصفّح الملفات المتاحة ونتولّى التأشيرة.",
  },
  ghanaian: {
    name: "غانية",
    intro:
      "استقدم خادمة أو مربية غانية في الإمارات. كثير من المساعِدات الغانيات يتحدثن الإنجليزية ولديهن خبرة في رعاية الأطفال والأعمال المنزلية. كل ملف موثّق، مع تولّي فريقنا المرخّص للتأشيرة والمعاملات.",
  },
};

export type NationalityContent = LandingContent & {
  dbName: string;
  metaTitle: string;
  metaDescription: string;
};

export function nationalityContent(slug: NationalitySlug, locale: Locale): NationalityContent {
  const dbName = DB_NAME[slug];
  if (locale === "ar") {
    const { name, intro } = AR[slug];
    return {
      dbName,
      displayName: `خادمات ${name}`,
      metaTitle: `خادمات ${name} في الإمارات — استقدم خادمة أو مربية`,
      metaDescription: `استقدم خادمة أو مربية ${name} موثوقة في دبي وأبوظبي والإمارات. تصفّح ملفات موثّقة، وتحدّث عبر واتساب، ووظّف بثقة. مرخّصون، التأشيرة مشمولة.`,
      h1: `خادمات ${name} في الإمارات`,
      intro,
      faqs: [
        {
          q: `كم تكلفة خادمة ${name} في دبي؟`,
          a: "تبدأ الخادمة بدوام كامل من 2,980 درهم شهرياً شامل الراتب والتأشيرة والرسوم الحكومية، أو تأشيرة خادمة فقط من 8,500 درهم. الأسعار غير شاملة الضريبة.",
        },
        {
          q: `هل يمكنني استقدام خادمة ${name} بإقامة داخل المنزل؟`,
          a: "نعم — الإقامة داخل المنزل وخارجها وبالساعة جميعها متاحة. أخبرنا بتفضيلك ونطابقك مع المناسِبة.",
        },
        {
          q: `كيف أستقدم خادمة ${name}؟`,
          a: "تصفّح الملفات المتاحة أدناه، ثم راسلنا على واتساب بشأن من تفضّل. نرتّب المقابلة ونتولّى التأشيرة وكل المعاملات.",
        },
      ],
    };
  }
  const { adjective, intro } = EN[slug];
  return {
    dbName,
    displayName: `${adjective} maids`,
    metaTitle: `${adjective} Maids in the UAE — Hire a ${adjective} Maid or Nanny`,
    metaDescription: `Hire a trusted ${adjective} maid or nanny in Dubai, Abu Dhabi and the UAE. Browse verified profiles, chat on WhatsApp and hire with confidence. MOHRE-licensed, visa included.`,
    h1: `${adjective} maids in the UAE`,
    intro,
    faqs: [
      {
        q: `How much does a ${adjective} maid cost in Dubai?`,
        a: "A full-time maid starts from AED 2,980/month, including salary, visa and government fees — or a maid visa alone from AED 8,500. Prices are ex-VAT.",
      },
      {
        q: `Can I hire a live-in ${adjective} maid?`,
        a: "Yes — live-in, live-out and part-time are all available. Tell us your preference and we'll match you with the right helper.",
      },
      {
        q: `How do I hire a ${adjective} maid?`,
        a: "Browse the available profiles below, then message us on WhatsApp about the one you like. We arrange the interview and handle the visa and all paperwork.",
      },
    ],
  };
}
