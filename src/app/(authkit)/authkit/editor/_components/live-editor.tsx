"use client";
import { Card } from "@/components/ui/card";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export const LiveEditorClient = () => {
  const scope = { Card };

  return (
    <LiveProvider code="<Card>Hello World!</Card>" scope={scope}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};
