import { GlobalConfig } from "payload";

const AuthGlobalConfig: GlobalConfig = {
  slug: "auth-settings",
  label: "Auth Settings",
  admin: {
    livePreview: {
      url: ({ req }) => {
        req.payload.logger.info(
          `Live preview URL: ${process.env.NEXT_PUBLIC_VERCEL_URL}/live-preview/login`,
        );
        return `${process.env.NEXT_PUBLIC_VERCEL_URL}/live-preview/login`;
      },
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Email & Password",
          description: "Email and password requirement options",
          fields: [
            {
              name: "enable_credentials",
              label: "Allow sign in with email and password",
              type: "checkbox",
              defaultValue: true,
            },
            {
              name: "enable_password_reset",
              label: "Enable Password Reset",
              type: "checkbox",
            },
            {
              name: "enable_one_time_password_access",
              label: "Enable OTP (One-time Password)",
              type: "checkbox",
            },
          ],
        },
        {
          label: "Social providers",
          description: "Choose which social providers to enable",
          fields: [
            {
              name: "enable_google",
              label: "Google",
              type: "checkbox",
            },
            {
              name: "enable_github",
              label: "GitHub",
              type: "checkbox",
            },
          ],
        },
        {
          label: "Sign In",
          description: "Settings for the sign in page",
          fields: [
            {
              name: "title",
              label: "Title",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default AuthGlobalConfig;
