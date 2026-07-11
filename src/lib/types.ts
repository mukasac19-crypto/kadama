export type MaidStatus =
  | "draft"
  | "review"
  | "published"
  | "reserved"
  | "hired"
  | "archived";

export interface MaidPhoto {
  id: string;
  maid_id: string;
  original_path: string;
  blurred_path: string;
  is_primary: boolean;
  created_at: string;
}

export interface MaidVideo {
  id: string;
  maid_id: string;
  video_path: string;
  created_at: string;
}

export interface Maid {
  id: string;
  code: string;
  agency_id: string | null;
  full_name: string;
  nationality: string;
  date_of_birth: string | null;
  religion: string | null;
  marital_status: string | null;
  children_count: number | null;
  emirate: string | null;
  visa_status: string | null;
  live_arrangement: string | null;
  expected_salary_aed: number | null;
  experience_years: number;
  languages: string[];
  skills: string[];
  bio: string | null;
  status: MaidStatus;
  available_from: string | null;
  last_confirmed_at: string;
  created_at: string;
  updated_at: string;
  maid_photos?: MaidPhoto[];
  maid_videos?: MaidVideo[];
}

export interface Agency {
  id: string;
  name: string;
  contact_name: string | null;
  whatsapp: string | null;
  phone: string | null;
  email: string | null;
  license_no: string | null;
  emirate: string | null;
  commission_terms: string | null;
  notes: string | null;
  is_house: boolean;
  created_at: string;
}

export interface Inquiry {
  id: string;
  maid_id: string | null;
  agency_id: string | null;
  user_id: string | null;
  family_name: string | null;
  family_phone: string | null;
  status: string;
  commission_aed: number | null;
  commission_paid: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  maids?: Pick<Maid, "code" | "full_name"> | null;
  agencies?: Pick<Agency, "name"> | null;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: "family" | "admin";
  created_at: string;
}
