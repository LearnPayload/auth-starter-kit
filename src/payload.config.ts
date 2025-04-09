import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "./config/collections/Media";
import { Users } from "./config/collections/Users/Users";
import { emailConfig } from "./config/email/config";
import { payloadStorage } from "./config/storage/s3";
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
  serverURL: env.NEXT_PUBLIC_SERVER_URL,
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [
    payloadStorage,
    // storage-adapter-placeholder
  ],
});
