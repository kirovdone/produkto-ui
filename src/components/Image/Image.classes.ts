import { cva } from "class-variance-authority";
import { borderRadiusVariants } from "../../recipes/borderRadius";

export const imageClasses = cva("", {
  variants: {
    borderRadius: borderRadiusVariants,
  },
  defaultVariants: {
    borderRadius: "none",
  },
});

export const imageFallbackClasses =
  "flex max-w-full min-h-8 min-w-8 shrink-0 items-center justify-center overflow-hidden bg-muted text-muted-foreground/60 [&>svg]:size-1/2 [&>svg]:max-h-12 [&>svg]:max-w-12";
