import configPromise from "@payload-config";
import { getPayload as getPayloadFn } from "payload";

export async function getPayload() {
  return await getPayloadFn({ config: configPromise });
}
