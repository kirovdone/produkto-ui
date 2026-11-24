import { cva } from "class-variance-authority";
import type { TextAlign, TextSize, TextWeight } from "./Text.types";

export const textSizes = {
  xs: "body-xs",
  sm: "body-sm",
  base: "body-base",
  lg: "body-lg",
  xl: "body-xl",
  "2xl": "body-2xl",
  "3xl": "body-3xl",
  "4xl": "body-4xl",
  "5xl": "body-5xl",
} satisfies Record<TextSize, string>;

export const textClasses = cva("", {
  variants: {
    size: textSizes,
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    } satisfies Record<TextWeight, string>,
    align: {
      start: "text-start",
      center: "text-center",
      end: "text-end",
    } satisfies Record<TextAlign, string>,
    truncate: {
      true: "truncate",
      false: "",
    },
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
});
