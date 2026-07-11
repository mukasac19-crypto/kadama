"use client";

import { useEffect, useState } from "react";

/** Green confirmation banner shown after a redirect with ?saved=1 / ?created=1. */
export function SavedBanner({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-900">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
        ✓
      </span>
      {message}
    </div>
  );
}
