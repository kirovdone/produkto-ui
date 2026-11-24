import { cva } from "class-variance-authority";
import { quietControl } from "../../recipes/control";
import { glyphRow } from "../../recipes/menu";
import {
  skeletonRowClasses,
  skeletonRowIconClasses,
  skeletonRowLineClasses,
} from "../Skeleton";
import type { SidebarBorderRadius } from "./Sidebar.types";

export const sidebarProviderClasses =
  "flex min-h-svh w-full bg-background text-foreground";

export const sidebarClasses = "group peer hidden text-foreground md:block";

export const sidebarBorderRadiusClasses = cva("", {
  variants: {
    borderRadius: {
      none: "[--sidebar-radius:0px] [--inner-radius:0px]",
      xs: "[--sidebar-radius:var(--radius-sm)] [--inner-radius:var(--radius-xs)]",
      sm: "[--sidebar-radius:var(--radius-md)] [--inner-radius:var(--radius-sm)]",
      base: "[--sidebar-radius:var(--radius-lg)] [--inner-radius:var(--radius-md)]",
      lg: "[--sidebar-radius:var(--radius-xl)] [--inner-radius:var(--radius-lg)]",
      xl: "[--sidebar-radius:var(--radius-2xl)] [--inner-radius:var(--radius-xl)]",
      full: "[--sidebar-radius:calc(infinity*1px)] [--inner-radius:calc(infinity*1px)]",
    } satisfies Record<SidebarBorderRadius, string>,
  },
  defaultVariants: {
    borderRadius: "base",
  },
});

export const sidebarMobileClasses =
  "w-(--sidebar-width) gap-0 bg-sidebar p-0 text-foreground";

export const sidebarGapClasses =
  "relative w-(--sidebar-width) bg-transparent transition-[width] ease-linear group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=end]:rotate-180";

export const sidebarContainerClasses =
  "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) border-border transition-[width] ease-linear group-data-[collapsible=icon]:w-(--sidebar-width-icon) data-[side=start]:start-0 data-[side=start]:border-e data-[side=end]:end-0 data-[side=end]:border-s md:flex";

export const sidebarInnerClasses =
  "flex h-full w-full flex-col gap-3 bg-sidebar p-3";

export const sidebarMobileInnerClasses =
  "flex h-full w-full flex-col gap-3 p-3";

export const sidebarInsetClasses =
  "relative flex w-full min-w-0 flex-1 flex-col bg-background";

export const sidebarHeaderClasses =
  "-mx-3 flex min-w-0 shrink-0 items-center gap-2 overflow-hidden border-b border-border px-3 pb-3 empty:hidden";

export const sidebarTriggerClasses = "md:hidden";

export const sidebarFooterClasses =
  "-mx-3 flex shrink-0 flex-col gap-2 border-t border-border px-3 pt-3 empty:hidden";

export const sidebarContentClasses =
  "min-h-0 min-w-0 flex-1 group-data-[collapsible=icon]:[&>[data-part=scroll-area-scrollbar]]:hidden";

export const sidebarContentInnerClasses = "flex min-w-0 flex-col gap-2";

export const sidebarGroupClasses = "relative flex w-full min-w-0 flex-col";

export const sidebarGroupLabelClasses = `flex h-8 shrink-0 items-center rounded-[var(--inner-radius,var(--radius-md))] px-2 caption-xs text-foreground/70 outline-none transition-[margin,opacity] ease-linear focus-visible:bg-muted focus-visible:text-foreground group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 ${glyphRow}`;

export const sidebarGroupContentClasses = "w-full body-sm";

export const sidebarMenuClasses = "flex w-full min-w-0 flex-col gap-1";

export const sidebarMenuItemClasses = "relative";

export const sidebarMenuButtonClasses = `flex h-8 w-full items-center overflow-hidden rounded-[var(--sidebar-radius,var(--radius-lg))] p-2 text-start label-sm text-foreground outline-none transition-[width,height,padding,background-color,color] hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:bg-muted focus-visible:text-foreground active:bg-muted active:text-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-muted data-[active=true]:text-foreground data-[state=open]:hover:bg-muted data-[state=open]:hover:text-foreground ${glyphRow} [&>span:last-child]:truncate`;

export const sidebarMenuSkeletonClasses = skeletonRowClasses;

export const sidebarMenuSkeletonIconClasses = skeletonRowIconClasses;

export const sidebarMenuSkeletonTextClasses = `${skeletonRowLineClasses} group-data-[collapsible=icon]:hidden`;

export const sidebarMenuSubClasses =
  "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-s border-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden";

export const sidebarMenuSubItemClasses = "relative";

export const sidebarMenuSubButtonClasses = `flex h-7 w-full min-w-0 -translate-x-px items-center overflow-hidden rounded-[var(--inner-radius,var(--radius-md))] px-2 text-start label-sm text-foreground outline-none ${quietControl} active:bg-muted active:text-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-muted data-[active=true]:text-foreground group-data-[collapsible=icon]:hidden [&>span:last-child]:truncate ${glyphRow} [&>svg]:text-foreground`;
