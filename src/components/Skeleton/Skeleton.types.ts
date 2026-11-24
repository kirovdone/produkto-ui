import type { ComponentProps } from "react";
import type { BorderRadius } from "../../recipes/borderRadius";

export type SkeletonBorderRadius = BorderRadius;

export interface SkeletonProps extends ComponentProps<"div"> {
  borderRadius?: SkeletonBorderRadius;
}

export type SkeletonRowProps = ComponentProps<"div"> & { icon?: boolean };
