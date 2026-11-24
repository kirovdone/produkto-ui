import type { ComponentProps, Dispatch, SetStateAction } from "react";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Button } from "../Button";

export type SidebarState = "expanded" | "collapsed";

export type SidebarSide = "start" | "end";

export type SidebarBorderRadius = BorderRadius;

export interface SidebarContextValue {
  state: SidebarState;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openMobile: boolean;
  setOpenMobile: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export interface SidebarProviderProps extends ComponentProps<"div"> {
  defaultOpen?: boolean;
}

export interface SidebarProps extends ComponentProps<"div"> {
  side?: SidebarSide;
  expandOnHover?: boolean;
  borderRadius?: SidebarBorderRadius;
}

export type SidebarTriggerProps = ComponentProps<typeof Button> & {
  toggle?: boolean;
};

export type SidebarInsetProps = ComponentProps<"main">;

export type SidebarHeaderProps = ComponentProps<"div">;

export type SidebarFooterProps = ComponentProps<"div">;

export type SidebarContentProps = Omit<ComponentProps<"div">, "dir">;

export type SidebarGroupProps = ComponentProps<"div">;

export type SidebarGroupLabelProps = ComponentProps<"div">;

export type SidebarGroupContentProps = ComponentProps<"div">;

export type SidebarMenuProps = ComponentProps<"ul">;

export type SidebarMenuItemProps = ComponentProps<"li">;

export interface SidebarMenuButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
  active?: boolean;
}

export interface SidebarMenuSkeletonProps extends ComponentProps<"div"> {
  showIcon?: boolean;
}

export type SidebarMenuSubProps = ComponentProps<"ul">;

export type SidebarMenuSubItemProps = ComponentProps<"li">;

export interface SidebarMenuSubButtonProps extends ComponentProps<"a"> {
  asChild?: boolean;
  active?: boolean;
}
