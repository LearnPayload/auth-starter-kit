import { getPayload } from "@/authkit/services/payload";
import { CustomMDX } from "@/components/mdx";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { RequiredDataFromCollectionSlug } from "payload";
import { cache } from "react";

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = "home" } = await paramsPromise;

  let page: RequiredDataFromCollectionSlug<"docs"> | null;

  page = await queryPageBySlug({
    slug,
  });

  if (!page) {
    notFound();
  }

  const { content } = page;

  return (
    <article className="prose dark:prose-invert lg:prose-xl mx-auto">
      {<CustomMDX source={content} />}
    </article>
  );
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload();

  const result = await payload.find({
    collection: "docs",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
