import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "ar"];

/** Paths that live outside the locale tree (English-only / machine routes). */
function isLocaleExempt(pathname: string): boolean {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/admin") ||
    // SEO / well-known machine routes must be served as-is, never locale-prefixed.
    // (Googlebot requests /robots.txt and /sitemap.xml at the domain root.)
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest" ||
    pathname.startsWith("/.well-known/") ||
    // Any path with a file extension (og images, icons, feeds, etc.).
    pathname.includes(".")
  );
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---- locale routing: /maids -> /en/maids (or /ar per cookie) ----
  const pathLocale = LOCALES.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (!pathLocale && !isLocaleExempt(pathname)) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const locale = cookieLocale === "ar" ? "ar" : "en";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Tell the root layout which locale this request is, so it can set
  // <html lang dir> (the layout itself sits above the [locale] segment).
  const locale = pathLocale ?? "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  let response = NextResponse.next({ request: { headers: requestHeaders } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // request.cookies is backed by the request headers, so re-copy
          // the refreshed cookie header into the forwarded headers.
          requestHeaders.set("cookie", request.headers.get("cookie") ?? "");
          response = NextResponse.next({ request: { headers: requestHeaders } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session cookie if needed.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /admin requires a signed-in user; the role check happens in the
  // admin layout (and RLS enforces it in the database regardless).
  if (pathname.startsWith("/admin") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/en/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    // Run on everything except static assets.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
