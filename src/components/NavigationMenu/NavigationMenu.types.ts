import type { ComponentProps } from "react";
import type {
  Content,
  Indicator,
  Item,
  Link,
  List,
  Root,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type NavigationMenuSize = Extract<Size, "sm" | "base" | "lg">;

export type NavigationMenuBorderRadius = BoxBorderRadius;

export interface NavigationMenuProps extends ComponentProps<typeof Root> {
  viewport?: boolean;
  size?: NavigationMenuSize;
  borderRadius?: NavigationMenuBorderRadius;
}

export type NavigationMenuListProps = ComponentProps<typeof List>;

export type NavigationMenuItemProps = ComponentProps<typeof Item>;

export type NavigationMenuTriggerProps = ComponentProps<typeof Trigger>;

export type NavigationMenuContentProps = ComponentProps<typeof Content>;

export interface NavigationMenuViewportProps extends ComponentProps<
  typeof Viewport
> {
  borderRadius?: NavigationMenuBorderRadius;
}

export type NavigationMenuLinkProps = ComponentProps<typeof Link>;

export type NavigationMenuIndicatorProps = ComponentProps<typeof Indicator>;
