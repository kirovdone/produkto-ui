import type { ComponentProps } from "react";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type PaginationSize = Extract<Size, "sm" | "base" | "lg">;

export type PaginationBorderRadius = BorderRadius;

export interface PaginationProps extends Omit<
  ComponentProps<"nav">,
  "children"
> {
  page: number;
  pages: number;
  href?: string;
  param?: string;
  onPageChange?: (page: number) => void;
  size?: PaginationSize;
  borderRadius?: PaginationBorderRadius;
  disabled?: boolean;
}
