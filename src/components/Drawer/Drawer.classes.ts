import { cva } from "class-variance-authority";
import { modalTitle, scrim } from "../../recipes/modal";
import type { DrawerLayout, DrawerSide, DrawerSize } from "./Drawer.types";

export const drawerOverlayClasses = scrim;

export const drawerContentClasses = cva(
  "group/drawer-content fixed z-50 flex flex-col overflow-hidden border-border bg-clip-padding body-sm text-foreground outline-none motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 h-auto border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        bottom:
          "inset-x-0 bottom-0 h-auto border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
      } satisfies Record<DrawerSide, string>,
      size: {
        sm: "",
        base: "",
        lg: "",
      } satisfies Record<DrawerSize, string>,
      layout: {
        floating: "border-transparent bg-popover shadow-sm",
        docked: "bg-sidebar",
      } satisfies Record<DrawerLayout, string>,
      scrollable: {
        true: "",
        false: "gap-4 has-[>[data-part=drawer-header][data-bordered]]:gap-3",
      },
    },
    compoundVariants: [
      { side: ["left", "right"], size: "sm", className: "sm:max-w-xs" },
      { side: ["left", "right"], size: "base", className: "sm:max-w-sm" },
      { side: ["left", "right"], size: "lg", className: "sm:max-w-md" },
      { side: ["top", "bottom"], size: "sm", className: "max-h-[50dvh]" },
      { side: ["top", "bottom"], size: "lg", className: "min-h-[50dvh]" },
    ],
    defaultVariants: {
      side: "right",
      size: "base",
      layout: "floating",
      scrollable: true,
    },
  },
);

export const drawerBodyClasses =
  "min-h-0 flex-1 [&>[data-part=scroll-area-viewport]>div]:gap-4";

export const drawerCloseButtonClasses =
  "absolute top-2.5 end-2.5 group-has-[[data-part=drawer-header][data-bordered]]/drawer-content:top-3 group-has-[[data-part=drawer-header][data-bordered]]/drawer-content:end-3";

export const drawerHeaderClasses = cva(
  "flex flex-col gap-0.5 p-4 group-has-[>[data-part=drawer-close]]/drawer-content:pe-12",
  {
    variants: {
      bordered: {
        true: "box-content min-h-8 justify-center border-b border-border p-3 group-has-[>[data-part=drawer-close]]/drawer-content:pe-13",
        false: "",
      },
    },
    defaultVariants: {
      bordered: false,
    },
  },
);

export const drawerFooterClasses = cva("mt-auto flex flex-col gap-2 p-4", {
  variants: {
    bordered: {
      true: "box-content min-h-8 flex-row items-center justify-end border-t border-border p-3",
      false: "",
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

export const drawerTitleClasses = modalTitle;

export const drawerDescriptionClasses = "description-sm";
