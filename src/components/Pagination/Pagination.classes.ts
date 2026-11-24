import { cva } from "class-variance-authority";
import type { PaginationSize } from "./Pagination.types";

export const paginationClasses = "flex w-full justify-center";

export const paginationContentClasses = cva("flex flex-row items-center", {
  variants: {
    size: {
      sm: "gap-2",
      base: "gap-3",
      lg: "gap-4",
    } satisfies Record<PaginationSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const paginationLinkClasses = cva("", {
  variants: {
    size: {
      sm: "min-w-8",
      base: "min-w-10",
      lg: "min-w-12",
    } satisfies Record<PaginationSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const paginationEllipsisClasses = cva("", {
  variants: {
    size: {
      sm: "size-8",
      base: "size-10",
      lg: "size-12",
    } satisfies Record<PaginationSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const paginationSlotClasses = {
  always: "",
  wide: "hidden sm:block",
  narrow: "sm:hidden",
} as const;
