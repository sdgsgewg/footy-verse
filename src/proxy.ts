import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { MANAGE_ROUTE_PERMISSIONS } from "@/lib/auth/permissions";

const intlMiddleware = createMiddleware({
  locales: ["en", "id"],
  defaultLocale: "id",
});

function createRedirect(url: URL | string, sourceResponse: NextResponse) {
  const redirectResponse = NextResponse.redirect(url);
  sourceResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });
  return redirectResponse;
}

export default async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  // Jika next-intl sudah menghasilkan redirect (misal redirect ke default locale), langsung return
  if (response.headers.get("location") || response.status === 307 || response.status === 308) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const pathname = request.nextUrl.pathname;

  const locale = pathname.match(/^\/(en|id)/)?.[1] ?? "id";

  // Hilangkan locale supaya bisa dibandingkan dengan ROUTES
  const normalizedPath = pathname.replace(/^\/(en|id)/, "") || "/";

  const matchedPermission = MANAGE_ROUTE_PERMISSIONS.find(({ routes }) =>
    routes.some(
      (route) =>
        normalizedPath === route || normalizedPath.startsWith(`${route}/`),
    ),
  );

  // Bukan halaman yang membutuhkan permission khusus
  if (!matchedPermission) {
    return response;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Guest only (auth pages)
  if (matchedPermission.type === "guest") {
    if (user) {
      return createRedirect(new URL(`/${locale}`, request.url), response);
    }

    return response;
  }

  // Guest -> Login
  if (!user) {
    const loginUrl = new URL(`/${locale}/login`, request.url);

    loginUrl.searchParams.set("next", pathname);

    return createRedirect(loginUrl, response);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!matchedPermission.check(profile)) {
    return createRedirect(new URL(`/${locale}`, request.url), response);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
