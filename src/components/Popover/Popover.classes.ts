import { cva } from "class-variance-authority";
import {
  panelCapped,
  panelEnter,
  panelExit,
  panelFrame,
  panelWidth,
} from "../../recipes/panel";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import type { PopoverSize } from "./Popover.types";

const room = {
  sm: "gap-0.5 p-0.5",
  base: "gap-1 p-1",
  lg: "gap-1.5 p-1.5",
} satisfies Record<PopoverSize, string>;

export const popoverContentClasses = cva(
  `[--panel-room:var(--radix-popover-content-available-height)] [--panel-origin:var(--radix-popover-content-transform-origin)] ${panelFrame} ${panelCapped} ${panelWidth} max-w-[calc(100vw-2rem)] outline-none ${panelEnter} ${panelExit}`,
  {
    variants: {
      size: {
        sm: "body-xs",
        base: "body-sm",
        lg: "body-base",
      } satisfies Record<PopoverSize, string>,
      borderRadius: boxBorderRadiusVariants,
      scrollable: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { scrollable: false, size: "sm", className: room.sm },
      { scrollable: false, size: "base", className: room.base },
      { scrollable: false, size: "lg", className: room.lg },
    ],
    defaultVariants: {
      size: "base",
      borderRadius: "lg",
      scrollable: true,
    },
  },
);

export const popoverBodyClasses = "min-h-0 flex-1";

export const popoverBodyInnerClasses = cva("flex flex-col", {
  variants: {
    size: room,
  },
  defaultVariants: {
    size: "base",
  },
});

export const popoverHeaderClasses = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-0.5",
      base: "gap-1",
      lg: "gap-1.5",
    } satisfies Record<PopoverSize, string>,
    bordered: {
      true: "shrink-0 border-b border-border",
      false: "",
    },
  },
  compoundVariants: [
    { bordered: true, size: "sm", className: "p-0.5" },
    { bordered: true, size: "base", className: "p-1" },
    { bordered: true, size: "lg", className: "p-1.5" },
  ],
  defaultVariants: {
    size: "base",
    bordered: false,
  },
});

export const popoverTitleClasses = cva("", {
  variants: {
    size: {
      sm: "heading-xs",
      base: "heading-sm",
      lg: "heading-base",
    } satisfies Record<PopoverSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const popoverDescriptionClasses = cva("", {
  variants: {
    size: {
      sm: "description-xs",
      base: "description-sm",
      lg: "description-base",
    } satisfies Record<PopoverSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});
