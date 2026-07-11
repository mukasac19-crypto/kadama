export function ageFrom(dateOfBirth: string | null): number | null {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    now.getMonth() < dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export function formatAed(amount: number | null): string {
  if (amount == null) return "—";
  return `AED ${amount.toLocaleString("en-US")}`;
}

export function daysSince(timestamp: string): number {
  const then = new Date(timestamp).getTime();
  if (Number.isNaN(then)) return 0;
  return Math.max(0, Math.floor((Date.now() - then) / 86_400_000));
}

export function confirmedLabel(lastConfirmedAt: string): string {
  const days = daysSince(lastConfirmedAt);
  if (days === 0) return "Availability confirmed today";
  if (days === 1) return "Availability confirmed yesterday";
  return `Availability confirmed ${days} days ago`;
}

export function formatDate(value: string | null, locale = "en-GB"): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
