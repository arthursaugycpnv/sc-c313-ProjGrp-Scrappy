import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n/routing";

const handler = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export function proxy(request: NextRequest) {
  // Protect dashboard routes: /{locale}/app
  const pathname = request.nextUrl.pathname;
  const appMatch = pathname.match(/^\/(fr|en|de|it)\/app(\/.*)?$/);

  if (appMatch) {
    const locale = appMatch[1];
    const session = request.cookies.get("scrappy_session")?.value;
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/auth`;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return handler(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
