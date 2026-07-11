"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 animate-spin" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Submit button for admin server-action forms with visible feedback:
 * idle -> spinner + pending label while the action runs -> brief "✓" flash
 * when it completes. Drop-in replacement for <button type="submit">.
 */
export function SubmitButton({
  children,
  pendingLabel = "Working…",
  doneLabel = "✓ Done",
  className = "",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  doneLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  const wasPending = useRef(false);
  const [justDone, setJustDone] = useState(false);

  useEffect(() => {
    if (wasPending.current && !pending) {
      setJustDone(true);
      const timer = setTimeout(() => setJustDone(false), 2000);
      wasPending.current = pending;
      return () => clearTimeout(timer);
    }
    wasPending.current = pending;
  }, [pending]);

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-1.5 transition disabled:cursor-wait disabled:opacity-70 ${className}`}
    >
      {pending ? (
        <>
          <Spinner />
          {pendingLabel}
        </>
      ) : justDone ? (
        doneLabel
      ) : (
        children
      )}
    </button>
  );
}
