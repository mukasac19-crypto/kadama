import type { Locale } from "@/lib/i18n";

/**
 * Marketing content for the top-level service landing pages
 * (/hire-maid, /maid-visa, /part-time-maids, /nannies).
 * Each targets a distinct high-intent keyword cluster from the UAE market.
 * Prices mirror /pricing (ex-VAT) — keep the two in sync.
 */

export const SERVICE_SLUGS = [
  "hire-maid",
  "maid-visa",
  "part-time-maids",
  "nannies",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function isServiceSlug(v: string): v is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(v);
}

type Step = { title: string; text: string };
type Faq = { q: string; a: string };
type RelatedLink = { path: string; label: string };

export type ServiceContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  priceLine: string;
  priceSub: string;
  primaryCta: string;
  ctaMessage: string;
  benefitsTitle: string;
  benefits: string[];
  stepsTitle: string;
  steps: Step[];
  faqTitle: string;
  faqs: Faq[];
  closingTitle: string;
  closingText: string;
  related: RelatedLink[];
  serviceType: string;
};

type Bundle = Record<Locale, ServiceContent>;

const LICENSED_EN =
  "Licensed by the UAE Ministry of Human Resources & Emiratisation (MOHRE)";
const LICENSED_AR =
  "مرخّصون من وزارة الموارد البشرية والتوطين في دولة الإمارات (MOHRE)";

