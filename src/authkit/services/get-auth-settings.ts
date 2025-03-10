import { getPayload } from "./payload";

export const getAuthSettings = async ({
  isDraftMode,
}: {
  isDraftMode: boolean;
}) => {
  const payload = await getPayload();
  return await payload.findGlobal({
    slug: "auth-settings",
    draft: isDraftMode,
  });
};
