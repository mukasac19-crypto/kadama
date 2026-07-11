// One-off helper: pushes a synthetic test photo through the exact same
// pipeline as /api/admin/photos (original -> private bucket, blurred ->
// public bucket) so the photo-gating can be seen with real data.
// Usage: node scripts/demo-photo.mjs [MAID_CODE]
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import sharp from "sharp";

// --- read .env.local ---
const env = {};
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}
const URL_BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

const code = process.argv[2] ?? "ML-0101";

// --- find the maid ---
const maidRes = await fetch(
  `${URL_BASE}/rest/v1/maids?code=eq.${code}&select=id,full_name`,
  { headers }
);
const [maid] = await maidRes.json();
if (!maid) {
  console.error(`Maid ${code} not found`);
  process.exit(1);
}

// --- generate a synthetic portrait (no real person) ---
const svg = `<svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b"/>
  </linearGradient></defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <circle cx="400" cy="340" r="170" fill="#92400e"/>
  <circle cx="340" cy="320" r="18" fill="#fff"/>
  <circle cx="460" cy="320" r="18" fill="#fff"/>
  <path d="M330 410 q70 60 140 0" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M180 1000 q0 -320 220 -320 q220 0 220 320 z" fill="#065f46"/>
  <text x="400" y="960" font-size="44" text-anchor="middle" fill="#ffffff" font-family="sans-serif">TEST PHOTO</text>
</svg>`;
const input = Buffer.from(svg);

const original = await sharp(input)
  .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 82 })
  .toBuffer();
const blurred = await sharp(input)
  .resize(600, 600, { fit: "inside", withoutEnlargement: true })
  .blur(24)
  .jpeg({ quality: 60 })
  .toBuffer();

// --- upload to both buckets (same object path, like the API route) ---
const objectPath = `${maid.id}/${randomUUID()}.jpg`;
for (const [bucket, body] of [
  ["maid-photos", original],
  ["maid-photos-public", blurred],
]) {
  const res = await fetch(`${URL_BASE}/storage/v1/object/${bucket}/${objectPath}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "image/jpeg" },
    body,
  });
  if (!res.ok) {
    console.error(`Upload to ${bucket} failed:`, await res.text());
    process.exit(1);
  }
}

// --- register the photo (primary if it's the first) ---
const countRes = await fetch(
  `${URL_BASE}/rest/v1/maid_photos?maid_id=eq.${maid.id}&select=id`,
  { headers }
);
const existing = await countRes.json();

const insertRes = await fetch(`${URL_BASE}/rest/v1/maid_photos`, {
  method: "POST",
  headers: { ...headers, "Content-Type": "application/json", Prefer: "return=representation" },
  body: JSON.stringify({
    maid_id: maid.id,
    original_path: objectPath,
    blurred_path: objectPath,
    is_primary: existing.length === 0,
  }),
});
if (!insertRes.ok) {
  console.error("Insert failed:", await insertRes.text());
  process.exit(1);
}

console.log(`Photo added for ${maid.full_name} (${code})`);
console.log(`Blurred (public):  ${URL_BASE}/storage/v1/object/public/maid-photos-public/${objectPath}`);
console.log(`Original (private): ${URL_BASE}/storage/v1/object/public/maid-photos/${objectPath}  <- should NOT be accessible`);