const CONTENT: Record<ServiceSlug, Bundle> = {
  "hire-maid": {
    en: {
      metaTitle: "Hire a Full-Time Maid in Dubai & the UAE | MOHRE-Licensed",
      metaDescription:
        "Hire a trusted full-time live-in or live-out maid in Dubai, Abu Dhabi and across the UAE. Salary, visa and medicals included from AED 2,980/mo. MOHRE-licensed, 7-day money-back guarantee.",
      eyebrow: LICENSED_EN,
      h1: "Hire a full-time maid in the UAE",
      intro:
        "Find a vetted, full-time maid — live-in or live-out — sponsored end-to-end by our MOHRE-licensed team. We handle her salary, visa, medicals and every government fee, so you can hire in days, not months.",
      priceLine: "From AED 2,980 / month",
      priceSub: "All-inclusive — salary, visa, Emirates ID, insurance & government fees. Ex-VAT.",
      primaryCta: "Find a maid on WhatsApp",
      ctaMessage:
        "Hi Maid Link! I'd like to hire a full-time maid. Can you help me find the right one?",
      benefitsTitle: "Why hire through Maid Link",
      benefits: [
        "MOHRE-licensed — every placement is fully legal and compliant",
        "Live-in or live-out, sponsored entirely by us",
        "One transparent monthly price with no hidden agency fees",
        "7-day money-back guarantee and free replacements",
        "Verified maids from Africa, the Philippines, India and more",
      ],
      stepsTitle: "How hiring works",
      steps: [
        { title: "Tell us what you need", text: "Message us on WhatsApp with your family's needs — nationality, skills, live-in or live-out." },
        { title: "Meet your shortlist", text: "We send vetted profiles that match, and you interview the ones you like." },
        { title: "We handle the paperwork", text: "Once you choose, we sponsor her visa, Emirates ID and medicals." },
        { title: "She starts", text: "Your maid joins your home — with our support and free replacements if needed." },
      ],
      faqTitle: "Full-time maid FAQs",
      faqs: [
        { q: "How much does a full-time maid cost in Dubai?", a: "Full-time maids start from AED 2,980/month, which includes her salary, 2-year visa, Emirates ID, medicals, insurance and all government fees. Prices are ex-VAT." },
        { q: "Can I choose a live-in or live-out maid?", a: "Yes — both are available. Tell us your preference and we'll match you with maids who suit that arrangement." },
        { q: "What if the maid isn't the right fit?", a: "Full-time placements include a 7-day money-back guarantee and free replacements, so you're never stuck." },
        { q: "Which nationalities can I hire?", a: "We work with verified maids from the Philippines, Ethiopia, Kenya, Uganda, India, Sri Lanka and more. Browse profiles to see who's available." },
      ],
      closingTitle: "Ready to hire?",
      closingText: "Browse available maids or message us on WhatsApp — a real person replies within minutes during working hours.",
      related: [
        { path: "/maids", label: "Browse available maids" },
        { path: "/maid-visa", label: "Just need a maid visa?" },
        { path: "/pricing", label: "See full pricing" },
      ],
      serviceType: "Full-time domestic worker recruitment",
    },
    ar: {
      metaTitle: "استقدام خادمة بدوام كامل في دبي والإمارات | مرخّص من الموارد البشرية",
      metaDescription:
        "استقدم خادمة موثوقة بدوام كامل، إقامة داخل المنزل أو خارجه، في دبي وأبوظبي وجميع أنحاء الإمارات. الراتب والتأشيرة والفحوصات مشمولة من 2,980 درهم شهرياً. مرخّصون، مع ضمان استرداد خلال 7 أيام.",
      eyebrow: LICENSED_AR,
      h1: "استقدم خادمة بدوام كامل في الإمارات",
      intro:
        "احصل على خادمة موثوقة بدوام كامل — داخل المنزل أو خارجه — على كفالة فريقنا المرخّص من وزارة الموارد البشرية. نتولّى راتبها وتأشيرتها وفحوصاتها الطبية وكل رسم حكومي، لتوظّف خلال أيام لا أشهر.",
      priceLine: "من 2,980 درهم / شهرياً",
      priceSub: "شامل كل شيء — الراتب والتأشيرة والهوية الإماراتية والتأمين والرسوم الحكومية. غير شامل الضريبة.",
      primaryCta: "ابحث عن خادمة عبر واتساب",
      ctaMessage: "مرحباً Maid Link! أرغب في استقدام خادمة بدوام كامل. هل يمكنكم مساعدتي في إيجاد المناسبة؟",
      benefitsTitle: "لماذا الاستقدام عبر Maid Link",
      benefits: [
        "مرخّصون من وزارة الموارد البشرية — كل تعيين قانوني ومتوافق بالكامل",
        "إقامة داخل المنزل أو خارجه، على كفالتنا بالكامل",
        "سعر شهري واحد وشفاف بدون رسوم وكالة خفية",
        "ضمان استرداد خلال 7 أيام واستبدال مجاني",
        "خادمات موثوقات من إفريقيا والفلبين والهند وغيرها",
      ],
      stepsTitle: "كيف يتم الاستقدام",
      steps: [
        { title: "أخبرنا باحتياجك", text: "راسلنا على واتساب باحتياجات أسرتك — الجنسية والمهارات والإقامة داخل المنزل أو خارجه." },
        { title: "قابل قائمتك المختصرة", text: "نرسل لك ملفات موثوقة مطابقة، وتقابل من تختار." },
        { title: "نتولّى المعاملات", text: "بمجرد اختيارك، نكفل تأشيرتها وهويتها الإماراتية وفحوصاتها." },
        { title: "تبدأ العمل", text: "تنضم الخادمة إلى منزلك — بدعمنا واستبدال مجاني عند الحاجة." },
      ],
      faqTitle: "أسئلة شائعة عن الخادمة بدوام كامل",
      faqs: [
        { q: "كم تكلفة خادمة بدوام كامل في دبي؟", a: "تبدأ الخادمات بدوام كامل من 2,980 درهم شهرياً، شاملة الراتب وتأشيرة سنتين والهوية الإماراتية والفحوصات والتأمين وكل الرسوم الحكومية. الأسعار غير شاملة الضريبة." },
        { q: "هل يمكنني اختيار خادمة داخل المنزل أو خارجه؟", a: "نعم — كلاهما متاح. أخبرنا بتفضيلك ونطابقك مع خادمات تناسب هذا الترتيب." },
        { q: "ماذا لو لم تكن الخادمة مناسبة؟", a: "التعيينات بدوام كامل تشمل ضمان استرداد خلال 7 أيام واستبدالاً مجانياً، فلن تكون عالقاً أبداً." },
        { q: "ما الجنسيات المتاحة للاستقدام؟", a: "نعمل مع خادمات موثوقات من الفلبين وإثيوبيا وكينيا وأوغندا والهند وسريلانكا وغيرها. تصفّح الملفات لمعرفة المتاح." },
      ],
      closingTitle: "جاهز للاستقدام؟",
      closingText: "تصفّح الخادمات المتاحات أو راسلنا على واتساب — يرد عليك شخص حقيقي خلال دقائق في ساعات العمل.",
      related: [
        { path: "/maids", label: "تصفّح الخادمات المتاحات" },
        { path: "/maid-visa", label: "تحتاج تأشيرة خادمة فقط؟" },
        { path: "/pricing", label: "اطّلع على الأسعار كاملة" },
      ],
      serviceType: "استقدام العمالة المنزلية بدوام كامل",
    },
  },

  "maid-visa": {
    en: {
      metaTitle: "Maid Visa in the UAE — 2-Year Sponsorship from AED 8,500",
      metaDescription:
        "Sponsor your maid's 2-year UAE residency visa the easy way. Emirates ID, medicals, insurance, WPS payroll and government fees included from AED 8,500. MOHRE-licensed and fully compliant.",
      eyebrow: LICENSED_EN,
      h1: "Maid visa in the UAE, made simple",
      intro:
        "Already have a maid you trust? We sponsor her 2-year residency visa end-to-end — Emirates ID, medicals, insurance, payroll and every government fee — so everything stays fully legal under our MOHRE licence.",
      priceLine: "AED 8,500 + AED 160/mo — or AED 10,960 one-off",
      priceSub: "2-year visa, Emirates ID, medicals, insurance, WPS payroll & end-of-service. Ex-VAT.",
      primaryCta: "Start the visa on WhatsApp",
      ctaMessage: "Hi Maid Link! I need a 2-year maid visa (sponsorship). Can you walk me through it?",
      benefitsTitle: "What's included",
      benefits: [
        "2-year UAE residency visa, fully sponsored",
        "Emirates ID and medical exam arranged for you",
        "Insurance and WPS payroll set up and managed",
        "End-of-service dues handled correctly",
        "24/7 support and hassle-free visa renewals",
      ],
      stepsTitle: "How the visa works",
      steps: [
        { title: "Send us her details", text: "Message us on WhatsApp with your maid's passport and status — we'll confirm eligibility." },
        { title: "Medicals & Emirates ID", text: "We schedule her medical test and Emirates ID application." },
        { title: "Visa issued", text: "Once approved, her 2-year residency visa is stamped and active." },
        { title: "We keep it compliant", text: "Insurance, payroll and renewals are handled for you throughout." },
      ],
      faqTitle: "Maid visa FAQs",
      faqs: [
        { q: "How much does a maid visa cost in the UAE?", a: "A 2-year maid visa is AED 8,500 plus AED 160/month, or a single one-off payment of AED 10,960. This covers the visa, Emirates ID, medicals, insurance, WPS payroll and end-of-service dues. Prices are ex-VAT." },
        { q: "Can you sponsor a maid who is already in the UAE?", a: "Yes. Whether she's on a visit visa, a cancelled visa or transferring from another sponsor, message us and we'll confirm what's possible." },
        { q: "Is this legal / MOHRE-compliant?", a: "Yes. Maid Link is licensed by the UAE Ministry of Human Resources & Emiratisation (MOHRE), so the sponsorship is fully legal." },
        { q: "Are there any hidden fees?", a: "No — you pay only for the visa package you choose, plus 5% VAT. There are no separate agency or setup charges." },
      ],
      closingTitle: "Ready to sponsor a visa?",
      closingText: "Message us on WhatsApp with your maid's details and we'll get started — a real person replies within minutes.",
      related: [
        { path: "/hire-maid", label: "Need a maid too?" },
        { path: "/pricing", label: "See full pricing" },
        { path: "/maids", label: "Browse available maids" },
      ],
      serviceType: "Domestic worker visa sponsorship",
    },
    ar: {
      metaTitle: "تأشيرة خادمة في الإمارات — كفالة سنتين من 8,500 درهم",
      metaDescription:
        "اكفل تأشيرة إقامة خادمتك لسنتين بسهولة. الهوية الإماراتية والفحوصات والتأمين ونظام حماية الأجور والرسوم الحكومية مشمولة من 8,500 درهم. مرخّصون ومتوافقون بالكامل.",
      eyebrow: LICENSED_AR,
      h1: "تأشيرة خادمة في الإمارات بكل سهولة",
      intro:
        "لديك خادمة تثق بها؟ نكفل تأشيرة إقامتها لسنتين من الألف إلى الياء — الهوية الإماراتية والفحوصات والتأمين والرواتب وكل رسم حكومي — ليبقى كل شيء قانونياً بالكامل تحت ترخيصنا من وزارة الموارد البشرية.",
      priceLine: "8,500 درهم + 160 درهم شهرياً — أو 10,960 درهم دفعة واحدة",
      priceSub: "تأشيرة سنتين، الهوية الإماراتية، الفحوصات، التأمين، حماية الأجور ومستحقات نهاية الخدمة. غير شامل الضريبة.",
      primaryCta: "ابدأ التأشيرة عبر واتساب",
      ctaMessage: "مرحباً Maid Link! أحتاج تأشيرة خادمة لسنتين (كفالة). هل يمكنكم شرح الخطوات؟",
      benefitsTitle: "ماذا يشمل",
      benefits: [
        "تأشيرة إقامة إماراتية لسنتين، بكفالة كاملة",
        "الهوية الإماراتية والفحص الطبي يُرتّبان لك",
        "التأمين ونظام حماية الأجور يُعدّان ويُداران",
        "تسوية مستحقات نهاية الخدمة بشكل صحيح",
        "دعم على مدار الساعة وتجديد تأشيرة بلا عناء",
      ],
      stepsTitle: "كيف تعمل التأشيرة",
      steps: [
        { title: "أرسل لنا بياناتها", text: "راسلنا على واتساب بجواز سفر خادمتك ووضعها — نؤكد الأهلية." },
        { title: "الفحوصات والهوية", text: "نحدّد موعد فحصها الطبي وطلب الهوية الإماراتية." },
        { title: "إصدار التأشيرة", text: "بعد الموافقة، تُختم تأشيرة إقامتها لسنتين وتصبح فعّالة." },
        { title: "نحافظ على الامتثال", text: "التأمين والرواتب والتجديدات تُدار لك طوال الفترة." },
      ],
      faqTitle: "أسئلة شائعة عن تأشيرة الخادمة",
      faqs: [
        { q: "كم تكلفة تأشيرة الخادمة في الإمارات؟", a: "تأشيرة الخادمة لسنتين تكلّف 8,500 درهم بالإضافة إلى 160 درهم شهرياً، أو دفعة واحدة 10,960 درهم. يشمل ذلك التأشيرة والهوية والفحوصات والتأمين وحماية الأجور ومستحقات نهاية الخدمة. الأسعار غير شاملة الضريبة." },
        { q: "هل يمكنكم كفالة خادمة موجودة في الإمارات؟", a: "نعم. سواء كانت على تأشيرة زيارة أو تأشيرة ملغاة أو منتقلة من كفيل آخر، راسلنا ونؤكد ما هو ممكن." },
        { q: "هل هذا قانوني ومتوافق مع الموارد البشرية؟", a: "نعم. Maid Link مرخّصة من وزارة الموارد البشرية والتوطين، لذا فالكفالة قانونية بالكامل." },
        { q: "هل هناك رسوم خفية؟", a: "لا — تدفع فقط مقابل باقة التأشيرة التي تختارها، بالإضافة إلى ضريبة 5%. لا توجد رسوم وكالة أو تأسيس منفصلة." },
      ],
      closingTitle: "جاهز لكفالة تأشيرة؟",
      closingText: "راسلنا على واتساب ببيانات خادمتك ونبدأ — يرد عليك شخص حقيقي خلال دقائق.",
      related: [
        { path: "/hire-maid", label: "تحتاج خادمة أيضاً؟" },
        { path: "/pricing", label: "اطّلع على الأسعار كاملة" },
        { path: "/maids", label: "تصفّح الخادمات المتاحات" },
      ],
      serviceType: "كفالة تأشيرة العمالة المنزلية",
    },
  },

  "part-time-maids": {
    en: {
      metaTitle: "Part-Time Maids & Cleaners in Dubai from AED 35/hr",
      metaDescription:
        "Book vetted part-time maids and cleaners in Dubai and the UAE by the hour, day or week from AED 35/hr. No contract, insured helpers, same-day availability. MOHRE-licensed.",
      eyebrow: LICENSED_EN,
      h1: "Part-time maids & cleaners in the UAE",
      intro:
        "Need a hand a few hours a week? Book vetted part-time maids and cleaners by the hour, day or week — no long-term contract, no visa to sponsor. Reliable, insured, and available in most areas same day.",
      priceLine: "From AED 35 / hour",
      priceSub: "Book by the hour, day or week. No contract. Ex-VAT.",
      primaryCta: "Book part-time help on WhatsApp",
      ctaMessage: "Hi Maid Link! I'm looking for a part-time maid / cleaner. Can you help?",
      benefitsTitle: "Why book part-time with us",
      benefits: [
        "Vetted, insured part-time maids and cleaners",
        "Book by the hour, day or week — no commitment",
        "Same-day availability in most areas",
        "Flexible: cleaning, laundry, ironing and more",
        "MOHRE-licensed and reliable",
      ],
      stepsTitle: "How booking works",
      steps: [
        { title: "Tell us your schedule", text: "Message us on WhatsApp with the days, hours and area you need." },
        { title: "We match a helper", text: "We assign a vetted part-time maid who fits your schedule." },
        { title: "She arrives", text: "Your helper turns up on time and gets to work." },
        { title: "Rebook anytime", text: "Happy with her? Book the same helper again with one message." },
      ],
      faqTitle: "Part-time maid FAQs",
      faqs: [
        { q: "How much is a part-time maid in Dubai?", a: "Part-time maids and cleaners start from AED 35/hour. You can book by the hour, day or week with no long-term contract. Prices are ex-VAT." },
        { q: "Do I need to sponsor a visa?", a: "No. Part-time helpers are fully covered on our side — you just book the hours you need." },
        { q: "Can I get same-day service?", a: "In most areas, yes. Message us and we'll confirm the earliest available slot." },
        { q: "What can a part-time maid do?", a: "Cleaning, laundry, ironing, tidying and general housekeeping. Let us know your priorities when you book." },
      ],
      closingTitle: "Need help this week?",
      closingText: "Message us on WhatsApp with your days and area — a real person replies within minutes.",
      related: [
        { path: "/nannies", label: "Looking for a nanny?" },
        { path: "/hire-maid", label: "Prefer a full-time maid?" },
        { path: "/pricing", label: "See full pricing" },
      ],
      serviceType: "Part-time cleaning and housekeeping",
    },
    ar: {
      metaTitle: "خادمات وعاملات نظافة بالساعة في دبي من 35 درهم للساعة",
      metaDescription:
        "احجز خادمات وعاملات نظافة موثوقات بالساعة في دبي والإمارات، بالساعة أو اليوم أو الأسبوع من 35 درهم للساعة. بدون عقد، مؤمّن عليهن، توفّر في نفس اليوم. مرخّصون.",
      eyebrow: LICENSED_AR,
      h1: "خادمات وعاملات نظافة بالساعة في الإمارات",
      intro:
        "تحتاج مساعدة بضع ساعات أسبوعياً؟ احجز خادمات وعاملات نظافة موثوقات بالساعة أو اليوم أو الأسبوع — بدون عقد طويل ولا تأشيرة تكفلها. موثوقات ومؤمّن عليهن، ومتوفّرات في معظم المناطق في نفس اليوم.",
      priceLine: "من 35 درهم / ساعة",
      priceSub: "احجز بالساعة أو اليوم أو الأسبوع. بدون عقد. غير شامل الضريبة.",
      primaryCta: "احجز مساعدة بالساعة عبر واتساب",
      ctaMessage: "مرحباً Maid Link! أبحث عن خادمة / عاملة نظافة بالساعة. هل يمكنكم المساعدة؟",
      benefitsTitle: "لماذا الحجز بالساعة معنا",
      benefits: [
        "خادمات وعاملات نظافة موثوقات ومؤمّن عليهن",
        "احجز بالساعة أو اليوم أو الأسبوع — بدون التزام",
        "توفّر في نفس اليوم في معظم المناطق",
        "مرونة: تنظيف وغسيل وكيّ وأكثر",
        "مرخّصون وموثوقون",
      ],
      stepsTitle: "كيف يتم الحجز",
      steps: [
        { title: "أخبرنا بجدولك", text: "راسلنا على واتساب بالأيام والساعات والمنطقة التي تحتاجها." },
        { title: "نطابق مساعِدة", text: "نخصّص خادمة بالساعة موثوقة تناسب جدولك." },
        { title: "تصل إليك", text: "تحضر مساعِدتك في الوقت المحدد وتبدأ العمل." },
        { title: "أعد الحجز في أي وقت", text: "أعجبك عملها؟ احجز نفس المساعِدة برسالة واحدة." },
      ],
      faqTitle: "أسئلة شائعة عن الخادمة بالساعة",
      faqs: [
        { q: "كم تكلفة خادمة بالساعة في دبي؟", a: "تبدأ الخادمات وعاملات النظافة بالساعة من 35 درهم للساعة. يمكنك الحجز بالساعة أو اليوم أو الأسبوع بدون عقد طويل. الأسعار غير شاملة الضريبة." },
        { q: "هل أحتاج إلى كفالة تأشيرة؟", a: "لا. المساعِدات بالساعة مغطّيات بالكامل من جهتنا — أنت فقط تحجز الساعات التي تحتاجها." },
        { q: "هل يمكنني الحصول على خدمة في نفس اليوم؟", a: "في معظم المناطق، نعم. راسلنا ونؤكد أقرب موعد متاح." },
        { q: "ما الذي تستطيع الخادمة بالساعة فعله؟", a: "التنظيف والغسيل والكيّ والترتيب والأعمال المنزلية العامة. أخبرنا بأولوياتك عند الحجز." },
      ],
      closingTitle: "تحتاج مساعدة هذا الأسبوع؟",
      closingText: "راسلنا على واتساب بأيامك ومنطقتك — يرد عليك شخص حقيقي خلال دقائق.",
      related: [
        { path: "/nannies", label: "تبحث عن مربية؟" },
        { path: "/hire-maid", label: "تفضّل خادمة بدوام كامل؟" },
        { path: "/pricing", label: "اطّلع على الأسعار كاملة" },
      ],
      serviceType: "التنظيف والأعمال المنزلية بالساعة",
    },
  },

  nannies: {
    en: {
      metaTitle: "Hire a Nanny in Dubai & the UAE | Live-In & Part-Time",
      metaDescription:
        "Hire an experienced, vetted nanny in Dubai, Abu Dhabi and the UAE — live-in, live-out or part-time. Baby care, newborn and childcare specialists. MOHRE-licensed, visa included.",
      eyebrow: LICENSED_EN,
      h1: "Hire a trusted nanny in the UAE",
      intro:
        "Find an experienced nanny your children will love — live-in, live-out or part-time. Every nanny is vetted for childcare, and full-time placements come fully sponsored under our MOHRE licence.",
      priceLine: "Full-time from AED 2,980/mo · Part-time from AED 35/hr",
      priceSub: "Full-time includes salary, visa & government fees. Ex-VAT.",
      primaryCta: "Find a nanny on WhatsApp",
      ctaMessage: "Hi Maid Link! I'm looking to hire a nanny. Can you help me find the right one?",
      benefitsTitle: "Why hire a nanny through us",
      benefits: [
        "Vetted for baby, newborn and childcare experience",
        "Live-in, live-out or part-time — your choice",
        "Full-time nannies fully sponsored (visa included)",
        "7-day money-back guarantee on full-time placements",
        "MOHRE-licensed and fully compliant",
      ],
      stepsTitle: "How it works",
      steps: [
        { title: "Tell us about your family", text: "Message us with your children's ages and the care you need." },
        { title: "Meet matched nannies", text: "We send vetted nanny profiles and you interview your favourites." },
        { title: "We handle the visa", text: "For full-time nannies, we sponsor the visa, Emirates ID and medicals." },
        { title: "She joins your home", text: "Your nanny starts, with our support and free replacements if needed." },
      ],
      faqTitle: "Nanny hiring FAQs",
      faqs: [
        { q: "How much does a nanny cost in Dubai?", a: "Full-time nannies start from AED 2,980/month all-inclusive (salary, visa, government fees). Part-time nannies start from AED 35/hour. Prices are ex-VAT." },
        { q: "Can I hire a live-in nanny?", a: "Yes — live-in, live-out and part-time nannies are all available. Tell us your preference." },
        { q: "Are the nannies experienced with newborns?", a: "Many are. We match based on your children's ages and needs, including newborn and special-needs care." },
        { q: "What if the nanny isn't the right fit?", a: "Full-time placements come with a 7-day money-back guarantee and free replacements." },
      ],
      closingTitle: "Find your nanny",
      closingText: "Browse available nannies or message us on WhatsApp — a real person replies within minutes.",
      related: [
        { path: "/maids", label: "Browse available helpers" },
        { path: "/hire-maid", label: "Prefer a full-time maid?" },
        { path: "/pricing", label: "See full pricing" },
      ],
      serviceType: "Nanny and childcare recruitment",
    },
    ar: {
      metaTitle: "استقدام مربية في دبي والإمارات | إقامة كاملة وبالساعة",
      metaDescription:
        "استقدم مربية موثوقة وذات خبرة في دبي وأبوظبي والإمارات — إقامة داخل المنزل أو خارجه أو بالساعة. متخصصات في رعاية الأطفال والرضّع وحديثي الولادة. مرخّصون، التأشيرة مشمولة.",
      eyebrow: LICENSED_AR,
      h1: "استقدم مربية موثوقة في الإمارات",
      intro:
        "احصل على مربية ذات خبرة يحبها أطفالك — إقامة داخل المنزل أو خارجه أو بالساعة. كل مربية تم التحقق منها لرعاية الأطفال، والتعيينات بدوام كامل مكفولة بالكامل تحت ترخيصنا من وزارة الموارد البشرية.",
      priceLine: "بدوام كامل من 2,980 درهم شهرياً · بالساعة من 35 درهم للساعة",
      priceSub: "الدوام الكامل يشمل الراتب والتأشيرة والرسوم الحكومية. غير شامل الضريبة.",
      primaryCta: "ابحث عن مربية عبر واتساب",
      ctaMessage: "مرحباً Maid Link! أبحث عن استقدام مربية. هل يمكنكم مساعدتي في إيجاد المناسبة؟",
      benefitsTitle: "لماذا استقدام مربية معنا",
      benefits: [
        "تم التحقق من خبرتهن في رعاية الأطفال والرضّع وحديثي الولادة",
        "إقامة داخل المنزل أو خارجه أو بالساعة — الخيار لك",
        "المربيات بدوام كامل مكفولات بالكامل (التأشيرة مشمولة)",
        "ضمان استرداد خلال 7 أيام للتعيينات بدوام كامل",
        "مرخّصون ومتوافقون بالكامل",
      ],
      stepsTitle: "كيف تعمل الخدمة",
      steps: [
        { title: "أخبرنا عن أسرتك", text: "راسلنا بأعمار أطفالك ونوع الرعاية التي تحتاجها." },
        { title: "قابل مربيات مطابقات", text: "نرسل ملفات مربيات موثوقات وتقابل من تفضّل." },
        { title: "نتولّى التأشيرة", text: "للمربيات بدوام كامل، نكفل التأشيرة والهوية الإماراتية والفحوصات." },
        { title: "تنضم إلى منزلك", text: "تبدأ مربيتك العمل، بدعمنا واستبدال مجاني عند الحاجة." },
      ],
      faqTitle: "أسئلة شائعة عن استقدام المربيات",
      faqs: [
        { q: "كم تكلفة مربية في دبي؟", a: "تبدأ المربيات بدوام كامل من 2,980 درهم شهرياً شامل كل شيء (الراتب والتأشيرة والرسوم الحكومية). المربيات بالساعة من 35 درهم للساعة. الأسعار غير شاملة الضريبة." },
        { q: "هل يمكنني استقدام مربية مقيمة في المنزل؟", a: "نعم — المربيات المقيمات وغير المقيمات وبالساعة جميعهن متاحات. أخبرنا بتفضيلك." },
        { q: "هل المربيات ذوات خبرة مع حديثي الولادة؟", a: "كثيرات منهن كذلك. نطابق حسب أعمار أطفالك واحتياجاتهم، بما في ذلك رعاية حديثي الولادة وذوي الاحتياجات الخاصة." },
        { q: "ماذا لو لم تكن المربية مناسبة؟", a: "التعيينات بدوام كامل تشمل ضمان استرداد خلال 7 أيام واستبدالاً مجانياً." },
      ],
      closingTitle: "اعثر على مربيتك",
      closingText: "تصفّح المربيات المتاحات أو راسلنا على واتساب — يرد عليك شخص حقيقي خلال دقائق.",
      related: [
        { path: "/maids", label: "تصفّح المساعِدات المتاحات" },
        { path: "/hire-maid", label: "تفضّل خادمة بدوام كامل؟" },
        { path: "/pricing", label: "اطّلع على الأسعار كاملة" },
      ],
      serviceType: "استقدام المربيات ورعاية الأطفال",
    },
  },
};

export function serviceContent(slug: ServiceSlug, locale: Locale): ServiceContent {
  return CONTENT[slug][locale];
}
