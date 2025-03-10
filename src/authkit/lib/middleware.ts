import { User } from "@/payload-types";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "./config";
import { TypedUser } from "payload";
import { draftMode } from "next/headers";

export type AuthNextRequest = NextRequest & {
  user: User | null;
};

const isProtectedRoute = (url: string) =>
  AUTH_CONFIG.protectedRoutes.some((route) => new RegExp(route).test(url));

const isPublicRoute = (url: string) =>
  AUTH_CONFIG.publicRoutes.some((route) => new RegExp(route).test(url));

const parseUserFromEndpoint = async (request: NextRequest) => {
  const cookies = request.cookies;
  const token = cookies.get("payload-token")?.value;
  if (!token) return null;

  const baseUrl = new URL(request.url).origin;

  const resp = await fetch(`${baseUrl}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await resp.json();
  if (!data.user) return null;
  const user = data.user as TypedUser;
  return user;
};
type AuthMiddlewareCallback = (
  req: AuthNextRequest,
) => Promise<NextResponse<unknown>>;

type AuthMiddleWareFunction = (
  callback?: AuthMiddlewareCallback,
) => (request: NextRequest) => Promise<NextResponse<unknown>>;

export const authMiddleware: AuthMiddleWareFunction =
  (cb) => async (request: NextRequest) => {
    const { isEnabled: isDraftMode } = await draftMode();
    const currentUrl = new URL(request.url);
    const { searchParams } = currentUrl;
    console.log({ searchParams });
    const response = NextResponse.next();
    const user = await parseUserFromEndpoint(request);
    const authRequest: AuthNextRequest = request as AuthNextRequest;
    authRequest.user = user;

    const baseUrl = new URL(request.url);
    const basePath = baseUrl.pathname;

    if (isProtectedRoute(request.url) && !user) {
      return NextResponse.redirect(
        new URL(AUTH_CONFIG.defaultSignInRoute, baseUrl.origin),
      );
    }

    if (
      isProtectedRoute(request.url) &&
      !basePath.startsWith(AUTH_CONFIG.unverifiedSignInRoute) &&
      user &&
      !user._verified
    ) {
      return NextResponse.redirect(
        new URL(AUTH_CONFIG.unverifiedSignInRoute, baseUrl.origin),
      );
    }

    // if on verify email route and user is verified, redirect to home
    if (
      basePath.startsWith(AUTH_CONFIG.unverifiedSignInRoute) &&
      user &&
      user._verified
    ) {
      return NextResponse.redirect(
        new URL(AUTH_CONFIG.redirectAfterUserLogin, baseUrl.origin),
      );
    }

    if (isPublicRoute(request.url) && user && !isDraftMode) {
      return NextResponse.redirect(
        new URL(AUTH_CONFIG.redirectAfterUserLogin, baseUrl.origin),
      );
    }

    if (cb) return cb(authRequest);

    return response;
  };
