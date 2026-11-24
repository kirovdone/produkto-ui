import { cva } from "class-variance-authority";
import { borderRadiusVariants } from "../../recipes/borderRadius";

export const skeletonClasses = cva(
  "motion-safe:animate-pulse bg-foreground/7",
  {
    variants: {
      borderRadius: borderRadiusVariants,
    },
    defaultVariants: {
      borderRadius: "sm",
    },
  },
);

export const skeletonRowClasses = "flex h-8 min-w-0 items-center gap-2 px-2";

export const skeletonRowIconClasses = "size-4 shrink-0";

export const skeletonRowLineClasses = "h-4 flex-1";
