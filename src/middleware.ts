import { NextResponse } from "next/server";
import { authMiddleware } from "./app/(auth)/_lib/middleware";

export default authMiddleware(async (req) => {
  const response = NextResponse.next();
  console.log({ user: req.user });

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
