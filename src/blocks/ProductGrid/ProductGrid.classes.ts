import { cva } from "class-variance-authority";
import type {
  ProductGridAppearance,
  ProductGridColumns,
  ProductGridLayout,
} from "./ProductGrid.types";

type ListLayout = Exclude<ProductGridLayout, "carousel">;

export const productGridClasses = cva("grid", {
  variants: {
    layout: {
      grid: "",
      rows: "gap-3 sm:gap-4 md:grid-cols-2",
      featured:
        "gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 sm:[&>li:first-child]:col-span-2 lg:[&>li:first-child]:row-span-2",
    } satisfies Record<ListLayout, string>,
    columns: {
      2: "",
      3: "",
      4: "",
    } satisfies Record<ProductGridColumns, string>,
    appearance: {
      transparent: "",
      solid: "",
    } satisfies Record<ProductGridAppearance, string>,
  },
  compoundVariants: [
    { layout: "grid", columns: 2, className: "sm:grid-cols-2" },
    { layout: "grid", columns: 3, className: "grid-cols-2 lg:grid-cols-3" },
    {
      layout: "grid",
      columns: 4,
      className: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    },
    {
      layout: "grid",
      appearance: "transparent",
      className: "gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12",
    },
    { layout: "grid", appearance: "solid", className: "gap-3 sm:gap-6" },
  ],
  defaultVariants: {
    layout: "grid",
    columns: 4,
    appearance: "transparent",
  },
});

export const productClasses = "flex min-w-0";

export const productCarouselClasses = "flex flex-col gap-6";

export const productSlideClasses =
  "flex basis-4/5 sm:basis-[46%] lg:basis-[31%]";

export const productControlsClasses = "flex items-center justify-end gap-2";

export const productControlClasses = "static my-0";

export const productFrameClasses = cva(
  "group/product relative flex w-full min-w-0",
  {
    variants: {
      appearance: {
        transparent: "gap-4",
        solid: "gap-3 rounded-2xl p-2 sm:gap-4 sm:p-3",
      } satisfies Record<ProductGridAppearance, string>,
      layout: {
        grid: "flex-col",
        rows: "flex-row items-center",
        featured: "flex-col",
        carousel: "flex-col",
      } satisfies Record<ProductGridLayout, string>,
    },
    defaultVariants: {
      appearance: "transparent",
      layout: "grid",
    },
  },
);

export const productMediaClasses = cva("relative overflow-hidden bg-muted", {
  variants: {
    appearance: {
      transparent: "rounded-2xl",
      solid: "rounded-xl",
    } satisfies Record<ProductGridAppearance, string>,
    layout: {
      grid: "aspect-square",
      rows: "aspect-square w-20 shrink-0 sm:w-24",
      featured: "aspect-4/3",
      carousel: "aspect-4/3",
    } satisfies Record<ProductGridLayout, string>,
    lead: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      layout: "featured",
      lead: true,
      className: "lg:aspect-auto lg:min-h-64 lg:flex-1",
    },
  ],
  defaultVariants: {
    appearance: "transparent",
    layout: "grid",
    lead: false,
  },
});

export const productImageClasses =
  "size-full object-cover transition-transform ease-out group-hover/product:scale-105 motion-reduce:transition-none";

export const productBadgeClasses = "absolute start-3 top-3";

export const productBodyClasses = cva("flex min-w-0 flex-1 flex-col gap-2", {
  variants: {
    appearance: {
      transparent: "",
      solid: "px-1 sm:px-2",
    } satisfies Record<ProductGridAppearance, string>,
    lead: {
      true: "lg:flex-none",
      false: "",
    },
  },
  defaultVariants: {
    appearance: "transparent",
    lead: false,
  },
});

export const productNameClasses = cva("text-pretty", {
  variants: {
    lead: {
      true: "heading-lg",
      false: "heading-base",
    },
  },
  defaultVariants: {
    lead: false,
  },
});

export const productDescriptionClasses = "description-sm text-pretty";

export const productLinkClasses = cva(
  "underline-offset-4 outline-none group-hover/product:underline after:absolute focus-visible:after:ring-2 focus-visible:after:ring-ring/60",
  {
    variants: {
      appearance: {
        transparent: "after:-inset-2 after:rounded-3xl",
        solid: "after:inset-0 after:rounded-2xl",
      } satisfies Record<ProductGridAppearance, string>,
    },
    defaultVariants: {
      appearance: "transparent",
    },
  },
);

export const productRatingClasses = "flex items-center gap-1";

export const productReviewsClasses = "caption-xs tabular-nums";

export const productFootClasses =
  "mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1";

export const productPriceClasses =
  "flex flex-wrap items-baseline gap-x-2 label-base font-semibold tabular-nums";

export const productCompareClasses =
  "description-sm font-normal line-through tabular-nums";

export const productMetaClasses = "caption-xs tabular-nums";

export const productAddClasses = "relative z-10 mt-auto";

export const productQuickAddClasses =
  "absolute inset-x-3 bottom-3 z-10 transition ease-out motion-reduce:transition-none pointer-fine:translate-y-2 pointer-fine:opacity-0 pointer-fine:group-hover/product:translate-y-0 pointer-fine:group-hover/product:opacity-100 pointer-fine:group-focus-within/product:translate-y-0 pointer-fine:group-focus-within/product:opacity-100";

export const productGridFooterClasses = "pt-10 sm:pt-14";
