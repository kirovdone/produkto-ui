import { cva } from "class-variance-authority";
import type { BreadcrumbAlign, BreadcrumbSize } from "./Breadcrumb.types";
import { quietControl } from "../../recipes/control";
import { GAP } from "../../consts/tokens";
import { glyphs } from "../../recipes/menu";
import { borderRadiusVariants } from "../../recipes/borderRadius";

const crumbSize = {
  sm: "min-h-7 gap-1 px-1.5 label-xs [&_svg:not([class*='size-'])]:size-3.5",
  base: "min-h-8 px-2",
  lg: "min-h-10 gap-2 px-3 label-base [&_svg:not([class*='size-'])]:size-5",
} satisfies Record<BreadcrumbSize, string>;

export const breadcrumbListClasses =
  "flex min-w-0 flex-wrap items-center label-sm wrap-break-word text-muted-foreground";

export const breadcrumbItemClasses = "inline-flex min-w-0 items-center gap-1";

export const breadcrumbLinkClasses = cva(
  `inline-flex items-center whitespace-nowrap transition-colors outline-none ${quietControl} ${GAP.glyph} ${glyphs}`,
  {
    variants: {
      size: crumbSize,
      borderRadius: borderRadiusVariants,
    },
    defaultVariants: {
      size: "base",
      borderRadius: "base",
    },
  },
);

export const breadcrumbPageClasses = cva(
  `inline-flex items-center whitespace-nowrap text-foreground ${GAP.glyph} ${glyphs}`,
  {
    variants: {
      size: crumbSize,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const breadcrumbSeparatorClasses = cva(
  "flex text-muted-foreground [&>svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "[&>svg]:size-3.5",
        base: "[&>svg]:size-4",
        lg: "[&>svg]:size-5",
      } satisfies Record<BreadcrumbSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const breadcrumbEllipsisClasses = cva("", {
  variants: {
    size: {
      sm: "size-7 [&>svg]:size-3.5",
      base: "size-8",
      lg: "size-10 [&>svg]:size-5",
    } satisfies Record<BreadcrumbSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const breadcrumbTrailClasses = cva("", {
  variants: {
    align: {
      start: "",
      center: "justify-center",
      end: "justify-end",
    } satisfies Record<BreadcrumbAlign, string>,
  },
  defaultVariants: {
    align: "start",
  },
});
