import { cva } from "class-variance-authority";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import type { NotFoundAppearance, NotFoundSize } from "./NotFound.types";

export const notFoundClasses = cva(
  "flex w-full min-w-0 flex-col items-center justify-center text-center text-balance",
  {
    variants: {
      appearance: {
        solid: "border border-border bg-card",
        soft: "border border-border bg-muted",
        outline: "border border-input",
        transparent: "border border-transparent",
      } satisfies Record<NotFoundAppearance, string>,
      size: {
        sm: "h-20 px-4 description-xs",
        base: "h-24 px-6 description-sm",
        lg: "h-32 px-8 description-base",
      } satisfies Record<NotFoundSize, string>,
      borderRadius: boxBorderRadiusVariants,
      stacked: {
        true: "h-auto gap-3",
        false: "",
      },
    },
    compoundVariants: [
      { stacked: true, size: "sm", class: "py-4" },
      { stacked: true, size: "base", class: "py-6" },
      { stacked: true, size: "lg", class: "py-8" },
    ],
    defaultVariants: {
      appearance: "solid",
      size: "base",
      borderRadius: "lg",
      stacked: false,
    },
  },
);

export const notFoundTextClasses = "flex flex-col items-center gap-2";

export const notFoundDescriptionClasses = cva("", {
  variants: {
    size: {
      sm: "description-xs",
      base: "description-sm",
      lg: "description-sm",
    } satisfies Record<NotFoundSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const notFoundTitleClasses = cva("text-foreground", {
  variants: {
    size: {
      sm: "heading-xs",
      base: "heading-sm",
      lg: "heading-base",
    } satisfies Record<NotFoundSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});
