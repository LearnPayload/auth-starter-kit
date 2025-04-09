import { generateUserId } from "@/authkit/lib/generate-user-id";
import { isAdmin } from "@/config/access/admin";
import type { CollectionConfig } from "payload";
import { oAuthCallbackEndpoint } from "./endpoints";
import { afterLogin } from "./hooks";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: isAdmin,
  },
  admin: {
    useAsTitle: "email",
  },
  auth: {
    verify: false, // Disable email verification to create a custom flow
  },
  hooks: {
    afterLogin: [afterLogin],
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
      defaultValue: generateUserId,
    },
    {
      name: "name",
      type: "text",
      required: false,
    },
    {
      name: "avatar",
      type: "text",
      required: false,
      defaultValue: () => {
        return `https://api.dicebear.com/9.x/bottts/png?seed=${Date.now()}`;
      },
    },

    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      required: true,
      defaultValue: "user",
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

    {
      name: "last_signed_in",
      type: "date",
      required: false,
    },
  ],
};
