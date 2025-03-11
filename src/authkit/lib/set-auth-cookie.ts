"use server";

import { cookies } from "next/headers";
import { getCookieExpiration } from "payload";
import { getPayload } from "../services/payload";

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

export const destroyAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("payload-token");
};
