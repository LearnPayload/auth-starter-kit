import { User } from "@/payload-types";
import { NextRequest, NextResponse } from "next/server";

export type AuthNextRequest = NextRequest & {
  user: User | null;
};

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
  callback: AuthMiddlewareCallback,
) => (request: NextRequest) => Promise<NextResponse<unknown>>;

export const authMiddleware: AuthMiddleWareFunction =
  (cb) => async (request: NextRequest) => {
    const user = await parseUserFromEndpoint(request);
    const authRequest: AuthNextRequest = request as AuthNextRequest;
    authRequest.user = user;
    return cb(authRequest);
  };
