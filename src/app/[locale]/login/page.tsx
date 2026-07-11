"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getDict, isLocale, lp, type Dictionary, type Locale } from "@/lib/i18n";

type Mode = "signin" | "signup";

function useLocale(): Locale {
  const params = useParams<{ locale: string }>();
  return isLocale(params.locale) ? params.locale : "en";
}

const inputClass =
  "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none";

/** Map raw Supabase auth errors to friendly, translated messages. */
function friendlyError(message: string, dict: Dictionary): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return dict.auth.errors.invalidCredentials;
  if (m.includes("email not confirmed")) return dict.auth.errors.emailNotConfirmed;
  if (m.includes("already registered") || m.includes("already exists"))
    return dict.auth.errors.emailTaken;
  if (m.includes("for security purposes") || m.includes("rate limit"))
    return dict.auth.errors.rateLimit;
  return dict.auth.errors.generic;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3.01c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.27a12 12 0 0 0 0 10.78l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.98 11.98 0 0 0 1.27 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}

function AuthForms() {
  const router = useRouter();
  const locale = useLocale();
  const dict = getDict(locale);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? lp(locale, "/maids");

  const [mode, setMode] = useState<Mode>(
    searchParams.get("mode") === "signup" ? "signup" : "signin"
  );
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth" ? dict.auth.errors.callbackFailed : null
  );
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  function switchMode(newMode: Mode) {
    setMode(newMode);
    setError(null);
  }

  async function handleGoogle() {
    setError(null);
    setGoogleLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    // On success the browser redirects to Google; we only land here on failure.
    if (error) {
      setError(friendlyError(error.message, dict));
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(friendlyError(error.message, dict));
        return;
      }
      router.push(next);
      router.refresh();
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setLoading(false);
    if (error) {
      setError(friendlyError(error.message, dict));
      return;
    }
    // With email confirmation OFF Supabase returns a session; with it ON it
    // returns a user (or an obfuscated fake for existing emails) and no session.
    if (data.session) {
      router.push(next);
      router.refresh();
    } else {
      setCheckEmail(true);
    }
  }

  if (checkEmail) {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold">{dict.auth.checkEmailTitle}</p>
        <p className="mt-2 text-sm text-neutral-500">{dict.auth.checkEmailText(email)}</p>
      </div>
    );
  }

  const isSignup = mode === "signup";

  return (
    <div>
      {/* Mode tabs */}
      <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-neutral-100 p-1 text-sm font-semibold">
        <button
          type="button"
          onClick={() => switchMode("signin")}
          className={`rounded-full py-2 transition ${
            !isSignup ? "bg-white text-brand-800 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          {dict.auth.tabSignIn}
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={`rounded-full py-2 transition ${
            isSignup ? "bg-white text-brand-800 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          {dict.auth.tabSignUp}
        </button>
      </div>

      {/* Google — one tap for both sign-in and sign-up */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60"
      >
        <GoogleIcon />
        {dict.auth.googleBtn}
      </button>

      <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-400">
        <span className="h-px flex-1 bg-neutral-200" />
        {dict.auth.orContinueWith}
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <>
            <input
              type="text"
              required
              placeholder={dict.auth.fullName}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
            <input
              type="tel"
              placeholder={dict.auth.phonePlaceholder}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </>
        )}
        <input
          type="email"
          required
          placeholder={dict.auth.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <input
          type="password"
          required
          minLength={isSignup ? 8 : undefined}
          placeholder={isSignup ? dict.auth.password8 : dict.auth.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-700 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          {loading
            ? isSignup
              ? dict.auth.creating
              : dict.auth.signingIn
            : isSignup
              ? dict.auth.createBtn
              : dict.auth.signInBtn}
        </button>
        <p className="text-center text-sm text-neutral-500">
          {isSignup ? (
            <>
              {dict.auth.haveAccount}{" "}
              <button
                type="button"
                onClick={() => switchMode("signin")}
                className="font-semibold text-brand-800 hover:underline"
              >
                {dict.auth.signInLink}
              </button>
            </>
          ) : (
            <>
              {dict.auth.newTo}{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className="font-semibold text-brand-800 hover:underline"
              >
                {dict.auth.createFreeLink}
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

function AuthHeading() {
  const locale = useLocale();
  const dict = getDict(locale);
  const searchParams = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  return (
    <>
      <h1 className="text-2xl font-bold">
        {isSignup ? dict.auth.createTitle : dict.auth.welcomeBack}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        {isSignup ? dict.auth.createSub : dict.auth.signInSub}
      </p>
    </>
  );
}

export default function AuthPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Suspense>
        <AuthHeading />
      </Suspense>
      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
        <Suspense>
          <AuthForms />
        </Suspense>
      </div>
    </div>
  );
}
