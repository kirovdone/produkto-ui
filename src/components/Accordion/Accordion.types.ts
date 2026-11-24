import type { Content, Item, Root, Trigger } from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type AccordionAppearance = Appearance;

export type AccordionSize = Extract<Size, "sm" | "base" | "lg">;

export type AccordionBorderRadius = BoxBorderRadius;

export type AccordionProps = ComponentProps<typeof Root> & {
  appearance?: AccordionAppearance;
  size?: AccordionSize;
  borderRadius?: AccordionBorderRadius;
  unstyled?: boolean;
};

export type AccordionItemProps = ComponentProps<typeof Item>;

export type AccordionTriggerProps = ComponentProps<typeof Trigger>;

export type AccordionContentProps = ComponentProps<typeof Content>;
