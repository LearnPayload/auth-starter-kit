import { GlobalConfig } from "payload";

export const AuthSettings: GlobalConfig = {
  slug: "auth-settings",
  fields: [
    {
      type: "tabs", // required
      tabs: [
        // required
        {
          label: "General settings", // required
          description: "Basics",
          fields: [
            {
              name: "include_name",
              label: "Include Name",
              type: "checkbox",
            },
            {
              name: "include_phone",
              label: "Include Phone",
              type: "checkbox",
            },
            {
              name: "include_username",
              label: "Include Username",
              type: "checkbox",
            },
          ],
        },
        {
          label: "Providers", // required
          fields: [
            // required
            {
              name: "providers", // accessible via tabTwo.numberField
              type: "group",
              fields: [
                {
                  name: "provider_group_google",
                  type: "group",
                  fields: [
                    {
                      name: "provider_group_google_enabled",
                      label: "Enabled",
                      type: "checkbox",
                    },
                    {
                      name: "provider_group_google_api_app_id",
                      label: "App ID",
                      type: "text",
                    },
                    {
                      name: "provider_group_google_api_app_secret",
                      label: "App Secret",
                      type: "text",
                    },
                  ],
                },
                {
                  name: "provider_group_github",
                  type: "group",
                  fields: [
                    {
                      name: "provider_group_github_enabled",
                      label: "Enabled",
                      type: "checkbox",
                    },
                    {
                      name: "provider_group_github_api_app_id",
                      label: "App ID",
                      type: "text",
                    },
                    {
                      name: "provider_group_github_api_app_secret",
                      label: "App Secret",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
