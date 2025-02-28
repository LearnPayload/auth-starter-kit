import { createElement, forwardRef } from "react";

interface IconComponentProps {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    {
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      ...rest
    },
    ref,
  ) => {
    return createElement(
      "svg",
      {
        ref,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth
          ? (Number(strokeWidth) * 24) / Number(size)
          : strokeWidth,
        className,
        ...rest,
      },
      import("./icons/" + rest.name).then((icon) => icon.default),
    );
  },
);

Icon.displayName = "Icon";

export default Icon;
