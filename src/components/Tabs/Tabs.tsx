"use client";

import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";
import { createContext, useContext } from "react";
import { cn } from "../../cn";
import {
  tabsClasses,
  tabsContentClasses,
  tabsListClasses,
  tabsListBorderRadiusClasses,
  tabsListWrapClasses,
  tabsTriggerClasses,
} from "./Tabs.classes";
import type {
  TabsContentProps,
  TabsListProps,
  TabsListSize,
  TabsProps,
  TabsTriggerProps,
} from "./Tabs.types";

const TabsListContext = createContext<TabsListSize>("base");

export const Tabs = ({
  className,
  orientation = "horizontal",
  ...props
}: TabsProps) => (
  <Root
    data-part="tabs"
    orientation={orientation}
    className={cn(tabsClasses, className)}
    {...props}
  />
);

export const TabsList = ({
  className,
  appearance = "outline",
  size = "base",
  borderRadius = "base",
  wrap = false,
  ...props
}: TabsListProps) => (
  <TabsListContext.Provider value={size}>
    <List
      data-part="tabs-list"
      data-appearance={appearance}
      data-size={size}
      data-radius={borderRadius}
      data-wrap={wrap || undefined}
      className={cn(
        tabsListClasses,
        tabsListBorderRadiusClasses({ borderRadius }),
        wrap && tabsListWrapClasses,
        className,
      )}
      {...props}
    />
  </TabsListContext.Provider>
);

export const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => {
  const size = useContext(TabsListContext);
  return (
    <Trigger
      data-part="tabs-trigger"
      className={cn(tabsTriggerClasses({ size }), className)}
      {...props}
    />
  );
};

export const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <Content
    data-part="tabs-content"
    className={cn(tabsContentClasses, className)}
    {...props}
  />
);
