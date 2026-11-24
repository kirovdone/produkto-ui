import type { Root } from "@radix-ui/react-toggle";
import type { ComponentProps } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type ToggleAppearance = Appearance;

export type ToggleSize = Extract<Size, "xs" | "sm" | "base" | "lg">;

export type ToggleBorderRadius = BorderRadius;

export interface ToggleProps extends ComponentProps<typeof Root> {
  appearance?: ToggleAppearance;
  size?: ToggleSize;
  borderRadius?: ToggleBorderRadius;
}
