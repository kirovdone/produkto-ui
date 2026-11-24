import type {
  ComponentProps,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
} from "react";
import type { Appearance, Tone } from "../../recipes/appearance";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type ButtonAppearance = Appearance;

export type ButtonTone = Tone;

export type ButtonSize = Extract<Size, "xs" | "sm" | "base" | "lg">;

export type ButtonBorderRadius = BorderRadius;

export type ButtonAlign = "start" | "center" | "end";

export interface ButtonProps extends Omit<
  ComponentProps<"button">,
  "color" | "onClick"
> {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  appearance?: ButtonAppearance;
  tone?: ButtonTone;
  size?: ButtonSize;
  wrap?: boolean;
  block?: boolean;
  muted?: boolean;
  align?: ButtonAlign;
  borderRadius?: ButtonBorderRadius;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}
