"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function str(fd: FormData, key: string): string | null {
  const value = fd.get(key);
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

function num(fd: FormData, key: string): number | null {
  const value = str(fd, key);
  if (value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function maidPayload(fd: FormData) {
  return {
    full_name: str(fd, "full_name") ?? "",
    nationality: str(fd, "nationality") ?? "",
    date_of_birth: str(fd, "date_of_birth"),
    religion: str(fd, "religion"),
    marital_status: str(fd, "marital_status"),
    children_count: num(fd, "children_count"),
    emirate: str(fd, "emirate"),
    visa_status: str(fd, "visa_status"),
    live_arrangement: str(fd, "live_arrangement"),
    expected_salary_aed: num(fd, "expected_salary_aed"),
    experience_years: num(fd, "experience_years") ?? 0,
    languages: fd.getAll("languages").map(String),
    skills: fd.getAll("skills").map(String),
    bio: str(fd, "bio"),
    status: str(fd, "status") ?? "draft",
    available_from: str(fd, "available_from"),
    agency_id: str(fd, "agency_id"),
  };
}

function refresh() {
  revalidatePath("/", "layout");
}

export async function upsertMaid(formData: FormData) {
  const supabase = await createClient();
  const id = str(formData, "id");
  const payload = maidPayload(formData);

  if (id) {
    const { error } = await supabase.from("maids").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
    refresh();
    redirect(`/admin/maids/${id}?saved=1`);
  }

  const { data, error } = await supabase
    .from("maids")
    .insert(payload)
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/maids/${data.id}?created=1`);
}

export async function setMaidStatus(formData: FormData) {
  const supabase = await createClient();
  const id = str(formData, "id");
  const status = str(formData, "status");
  if (!id || !status) return;

  const update: Record<string, unknown> = { status };
  // Publishing counts as an availability confirmation.
  if (status === "published") update.last_confirmed_at = new Date().toISOString();

  const { error } = await supabase.from("maids").update(update).eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function confirmAvailability(formData: FormData) {
  const supabase = await createClient();
  const id = str(formData, "id");
  if (!id) return;
  const { error } = await supabase
    .from("maids")
    .update({ last_confirmed_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function setPrimaryPhoto(formData: FormData) {
  const supabase = await createClient();
  const photoId = str(formData, "photoId");
  const maidId = str(formData, "maidId");
  if (!photoId || !maidId) return;
  await supabase.from("maid_photos").update({ is_primary: false }).eq("maid_id", maidId);
  const { error } = await supabase
    .from("maid_photos")
    .update({ is_primary: true })
    .eq("id", photoId);
  if (error) throw new Error(error.message);
  refresh();
}

export async function createAgency(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("agencies").insert({
    name: str(formData, "name") ?? "",
    contact_name: str(formData, "contact_name"),
    whatsapp: str(formData, "whatsapp"),
    phone: str(formData, "phone"),
    email: str(formData, "email"),
    license_no: str(formData, "license_no"),
    emirate: str(formData, "emirate"),
    commission_terms: str(formData, "commission_terms"),
    notes: str(formData, "notes"),
    is_house: formData.get("is_house") === "on",
  });
  if (error) throw new Error(error.message);
  refresh();
}

export async function createInquiry(formData: FormData) {
  const supabase = await createClient();
  const maidCode = str(formData, "maid_code");

  let maidId: string | null = null;
  let agencyId: string | null = null;
  if (maidCode) {
    const { data: maid } = await supabase
      .from("maids")
      .select("id, agency_id")
      .eq("code", maidCode.toUpperCase())
      .maybeSingle();
    maidId = maid?.id ?? null;
    agencyId = maid?.agency_id ?? null;
  }

  const { error } = await supabase.from("inquiries").insert({
    maid_id: maidId,
    agency_id: agencyId,
    family_name: str(formData, "family_name"),
    family_phone: str(formData, "family_phone"),
    notes: str(formData, "notes"),
  });
  if (error) throw new Error(error.message);
  refresh();
}

export async function updateInquiry(formData: FormData) {
  const supabase = await createClient();
  const id = str(formData, "id");
  if (!id) return;
  const { error } = await supabase
    .from("inquiries")
    .update({
      status: str(formData, "status") ?? "new",
      commission_aed: num(formData, "commission_aed"),
      commission_paid: formData.get("commission_paid") === "on",
      notes: str(formData, "notes"),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}
