import type { ComponentProps } from "react";
import type { Content, List, Root, Trigger } from "@radix-ui/react-tabs";
import type { Appearance } from "../../recipes/appearance";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type TabsListAppearance = Appearance;

export type TabsListSize = Extract<Size, "sm" | "base" | "lg">;

export type TabsListBorderRadius = BorderRadius;

export type TabsProps = ComponentProps<typeof Root>;

export interface TabsListProps extends ComponentProps<typeof List> {
  appearance?: TabsListAppearance;
  size?: TabsListSize;
  borderRadius?: TabsListBorderRadius;
  wrap?: boolean;
}

export type TabsTriggerProps = ComponentProps<typeof Trigger>;

export type TabsContentProps = ComponentProps<typeof Content>;
