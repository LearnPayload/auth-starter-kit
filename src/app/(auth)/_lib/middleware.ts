import { User } from "@/payload-types";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "../_config/config";

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
  const user = await resp.json();
  if (!user) return null;

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
    const response = NextResponse.next();
    const user = await parseUserFromEndpoint(request);
    const authRequest: AuthNextRequest = request as AuthNextRequest;
    authRequest.user = user;

    if (isProtectedRoute(request.url) && !user) {
      return NextResponse.redirect(
        new URL(AUTH_CONFIG.defaultSignInRoute, request.url),
      );
    }

    if (isPublicRoute(request.url) && user) {
      return NextResponse.redirect(new URL("/settings/profile", request.url));
    }

    if (cb) return cb(authRequest);

    return response;
  };
