// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Media } from "./config/collections/Media";
import { Users } from "./app/_authkit/collections/users/users-collection-config";
import { emailConfig } from "./app/_authkit/config/email/config";
import AuthGlobalConfig from "./app/_authkit/config/globals";
import { env } from "./env.mjs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: await emailConfig(),
  globals: [AuthGlobalConfig],
  serverURL: env.NEXT_PUBLIC_VERCEL_URL,
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
