export const SITE = {
  name: "Maid Link",
  tagline: "Hire trusted maids & nannies across the UAE",
  description:
    "Maid Link connects UAE families with verified maids, nannies and caregivers from licensed agencies. Browse profiles, chat on WhatsApp, and hire with confidence.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000",
  email: "hello@maidlink.ae", // update when your real inbox is ready
  location: "Dubai, United Arab Emirates",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-4MFGGZGFW6",
};

export const NATIONALITIES = [
  "Filipina",
  "Indonesian",
  "Ethiopian",
  "Kenyan",
  "Ugandan",
  "Sri Lankan",
  "Indian",
  "Bangladeshi",
  "Nepali",
  "Myanmar",
  "Pakistani",
  "Ghanaian",
  "Nigerian",
  "Cameroonian",
  "Sierra Leonean",
  "Tanzanian",
  "Rwandan",
  "Burundian",
  "Zimbabwean",
  "Eritrean",
  "Malagasy",
  "Vietnamese",
] as const;

export const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
] as const;

export const SKILLS = [
  "Housekeeping",
  "Cooking",
  "Baby care",
  "Newborn care",
  "Postpartum care",
  "Elderly care",
  "Special needs care",
  "Nursing",
  "Pet care",
  "Laundry",
  "Ironing",
  "Driving",
  "Tutoring",
  "Gardening",
  "Car washing",
] as const;

export const LANGUAGES = [
  "English",
  "Arabic",
  "Tagalog",
  "Amharic",
  "Hindi",
  "Urdu",
  "Bengali",
  "Swahili",
  "Indonesian",
  "Sinhala",
  "Nepali",
  "Burmese",
  "French",
  "Luganda",
  "Oromo",
  "Tigrinya",
  "Somali",
  "Malagasy",
  "Vietnamese",
] as const;

export const RELIGIONS = [
  "Christian",
  "Muslim",
  "Buddhist",
  "Hindu",
  "Sikh",
  "Other",
] as const;

export const VISA_STATUSES: Record<string, string> = {
  inside_transferable: "In UAE — transferable visa",
  inside_visit: "In UAE — visit visa",
  inside_cancelled: "In UAE — cancelled visa",
  outside_country: "Outside UAE",
};

export const LIVE_ARRANGEMENTS: Record<string, string> = {
  live_in: "Live-in",
  live_out: "Live-out",
  either: "Live-in or live-out",
};

export const MAID_STATUSES = [
  "draft",
  "review",
  "published",
  "reserved",
  "hired",
  "archived",
] as const;

export const INQUIRY_STATUSES = [
  "new",
  "contacted",
  "forwarded",
  "interviewing",
  "hired",
  "closed",
] as const;

/** Published listings not re-confirmed within this many days show up in the stale queue. */
export const STALE_AFTER_DAYS = 7;
