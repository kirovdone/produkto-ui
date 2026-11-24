import type { Content, Root, Trigger } from "@radix-ui/react-collapsible";
import type { ComponentProps } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type CollapsibleAppearance = Appearance;

export type CollapsibleSize = Extract<Size, "sm" | "base" | "lg">;

export type CollapsibleBorderRadius = BoxBorderRadius;

export type CollapsibleProps = ComponentProps<typeof Root> & {
  appearance?: CollapsibleAppearance;
  size?: CollapsibleSize;
  borderRadius?: CollapsibleBorderRadius;
};

export type CollapsibleTriggerProps = ComponentProps<typeof Trigger>;

export type CollapsibleContentProps = ComponentProps<typeof Content>;
