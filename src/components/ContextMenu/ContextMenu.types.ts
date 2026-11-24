import type { ComponentProps } from "react";
import type { Tone } from "../../recipes/appearance";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";
import type {
  CheckboxItem,
  Content,
  Group,
  Item,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from "@radix-ui/react-context-menu";

export type ContextMenuItemTone = Extract<Tone, "neutral" | "destructive">;

export type ContextMenuSize = Extract<Size, "sm" | "base" | "lg">;

export type ContextMenuBorderRadius = BoxBorderRadius;

export type ContextMenuProps = ComponentProps<typeof Root>;

export type ContextMenuTriggerProps = ComponentProps<typeof Trigger>;

export type ContextMenuPortalProps = ComponentProps<typeof Portal>;

export interface ContextMenuContentProps extends ComponentProps<
  typeof Content
> {
  size?: ContextMenuSize;
  borderRadius?: ContextMenuBorderRadius;
}

export type ContextMenuGroupProps = ComponentProps<typeof Group>;

export interface ContextMenuLabelProps extends ComponentProps<typeof Label> {
  inset?: boolean;
}

export interface ContextMenuItemProps extends ComponentProps<typeof Item> {
  inset?: boolean;
  tone?: ContextMenuItemTone;
}

export interface ContextMenuCheckboxItemProps extends ComponentProps<
  typeof CheckboxItem
> {
  inset?: boolean;
}

export type ContextMenuRadioGroupProps = ComponentProps<typeof RadioGroup>;

export interface ContextMenuRadioItemProps extends ComponentProps<
  typeof RadioItem
> {
  inset?: boolean;
}

export type ContextMenuSeparatorProps = ComponentProps<typeof Separator>;

export type ContextMenuShortcutProps = ComponentProps<"span">;

export type ContextMenuSubProps = ComponentProps<typeof Sub>;

export interface ContextMenuSubTriggerProps extends ComponentProps<
  typeof SubTrigger
> {
  inset?: boolean;
}

export interface ContextMenuSubContentProps extends ComponentProps<
  typeof SubContent
> {
  size?: ContextMenuSize;
  borderRadius?: ContextMenuBorderRadius;
}
