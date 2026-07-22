import type { Locale } from "@/lib/i18n";

/**
 * Public pricing content for /[locale]/pricing.
 * Figures mirror the prevailing UAE market (competitor-benchmarked) and are
 * shown ex-VAT. Keep these in sync with what the sales team quotes on WhatsApp.
 */

export type PricePlan = {
  /** Stable id used for anchors + JSON-LD offer names. */
  id: string;
  name: string;
  /** Short intent line under the name. */
  tagline: string;
  /** Headline price, already formatted (e.g. "AED 2,980"). */
  price: string;
  /** Unit shown after the price (e.g. "/ month"). */
  unit?: string;
  /** Optional secondary price line (e.g. "+ AED 160 / month"). */
  priceNote?: string;
  /** Numeric AED value for schema.org offers (0 if "from"/variable). */
  amount: number;
  features: string[];
  ctaMessage: string;
  featured?: boolean;
};

export type PricingContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  licensedBadge: string;
  plans: PricePlan[];
  guarantees: string[];
  vatNote: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  breadcrumbHome: string;
  breadcrumbPricing: string;
};

const en: PricingContent = {
  metaTitle: "Maid & Nanny Prices in the UAE — Full-Time, Visa & Part-Time",
  metaDescription:
    "Transparent maid and nanny pricing in Dubai & the UAE. Full-time maids from AED 2,980/mo, maid visa from AED 8,500, part-time from AED 35/hr. MOHRE-licensed, no deposit, money-back guarantee.",
  h1: "Simple, transparent pricing",
  intro:
    "Hire a full-time maid, sponsor a maid visa, or book part-time help — all through one MOHRE-licensed team. No hidden fees, no deposit, and a money-back guarantee on full-time placements.",
  licensedBadge: "Licensed by the UAE Ministry of Human Resources & Emiratisation (MOHRE)",
  plans: [
    {
      id: "full-time",
      name: "Full-time maid",
      tagline: "Live-in or live-out, sponsored by us",
      price: "AED 2,980",
      unit: "/ month",
      amount: 2980,
      featured: true,
      features: [
        "Maid's salary, visa & medicals included",
        "Emirates ID, insurance & government fees covered",
        "Live-in or live-out — your choice",
        "7-day money-back guarantee",
        "Free replacements if it's not the right fit",
      ],
      ctaMessage:
        "Hi Maid Link! I'd like to hire a full-time maid (AED 2,980/mo plan). Can you help?",
    },
    {
      id: "maid-visa",
      name: "Maid visa",
      tagline: "Already have a maid? We sponsor her 2-year visa",
      price: "AED 8,500",
      priceNote: "+ AED 160 / month  ·  or AED 10,960 one-off",
      amount: 8500,
      features: [
        "2-year UAE residency visa",
        "Emirates ID & medical exam",
        "Insurance, WPS payroll & government fees",
        "End-of-service dues handled",
        "24/7 support & visa renewals",
      ],
      ctaMessage:
        "Hi Maid Link! I need a maid visa (2-year sponsorship). Can you walk me through it?",
    },
    {
      id: "part-time",
      name: "Part-time & nannies",
      tagline: "Cleaning or childcare, by the hour",
      price: "AED 35",
      unit: "/ hour",
      amount: 35,
      features: [
        "Vetted part-time maids & nannies",
        "Book by the hour, day or week",
        "No long-term commitment",
        "Insured, reliable helpers",
        "Same-day availability in most areas",
      ],
      ctaMessage:
        "Hi Maid Link! I'm looking for part-time / nanny help (AED 35/hr). Can you help?",
    },
  ],
  guarantees: [
    "No deposit",
    "No cancellation fee",
    "7-day money-back guarantee",
    "Free replacements",
  ],
  vatNote: "All prices are exclusive of 5% VAT.",
  faqTitle: "Pricing questions",
  faqs: [
    {
      q: "What does the full-time maid price include?",
      a: "The monthly price covers the maid's salary, her 2-year residency visa, Emirates ID, medical tests, insurance and all government fees. There are no separate agency or setup charges.",
    },
    {
      q: "Do I pay a deposit?",
      a: "No. We don't charge a deposit or a cancellation fee. Full-time placements come with a 7-day money-back guarantee and free replacements if the maid isn't the right fit.",
    },
    {
      q: "How much is a maid visa on its own?",
      a: "If you already have a maid, we sponsor her 2-year visa for AED 8,500 plus AED 160/month, or a single one-off payment of AED 10,960. This covers the visa, Emirates ID, medicals, insurance, WPS payroll and end-of-service dues.",
    },
    {
      q: "Are you a licensed agency?",
      a: "Yes. Maid Link is licensed by the UAE Ministry of Human Resources & Emiratisation (MOHRE), so every visa and placement is fully legal and compliant.",
    },
    {
      q: "Is VAT included in these prices?",
      a: "Prices shown are exclusive of 5% VAT, which is added at checkout as required by UAE law.",
    },
  ],
  ctaTitle: "Not sure which option fits?",
  ctaText: "Message us on WhatsApp — a real person replies within minutes during working hours.",
  ctaButton: "Get a quote on WhatsApp",
  breadcrumbHome: "Home",
  breadcrumbPricing: "Pricing",
};

