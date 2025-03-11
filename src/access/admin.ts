import type { AccessArgs } from "payload";

import type { User } from "@/payload-types";

type isAdmin = (args: AccessArgs<User>) => boolean;

export const isAdmin: isAdmin = ({ req: { user } }) => {
  return user?.role === "admin";
};
