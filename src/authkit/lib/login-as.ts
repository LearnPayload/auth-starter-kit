import { getFieldsToSign } from "payload";
import { getPayload } from "../services/payload";
import { jwtSign } from "./jwt-sign";
import { setAuthCookie } from "./set-auth-cookie";
import { User } from "./user";

export const loginAs = async (user: User) => {
  const payload = await getPayload();

  const collectionConfig = payload.collections[user.collection].config;

  if (!collectionConfig.auth) {
    throw new Error("Collection is not used for authentication");
  }

  const secret = payload.secret;
  const fieldsToSign = getFieldsToSign({
    collectionConfig,
    email: user.email,
    user: user.asTypedUser(),
  });

  const { token } = await jwtSign({
    fieldsToSign,
    secret,
    tokenExpiration: collectionConfig.auth.tokenExpiration,
  });

  await setAuthCookie(token);

  await payload.update({
    collection: "users",
    id: user.id,
    data: {
      last_signed_in: new Date().toISOString(),
    },
  });
};
