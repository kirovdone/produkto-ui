import type { Appearance } from "../../recipes/appearance";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";
import type { ComponentProps } from "react";

export type TableAppearance = Appearance;

export type TableSize = Extract<Size, "sm" | "base" | "lg">;

export type TableBorderRadius = BoxBorderRadius;

export interface TableProps extends ComponentProps<"table"> {
  appearance?: TableAppearance;
  size?: TableSize;
  borderRadius?: TableBorderRadius;
}

export type TableHeaderProps = ComponentProps<"thead">;

export type TableBodyProps = ComponentProps<"tbody">;

export type TableFooterProps = ComponentProps<"tfoot">;

export type TableRowProps = ComponentProps<"tr">;

export type TableSort = "asc" | "desc" | "none";

export interface TableHeadProps extends ComponentProps<"th"> {
  sort?: TableSort;
  onSortChange?: (sort: Exclude<TableSort, "none">) => void;
}

export type TableCellProps = ComponentProps<"td">;

export type TableCaptionProps = ComponentProps<"caption">;

export type TableEmptyProps = ComponentProps<"td">;
