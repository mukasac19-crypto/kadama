"use client";

/** Shown when an admin action or page throws — no more mystery blank pages. */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
      <p className="text-lg font-bold text-red-700">Something went wrong</p>
      <p className="mt-2 text-sm text-red-600">
        {error.message || "The action could not be completed."}
      </p>
      <button
        onClick={reset}
        className="mt-5 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
      >
        Try again
      </button>
    </div>
  );
}
