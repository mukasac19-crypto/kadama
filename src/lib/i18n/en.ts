export const en = {
  meta: {
    title: "Maid Link — Hire Maids & Nannies in Dubai & the UAE",
    description:
      "Maid Link is a MOHRE-licensed team helping UAE families hire full-time maids and nannies, sponsor maid visas, and book part-time help — transparent prices, money-back guarantee, real support on WhatsApp.",
  },
  nav: {
    findMaid: "Find a maid",
    forAgencies: "For agencies",
    admin: "Admin",
    signIn: "Sign in",
    signUpFree: "Sign up free",
    signOut: "Sign out",
  },
  footer: {
    explore: "Explore",
    services: "Services",
    company: "Company",
    browseMaids: "Browse maids",
    createAccount: "Create a free account",
    listYourMaids: "List your maids (agencies)",
    talkToUs: "Talk to us",
    fastest: "Fastest way to reach us is WhatsApp — we reply within minutes.",
    whatsappUs: "WhatsApp us",
    rights: "All rights reserved.",
  },
  pagesNav: {
    about: "About us",
    how: "How it works",
    pricing: "Pricing",
    guides: "Guides",
    contact: "Contact us",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
  },
  servicesNav: {
    hireMaid: "Hire a full-time maid",
    maidVisa: "Maid visa",
    partTime: "Part-time maids",
    nannies: "Hire a nanny",
  },
  home: {
    heroTitle: "Hire a maid, nanny or maid visa in the UAE — ",
    heroHighlight: "without the hassle",
    heroText:
      "Maid Link is a MOHRE-licensed team. Hire a full-time maid or nanny, sponsor a maid visa, or book part-time help — all over WhatsApp, with transparent prices and a money-back guarantee.",
    anyNationality: "Any nationality",
    anyEmirate: "Any emirate",
    searchBtn: "Search maids",
    preferAsk: "Prefer to just ask?",
    tellUs: "Tell us what you need",
    servicesTitle: "What we can do for you",
    servicesSub: "One MOHRE-licensed team for every home-help need.",
    recentTitle: "Recently added helpers",
    recentSub: "Fresh profiles, availability re-confirmed regularly.",
    viewAll: "View all →",
    emptyText: "New profiles are being added — tell us what you need and we'll match you.",
    chatWithUs: "Chat with us on WhatsApp",
  },
  browse: {
    title: "Find your helper",
    subtitle: (count: number) =>
      `${count} verified ${count === 1 ? "profile" : "profiles"} — availability re-confirmed regularly.`,
    nationality: "Nationality",
    emirate: "Emirate",
    visaStatus: "Visa status",
    liveInOut: "Live-in / out",
    skill: "Skill",
    maxSalary: "Max salary (AED)",
    filterBtn: "Filter",
    clear: "Clear",
    noMatchTitle: "No matches for these filters — yet",
    noMatchText:
      "Tell us exactly what you're looking for on WhatsApp and we'll check our latest availability — most requests are matched within 24 hours.",
    askWhatsapp: "Ask us on WhatsApp",
  },
  profile: {
    back: "← Back to all maids",
    reserved: "Reserved",
    confirmed: (days: number) =>
      days === 0
        ? "Availability confirmed today"
        : days === 1
          ? "Availability confirmed yesterday"
          : `Availability confirmed ${days} days ago`,
    interestedIn: (name: string) => `Interested in ${name}? Talk to us now.`,
    interestedSub:
      "We'll confirm her availability, answer your questions, and arrange an interview — usually within the hour.",
    whatsappAbout: (name: string) => `WhatsApp us about ${name}`,
    years: (n: number) => `${n} years`,
    facts: {
      nationality: "Nationality",
      age: "Age",
      location: "Location",
      visaStatus: "Visa status",
      liveInOut: "Live-in / out",
      experience: "Experience",
      expectedSalary: "Expected salary",
      availableFrom: "Available from",
      religion: "Religion",
      maritalStatus: "Marital status",
      children: "Children",
      languages: "Languages",
    },
    perMonth: "/month",
    videosTitle: "Intro video",
    notFoundTitle: "Profile not found",
    notFoundText: "This profile may have been hired or removed.",
  },
  card: {
    viewProfile: "View profile",
    whatsapp: "WhatsApp",
    reserved: "Reserved",
    expYears: (n: number) => `${n} yrs exp`,
    perMonth: "/month",
  },
  auth: {
    tabSignIn: "Sign in",
    tabSignUp: "Create account",
    welcomeBack: "Welcome back",
    signInSub: "Sign in to see photos and full profiles.",
    email: "Email address",
    password: "Password",
    signInBtn: "Sign in",
    signingIn: "Signing in…",
    newTo: "New to Maid Link?",
    createFreeLink: "Create a free account",
    createTitle: "Create your free account",
    createSub: "Unlock photos and full profiles of every helper — free, forever.",
    fullName: "Full name",
    phonePlaceholder: "Phone / WhatsApp (e.g. 0501234567)",
    password8: "Password (8+ characters)",
    creating: "Creating account…",
    createBtn: "Create free account",
    haveAccount: "Already have an account?",
    signInLink: "Sign in",
    checkEmailTitle: "Check your email 📬",
    checkEmailText: (email: string) =>
      `We sent a confirmation link to ${email}. Click it and you'll be signed in automatically.`,
    orContinueWith: "or",
    googleBtn: "Continue with Google",
    errors: {
      invalidCredentials: "Wrong email or password. Please try again.",
      emailNotConfirmed:
        "Please confirm your email first — check your inbox for our confirmation link.",
      emailTaken: "An account with this email already exists. Try signing in instead.",
      rateLimit: "Too many attempts. Please wait a minute and try again.",
      callbackFailed: "Sign-in link failed or expired. Please try again.",
      generic: "Something went wrong. Please try again.",
    },
  },
  agenciesPage: {
    title: "Your candidates, in front of ",
    titleHighlight: "thousands of UAE families",
    intro:
      "Maid Link markets helpers from licensed recruitment agencies across the UAE. There's nothing to install and no portal to manage — everything happens over WhatsApp.",
    cta: "List your maids on WhatsApp",
    benefits: [
      {
        title: "Zero setup, zero systems",
        text: "No portal to learn, no logins to manage. Send candidate details on WhatsApp and we handle the rest.",
      },
      {
        title: "Reach thousands of families",
        text: "Your candidates are marketed across the UAE with professional profiles and photo protection.",
      },
      {
        title: "Qualified leads only",
        text: "We speak to every family first, confirm their requirements, and connect serious clients to you.",
      },
      {
        title: "You stay in control",
        text: "Tell us when a candidate is reserved or hired and we update the listing immediately.",
      },
    ],
    checklistTitle: "What to send us for each candidate",
    checklist: [
      "Full name and a clear photo",
      "Nationality, age, and current location",
      "Visa status (transferable / visit / cancelled / outside UAE)",
      "Skills, languages, and years of experience",
      "Expected salary and live-in / live-out preference",
      "A short note on her work history",
    ],
    checklistNote:
      "We review every submission, build the profile, and confirm with you before it goes live.",
    startCta: "Start on WhatsApp",
  },
  aboutPage: {
    title: "About Maid Link",
    intro:
      "Maid Link is a MOHRE-licensed home-help provider on a mission to make hiring a maid or nanny in the UAE simple, transparent and fair — for families and for the women who work with them.",
    points: [
      {
        title: "Licensed and legal",
        text: "Maid Link is licensed by the UAE Ministry of Human Resources & Emiratisation (MOHRE), so every hire and every visa is fully legal and compliant.",
      },
      {
        title: "One team, everything covered",
        text: "Hire a full-time maid or nanny, sponsor a maid visa, or book part-time help — salary, visa, medicals and government fees are all handled by us.",
      },
      {
        title: "Transparent pricing",
        text: "Clear prices with no hidden agency fees, a 7-day money-back guarantee, and free replacements if the fit isn't right.",
      },
      {
        title: "WhatsApp-first, respect for helpers",
        text: "A real person answers on WhatsApp and guides you through hiring — and we protect the privacy and rights of every helper we place.",
      },
    ],
    compliance:
      "Maid Link is licensed by the UAE Ministry of Human Resources & Emiratisation (MoHRE), and all hires and visas follow MoHRE regulations.",
    ctaTitle: "Ready to find your helper?",
    ctaBrowse: "Browse maids",
    ctaWhatsapp: "Ask us on WhatsApp",
  },
  howPage: {
    title: "How Maid Link works",
    intro:
      "From first search to welcoming your helper home — here's the whole journey, step by step.",
    steps: [
      {
        title: "Browse profiles",
        text: "Use the filters — nationality, emirate, salary, skills, visa status — to shortlist candidates that fit your family.",
      },
      {
        title: "Sign up free",
        text: "Creating an account takes under a minute and unlocks candidate photos and full profiles.",
      },
      {
        title: "Chat on WhatsApp",
        text: "Tap the WhatsApp button on any profile. The message already includes the candidate's code, so we know exactly who you mean.",
      },
      {
        title: "Interview",
        text: "We confirm availability and arrange a phone, video or in-person interview — usually within 24 hours.",
      },
      {
        title: "Hire with confidence",
        text: "Contracts, visa and paperwork are completed by our MOHRE-licensed team, with a money-back guarantee. You welcome your helper home.",
      },
    ],
    faqTitle: "Common questions",
    faqs: [
      {
        q: "Is Maid Link free to browse?",
        a: "Browsing, signing up and contacting us are completely free. Hiring is priced transparently — full-time from AED 2,980/mo, maid visa from AED 8,500, part-time from AED 35/hr (ex-VAT) — and we explain everything up front on WhatsApp.",
      },
      {
        q: "How fast can I hire?",
        a: "Helpers inside the UAE with transferable visas can often start within days. Those outside the country typically take a few weeks for visa processing.",
      },
      {
        q: "Are the maids verified?",
        a: "Yes — every profile is documented and screened before going live, and availability is re-confirmed regularly.",
      },
      {
        q: "Is this legal?",
        a: "Yes. Maid Link is licensed by the UAE Ministry of Human Resources & Emiratisation (MoHRE), so every hire and visa is fully legal and compliant.",
      },
    ],
    ctaBtn: "Start browsing",
  },
  termsPage: {
    title: "Terms of Service",
    updated: "Last updated: July 2026",
    intro:
      "By using Maid Link you agree to these terms. Please read them — they're short and in plain language.",
    sections: [
      {
        title: "1. Who we are",
        body: "Maid Link is an online marketplace that showcases domestic helper candidates from licensed UAE recruitment agencies, including our own pool. We market candidates and connect families with the relevant agency — we are not the employer of any candidate and we are not a party to the employment contract.",
      },
      {
        title: "2. Your account",
        body: "You must be 18 or older to use Maid Link. Keep your login details safe and make sure the information you give us is accurate. We may suspend accounts that misuse the platform.",
      },
      {
        title: "3. Using the platform",
        body: "You may browse listings and contact us about candidates for personal, non-commercial hiring purposes only. Scraping, copying, or redistributing listing content — especially candidate photos — is strictly prohibited.",
      },
      {
        title: "4. Listings and availability",
        body: "Candidate information is provided by agencies and re-confirmed regularly, but availability can change at any time. We do our best to keep listings accurate; we cannot guarantee that every detail is current.",
      },
      {
        title: "5. Hiring and payments",
        body: "All placements are completed through licensed recruitment channels in accordance with UAE law (MoHRE). Fees, contracts and visa processing are agreed between you and the licensed agency. Maid Link may receive a commission from agencies for successful placements.",
      },
      {
        title: "6. Candidate photos and dignity",
        body: "Full photos are visible to signed-in members only. You agree not to download, share, or misuse candidate photos or personal information.",
      },
      {
        title: "7. Liability",
        body: "Maid Link is provided \"as is\". We verify what we reasonably can, but we are not liable for the conduct of agencies, candidates, or the outcome of any employment relationship. Always interview and verify before hiring.",
      },
      {
        title: "8. Changes and contact",
        body: "We may update these terms from time to time; the latest version always applies. Questions? Message us on WhatsApp or email us.",
      },
    ],
  },
  privacyPage: {
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    intro:
      "This policy explains what we collect, why, and the choices you have. The short version: we collect the minimum needed to match you with the right helper, and we never sell your data.",
    sections: [
      {
        title: "1. What we collect",
        body: "Account details (name, email, phone), your activity on the site (pages viewed, WhatsApp clicks and which profiles they relate to), and messages you send us.",
      },
      {
        title: "2. Candidate information",
        body: "Candidate profiles, including photos, are provided by their agencies with consent for marketing and are publicly visible on the site.",
      },
      {
        title: "3. How we use your data",
        body: "To match you with candidates, respond to your requests, track which inquiries came through us, and improve the service.",
      },
      {
        title: "4. WhatsApp",
        body: "Conversations happen on WhatsApp, which has its own terms and privacy policy. Our pre-filled messages include the profile code so we can help you faster.",
      },
      {
        title: "5. Sharing",
        body: "We share your contact details with the relevant agency only when needed to progress your hiring request, and we use trusted service providers (hosting, database) to run the platform. We never sell your data.",
      },
      {
        title: "6. Retention and deletion",
        body: "We keep your data while your account is active. Ask us anytime to delete your account and data.",
      },
      {
        title: "7. Security",
        body: "Data is encrypted in transit, candidate photos are stored in access-controlled storage, and admin access is limited to our team.",
      },
      {
        title: "8. Contact",
        body: "For any privacy question or request, reach us on WhatsApp or by email.",
      },
    ],
  },
  contactPage: {
    title: "Contact us",
    intro:
      "We're a WhatsApp-first company — that's the fastest way to reach us for anything: finding a helper, listing candidates, or just a question.",
    whatsappTitle: "WhatsApp",
    whatsappText: "A real person replies within minutes during working hours.",
    whatsappBtn: "Chat on WhatsApp",
    emailTitle: "Email",
    hoursTitle: "Working hours",
    hoursText: "Every day, 9:00 – 21:00 (UAE time)",
    locationTitle: "Location",
  },
  values: {
    nationalities: {
      Filipina: "Filipina",
      Indonesian: "Indonesian",
      Ethiopian: "Ethiopian",
      Kenyan: "Kenyan",
      Ugandan: "Ugandan",
      "Sri Lankan": "Sri Lankan",
      Indian: "Indian",
      Bangladeshi: "Bangladeshi",
      Nepali: "Nepali",
      Myanmar: "Myanmar",
      Pakistani: "Pakistani",
      Ghanaian: "Ghanaian",
      Nigerian: "Nigerian",
      Cameroonian: "Cameroonian",
      "Sierra Leonean": "Sierra Leonean",
      Tanzanian: "Tanzanian",
      Rwandan: "Rwandan",
      Burundian: "Burundian",
      Zimbabwean: "Zimbabwean",
      Eritrean: "Eritrean",
      Malagasy: "Malagasy",
      Vietnamese: "Vietnamese",
    } as Record<string, string>,
    emirates: {
      Dubai: "Dubai",
      "Abu Dhabi": "Abu Dhabi",
      Sharjah: "Sharjah",
      Ajman: "Ajman",
      "Ras Al Khaimah": "Ras Al Khaimah",
      Fujairah: "Fujairah",
      "Umm Al Quwain": "Umm Al Quwain",
    } as Record<string, string>,
    skills: {
      Housekeeping: "Housekeeping",
      Cooking: "Cooking",
      "Baby care": "Baby care",
      "Newborn care": "Newborn care",
      "Postpartum care": "Postpartum care",
      "Elderly care": "Elderly care",
      "Special needs care": "Special needs care",
      Nursing: "Nursing",
      "Pet care": "Pet care",
      Laundry: "Laundry",
      Ironing: "Ironing",
      Driving: "Driving",
      Tutoring: "Tutoring",
      Gardening: "Gardening",
      "Car washing": "Car washing",
    } as Record<string, string>,
    languages: {
      English: "English",
      Arabic: "Arabic",
      Tagalog: "Tagalog",
      Amharic: "Amharic",
      Hindi: "Hindi",
      Urdu: "Urdu",
      Bengali: "Bengali",
      Swahili: "Swahili",
      Indonesian: "Indonesian",
      Sinhala: "Sinhala",
      Nepali: "Nepali",
      Burmese: "Burmese",
      French: "French",
      Luganda: "Luganda",
      Oromo: "Oromo",
      Tigrinya: "Tigrinya",
      Somali: "Somali",
      Malagasy: "Malagasy",
      Vietnamese: "Vietnamese",
    } as Record<string, string>,
    visa: {
      inside_transferable: "In UAE — transferable visa",
      inside_visit: "In UAE — visit visa",
      inside_cancelled: "In UAE — cancelled visa",
      outside_country: "Outside UAE",
    } as Record<string, string>,
    live: {
      live_in: "Live-in",
      live_out: "Live-out",
      either: "Live-in or live-out",
    } as Record<string, string>,
    religions: {
      Christian: "Christian",
      Muslim: "Muslim",
      Buddhist: "Buddhist",
      Hindu: "Hindu",
      Sikh: "Sikh",
      Other: "Other",
    } as Record<string, string>,
    marital: {
      Single: "Single",
      Married: "Married",
      Divorced: "Divorced",
      Widowed: "Widowed",
    } as Record<string, string>,
  },
};

export type Dictionary = typeof en;
