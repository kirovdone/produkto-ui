import { cva } from "class-variance-authority";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type { ProgressSize } from "./Progress.types";

export const progressClasses = cva(
  "relative w-full overflow-hidden bg-primary/20",
  {
    variants: {
      size: {
        sm: "h-1",
        base: "h-2",
        lg: "h-3",
      } satisfies Record<ProgressSize, string>,
      borderRadius: borderRadiusVariants,
    },
    defaultVariants: {
      size: "base",
      borderRadius: "full",
    },
  },
);

export const progressSegmentsClasses = cva("flex w-fit items-center", {
  variants: {
    size: {
      sm: "gap-0.5",
      base: "gap-1",
      lg: "gap-1.5",
    } satisfies Record<ProgressSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const progressSegmentClasses = cva(
  "shrink-0 bg-primary/25 transition-[width,background-color] duration-300 data-filled:bg-primary",
  {
    variants: {
      size: {
        sm: "size-1 data-filled:w-3",
        base: "size-1.5 data-filled:w-4",
        lg: "size-2 data-filled:w-5",
      } satisfies Record<ProgressSize, string>,
      borderRadius: borderRadiusVariants,
    },
    defaultVariants: {
      size: "base",
      borderRadius: "full",
    },
  },
);

export const progressIndicatorClasses =
  "h-full w-full flex-1 bg-primary transition-transform duration-500 ease-in-out data-[state=indeterminate]:w-2/5 motion-safe:data-[state=indeterminate]:animate-in data-[state=indeterminate]:[animation-duration:1.5s] data-[state=indeterminate]:[animation-iteration-count:infinite] data-[state=indeterminate]:[animation-timing-function:ease-in-out] data-[state=indeterminate]:slide-in-from-left data-[state=indeterminate]:transform-[translateX(250%)] motion-reduce:data-[state=indeterminate]:transform-[translateX(75%)]";
