import type { CollectionConfig } from "payload";
import { randomBytes } from "node:crypto";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    verify: false, // we create a custom verification flow
  },
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
      unique: true,
      admin: {
        disabled: true,
      },
      defaultValue: () => {
        return randomBytes(32).toString("hex");
      },
    },
    {
      name: "name",
      type: "text",
      required: false,
      hidden: true,
    },
    {
      name: "username",
      type: "text",
      required: false,
      unique: true,
      hidden: true,
    },
  ],
};
