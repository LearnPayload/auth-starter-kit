import { CreateAccountProps } from "../forms/create-account/validation";
import { getPayload } from "./payload";

export const createUser = async (props: CreateAccountProps) => {
  const payload = await getPayload();

  const user = await payload.create({
    collection: "users",
    data: {
      name: props.name ?? "Guest",
      email: props.email,
      role: "user",
      avatar:
        props.avatar ??
        `https://api.dicebear.com/9.x/bottts/png?seed=${Date.now()}`,
    },
  });

  return user;
};
