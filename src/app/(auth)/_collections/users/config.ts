import type { CollectionConfig } from "payload";
import { randomBytes } from "node:crypto";
import { oAuthCallbackEndpoint } from "./endpoints";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    verify: false, // Disable email verification to create a custom flow
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
        return randomBytes(25).toString("hex");
      },
    },
    {
      name: "name",
      type: "text",
      required: false,
    },
    {
      name: "avatar",
      type: "text",
      required: true,
      defaultValue: () => {
        return `https://api.dicebear.com/9.x/bottts/png?seed=${Date.now()}`;
      },
    },
    // One time password and expiry
    {
      name: "_verified",
      type: "checkbox",
      required: false,
      defaultValue: false,
      saveToJWT: true,
    },
    {
      name: "otp",
      type: "text",
      minLength: 6,
      required: false,
      admin: {
        disabled: true,
      },
    },
    {
      name: "otp_expiration",
      type: "date",
      required: false,
      admin: {
        disabled: true,
      },
    },
  ],
};
