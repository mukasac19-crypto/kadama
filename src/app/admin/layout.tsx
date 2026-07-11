import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const tabs = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/maids", label: "Maids" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/agencies", label: "Agencies" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") redirect("/");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Maid Link Admin</h1>
        <nav className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-neutral-200 bg-white p-1 text-sm">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="rounded-full px-4 py-1.5 font-medium text-neutral-600 transition hover:bg-brand-50 hover:text-brand-800"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/en" className="rounded-full px-3 py-1.5 text-neutral-500 hover:bg-neutral-100">
            ← Back to site
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-full px-3 py-1.5 text-neutral-500 hover:bg-neutral-100"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
