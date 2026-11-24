"use client";

import { useTranslate } from "../../host";

import {
  Content,
  Indicator,
  Item,
  Link,
  List,
  Root,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { createContext, useContext } from "react";
import { Icon } from "../Icon";
import { cn } from "../../cn";
import {
  navigationMenuClasses,
  navigationMenuContentClasses,
  navigationMenuIndicatorArrowClasses,
  navigationMenuIndicatorClasses,
  navigationMenuItemClasses,
  navigationMenuLinkClasses,
  navigationMenuListClasses,
  navigationMenuTriggerClasses,
  navigationMenuTriggerIconClasses,
  navigationMenuViewportClasses,
  navigationMenuViewportWrapperClasses,
} from "./NavigationMenu.classes";
import type {
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuProps,
  NavigationMenuBorderRadius,
  NavigationMenuSize,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps,
} from "./NavigationMenu.types";

const PanelBorderRadius = createContext<NavigationMenuBorderRadius>("lg");

const MenuSize = createContext<NavigationMenuSize>("base");

const InPanel = createContext(false);

export const NavigationMenu = ({
  className,
  children,
  viewport = true,
  size = "base",
  borderRadius = "lg",
  ...props
}: NavigationMenuProps) => {
  const t = useTranslate();
  return (
    <Root
      aria-label={t("Main navigation")}
      data-part="navigation-menu"
      data-viewport={viewport}
      data-size={size}
      className={cn(navigationMenuClasses, className)}
      {...props}
    >
      <MenuSize value={size}>
        <PanelBorderRadius value={borderRadius}>{children}</PanelBorderRadius>
        {viewport && <NavigationMenuViewport borderRadius={borderRadius} />}
      </MenuSize>
    </Root>
  );
};

export const NavigationMenuList = ({
  className,
  ...props
}: NavigationMenuListProps) => (
  <List
    data-part="navigation-menu-list"
    className={cn(navigationMenuListClasses, className)}
    {...props}
  />
);

export const NavigationMenuItem = ({
  className,
  ...props
}: NavigationMenuItemProps) => (
  <Item
    data-part="navigation-menu-item"
    className={cn(navigationMenuItemClasses, className)}
    {...props}
  />
);

export const NavigationMenuTrigger = ({
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) => {
  const size = useContext(MenuSize);
  return (
    <Trigger
      data-part="navigation-menu-trigger"
      className={cn(navigationMenuTriggerClasses({ size }), className)}
      {...props}
    >
      {children}
      <Icon
        icon={ArrowDown01Icon}
        aria-hidden="true"
        className={navigationMenuTriggerIconClasses}
      />
    </Trigger>
  );
};

export const NavigationMenuContent = ({
  className,
  children,
  ...props
}: NavigationMenuContentProps) => {
  const borderRadius = useContext(PanelBorderRadius);
  return (
    <Content
      data-part="navigation-menu-content"
      data-radius={borderRadius}
      className={cn(navigationMenuContentClasses({ borderRadius }), className)}
      {...props}
    >
      <InPanel value>{children}</InPanel>
    </Content>
  );
};

export const NavigationMenuViewport = ({
  className,
  borderRadius = "lg",
  ...props
}: NavigationMenuViewportProps) => (
  <div
    data-part="navigation-menu-viewport-wrapper"
    className={navigationMenuViewportWrapperClasses}
  >
    <Viewport
      data-part="navigation-menu-viewport"
      data-radius={borderRadius}
      className={cn(navigationMenuViewportClasses({ borderRadius }), className)}
      {...props}
    />
  </div>
);

export const NavigationMenuLink = ({
  className,
  ...props
}: NavigationMenuLinkProps) => {
  const size = useContext(MenuSize);
  const inPanel = useContext(InPanel);
  return (
    <Link
      data-part="navigation-menu-link"
      className={cn(
        inPanel
          ? navigationMenuLinkClasses({ size })
          : navigationMenuTriggerClasses({ size }),
        className,
      )}
      {...props}
    />
  );
};

export const NavigationMenuIndicator = ({
  className,
  ...props
}: NavigationMenuIndicatorProps) => (
  <Indicator
    data-part="navigation-menu-indicator"
    className={cn(navigationMenuIndicatorClasses, className)}
    {...props}
  >
    <div className={navigationMenuIndicatorArrowClasses} />
  </Indicator>
);
