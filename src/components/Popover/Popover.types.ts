import type { Anchor, Content, Root, Trigger } from "@radix-ui/react-popover";
import type { ComponentProps } from "react";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type PopoverProps = ComponentProps<typeof Root>;

export type PopoverTriggerProps = ComponentProps<typeof Trigger>;

export type PopoverAnchorProps = ComponentProps<typeof Anchor>;

export type PopoverSize = Extract<Size, "sm" | "base" | "lg">;

export type PopoverBorderRadius = BoxBorderRadius;

export interface PopoverContentProps extends ComponentProps<typeof Content> {
  size?: PopoverSize;
  borderRadius?: PopoverBorderRadius;
  scrollable?: boolean;
}

export interface PopoverHeaderProps extends ComponentProps<"div"> {
  bordered?: boolean;
}

export type PopoverTitleProps = ComponentProps<"div">;

export type PopoverDescriptionProps = ComponentProps<"p">;
