import { env } from "@/env.mjs";
import { s3Storage } from "@payloadcms/storage-s3";

export const payloadStorage = s3Storage({
  collections: {
    media: true,
  },
  bucket: "learn-payload",
  config: {
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
    region: "nyc3",
    endpoint: "https://nyc3.digitaloceanspaces.com",
    // ... Other S3 configuration
  },
});
