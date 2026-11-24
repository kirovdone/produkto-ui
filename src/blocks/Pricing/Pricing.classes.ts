import { cva } from "class-variance-authority";
import type { SectionAlign } from "../../components/Section";

export const pricingClasses = cva("grid w-full gap-6", {
  variants: {
    count: {
      1: "max-w-md",
      2: "max-w-4xl sm:grid-cols-2",
      3: "max-w-md lg:max-w-none lg:grid-cols-3",
      4: "sm:grid-cols-2 xl:grid-cols-4",
      more: "sm:grid-cols-2 lg:grid-cols-3",
    },
    align: {
      start: "",
      center: "mx-auto",
      end: "ms-auto",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    count: 3,
    align: "center",
  },
});

export const pricingTabsClasses = "gap-8 sm:gap-10";

export const pricingTabsListClasses = cva("w-fit min-w-56", {
  variants: {
    align: {
      start: "",
      center: "mx-auto",
      end: "ms-auto",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    align: "center",
  },
});

export const pricingPlanClasses = "flex";

export const pricingPlanCardClasses = cva("w-full gap-6 rounded-2xl p-6", {
  variants: {
    highlighted: {
      true: "ring-1 ring-primary inset-ring-primary",
      false: "",
    },
  },
  defaultVariants: {
    highlighted: false,
  },
});

export const pricingPlanHeaderClasses = "gap-2";

export const pricingPlanTitleClasses = "heading-base";

export const pricingPlanDescriptionClasses = "text-pretty";

export const pricingPlanContentClasses = "flex flex-col gap-6";

export const pricingPriceClasses = "flex flex-wrap items-baseline gap-x-1";

export const pricingPriceAmountClasses = "display-5xl tabular-nums";

export const pricingPriceUnitClasses = "description-base";

export const pricingFeaturesClasses =
  "flex flex-col gap-3 border-t border-border pt-6 body-sm";

export const pricingFeatureClasses = cva("flex items-start gap-3", {
  variants: {
    included: {
      true: "",
      false: "text-muted-foreground",
    },
  },
  defaultVariants: {
    included: true,
  },
});

export const pricingFeatureIconClasses = cva("mt-0.5 shrink-0", {
  variants: {
    included: {
      true: "text-primary",
      false: "opacity-60",
    },
  },
  defaultVariants: {
    included: true,
  },
});

export const pricingFeatureLabelClasses = cva("", {
  variants: {
    included: {
      true: "",
      false: "line-through",
    },
  },
  defaultVariants: {
    included: true,
  },
});

export const pricingPlanFooterClasses = "mt-auto";

export const pricingBesideClasses =
  "grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16";

export const pricingBesideTextClasses = "flex min-w-0 flex-col gap-8";

export const pricingBesideListClasses = "flex flex-col gap-5";

export const pricingBesideItemClasses = "flex items-start gap-3";

export const pricingBesideIconClasses =
  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground [&_svg]:size-3";

export const pricingBesideNameClasses = "label-base";

export const pricingBesideLineClasses = "description-sm text-pretty";
