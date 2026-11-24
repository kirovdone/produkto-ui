import type { CheckedState, Root } from "@radix-ui/react-checkbox";
import type { ComponentProps, ReactNode } from "react";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type CheckboxCheckedState = CheckedState;

export type CheckboxSize = Extract<Size, "sm" | "base" | "lg">;

export type CheckboxBorderRadius = BorderRadius;

export interface CheckboxProps extends ComponentProps<typeof Root> {
  size?: CheckboxSize;
  borderRadius?: CheckboxBorderRadius;
  error?: ReactNode;
}
