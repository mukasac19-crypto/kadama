import type { Locale } from "@/lib/i18n";

/**
 * Informational guides hub (/guides + /guides/<slug>) targeting the UAE
 * "maid visa" informational search cluster. Prices quoted are Maid Link's
 * own package prices (ex-VAT); government fees are included in those packages
 * and can change, so we avoid quoting standalone government figures.
 */

export const GUIDE_SLUGS = [
  "maid-visa-cost-uae",
  "how-to-sponsor-a-maid-visa",
  "live-in-vs-live-out-maid",
  "domestic-worker-visa-rules-uae",
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export function isGuideSlug(v: string): v is GuideSlug {
  return (GUIDE_SLUGS as readonly string[]).includes(v);
}

type Section = { heading: string; body: string[] };
type Faq = { q: string; a: string };

export type Guide = {
  slug: GuideSlug;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  sections: Section[];
  faqs: Faq[];
};

export type GuidesBundle = {
  indexTitle: string;
  indexMetaTitle: string;
  indexDescription: string;
  indexIntro: string;
  readMore: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  guides: Record<GuideSlug, Guide>;
};

const EN: GuidesBundle = {
  indexTitle: "Maid hiring & visa guides",
  indexMetaTitle: "Maid & Nanny Guides — Visa, Cost & Hiring in the UAE",
  indexDescription:
    "Practical guides to hiring a maid or nanny in the UAE: maid visa cost, how to sponsor a visa, live-in vs live-out, and domestic worker visa rules.",
  indexIntro:
    "Everything you need to know about hiring a maid or nanny in the UAE — visa costs, the sponsorship process, and how to choose the right arrangement for your family.",
  readMore: "Read guide",
  ctaTitle: "Ready to hire or sponsor a visa?",
  ctaText: "Our MOHRE-licensed team can help. Message us on WhatsApp — a real person replies within minutes.",
  ctaButton: "Chat on WhatsApp",
  guides: {
    "maid-visa-cost-uae": {
      slug: "maid-visa-cost-uae",
      title: "Maid visa cost in the UAE (2026)",
      metaTitle: "Maid Visa Cost in the UAE (2026) — Full Price Breakdown",
      description:
        "How much does a maid visa cost in the UAE in 2026? A clear breakdown of what's included and the two ways to pay, from AED 8,500.",
      intro:
        "One of the first questions every family asks is: how much does a maid visa actually cost? Here's a clear breakdown of Maid Link's 2-year maid visa packages and exactly what they include.",
      sections: [
        {
          heading: "The two ways to pay",
          body: [
            "Maid Link offers a 2-year maid visa in two formats. The first is AED 8,500 upfront plus AED 160 per month over the two years. The second is a single one-off payment of AED 10,960 with nothing monthly — which works out cheaper overall.",
            "Both options cover the same thing; the only difference is how you spread the payment. All prices are exclusive of 5% VAT.",
          ],
        },
        {
          heading: "What's included",
          body: [
            "The package covers the full 2-year residency visa, the Emirates ID, the medical fitness test, health insurance, WPS payroll setup, and all government fees. End-of-service dues and visa renewals are handled too.",
            "Because everything is bundled, there are no surprise agency or setup charges on top — you pay for the package you choose and nothing else.",
          ],
        },
      ],
      faqs: [
        { q: "How much is a maid visa in Dubai?", a: "A 2-year maid visa with Maid Link is AED 8,500 + AED 160/month, or AED 10,960 as a one-off payment. Both include the visa, Emirates ID, medicals, insurance and government fees. Prices are ex-VAT." },
        { q: "Is the maid visa cost the same across the UAE?", a: "Our package pricing is the same whether you're in Dubai, Abu Dhabi, Sharjah or elsewhere in the UAE." },
        { q: "Are there any hidden fees?", a: "No. There are no separate agency or setup charges — just the package price plus 5% VAT." },
      ],
    },
    "how-to-sponsor-a-maid-visa": {
      slug: "how-to-sponsor-a-maid-visa",
      title: "How to sponsor a maid visa in the UAE",
      metaTitle: "How to Sponsor a Maid Visa in Dubai — Step-by-Step Guide",
      description:
        "A simple step-by-step guide to sponsoring a maid or domestic worker visa in the UAE, with a MOHRE-licensed agency handling the paperwork.",
      intro:
        "Sponsoring a maid's visa in the UAE involves several government steps. Using a MOHRE-licensed agency means those steps are handled for you — here's how the process works.",
      sections: [
        {
          heading: "Who can sponsor a maid",
          body: [
            "To sponsor a domestic worker in the UAE you generally need to be a resident with a qualifying salary and suitable accommodation. Requirements can vary by emirate and are set by the authorities.",
            "If you already have a maid you trust — for example on a visit visa, a cancelled visa, or transferring from another sponsor — a licensed agency can sponsor her legally on your behalf.",
          ],
        },
        {
          heading: "The step-by-step process",
          body: [
            "First, you share the maid's passport and current status so eligibility can be confirmed. Next, the medical fitness test and Emirates ID application are arranged. Once approved, the 2-year residency visa is issued and stamped.",
            "Throughout the two years, insurance, WPS payroll and eventual renewal are managed for you, keeping everything compliant under the agency's MOHRE licence.",
          ],
        },
      ],
      faqs: [
        { q: "Can I sponsor a maid who is already in the UAE?", a: "Yes. Whether she's on a visit visa, a cancelled visa or transferring from another sponsor, a licensed agency can usually sponsor her — message us and we'll confirm." },
        { q: "How long does the maid visa process take?", a: "Timelines depend on the medical and government approvals, but a licensed agency streamlines each step. Message us for a current estimate for your situation." },
        { q: "Do I need to visit a government centre myself?", a: "With a MOHRE-licensed agency, the paperwork and appointments are handled for you, so you avoid the queues." },
      ],
    },
    "live-in-vs-live-out-maid": {
      slug: "live-in-vs-live-out-maid",
      title: "Live-in vs live-out maid: which is right for you?",
      metaTitle: "Live-In vs Live-Out Maid in the UAE — How to Choose",
      description:
        "The difference between a live-in and a live-out maid in the UAE, the pros and cons of each, and how to decide which suits your family.",
      intro:
        "When hiring a full-time maid in the UAE, one of the biggest decisions is whether she lives in your home or comes daily. Here's how the two arrangements compare.",
      sections: [
        {
          heading: "What each arrangement means",
          body: [
            "A live-in maid stays in your home and is available throughout the day, which suits families who need flexible, all-day support with children or the household. You provide her accommodation and meals.",
            "A live-out maid lives elsewhere and comes to work agreed hours, then goes home. This gives your family more privacy and suits those without a spare room or who need help only for set hours.",
          ],
        },
        {
          heading: "How to decide",
          body: [
            "Consider your space, your budget, how many hours of help you need, and your family's preference for privacy. Live-in tends to offer the most flexibility; live-out offers more separation between work and family life.",
            "With Maid Link both arrangements are available, and full-time placements start from AED 2,980/month all-inclusive. Tell us your preference and we'll match you accordingly.",
          ],
        },
      ],
      faqs: [
        { q: "Is a live-in maid more expensive than live-out?", a: "Costs depend on the arrangement and hours. Full-time placements start from AED 2,980/month all-inclusive; message us for a quote based on live-in or live-out." },
        { q: "Do I have to provide a room for a live-in maid?", a: "Yes, a live-in maid needs suitable accommodation and meals in your home. If that's not possible, live-out is a better fit." },
        { q: "Can I switch from live-out to live-in later?", a: "Often yes, subject to the arrangement. Talk to us and we'll help you adjust." },
      ],
    },
    "domestic-worker-visa-rules-uae": {
      slug: "domestic-worker-visa-rules-uae",
      title: "Domestic worker visa rules in the UAE",
      metaTitle: "Domestic Worker Visa Rules in the UAE — What to Know",
      description:
        "An overview of the rules around domestic worker (maid) visas in the UAE, including sponsorship, contracts, insurance and renewals.",
      intro:
        "Domestic worker visas in the UAE are regulated to protect both families and workers. Here's a plain-English overview of how they work and your responsibilities as a sponsor.",
      sections: [
        {
          heading: "Sponsorship and contracts",
          body: [
            "Domestic workers in the UAE are sponsored under a regulated system overseen by the authorities. A formal contract sets out the role, and workers are entitled to protections including insurance and end-of-service benefits.",
            "Using a MOHRE-licensed agency ensures the contract, insurance and payroll (WPS) are set up correctly and legally from the start.",
          ],
        },
        {
          heading: "Your responsibilities as a sponsor",
          body: [
            "As a sponsor you're responsible for the worker's residency, fair treatment, timely salary payment through WPS, and suitable living or working conditions.",
            "Rules and fees can change and can differ by emirate, so it's worth confirming the current requirements before you start — a licensed agency will keep you compliant throughout.",
          ],
        },
      ],
      faqs: [
        { q: "Are maids in the UAE entitled to insurance?", a: "Yes. Health insurance and end-of-service benefits are part of a properly set-up domestic worker sponsorship, which is included in our visa packages." },
        { q: "What is WPS for domestic workers?", a: "The Wage Protection System (WPS) is how salaries are paid and recorded. A licensed agency sets this up so payments are compliant." },
        { q: "Do the rules differ between Dubai and Abu Dhabi?", a: "Some requirements and fees can vary by emirate. We'll confirm what applies to your situation before you commit." },
      ],
    },
  },
};

const AR: GuidesBundle = {
  indexTitle: "أدلة استقدام الخادمات والتأشيرات",
  indexMetaTitle: "أدلة الخادمات والمربيات — التأشيرة والتكلفة والاستقدام في الإمارات",
  indexDescription:
    "أدلة عملية لاستقدام خادمة أو مربية في الإمارات: تكلفة تأشيرة الخادمة، كيفية كفالة التأشيرة، الإقامة داخل المنزل مقابل خارجه، وقواعد تأشيرة العمالة المنزلية.",
  indexIntro:
    "كل ما تحتاج معرفته عن استقدام خادمة أو مربية في الإمارات — تكاليف التأشيرة وإجراءات الكفالة وكيفية اختيار الترتيب المناسب لأسرتك.",
  readMore: "اقرأ الدليل",
  ctaTitle: "جاهز للاستقدام أو كفالة تأشيرة؟",
  ctaText: "فريقنا المرخّص من وزارة الموارد البشرية يمكنه المساعدة. راسلنا على واتساب — يرد عليك شخص حقيقي خلال دقائق.",
  ctaButton: "تواصل عبر واتساب",
  guides: {
    "maid-visa-cost-uae": {
      slug: "maid-visa-cost-uae",
      title: "تكلفة تأشيرة الخادمة في الإمارات (2026)",
      metaTitle: "تكلفة تأشيرة الخادمة في الإمارات (2026) — تفصيل كامل للأسعار",
      description:
        "كم تكلفة تأشيرة الخادمة في الإمارات عام 2026؟ تفصيل واضح لما هو مشمول وطريقتَي الدفع، ابتداءً من 8,500 درهم.",
      intro:
        "من أول ما تسأل عنه كل أسرة: كم تكلّف تأشيرة الخادمة فعلاً؟ إليك تفصيلاً واضحاً لباقات تأشيرة الخادمة لسنتين من Maid Link وما تشمله بالضبط.",
      sections: [
        {
          heading: "طريقتا الدفع",
          body: [
            "تقدّم Maid Link تأشيرة خادمة لسنتين بصيغتين. الأولى 8,500 درهم مقدّماً بالإضافة إلى 160 درهماً شهرياً على مدى سنتين. الثانية دفعة واحدة قدرها 10,960 درهماً بدون أي مبلغ شهري — وهي أوفر إجمالاً.",
            "كلا الخيارين يغطّي الشيء نفسه؛ الفرق الوحيد هو طريقة تقسيم الدفع. جميع الأسعار غير شاملة ضريبة القيمة المضافة 5%.",
          ],
        },
        {
          heading: "ماذا يشمل السعر",
          body: [
            "تغطّي الباقة تأشيرة الإقامة الكاملة لسنتين، والهوية الإماراتية، والفحص الطبي، والتأمين الصحي، وإعداد نظام حماية الأجور، وجميع الرسوم الحكومية. كما تُتولّى مستحقات نهاية الخدمة وتجديد التأشيرة.",
            "ولأن كل شيء مجمّع في الباقة، لا توجد رسوم وكالة أو تأسيس مفاجئة فوقها — تدفع مقابل الباقة التي تختارها فقط.",
          ],
        },
      ],
      faqs: [
        { q: "كم تكلفة تأشيرة الخادمة في دبي؟", a: "تأشيرة الخادمة لسنتين مع Maid Link هي 8,500 درهم + 160 درهماً شهرياً، أو 10,960 درهماً دفعة واحدة. كلاهما يشمل التأشيرة والهوية والفحوصات والتأمين والرسوم الحكومية. الأسعار غير شاملة الضريبة." },
        { q: "هل تكلفة تأشيرة الخادمة واحدة في كل الإمارات؟", a: "أسعار باقاتنا واحدة سواء كنت في دبي أو أبوظبي أو الشارقة أو غيرها من الإمارات." },
        { q: "هل هناك رسوم خفية؟", a: "لا. لا توجد رسوم وكالة أو تأسيس منفصلة — فقط سعر الباقة بالإضافة إلى ضريبة 5%." },
      ],
    },
    "how-to-sponsor-a-maid-visa": {
      slug: "how-to-sponsor-a-maid-visa",
      title: "كيفية كفالة تأشيرة خادمة في الإمارات",
      metaTitle: "كيفية كفالة تأشيرة خادمة في دبي — دليل خطوة بخطوة",
      description:
        "دليل بسيط خطوة بخطوة لكفالة تأشيرة خادمة أو عاملة منزلية في الإمارات، مع وكالة مرخّصة تتولّى المعاملات.",
      intro:
        "تتضمّن كفالة تأشيرة الخادمة في الإمارات عدة خطوات حكومية. استخدام وكالة مرخّصة يعني أن تُتولّى هذه الخطوات نيابةً عنك — إليك كيف تسير العملية.",
      sections: [
        {
          heading: "من يمكنه كفالة خادمة",
          body: [
            "لكفالة عاملة منزلية في الإمارات تحتاج عادةً أن تكون مقيماً براتب مؤهّل وسكن مناسب. تختلف المتطلبات حسب الإمارة وتحدّدها الجهات المختصة.",
            "إذا كان لديك خادمة تثق بها — مثلاً على تأشيرة زيارة أو تأشيرة ملغاة أو منتقلة من كفيل آخر — فيمكن لوكالة مرخّصة كفالتها قانونياً نيابةً عنك.",
          ],
        },
        {
          heading: "الخطوات بالتفصيل",
          body: [
            "أولاً، تشارك جواز سفر الخادمة ووضعها الحالي لتأكيد الأهلية. ثم يُرتَّب الفحص الطبي وطلب الهوية الإماراتية. بعد الموافقة، تُصدر تأشيرة الإقامة لسنتين وتُختم.",
            "طوال السنتين، تُدار التأمين ونظام حماية الأجور والتجديد نيابةً عنك، مع بقاء كل شيء متوافقاً تحت ترخيص الوكالة من وزارة الموارد البشرية.",
          ],
        },
      ],
      faqs: [
        { q: "هل يمكنني كفالة خادمة موجودة في الإمارات؟", a: "نعم. سواء كانت على تأشيرة زيارة أو ملغاة أو منتقلة من كفيل آخر، يمكن لوكالة مرخّصة كفالتها عادةً — راسلنا ونؤكد." },
        { q: "كم تستغرق إجراءات تأشيرة الخادمة؟", a: "تعتمد المدة على الفحص الطبي والموافقات الحكومية، لكن الوكالة المرخّصة تبسّط كل خطوة. راسلنا لتقدير حالي لحالتك." },
        { q: "هل أحتاج لزيارة مركز حكومي بنفسي؟", a: "مع وكالة مرخّصة، تُتولّى المعاملات والمواعيد نيابةً عنك، فتتجنّب الطوابير." },
      ],
    },
    "live-in-vs-live-out-maid": {
      slug: "live-in-vs-live-out-maid",
      title: "الإقامة داخل المنزل مقابل خارجه: أيهما يناسبك؟",
      metaTitle: "خادمة مقيمة أم غير مقيمة في الإمارات — كيف تختار",
      description:
        "الفرق بين الخادمة المقيمة وغير المقيمة في الإمارات، مزايا وعيوب كل منهما، وكيف تقرّر ما يناسب أسرتك.",
      intro:
        "عند استقدام خادمة بدوام كامل في الإمارات، من أهم القرارات ما إذا كانت ستقيم في منزلك أم تأتي يومياً. إليك مقارنة بين الترتيبين.",
      sections: [
        {
          heading: "ماذا يعني كل ترتيب",
          body: [
            "الخادمة المقيمة تبقى في منزلك وتكون متاحة طوال اليوم، وهو ما يناسب الأسر التي تحتاج دعماً مرناً طوال اليوم مع الأطفال أو المنزل. أنت توفّر لها السكن والطعام.",
            "الخادمة غير المقيمة تعيش في مكان آخر وتأتي للعمل ساعات متّفق عليها ثم تعود. هذا يمنح أسرتك خصوصية أكبر ويناسب من ليس لديه غرفة إضافية أو يحتاج المساعدة لساعات محددة فقط.",
          ],
        },
        {
          heading: "كيف تقرّر",
          body: [
            "خذ في الاعتبار مساحتك وميزانيتك وعدد ساعات المساعدة التي تحتاجها وتفضيل أسرتك للخصوصية. الإقامة داخل المنزل توفّر عادةً أكبر مرونة؛ وغير المقيمة توفّر فصلاً أكبر بين العمل وحياة الأسرة.",
            "مع Maid Link كلا الترتيبين متاح، وتبدأ التعيينات بدوام كامل من 2,980 درهماً شهرياً شامل كل شيء. أخبرنا بتفضيلك ونطابقك تبعاً لذلك.",
          ],
        },
      ],
      faqs: [
        { q: "هل الخادمة المقيمة أغلى من غير المقيمة؟", a: "تعتمد التكلفة على الترتيب والساعات. تبدأ التعيينات بدوام كامل من 2,980 درهماً شهرياً شامل كل شيء؛ راسلنا لعرض سعر بناءً على الإقامة داخل المنزل أو خارجه." },
        { q: "هل يجب أن أوفّر غرفة للخادمة المقيمة؟", a: "نعم، تحتاج الخادمة المقيمة إلى سكن وطعام مناسبين في منزلك. إذا لم يكن ذلك ممكناً، فالخادمة غير المقيمة أنسب." },
        { q: "هل يمكنني التحوّل من غير مقيمة إلى مقيمة لاحقاً؟", a: "غالباً نعم، حسب الترتيب. تحدّث إلينا ونساعدك على التعديل." },
      ],
    },
    "domestic-worker-visa-rules-uae": {
      slug: "domestic-worker-visa-rules-uae",
      title: "قواعد تأشيرة العمالة المنزلية في الإمارات",
      metaTitle: "قواعد تأشيرة العمالة المنزلية في الإمارات — ما يجب معرفته",
      description:
        "نظرة عامة على قواعد تأشيرات العمالة المنزلية (الخادمات) في الإمارات، بما في ذلك الكفالة والعقود والتأمين والتجديد.",
      intro:
        "تأشيرات العمالة المنزلية في الإمارات منظّمة لحماية الأسر والعاملات معاً. إليك نظرة مبسّطة على كيفية عملها ومسؤولياتك ككفيل.",
      sections: [
        {
          heading: "الكفالة والعقود",
          body: [
            "تُكفل العاملات المنزليات في الإمارات ضمن نظام منظّم تشرف عليه الجهات المختصة. يحدّد عقد رسمي طبيعة العمل، وللعاملات حقوق تشمل التأمين ومستحقات نهاية الخدمة.",
            "استخدام وكالة مرخّصة من وزارة الموارد البشرية يضمن إعداد العقد والتأمين ونظام حماية الأجور بشكل صحيح وقانوني منذ البداية.",
          ],
        },
        {
          heading: "مسؤولياتك ككفيل",
          body: [
            "بصفتك كفيلاً، أنت مسؤول عن إقامة العاملة ومعاملتها بإنصاف ودفع الراتب في وقته عبر نظام حماية الأجور وتوفير ظروف سكن أو عمل مناسبة.",
            "قد تتغيّر القواعد والرسوم وقد تختلف حسب الإمارة، لذا يُستحسن تأكيد المتطلبات الحالية قبل البدء — والوكالة المرخّصة تُبقيك متوافقاً طوال الوقت.",
          ],
        },
      ],
      faqs: [
        { q: "هل للخادمات في الإمارات حق في التأمين؟", a: "نعم. التأمين الصحي ومستحقات نهاية الخدمة جزء من كفالة العمالة المنزلية المُعدّة بشكل صحيح، وهي مشمولة في باقات التأشيرة لدينا." },
        { q: "ما هو نظام حماية الأجور للعمالة المنزلية؟", a: "نظام حماية الأجور (WPS) هو طريقة دفع الرواتب وتسجيلها. تتولّى الوكالة المرخّصة إعداده ليكون الدفع متوافقاً." },
        { q: "هل تختلف القواعد بين دبي وأبوظبي؟", a: "قد تختلف بعض المتطلبات والرسوم حسب الإمارة. سنؤكد ما ينطبق على حالتك قبل الالتزام." },
      ],
    },
  },
};

export function guidesBundle(locale: Locale): GuidesBundle {
  return locale === "ar" ? AR : EN;
}

export function guide(slug: GuideSlug, locale: Locale): Guide {
  return guidesBundle(locale).guides[slug];
}
