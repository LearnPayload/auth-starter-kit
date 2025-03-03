import type { CollectionConfig } from "payload";
import { randomBytes } from "node:crypto";
import { oAuthCallbackEndpoint } from "./endpoints";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    verify: false, // we create a custom verification flow
  },
  endpoints: [oAuthCallbackEndpoint],
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
      required: true,
    },
    {
      name: "avatar",
      type: "text",
      required: true,
      defaultValue: () => {
        return `https://api.dicebear.com/9.x/bottts/png?seed=${Date.now()}`;
      },
    },
  ],
};
