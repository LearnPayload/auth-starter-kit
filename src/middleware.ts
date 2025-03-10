import { authMiddleware } from "./app/(authkit)/_lib/middleware";

export default authMiddleware();

export const config = {
  matcher: [
    // Skip Payload routes and Next.js internals and all static files, unless found in search params
    "/((?!admin|api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
