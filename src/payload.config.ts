// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Docs } from "./authkit/collections/docs/docs-collection-config";
import { Users } from "./authkit/collections/users/users-collection-config";
import { emailConfig } from "./authkit/config/email/config";
import AuthGlobalConfig from "./authkit/config/globals";
import { Media } from "./config/collections/Media";
import { payloadStorage } from "./config/storage/s3";

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
  serverURL: process.env.NEXT_PUBLIC_VERCEL_URL,
  collections: [Users, Docs, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    payloadStorage,
    // storage-adapter-placeholder
  ],
});
