import { cva } from "class-variance-authority";
import type { CompareLayout } from "./Compare.types";

export const compareFrameClasses = cva("", {
  variants: {
    layout: {
      cards: "hidden md:block",
      scroll: "",
      options: "hidden",
    } satisfies Record<CompareLayout, string>,
  },
  defaultVariants: {
    layout: "cards",
  },
});

export const compareTableClasses = cva("md:table-fixed", {
  variants: {
    layout: {
      cards: "",
      scroll: "max-md:min-w-(--compare-width)",
      options: "",
    } satisfies Record<CompareLayout, string>,
  },
  defaultVariants: {
    layout: "cards",
  },
});

export const compareFeaturesColumnClasses = "w-36 sm:w-44 md:w-[30%]";

export const compareHeadClasses = "text-center align-bottom";

export const compareHeadContentClasses = "flex flex-col items-center gap-3";

export const compareNameClasses =
  "flex flex-wrap items-center justify-center gap-2 label-sm text-foreground";

export const compareGroupClasses = "bg-muted/50 text-start";

export const compareFeatureClasses =
  "text-start text-foreground whitespace-normal";

export const compareFeatureDetailClasses =
  "mt-0.5 block font-normal description-sm text-pretty";

export const compareCellClasses = "text-center";

export const compareMarkClasses = cva(
  "inline-flex size-5 shrink-0 items-center justify-center rounded-full align-middle",
  {
    variants: {
      included: {
        true: "bg-primary text-primary-foreground",
        false: "text-muted-foreground/70",
      },
    },
  },
);

export const compareTextClasses = "body-sm text-pretty";

export const compareCardsClasses = cva("grid gap-4", {
  variants: {
    layout: {
      cards: "md:hidden",
      scroll: "hidden",
      options: "md:grid-cols-2 md:gap-6",
    } satisfies Record<CompareLayout, string>,
  },
  defaultVariants: {
    layout: "cards",
  },
});

export const comparePriceClasses = "heading-xl tabular-nums";

export const compareCardClasses = cva("gap-5 rounded-2xl p-5", {
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

export const compareCardHeaderClasses =
  "flex flex-wrap items-center justify-between gap-2";

export const compareCardNameClasses = "heading-base";

export const compareCardGroupClasses = "flex flex-col gap-1";

export const compareCardGroupTitleClasses =
  "caption-xs tracking-wider uppercase";

export const compareCardRowsClasses = "flex flex-col divide-y divide-border";

export const compareCardRowClasses =
  "flex items-center justify-between gap-4 py-2.5 body-sm";

export const compareCardValueClasses = "shrink-0 text-end";
