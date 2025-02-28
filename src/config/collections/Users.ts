import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
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
