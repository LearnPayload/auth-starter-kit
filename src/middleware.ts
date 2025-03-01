import { NextResponse } from "next/server";
import { authMiddleware } from "./app/(auth)/_lib/middleware";

const protectedRoutes = ["/settings(.*)"];
const publicRoutes = ["/auth(.*)"];

const isProtectedRoute = (url: string) =>
  protectedRoutes.some((route) => new RegExp(route).test(url));

const isPublicRoute = (url: string) =>
  publicRoutes.some((route) => new RegExp(route).test(url));

export default authMiddleware(async (req) => {
  const response = NextResponse.next();

  if (isProtectedRoute(req.url) && !req.user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isPublicRoute(req.url) && req.user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!admin|api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
