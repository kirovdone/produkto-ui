import { cva } from "class-variance-authority";
import { glyphRow } from "../../recipes/menu";
import type { TabsListBorderRadius, TabsListSize } from "./Tabs.types";

export const tabsClasses =
  "group/tabs flex gap-3 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:gap-4";

const tabsListBase =
  "group/tabs-list inline-flex w-fit justify-center text-muted-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:items-stretch";

export const tabsListClasses = `${tabsListBase} items-stretch`;

export const tabsListWrapClasses = "h-auto max-w-full flex-wrap";

export const tabsListBorderRadiusClasses = cva("", {
  variants: {
    borderRadius: {
      none: "[--tabs-radius:0px]",
      xs: "[--tabs-radius:var(--radius-sm)]",
      sm: "[--tabs-radius:var(--radius-md)]",
      base: "[--tabs-radius:var(--radius-lg)]",
      lg: "[--tabs-radius:var(--radius-xl)]",
      xl: "[--tabs-radius:var(--radius-2xl)]",
      full: "[--tabs-radius:calc(infinity*1px)]",
    } satisfies Record<TabsListBorderRadius, string>,
  },
  defaultVariants: {
    borderRadius: "base",
  },
});

const tabsTriggerBase = `relative inline-flex min-w-fit flex-1 cursor-pointer items-center justify-center whitespace-nowrap text-foreground transition-colors outline-none focus-visible:z-10 disabled:pointer-events-none disabled:opacity-50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start ${glyphRow}`;

const tabsTriggerJoined =
  "rounded-none border group-data-[orientation=horizontal]/tabs:first:rounded-s-(--tabs-radius) group-data-[orientation=horizontal]/tabs:last:rounded-e-(--tabs-radius) group-data-[orientation=horizontal]/tabs:not-first:border-s-0 group-data-[orientation=vertical]/tabs:first:rounded-t-(--tabs-radius) group-data-[orientation=vertical]/tabs:last:rounded-b-(--tabs-radius) group-data-[orientation=vertical]/tabs:not-first:border-t-0";

const tabsTriggerPaint =
  "group-data-[appearance=outline]/tabs-list:border-border group-data-[appearance=outline]/tabs-list:hover:bg-foreground/7 group-data-[appearance=outline]/tabs-list:focus-visible:bg-foreground/7 group-data-[appearance=outline]/tabs-list:data-[state=active]:bg-foreground/7 group-data-[appearance=solid]/tabs-list:border-border group-data-[appearance=solid]/tabs-list:bg-card group-data-[appearance=solid]/tabs-list:hover:bg-hover group-data-[appearance=solid]/tabs-list:focus-visible:bg-hover group-data-[appearance=solid]/tabs-list:data-[state=active]:bg-foreground/7 group-data-[appearance=soft]/tabs-list:border-transparent group-data-[appearance=soft]/tabs-list:bg-muted group-data-[appearance=soft]/tabs-list:hover:bg-foreground/10 group-data-[appearance=soft]/tabs-list:focus-visible:bg-foreground/10 group-data-[appearance=soft]/tabs-list:data-[state=active]:bg-foreground/10 group-data-[appearance=transparent]/tabs-list:border-transparent group-data-[appearance=transparent]/tabs-list:hover:bg-foreground/7 group-data-[appearance=transparent]/tabs-list:focus-visible:bg-foreground/7 group-data-[appearance=transparent]/tabs-list:data-[state=active]:bg-foreground/7";

export const tabsTriggerClasses = cva(
  `${tabsTriggerBase} ${tabsTriggerJoined} ${tabsTriggerPaint}`,
  {
    variants: {
      size: {
        sm: "min-h-6 gap-1 px-1.5 label-xs [&_svg:not([class*='size-'])]:size-3.5",
        base: "min-h-8 px-2 label-sm",
        lg: "min-h-10 gap-2 px-3 label-base [&_svg:not([class*='size-'])]:size-5",
      } satisfies Record<TabsListSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const tabsContentClasses =
  "min-w-0 flex-1 space-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60";
