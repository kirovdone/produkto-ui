import { cva } from "class-variance-authority";
import type { SeparatorOrientation } from "./Separator.types";

export const separatorClasses = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px self-stretch",
    } satisfies Record<SeparatorOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
