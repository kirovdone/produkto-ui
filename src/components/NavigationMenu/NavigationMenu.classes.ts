import { cva } from "class-variance-authority";
import { quietControl, transparentControl } from "../../recipes/control";
import { glyphRow, glyphs } from "../../recipes/menu";
import { panelExit, panelSurface } from "../../recipes/panel";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import type {
  NavigationMenuBorderRadius,
  NavigationMenuSize,
} from "./NavigationMenu.types";

export const navigationMenuClasses =
  "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center";

export const navigationMenuListClasses =
  "flex flex-1 list-none items-center justify-center gap-1";

export const navigationMenuItemClasses = "relative";

export const navigationMenuTriggerClasses = cva(
  `group/navigation-menu-trigger inline-flex w-max cursor-pointer flex-row items-center justify-center rounded-lg whitespace-nowrap transition-colors outline-none ${transparentControl} disabled:pointer-events-none disabled:opacity-50 data-active:bg-foreground/7 data-[state=open]:bg-foreground/7 ${glyphRow}`,
  {
    variants: {
      size: {
        sm: "h-7 px-1.5 py-1 label-xs [&_svg:not([class*='size-'])]:size-3.5",
        base: "h-8 px-2 py-1.5 label-sm",
        lg: "h-10 px-3 py-2 label-base [&_svg:not([class*='size-'])]:size-5",
      } satisfies Record<NavigationMenuSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const navigationMenuTriggerIconClasses =
  "text-muted-foreground transition-transform group-data-[state=open]/navigation-menu-trigger:rotate-180";

export const navigationMenuContentClasses = cva(
  "absolute start-0 top-0 grid w-80 gap-1 p-2 motion-safe:data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in-0 motion-safe:data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out-0 data-[motion=from-end]:slide-in-from-right-2 data-[motion=from-start]:slide-in-from-left-2 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-2 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-border group-data-[viewport=false]/navigation-menu:bg-card group-data-[viewport=false]/navigation-menu:text-foreground group-data-[viewport=false]/navigation-menu:shadow-sm group-data-[viewport=false]/navigation-menu:duration-200 motion-safe:group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 motion-safe:group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
  {
    variants: {
      borderRadius: {
        none: "group-data-[viewport=false]/navigation-menu:rounded-none [--inner-radius:0px]",
        xs: "group-data-[viewport=false]/navigation-menu:rounded-sm [--inner-radius:var(--radius-xs)]",
        sm: "group-data-[viewport=false]/navigation-menu:rounded-md [--inner-radius:var(--radius-sm)]",
        base: "group-data-[viewport=false]/navigation-menu:rounded-lg [--inner-radius:var(--radius-md)]",
        lg: "group-data-[viewport=false]/navigation-menu:rounded-xl [--inner-radius:var(--radius-lg)]",
        xl: "group-data-[viewport=false]/navigation-menu:rounded-2xl [--inner-radius:var(--radius-xl)]",
      } satisfies Record<NavigationMenuBorderRadius, string>,
    },
    defaultVariants: {
      borderRadius: "lg",
    },
  },
);

export const navigationMenuViewportWrapperClasses =
  "absolute start-0 top-full isolate z-50 flex justify-center";

export const navigationMenuViewportClasses = cva(
  `relative mt-2 box-content h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-top-left overflow-hidden ${panelSurface} transition-[width,height] duration-300 ${panelExit} motion-safe:data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
  {
    variants: {
      borderRadius: boxBorderRadiusVariants,
    },
    defaultVariants: {
      borderRadius: "lg",
    },
  },
);

export const navigationMenuLinkClasses = cva(
  `flex flex-col rounded-[var(--inner-radius,var(--radius-lg))] outline-none transition-colors ${quietControl} data-active:bg-muted data-active:text-foreground ${glyphs}`,
  {
    variants: {
      size: {
        sm: "gap-0.5 p-2 label-xs [&_svg:not([class*='size-'])]:size-3.5",
        base: "gap-1 p-3 label-sm",
        lg: "gap-1.5 p-4 label-base [&_svg:not([class*='size-'])]:size-5",
      } satisfies Record<NavigationMenuSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const navigationMenuIndicatorClasses =
  "top-full z-60 flex h-[9px] items-end justify-center overflow-hidden transition-[width,transform] duration-300 motion-safe:data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 motion-safe:data-[state=visible]:animate-in data-[state=visible]:fade-in-0";

export const navigationMenuIndicatorArrowClasses =
  "relative top-[45%] size-2.5 rotate-45 rounded-tl-xs border-t border-l border-border bg-popover";
