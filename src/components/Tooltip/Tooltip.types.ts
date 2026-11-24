import type { Content, Provider, Root, Trigger } from "@radix-ui/react-tooltip";
import type { ComponentProps } from "react";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type TooltipProviderProps = ComponentProps<typeof Provider>;

export type TooltipProps = ComponentProps<typeof Root>;

export type TooltipTriggerProps = ComponentProps<typeof Trigger>;

export type TooltipBorderRadius = BorderRadius;

export type TooltipSize = Extract<Size, "sm" | "base" | "lg">;

export interface TooltipContentProps extends ComponentProps<typeof Content> {
  size?: TooltipSize;
  borderRadius?: TooltipBorderRadius;
}
