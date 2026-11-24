import { cva } from "class-variance-authority";
import type { MarqueeOrientation } from "./Marquee.types";

export const marqueeClasses = cva("overflow-hidden", {
  variants: {
    orientation: {
      horizontal:
        "w-full [mask-image:linear-gradient(to_right,transparent,black_4rem,black_calc(100%-4rem),transparent)]",
      vertical:
        "h-full [mask-image:linear-gradient(to_bottom,transparent,black_4rem,black_calc(100%-4rem),transparent)]",
    } satisfies Record<MarqueeOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const marqueeTrackClasses = cva("flex", {
  variants: {
    orientation: {
      horizontal: "w-max motion-reduce:flex-wrap",
      vertical: "h-max flex-col",
    } satisfies Record<MarqueeOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const marqueeGroupClasses = cva("flex shrink-0 gap-2", {
  variants: {
    orientation: {
      horizontal: "pr-2",
      vertical: "flex-col pb-2",
    } satisfies Record<MarqueeOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
