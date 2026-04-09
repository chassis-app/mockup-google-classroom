import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const requestHeaders = new Headers(request.headers);
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  const preferredLocale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  if (segments.length > 0 && isLocale(segments[0])) {
    requestHeaders.set("x-app-locale", segments[0]);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.cookies.set(localeCookieName, segments[0], {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  requestHeaders.set("x-app-locale", preferredLocale);

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(localeCookieName, preferredLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
