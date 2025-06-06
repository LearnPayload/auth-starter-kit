import { CollectionAfterLoginHook } from "payload";

export const afterLogin: CollectionAfterLoginHook = async ({ user, req }) => {
  await req.payload.update({
    collection: "users",
    id: user.id,
    data: {
      last_signed_in: new Date().toISOString(),
    },
  });
};
