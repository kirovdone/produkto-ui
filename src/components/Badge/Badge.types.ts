import type { ComponentProps } from "react";
import type { StatusTone } from "../../recipes/appearance";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type BadgeTone = StatusTone;

export type BadgeSize = Extract<Size, "sm" | "base" | "lg">;

export type BadgeBorderRadius = BorderRadius;

export interface BadgeProps extends Omit<ComponentProps<"span">, "color"> {
  asChild?: boolean;
  tone?: BadgeTone;
  size?: BadgeSize;
  borderRadius?: BadgeBorderRadius;
}
