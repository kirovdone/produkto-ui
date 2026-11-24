"use client";

import { ArrowDown02Icon, ArrowUp02Icon } from "@hugeicons/core-free-icons";
import { createContext, useContext } from "react";
import { cn } from "../../cn";
import { useTranslate } from "../../host";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { Icon } from "../Icon";
import { NotFound } from "../NotFound";
import { ScrollArea } from "../ScrollArea";
import {
  tableBodyClasses,
  tableCaptionClasses,
  tableCellClasses,
  tableClasses,
  tableContainerClasses,
  tableEmptyClasses,
  tableEmptyNotFoundClasses,
  tableFooterClasses,
  tableHeadClasses,
  tableHeadSortClasses,
  tableHeaderClasses,
  tableRowClasses,
} from "./Table.classes";
import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableEmptyProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TableSize,
} from "./Table.types";

const SizeContext = createContext<TableSize>("base");

export const Table = ({
  className,
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  ...props
}: TableProps) => (
  <SizeContext value={size}>
    <ScrollArea
      data-part="table-container"
      data-appearance={appearance}
      data-size={size}
      data-radius={borderRadius}
      orientation="horizontal"
      className={cn(tableContainerClasses({ appearance, borderRadius }))}
    >
      <table
        data-part="table"
        className={cn(tableClasses({ size }), className)}
        {...props}
      />
    </ScrollArea>
  </SizeContext>
);

export const TableHeader = ({ className, ...props }: TableHeaderProps) => (
  <thead
    data-part="table-header"
    className={cn(tableHeaderClasses, className)}
    {...props}
  />
);

export const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody
    data-part="table-body"
    className={cn(tableBodyClasses, className)}
    {...props}
  />
);

export const TableFooter = ({ className, ...props }: TableFooterProps) => (
  <tfoot
    data-part="table-footer"
    className={cn(tableFooterClasses, className)}
    {...props}
  />
);

export const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr
    data-part="table-row"
    className={cn(tableRowClasses, className)}
    {...props}
  />
);

const ariaSort = { asc: "ascending", desc: "descending" } as const;

export const TableHead = ({
  sort = "none",
  onSortChange,
  className,
  children,
  ...props
}: TableHeadProps) => {
  const t = useTranslate();
  const sorted = sort === "none" ? undefined : sort;
  return (
    <th
      data-part="table-head"
      aria-sort={sorted ? ariaSort[sorted] : undefined}
      className={cn(tableHeadClasses, className)}
      {...props}
    >
      {onSortChange ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              data-part="table-head-sort"
              data-sorted={sorted}
              appearance="transparent"
              size="xs"
              className={tableHeadSortClasses}
            >
              {children}
              {sorted ? (
                <Icon
                  icon={sorted === "desc" ? ArrowDown02Icon : ArrowUp02Icon}
                />
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => onSortChange("asc")}>
              <Icon icon={ArrowUp02Icon} />
              {t("Ascending")}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onSortChange("desc")}>
              <Icon icon={ArrowDown02Icon} />
              {t("Descending")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        children
      )}
    </th>
  );
};

export const TableCell = ({ className, ...props }: TableCellProps) => (
  <td
    data-part="table-cell"
    className={cn(tableCellClasses, className)}
    {...props}
  />
);

export const TableEmpty = ({
  className,
  children,
  ...props
}: TableEmptyProps) => {
  const size = useContext(SizeContext);
  return (
    <tr data-part="table-empty">
      <td className={cn(tableEmptyClasses, className)} {...props}>
        <NotFound
          appearance="transparent"
          size={size}
          className={tableEmptyNotFoundClasses}
        >
          {children}
        </NotFound>
      </td>
    </tr>
  );
};

export const TableCaption = ({ className, ...props }: TableCaptionProps) => (
  <caption
    data-part="table-caption"
    className={cn(tableCaptionClasses, className)}
    {...props}
  />
);
