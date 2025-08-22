import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const isPublicRoute = (path: string) =>
  path === "/login" || path === "/register" || path === "/";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie && !isPublicRoute(request.nextUrl.pathname)) {
    console.log("Redirected by middleware " + request.url);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // console.log(sessionCookie);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
