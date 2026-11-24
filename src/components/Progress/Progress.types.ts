import type { Root } from "@radix-ui/react-progress";
import type { ComponentProps } from "react";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type ProgressSize = Extract<Size, "sm" | "base" | "lg">;

export type ProgressBorderRadius = BorderRadius;

export interface ProgressProps extends ComponentProps<typeof Root> {
  size?: ProgressSize;
  borderRadius?: ProgressBorderRadius;
  segments?: number;
}
