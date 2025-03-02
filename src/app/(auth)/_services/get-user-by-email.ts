import { getPayload } from "./payload";

export const getUserByEmail = async (email: string) => {
  const payload = await getPayload();
  const result = await payload.find({
    collection: "users", // required
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (result.totalDocs === 0) {
    return null;
  }

  return result.docs[0];
};
