import { User } from "@/payload-types";
import { CollectionSlug, getFieldsToSign } from "payload";
import { getPayload } from "../_services/payload";
import { jwtSign } from "./jwt-sign";
import { setAuthCookie } from "./set-auth-cookie";

type LoginWithOptions = {
  collection: CollectionSlug;
};

export const loginAs = async (
  user: User,
  { collection = "users" }: LoginWithOptions,
) => {
  const payload = await getPayload();

  const userWithCollection: User & {
    collection: "users";
  } = {
    ...user,
    collection: "users",
  };

  const collectionConfig = payload.collections[collection].config;

  if (!collectionConfig.auth) {
    throw new Error("Collection is not used for authentication");
  }

  const secret = payload.secret;
  const fieldsToSign = getFieldsToSign({
    collectionConfig,
    email: userWithCollection.email,
    user: userWithCollection,
  });

  const { token } = await jwtSign({
    fieldsToSign,
    secret,
    tokenExpiration: collectionConfig.auth.tokenExpiration,
  });

  await setAuthCookie(token);
};
