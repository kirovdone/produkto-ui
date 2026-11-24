import { cva } from "class-variance-authority";
import type { LabelSize } from "./Label.types";

export const labelClasses = cva(
  "inline-flex w-fit items-center gap-1 text-muted-foreground select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "label-xs",
        base: "label-sm",
        lg: "label-base",
      } satisfies Record<LabelSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const labelRequiredClasses = "text-destructive";

export const labelRowClasses = "inline-flex w-fit items-center gap-1";

export const labelInfoClasses = cva(
  "inline-flex shrink-0 cursor-help items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground",
  {
    variants: {
      size: {
        sm: "size-3.5 [&_svg]:size-3",
        base: "size-4 [&_svg]:size-3.5",
        lg: "size-5 [&_svg]:size-4",
      } satisfies Record<LabelSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);
