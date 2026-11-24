import { cva } from "class-variance-authority";
import { statusPaint } from "../../recipes/appearance";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type { BadgeBorderRadius, BadgeSize } from "./Badge.types";

export const badgeClasses = cva(
  "inline-flex w-fit shrink-0 items-center justify-center overflow-hidden border py-0.5 whitespace-nowrap transition-colors outline-none [a&]:hover:opacity-80 [a&]:focus-visible:opacity-80 aria-invalid:inset-ring aria-invalid:inset-ring-destructive/60 [&>svg]:pointer-events-none",
  {
    variants: {
      tone: statusPaint,
      size: {
        sm: "h-4 gap-1 px-1.5 caption-2xs has-data-[icon=inline-start]:ps-1 has-data-[icon=inline-end]:pe-1 [&>svg:not([class*='size-'])]:size-2.5",
        base: "h-5 gap-1.5 px-2 caption-xs has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 [&>svg:not([class*='size-'])]:size-3",
        lg: "h-6 gap-2 px-2.5 caption-sm has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2 [&>svg:not([class*='size-'])]:size-3.5",
      } satisfies Record<BadgeSize, string>,
      borderRadius: {
        ...borderRadiusVariants,
        full: `${borderRadiusVariants.full} tabular-nums`,
      } satisfies Record<BadgeBorderRadius, string>,
    },
    compoundVariants: [
      { borderRadius: "full", size: "sm", className: "min-w-4 px-1" },
      { borderRadius: "full", size: "base", className: "min-w-5 px-1.5" },
      { borderRadius: "full", size: "lg", className: "min-w-6 px-1.5" },
    ],
    defaultVariants: {
      tone: "info",
      size: "base",
      borderRadius: "base",
    },
  },
);
