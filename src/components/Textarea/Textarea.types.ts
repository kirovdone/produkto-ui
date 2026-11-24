import type { ComponentProps, ReactNode } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type TextareaAppearance = Appearance;

export type TextareaSize = Extract<Size, "sm" | "base" | "lg">;

export type TextareaBorderRadius = BoxBorderRadius;

export interface TextareaFieldProps extends ComponentProps<"textarea"> {
  appearance?: TextareaAppearance;
  size?: TextareaSize;
  error?: ReactNode;
}

export interface TextareaProps extends TextareaFieldProps {
  borderRadius?: TextareaBorderRadius;
  end?: ReactNode;
}
