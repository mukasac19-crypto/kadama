"use client";

import { useState } from "react";
import Link from "next/link";

export interface MobileNavItem {
  href: string;
  label: string;
  highlight?: boolean;
}

export function MobileNav({
  items,
  signedIn,
  signOutLabel,
}: {
  items: MobileNavItem[];
  signedIn: boolean;
  signOutLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 z-50 border-b border-neutral-200 bg-white shadow-lg">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-base font-medium">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  item.highlight
                    ? "rounded-xl bg-brand-700 px-4 py-3 text-center text-white transition hover:bg-brand-800"
                    : "rounded-xl px-4 py-3 text-neutral-700 transition hover:bg-neutral-100"
                }
              >
                {item.label}
              </Link>
            ))}
            {signedIn && (
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-3 text-start text-neutral-500 transition hover:bg-neutral-100"
                >
                  {signOutLabel}
                </button>
              </form>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
