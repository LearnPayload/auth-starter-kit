"use server";

import { getCookieExpiration } from "payload";
import { getPayload } from "../_db/payload";
import { cookies } from "next/headers";

export const setAuthCookie = async (token: string) => {
  const cookieStore = await cookies();

  const payload = await getPayload();

  const collectionConfig = payload.collections.users.config;

  const name = `${payload.config.cookiePrefix}-token`;
  const expires = getCookieExpiration({
    seconds: collectionConfig.auth.tokenExpiration,
  });
  cookieStore.set({
    name,
    value: token,
    expires,
    httpOnly: true,
    domain: collectionConfig.auth.cookies.domain ?? undefined,
    secure: collectionConfig.auth.cookies.secure,
  });
};
