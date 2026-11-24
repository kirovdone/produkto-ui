import type { ComponentProps, ReactNode } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { FieldSize } from "../../recipes/field";
import type { BorderRadius } from "../../recipes/borderRadius";

export type ColorPickerSize = FieldSize;

export type ColorPickerBorderRadius = BorderRadius;

export type ColorPickerAppearance = Appearance;

export interface ColorPickerProps extends Omit<
  ComponentProps<"button">,
  "value" | "defaultValue" | "onChange" | "type"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  swatches?: readonly string[];
  clearable?: boolean;
  placeholder?: string;
  appearance?: ColorPickerAppearance;
  size?: ColorPickerSize;
  borderRadius?: ColorPickerBorderRadius;
  error?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
