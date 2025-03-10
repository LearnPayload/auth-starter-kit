import { extractJWT, type PayloadRequest } from "payload";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "@/authkit/services/payload";
import { jwtVerify } from "jose";

type JWTToken = {
  collection: string;
  id: string;
};

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string;
      };
    };
    token: string;
  } & Request,
): Promise<Response> {
  const payload = await getPayload();

  const { searchParams } = new URL(req.url);

  const path = searchParams.get("path");
  const previewSecret = searchParams.get("previewSecret");

  if (!path) {
    return new Response("Insufficient search params", { status: 404 });
  }

  if (!path.startsWith("/")) {
    return new Response(
      "This endpoint can only be used for relative previews",
      { status: 500 },
    );
  }

  let auth;

  try {
    auth = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
  } catch (error) {
    payload.logger.error(
      { err: error },
      "Error verifying token for live preview",
    );
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  const draft = await draftMode();

  // validate jwt
  const secretKey = new TextEncoder().encode(payload.secret);
  const token = extractJWT({ headers: req.headers, payload });
  const { payload: decodedPayload } = await jwtVerify<JWTToken>(
    token!,
    secretKey,
  );

  if (
    previewSecret !== token ||
    !auth?.user ||
    !decodedPayload ||
    decodedPayload.id !== auth.user.id
  ) {
    draft.disable();
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  draft.enable();

  redirect(path);
}
