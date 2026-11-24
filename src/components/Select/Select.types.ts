import type { Appearance } from "../../recipes/appearance";
import type { FieldSize } from "../../recipes/field";
import type { BorderRadius } from "../../recipes/borderRadius";
import type {
  Content,
  Group,
  Item,
  Label,
  Root,
  Separator,
  Trigger,
  Value,
} from "@radix-ui/react-select";
import type { ComponentProps, ReactNode } from "react";

export type SelectTriggerSize = FieldSize;

export type SelectTriggerBorderRadius = BorderRadius;

export interface SelectProps extends ComponentProps<typeof Root> {
  resetTo?: string;
}

export type SelectGroupProps = ComponentProps<typeof Group>;

export type SelectValueProps = ComponentProps<typeof Value>;

export type SelectTriggerAppearance = Appearance;

export interface SelectTriggerProps extends ComponentProps<typeof Trigger> {
  appearance?: SelectTriggerAppearance;
  size?: SelectTriggerSize;
  borderRadius?: SelectTriggerBorderRadius;
  clearable?: boolean;
  error?: ReactNode;
}

export type SelectContentProps = ComponentProps<typeof Content>;

export type SelectLabelProps = ComponentProps<typeof Label>;

export type SelectItemProps = ComponentProps<typeof Item>;

export type SelectSeparatorProps = ComponentProps<typeof Separator>;
