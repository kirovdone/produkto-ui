import type { ComponentProps, ReactNode } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type NotFoundAppearance = Appearance;

export type NotFoundSize = Extract<Size, "sm" | "base" | "lg">;

export type NotFoundBorderRadius = BoxBorderRadius;

export interface NotFoundProps extends Omit<ComponentProps<"div">, "title"> {
  appearance?: NotFoundAppearance;
  size?: NotFoundSize;
  borderRadius?: NotFoundBorderRadius;
  title?: ReactNode;
  action?: ReactNode;
}
