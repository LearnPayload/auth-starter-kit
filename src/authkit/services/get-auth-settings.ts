import { getPayload } from "./payload";

export const getAuthSettings = async () => {
  const payload = await getPayload();
  return await payload.findGlobal({
    slug: "auth-settings",
  });
};