const ar: PricingContent = {
  metaTitle: "أسعار الخادمات والمربيات في الإمارات — دوام كامل، تأشيرة، بالساعة",
  metaDescription:
    "أسعار واضحة للخادمات والمربيات في دبي والإمارات. خادمة بدوام كامل من 2,980 درهم شهرياً، تأشيرة خادمة من 8,500 درهم، بالساعة من 35 درهم. مرخّصون من وزارة الموارد البشرية، بدون تأمين ومع ضمان استرداد.",
  h1: "أسعار بسيطة وشفافة",
  intro:
    "استقدم خادمة بدوام كامل، أو استخرج تأشيرة خادمة، أو احجز مساعدة بالساعة — كل ذلك عبر فريق واحد مرخّص من وزارة الموارد البشرية والتوطين. بدون رسوم خفية، بدون تأمين، ومع ضمان استرداد الأموال للتعيينات بدوام كامل.",
  licensedBadge: "مرخّصون من وزارة الموارد البشرية والتوطين في دولة الإمارات (MOHRE)",
  plans: [
    {
      id: "full-time",
      name: "خادمة بدوام كامل",
      tagline: "إقامة داخل المنزل أو خارجه، على كفالتنا",
      price: "2,980 درهم",
      unit: "/ شهرياً",
      amount: 2980,
      featured: true,
      features: [
        "راتب الخادمة والتأشيرة والفحوصات الطبية مشمولة",
        "الهوية الإماراتية والتأمين والرسوم الحكومية مغطّاة",
        "داخل المنزل أو خارجه — الخيار لك",
        "ضمان استرداد الأموال خلال 7 أيام",
        "استبدال مجاني إذا لم تكن الخادمة مناسبة",
      ],
      ctaMessage: "مرحباً Maid Link! أرغب في استقدام خادمة بدوام كامل (باقة 2,980 درهم شهرياً). هل يمكنكم المساعدة؟",
    },
    {
      id: "maid-visa",
      name: "تأشيرة خادمة",
      tagline: "لديك خادمة؟ نكفل تأشيرتها لمدة سنتين",
      price: "8,500 درهم",
      priceNote: "+ 160 درهم شهرياً  ·  أو 10,960 درهم دفعة واحدة",
      amount: 8500,
      features: [
        "تأشيرة إقامة إماراتية لمدة سنتين",
        "الهوية الإماراتية والفحص الطبي",
        "التأمين ونظام حماية الأجور والرسوم الحكومية",
        "تسوية مستحقات نهاية الخدمة",
        "دعم على مدار الساعة وتجديد التأشيرة",
      ],
      ctaMessage: "مرحباً Maid Link! أحتاج تأشيرة خادمة (كفالة سنتين). هل يمكنكم شرح الخطوات؟",
    },
    {
      id: "part-time",
      name: "بالساعة والمربيات",
      tagline: "تنظيف أو رعاية أطفال، بالساعة",
      price: "35 درهم",
      unit: "/ ساعة",
      amount: 35,
      features: [
        "خادمات ومربيات بالساعة تم التحقق منهن",
        "احجز بالساعة أو اليوم أو الأسبوع",
        "بدون التزام طويل الأمد",
        "مساعِدات موثوقات ومؤمّن عليهن",
        "توفّر في نفس اليوم في معظم المناطق",
      ],
      ctaMessage: "مرحباً Maid Link! أبحث عن مساعدة بالساعة / مربية (35 درهم للساعة). هل يمكنكم المساعدة؟",
    },
  ],
  guarantees: [
    "بدون تأمين",
    "بدون رسوم إلغاء",
    "ضمان استرداد خلال 7 أيام",
    "استبدال مجاني",
  ],
  vatNote: "جميع الأسعار غير شاملة ضريبة القيمة المضافة 5%.",
  faqTitle: "أسئلة حول الأسعار",
  faqs: [
    {
      q: "ماذا يشمل سعر الخادمة بدوام كامل؟",
      a: "يغطّي السعر الشهري راتب الخادمة وتأشيرة الإقامة لسنتين والهوية الإماراتية والفحوصات الطبية والتأمين وجميع الرسوم الحكومية. لا توجد رسوم وكالة أو تأسيس منفصلة.",
    },
    {
      q: "هل أدفع تأميناً؟",
      a: "لا. لا نفرض تأميناً أو رسوم إلغاء. التعيينات بدوام كامل تشمل ضمان استرداد الأموال خلال 7 أيام واستبدالاً مجانياً إذا لم تكن الخادمة مناسبة.",
    },
    {
      q: "كم تكلفة تأشيرة الخادمة بمفردها؟",
      a: "إذا كان لديك خادمة، نكفل تأشيرتها لسنتين مقابل 8,500 درهم بالإضافة إلى 160 درهم شهرياً، أو دفعة واحدة قدرها 10,960 درهم. يشمل ذلك التأشيرة والهوية والفحوصات والتأمين ونظام حماية الأجور ومستحقات نهاية الخدمة.",
    },
    {
      q: "هل أنتم وكالة مرخّصة؟",
      a: "نعم. Maid Link مرخّصة من وزارة الموارد البشرية والتوطين في الإمارات (MOHRE)، لذا كل تأشيرة وتعيين قانوني ومتوافق بالكامل.",
    },
    {
      q: "هل الأسعار شاملة ضريبة القيمة المضافة؟",
      a: "الأسعار المعروضة غير شاملة ضريبة القيمة المضافة 5%، والتي تُضاف عند الدفع وفقاً للقانون الإماراتي.",
    },
  ],
  ctaTitle: "غير متأكد من الخيار المناسب؟",
  ctaText: "راسلنا على واتساب — يرد عليك شخص حقيقي خلال دقائق في ساعات العمل.",
  ctaButton: "احصل على عرض سعر عبر واتساب",
  breadcrumbHome: "الرئيسية",
  breadcrumbPricing: "الأسعار",
};

export function pricingContent(locale: Locale): PricingContent {
  return locale === "ar" ? ar : en;
}
