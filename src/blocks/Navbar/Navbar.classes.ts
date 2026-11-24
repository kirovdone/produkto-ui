import { glyphRow } from "../../recipes/menu";
import { cva } from "class-variance-authority";
import type { NavbarArrangement, NavbarWidth } from "./Navbar.types";
import type {
  NavbarColumns,
  NavbarGroupCount,
  NavbarRows,
} from "./Navbar.types";

export const navbarClasses = cva("w-full text-foreground", {
  variants: {
    muted: {
      true: "bg-muted",
      false: "bg-background",
    },
    sticky: {
      true: "sticky top-0 z-40 backdrop-blur-md",
      false: "",
    },
    bordered: {
      true: "border-b border-border",
      false: "",
    },
    floating: {
      true: "px-4 pt-3",
      false: "",
    },
    over: {
      true: "sticky top-0 z-40 -mb-(--navbar-height) transition-[background-color,backdrop-filter] duration-300 data-scrolled:backdrop-blur-md",
      false: "",
    },
  },
  compoundVariants: [
    { sticky: true, muted: false, className: "bg-background/80" },
    { sticky: true, muted: true, className: "bg-muted/80" },
    { floating: true, className: "bg-transparent" },
    {
      over: true,
      muted: false,
      className: "bg-transparent data-scrolled:bg-background/80",
    },
    {
      over: true,
      muted: true,
      className: "bg-transparent data-scrolled:bg-muted/80",
    },
  ],
  defaultVariants: {
    muted: false,
    sticky: false,
    bordered: false,
    floating: false,
    over: false,
  },
});

export const navbarBarClasses = cva(
  "relative mx-auto flex h-(--navbar-height) w-full items-center gap-6 px-4",
  {
    variants: {
      width: {
        narrow: "max-w-3xl [--navbar-width:calc(min(100vw,48rem)_-_2rem)]",
        base: "max-w-6xl [--navbar-width:calc(min(100vw,72rem)_-_2rem)]",
        wide: "max-w-7xl [--navbar-width:calc(min(100vw,80rem)_-_2rem)]",
        full: "max-w-none [--navbar-width:calc(100vw_-_2rem)]",
      } satisfies Record<NavbarWidth, string>,
      floating: {
        true: "rounded-2xl border border-border bg-background shadow-md",
        false: "",
      },
    },
    defaultVariants: {
      width: "base",
      floating: false,
    },
  },
);

export const navbarStartClasses = cva("flex items-center", {
  variants: {
    align: {
      start: "shrink-0",
      center: "flex-1",
      end: "shrink-0",
      split: "flex-1",
    } satisfies Record<NavbarArrangement, string>,
  },
  defaultVariants: {
    align: "start",
  },
});

export const navbarBrandClasses =
  "flex shrink-0 items-center rounded-md heading-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/60";

export const navbarMenuClasses = cva(
  "hidden flex-initial self-stretch md:flex *:data-[part=navigation-menu-viewport-wrapper]:top-[calc(50%_+_1rem)]",
  {
    variants: {
      align: {
        start:
          "static *:data-[part=navigation-menu-viewport-wrapper]:inset-x-4 *:data-[part=navigation-menu-viewport-wrapper]:justify-start",
        center:
          "static *:data-[part=navigation-menu-viewport-wrapper]:inset-x-0",
        end: "static ms-auto *:data-[part=navigation-menu-viewport-wrapper]:inset-x-4 *:data-[part=navigation-menu-viewport-wrapper]:justify-end",
        split:
          "static max-w-none flex-1 *:first:w-full *:data-[part=navigation-menu-viewport-wrapper]:inset-x-4 *:data-[part=navigation-menu-viewport-wrapper]:justify-start",
      } satisfies Record<NavbarArrangement, string>,
    },
    defaultVariants: {
      align: "start",
    },
  },
);

export const navbarListClasses = "gap-2";

export const navbarPanelClasses = cva(
  "max-w-[calc(var(--navbar-width)_-_2px)] p-0",
  {
    variants: {
      columns: {
        1: "",
        2: "md:w-[36rem]",
        3: "md:w-[36rem] lg:w-[52rem]",
        4: "md:w-[36rem] lg:w-[52rem] xl:w-[66rem]",
        5: "md:w-[36rem] lg:w-[52rem] xl:w-[calc(var(--navbar-width)_-_2px)]",
      } satisfies Record<NavbarColumns, string>,
    },
    defaultVariants: {
      columns: 1,
    },
  },
);

export const navbarPanelScrollClasses = "max-h-[calc(100svh-6rem)]";

