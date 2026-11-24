import { cva } from "class-variance-authority";
import { surfaceFill } from "../../recipes/appearance";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import type { TableSize } from "./Table.types";

export const tableContainerClasses = cva("group/table w-full", {
  variants: {
    appearance: surfaceFill,
    borderRadius: boxBorderRadiusVariants,
  },
  compoundVariants: [{ appearance: "soft", className: "border-border" }],
  defaultVariants: {
    appearance: "solid",
    borderRadius: "base",
  },
});

export const tableClasses = cva("w-full caption-bottom border-collapse", {
  variants: {
    size: {
      sm: "body-xs",
      base: "body-sm",
      lg: "body-base",
    } satisfies Record<TableSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const tableHeaderClasses =
  "[&_tr]:border-b [&_tr]:hover:bg-transparent [&_tr]:has-aria-expanded:bg-transparent";

export const tableBodyClasses = "[&_tr:last-child]:border-0";

export const tableFooterClasses =
  "border-t border-border bg-muted/50 label-sm group-data-[size=sm]/table:label-xs group-data-[size=lg]/table:label-base [&>tr]:last:border-b-0";

export const tableRowClasses =
  "border-b border-border transition-colors data-opens:cursor-pointer hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted group-data-[appearance=soft]/table:hover:bg-hover group-data-[appearance=soft]/table:has-aria-expanded:bg-hover group-data-[appearance=soft]/table:data-[state=selected]:bg-hover";

const tableCellRoom =
  "px-3 py-3 group-data-[size=sm]/table:px-2 group-data-[size=sm]/table:py-2 group-data-[size=lg]/table:px-4 group-data-[size=lg]/table:py-4";

const tableQuietText =
  "description-sm group-data-[size=sm]/table:description-xs group-data-[size=lg]/table:description-base";

export const tableHeadClasses = `${tableCellRoom} text-start align-middle ${tableQuietText} whitespace-nowrap [&:has([role=checkbox])]:pe-0 [&>[role=checkbox]]:translate-y-[2px]`;

export const tableHeadSortClasses = `-ms-1.5 ${tableQuietText} text-muted-foreground data-[state=open]:bg-muted data-sorted:text-foreground`;

export const tableCellClasses = `${tableCellRoom} align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0 [&>[role=checkbox]]:translate-y-[2px]`;

export const tableCaptionClasses = `${tableCellRoom} ${tableQuietText}`;

export const tableEmptyClasses =
  "h-24 p-0 align-middle group-data-[size=sm]/table:h-20 group-data-[size=lg]/table:h-28";

export const tableEmptyNotFoundClasses = "h-auto";
