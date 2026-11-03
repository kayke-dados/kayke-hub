import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { getAdminEmail, isSupabaseConfigured } from "@/lib/supabase/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLogin = pathname === "/admin/login";

  if (!isSupabaseConfigured()) {
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request);
  const isAdmin =
    Boolean(user?.email) &&
    user!.email!.trim().toLowerCase() === getAdminEmail();

  if (!isAdmin && !isLogin) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdmin && isLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
