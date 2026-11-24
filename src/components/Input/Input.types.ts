import type { ComponentProps, ReactNode } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { FieldSize } from "../../recipes/field";
import type { BorderRadius } from "../../recipes/borderRadius";

export type InputAppearance = Appearance;

export type InputSize = FieldSize;

export type InputBorderRadius = BorderRadius;

export interface InputFieldProps extends Omit<ComponentProps<"input">, "size"> {
  appearance?: InputAppearance;
  size?: InputSize;
  borderRadius?: InputBorderRadius;
  clearable?: boolean;
  error?: ReactNode;
}

export interface InputProps extends InputFieldProps {
  start?: ReactNode;
  end?: ReactNode;
  chips?: string[];
  onChipRemove?: (chip: string) => void;
}