export const navbarStackedPanelClasses =
  "max-w-[calc(var(--navbar-width)_-_2px)] p-0 md:w-max";

export const navbarStackClasses = cva(
  "grid auto-cols-[minmax(0,18rem)] grid-flow-col gap-1 p-2",
  {
    variants: {
      rows: {
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        5: "grid-rows-5",
        6: "grid-rows-6",
      } satisfies Record<NavbarRows, string>,
    },
    defaultVariants: {
      rows: 5,
    },
  },
);

export const navbarPanelInnerClasses = cva("grid gap-1 p-2", {
  variants: {
    columns: {
      1: "",
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      5: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    } satisfies Record<NavbarColumns, string>,
  },
  defaultVariants: {
    columns: 1,
  },
});

export const navbarGroupedPanelClasses = cva(
  "max-w-[calc(var(--navbar-width)_-_2px)] p-0",
  {
    variants: {
      count: {
        1: "md:w-[22rem]",
        2: "md:w-[38rem]",
        3: "md:w-[38rem] lg:w-[52rem]",
        4: "md:w-[38rem] lg:w-[66rem]",
        5: "md:w-[38rem] lg:w-[52rem] xl:w-[calc(var(--navbar-width)_-_2px)]",
      } satisfies Record<NavbarGroupCount, string>,
    },
    defaultVariants: {
      count: 1,
    },
  },
);

export const navbarGroupsClasses = cva("grid gap-x-2 gap-y-5 p-2", {
  variants: {
    count: {
      1: "",
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4",
      5: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    } satisfies Record<NavbarGroupCount, string>,
  },
  defaultVariants: {
    count: 1,
  },
});

export const navbarGroupClasses = "flex min-w-0 flex-col gap-1";

export const navbarGroupLabelClasses = "px-3 pt-1 pb-1";

export const navbarPanelFooterClasses =
  "flex items-center border-t border-border bg-sidebar p-2";

export const navbarPanelLinkClasses = "min-w-0 data-[described]:items-start";

export const navbarLinkTextClasses = `flex w-full min-w-0 items-start ${glyphRow}`;

export const navbarLinkWordsClasses = "flex min-w-0 flex-1 flex-col gap-0.5";

export const navbarLinkDescriptionClasses =
  "w-full line-clamp-2 body-xs text-pretty text-muted-foreground";

export const navbarLinkIconClasses =
  "flex h-5 shrink-0 items-center text-foreground";

export const navbarLinkLabelClasses = "truncate";

export const navbarEndClasses = cva("flex items-center justify-end gap-2", {
  variants: {
    align: {
      start: "flex-1",
      center: "flex-1",
      end: "flex-none",
      split: "flex-none",
    } satisfies Record<NavbarArrangement, string>,
  },
  defaultVariants: {
    align: "start",
  },
});

export const navbarSentinelClasses = "block h-0";

export const navbarCentreClasses =
  "absolute left-1/2 flex -translate-x-1/2 items-center";

export const navbarSplitListClasses = "w-full justify-start";

export const navbarSplitAfterClasses = "ms-auto";

export const navbarSocialClasses = "flex items-center gap-1";

export const navbarActionsClasses = cva("flex-nowrap gap-2", {
  variants: {
    folds: {
      true: "hidden md:flex",
      false: "",
    },
  },
  defaultVariants: {
    folds: true,
  },
});

export const navbarDrawerTriggerClasses = "md:hidden";

export const navbarDrawerClasses = "w-full gap-0 border-0 p-0 sm:max-w-sm";

export const navbarDrawerHeaderClasses =
  "h-(--navbar-height) shrink-0 flex-row items-center justify-between gap-2 border-b border-border px-6 py-0";

export const navbarDrawerTitleClasses = "heading-lg";

export const navbarDrawerNavClasses =
  "flex flex-col divide-y divide-border px-6 *:py-2";

export const navbarDrawerGroupClasses = "flex flex-col gap-1";

export const navbarDrawerLabelClasses = "pb-1";

export const navbarDrawerLinksClasses = "flex flex-col gap-1";

export const navbarDrawerFoldClasses =
  "group/fold -mx-3 justify-between label-base";

export const navbarDrawerFoldIconClasses =
  "transition-transform group-data-[state=open]/fold:rotate-90";

export const navbarDrawerFoldBodyClasses = "flex flex-col gap-4 py-2";

export const navbarDrawerLinkClasses = "-mx-3 label-base";

export const navbarDrawerBodyClasses = "min-h-0 flex-1";

export const navbarDrawerActionsClasses =
  "shrink-0 flex-nowrap gap-2 px-6 py-6";
