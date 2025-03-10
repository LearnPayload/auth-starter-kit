export const sizes = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const;

export type IconComponentProps = {
  size?: keyof typeof sizes;
  className?: string;
};
