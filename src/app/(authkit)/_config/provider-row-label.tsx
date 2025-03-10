"use client";

import { useRowLabel } from "@payloadcms/ui";

export const ProviderRowLabel = () => {
  const { data } = useRowLabel<{ provider: string }>();

  return <div>{data.provider}</div>;
};
