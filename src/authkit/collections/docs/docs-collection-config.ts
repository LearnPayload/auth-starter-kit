import { isAdmin } from "@/access/admin";
import { anyone } from "@/access/anyone";
import { CollectionConfig } from "payload";

export const Docs: CollectionConfig = {
  slug: "docs",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "updatedAt"],
  },
  access: {
    read: anyone,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "This will be used in the URL (e.g., /docs/getting-started)",
      },
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      admin: {
        description: "MDX content for this documentation page",
      },
    },
  ],
  timestamps: true,
};
