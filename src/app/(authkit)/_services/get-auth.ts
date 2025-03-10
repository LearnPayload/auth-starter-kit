import { headers as nextHeaders } from "next/headers";
import { getPayload } from "./payload";

export const getAuth = async () => {
  const headers = await nextHeaders();
  const payload = await getPayload();
  return await payload.auth({ headers });
};
