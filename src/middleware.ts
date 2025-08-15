import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login",
  "/register",
  "/test(.*)",
  "/api(.*)",
  "/detail",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (!isPublicRoute(req) && !userId) {
    console.log("Redirecting karena terlarang");
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl, 307);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
