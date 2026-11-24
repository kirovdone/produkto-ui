import type { Root } from "@radix-ui/react-switch";
import type { ComponentProps, ReactNode } from "react";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type SwitchSize = Extract<Size, "sm" | "base" | "lg">;

export type SwitchBorderRadius = BorderRadius;

export interface SwitchProps extends ComponentProps<typeof Root> {
  size?: SwitchSize;
  borderRadius?: SwitchBorderRadius;
  error?: ReactNode;
}
