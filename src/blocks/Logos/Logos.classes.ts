import { cva } from "class-variance-authority";
import type { LogosColumns, LogosLayout } from "./Logos.types";

export const logosSectionClasses = "py-12 sm:py-16";

export const logosTitleClasses =
  "mb-8 text-center heading-sm font-medium text-pretty text-muted-foreground sm:mb-10";

export const logosClasses = cva("", {
  variants: {
    layout: {
      row: "flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14",
      grid: "grid grid-cols-2 gap-3 sm:gap-4",
      marquee: "flex items-center gap-x-10 pe-10 sm:gap-x-14 sm:pe-14",
      split:
        "flex flex-wrap items-center gap-x-10 gap-y-6 sm:gap-x-12 lg:justify-end",
    } satisfies Record<LogosLayout, string>,
    columns: {
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
    } satisfies Record<LogosColumns, string>,
  },
  defaultVariants: {
    layout: "row",
  },
});

export const logoClasses = cva(
  "flex items-center text-muted-foreground grayscale [&_img]:max-h-full [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain",
  {
    variants: {
      layout: {
        row: "h-10",
        grid: "h-20 justify-center rounded-2xl border border-border bg-card px-3 py-5 sm:h-24 sm:px-6 sm:py-6",
        marquee: "h-10 shrink-0",
        split: "h-10",
      } satisfies Record<LogosLayout, string>,
    },
    defaultVariants: {
      layout: "row",
    },
  },
);

export const logoWordmarkClasses = "heading-xl whitespace-nowrap";

export const logosBesideClasses =
  "grid items-center gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16";

export const logosBesideTitleClasses = "heading-lg text-pretty";

export const logosMarqueeClasses = "w-full";

export const logoMediaClasses = "flex h-full max-w-full min-w-0 items-center";
