import type { ComponentProps, ReactNode } from "react";
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
} from "@radix-ui/react-dropdown-menu";

export type DropdownMenuItemTone = Extract<Tone, "neutral" | "destructive">;

export type DropdownMenuSize = Extract<Size, "sm" | "base" | "lg">;

export type DropdownMenuBorderRadius = BoxBorderRadius;

export type DropdownMenuProps = ComponentProps<typeof Root>;

export type DropdownMenuPortalProps = ComponentProps<typeof Portal>;

export type DropdownMenuTriggerProps = ComponentProps<typeof Trigger>;

export type DropdownMenuContentProps = ComponentProps<typeof Content> & {
  size?: DropdownMenuSize;
  borderRadius?: DropdownMenuBorderRadius;
  header?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  loadingMore?: boolean;
};

export type DropdownMenuGroupProps = ComponentProps<typeof Group>;

export interface DropdownMenuLabelProps extends ComponentProps<typeof Label> {
  inset?: boolean;
}

export interface DropdownMenuItemProps extends ComponentProps<typeof Item> {
  inset?: boolean;
  tone?: DropdownMenuItemTone;
  actions?: ReactNode[];
  description?: ReactNode;
}

export interface DropdownMenuCheckboxItemProps extends ComponentProps<
  typeof CheckboxItem
> {
  inset?: boolean;
}

export type DropdownMenuRadioGroupProps = ComponentProps<typeof RadioGroup>;

export interface DropdownMenuRadioItemProps extends ComponentProps<
  typeof RadioItem
> {
  inset?: boolean;
}

export type DropdownMenuSeparatorProps = ComponentProps<typeof Separator>;

export type DropdownMenuShortcutProps = ComponentProps<"span">;

export type DropdownMenuSubProps = ComponentProps<typeof Sub>;

export interface DropdownMenuSubTriggerProps extends ComponentProps<
  typeof SubTrigger
> {
  inset?: boolean;
}

export interface DropdownMenuSubContentProps extends ComponentProps<
  typeof SubContent
> {
  size?: DropdownMenuSize;
  borderRadius?: DropdownMenuBorderRadius;
}
