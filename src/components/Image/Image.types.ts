import type { ComponentProps } from "react";
import type { BorderRadius } from "../../recipes/borderRadius";

export type ImageBorderRadius = BorderRadius;

export interface ImageProps extends Omit<ComponentProps<"img">, "src"> {
  src?: string;
  borderRadius?: ImageBorderRadius;
}
