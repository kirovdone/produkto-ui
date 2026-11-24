import { cva } from "class-variance-authority";
import { panelExit, panelSlides } from "../../recipes/panel";
import { surfaceFill } from "../../recipes/appearance";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type { SeparatorOrientation } from "../Separator";

export const toolbarClasses = cva(
  `flex items-center gap-1 overflow-x-auto ${surfaceFill.solid} p-1 scrollbar-none data-[orientation=vertical]:flex-col`,
  {
    variants: {
      borderRadius: borderRadiusVariants,
    },
    defaultVariants: {
      borderRadius: "base",
    },
  },
);

export const toolbarLayerClasses = `z-50 origin-(--radix-popover-content-transform-origin) outline-none ${panelSlides} ${panelExit} motion-safe:data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`;

export const toolbarLinkClasses = "inline-flex h-8 items-center px-2 label-sm";

export const toolbarSeparatorClasses = cva("", {
  variants: {
    orientation: {
      horizontal: "my-1 w-5",
      vertical: "mx-1 h-5 self-center",
    } satisfies Record<SeparatorOrientation, string>,
  },
});
