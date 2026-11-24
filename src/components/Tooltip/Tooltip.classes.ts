import { cva } from "class-variance-authority";
import { panelExit, panelSlides } from "../../recipes/panel";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type { TooltipSize } from "./Tooltip.types";

export const tooltipContentClasses = cva(
  `z-50 inline-flex w-fit origin-(--radix-tooltip-content-transform-origin) items-center border border-transparent bg-popover text-foreground shadow-sm ${panelSlides} motion-safe:data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 ${panelExit}`,
  {
    variants: {
      size: {
        sm: "max-w-64 gap-1 px-1.5 py-0.5 body-2xs",
        base: "max-w-64 gap-1.5 px-2 py-1 body-xs",
        lg: "max-w-72 gap-2 px-2.5 py-1.5 body-sm",
      } satisfies Record<TooltipSize, string>,
      borderRadius: borderRadiusVariants,
    },
    defaultVariants: {
      size: "base",
      borderRadius: "sm",
    },
  },
);

export const tooltipArrowClasses =
  "-translate-y-px overflow-visible fill-popover stroke-border";
