import { GlobalConfig } from "payload";

const AuthGlobalConfig: GlobalConfig = {
  slug: "auth-settings",
  label: "Auth Settings",
  fields: [
    {
      name: "authProviders",
      label: "Authentication Providers",
      type: "array",
      fields: [
        {
          name: "provider",
          label: "Provider",
          type: "select",
          options: [
            {
              label: "Github",
              value: "github",
            },
            {
              label: "Google",
              value: "google",
            },
            {
              label: "Facebook",
              value: "facebook",
            },
          ],
          required: true,
        },
        {
          name: "clientId",
          label: "Client ID",
          type: "text",
          required: true,
        },
        {
          name: "clientSecret",
          label: "Client Secret",
          type: "text", // Changed to text field
          admin: {
            components: {
              Field:
                "@/app/(auth)/_config/fields/password/password#PasswordField",
            },
          },
          required: true,
          hooks: {
            beforeChange: [
              async ({ value, req }) => {
                const encryptedSecret = await req.payload.encrypt(value);

                return encryptedSecret;
              },
            ],
            afterRead: [
              async ({ value, req }) => {
                const decryptedSecret = await req.payload.decrypt(value);

                return decryptedSecret;
              },
            ],
          },
        },
      ],
    },
    {
      name: "allowRegistration",
      label: "Allow Registration",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "requireEmailVerification",
      label: "Require Email Verification",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "passwordMinLength",
      label: "Password Minimum Length",
      type: "number",
      defaultValue: 8,
    },
    {
      name: "passwordComplexity",
      label: "Password Complexity",
      type: "group",
      fields: [
        {
          name: "requireUppercase",
          label: "Require Uppercase Letters",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "requireLowercase",
          label: "Require Lowercase Letters",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "requireNumbers",
          label: "Require Numbers",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "requireSpecialCharacters",
          label: "Require Special Characters",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
  ],
};

export default AuthGlobalConfig;
