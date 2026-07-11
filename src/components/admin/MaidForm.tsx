import {
  EMIRATES,
  LANGUAGES,
  LIVE_ARRANGEMENTS,
  MAID_STATUSES,
  NATIONALITIES,
  RELIGIONS,
  SKILLS,
  VISA_STATUSES,
} from "@/lib/config";
import type { Agency, Maid } from "@/lib/types";
import { upsertMaid } from "@/app/admin/actions";
import { SubmitButton } from "./SubmitButton";

const inputClass =
  "w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-neutral-400";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

export function MaidForm({ maid, agencies }: { maid?: Maid; agencies: Agency[] }) {
  return (
    <form action={upsertMaid} className="space-y-6">
      {maid && <input type="hidden" name="id" value={maid.id} />}

      <div className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Full name *">
          <input name="full_name" required defaultValue={maid?.full_name ?? ""} className={inputClass} />
        </Field>
        <Field label="Nationality *">
          <select name="nationality" required defaultValue={maid?.nationality ?? ""} className={inputClass}>
            <option value="" disabled>
              Select…
            </option>
            {NATIONALITIES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Date of birth">
          <input type="date" name="date_of_birth" defaultValue={maid?.date_of_birth ?? ""} className={inputClass} />
        </Field>
        <Field label="Religion">
          <select name="religion" defaultValue={maid?.religion ?? ""} className={inputClass}>
            <option value="">—</option>
            {RELIGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Marital status">
          <select name="marital_status" defaultValue={maid?.marital_status ?? ""} className={inputClass}>
            <option value="">—</option>
            {["Single", "Married", "Divorced", "Widowed"].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Children">
          <input
            type="number"
            name="children_count"
            min={0}
            defaultValue={maid?.children_count ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Current emirate">
          <select name="emirate" defaultValue={maid?.emirate ?? ""} className={inputClass}>
            <option value="">—</option>
            {EMIRATES.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Visa status">
          <select name="visa_status" defaultValue={maid?.visa_status ?? ""} className={inputClass}>
            <option value="">—</option>
            {Object.entries(VISA_STATUSES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Live-in / live-out">
          <select name="live_arrangement" defaultValue={maid?.live_arrangement ?? ""} className={inputClass}>
            <option value="">—</option>
            {Object.entries(LIVE_ARRANGEMENTS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Expected salary (AED/month)">
          <input
            type="number"
            name="expected_salary_aed"
            min={0}
            step={50}
            defaultValue={maid?.expected_salary_aed ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Experience (years)">
          <input
            type="number"
            name="experience_years"
            min={0}
            defaultValue={maid?.experience_years ?? 0}
            className={inputClass}
          />
        </Field>
        <Field label="Available from">
          <input type="date" name="available_from" defaultValue={maid?.available_from ?? ""} className={inputClass} />
        </Field>
        <Field label="Agency (source)">
          <select name="agency_id" defaultValue={maid?.agency_id ?? ""} className={inputClass}>
            <option value="">—</option>
            {agencies.map((agency) => (
              <option key={agency.id} value={agency.id}>
                {agency.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Listing status">
          <select name="status" defaultValue={maid?.status ?? "draft"} className={inputClass}>
            {MAID_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-6 rounded-2xl border border-neutral-200 bg-white p-6 sm:grid-cols-2">
        <div>
          <span className={labelClass}>Skills</span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {SKILLS.map((skill) => (
              <label key={skill} className="flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  defaultChecked={maid?.skills.includes(skill)}
                  className="h-4 w-4 accent-brand-700"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
        <div>
          <span className={labelClass}>Languages</span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {LANGUAGES.map((language) => (
              <label key={language} className="flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  name="languages"
                  value={language}
                  defaultChecked={maid?.languages.includes(language)}
                  className="h-4 w-4 accent-brand-700"
                />
                {language}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <Field label="Bio / work history (shown on the public profile)">
          <textarea name="bio" rows={4} defaultValue={maid?.bio ?? ""} className={inputClass} />
        </Field>
      </div>

      <SubmitButton
        pendingLabel={maid ? "Saving…" : "Creating…"}
        doneLabel="✓ Saved"
        className="rounded-full bg-brand-700 px-8 py-3 text-sm font-semibold text-white hover:bg-brand-800"
      >
        {maid ? "Save changes" : "Create maid"}
      </SubmitButton>
    </form>
  );
}
