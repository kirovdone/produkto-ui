export type BorderRadius = "none" | "xs" | "sm" | "base" | "lg" | "xl" | "full";

export type BoxBorderRadius = Extract<
  BorderRadius,
  "none" | "xs" | "sm" | "base" | "lg" | "xl"
>;

export const boxBorderRadiusVariants = {
  none: "rounded-none",
  xs: "rounded-sm",
  sm: "rounded-md",
  base: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
} satisfies Record<BoxBorderRadius, string>;

export const borderRadiusVariants = {
  ...boxBorderRadiusVariants,
  full: "rounded-full",
} satisfies Record<BorderRadius, string>;
