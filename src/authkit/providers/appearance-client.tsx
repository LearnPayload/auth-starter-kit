"use client";

import { useEffect } from "react";

export const AppearanceClient = ({
  onLoad,
}: {
  onLoad: (appearance: string) => void;
}) => {
  useEffect(() => {
    onLoad("system");
  }, []);
};
