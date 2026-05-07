import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./i18n/routing";

const handler = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export function proxy(request: NextRequest) {
  return handler(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
