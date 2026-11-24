import { cva } from "class-variance-authority";
import type {
  CarouselOrientation,
  CarouselStepDirection,
} from "./Carousel.types";
import {
  pagerButton,
  pagerMark,
  pagerMarkCurrent,
  pagerMarkIdle,
  pagerRow,
} from "../../recipes/pager";

export const carouselClasses = "relative";

export const carouselViewportClasses = "overflow-hidden";

export const carouselContentClasses = cva("flex", {
  variants: {
    orientation: {
      horizontal: "-ms-4",
      vertical: "-mt-4 flex-col",
    } satisfies Record<CarouselOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const carouselItemClasses = cva("min-w-0 shrink-0 grow-0 basis-full", {
  variants: {
    orientation: {
      horizontal: "ps-4",
      vertical: "pt-4",
    } satisfies Record<CarouselOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const carouselStepClasses = cva("absolute touch-manipulation", {
  variants: {
    toward: {
      back: "",
      forward: "",
    } satisfies Record<CarouselStepDirection, string>,
    orientation: {
      horizontal: "inset-y-0 my-auto",
      vertical: "inset-x-0 mx-auto w-fit",
    } satisfies Record<CarouselOrientation, string>,
  },
  compoundVariants: [
    { toward: "back", orientation: "horizontal", className: "-start-12" },
    { toward: "forward", orientation: "horizontal", className: "-end-12" },
    { toward: "back", orientation: "vertical", className: "-top-12" },
    { toward: "forward", orientation: "vertical", className: "-bottom-12" },
  ],
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const carouselDotsClasses = pagerRow;

export const carouselDotClasses = pagerButton;

export const carouselDotMarkClasses = cva(pagerMark, {
  variants: {
    current: {
      true: pagerMarkCurrent,
      false: pagerMarkIdle,
    },
  },
  defaultVariants: {
    current: false,
  },
});
