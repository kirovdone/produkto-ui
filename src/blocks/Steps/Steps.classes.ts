import { cva } from "class-variance-authority";
import type { SectionAlign } from "../../components/Section";
import type { StepsOrientation } from "./Steps.types";
import { blockBody } from "../../recipes/block";

export const stepsContentClasses = cva("", {
  variants: {
    split: {
      true: "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
      false: `${blockBody}`,
    },
  },
  defaultVariants: {
    split: false,
  },
});

export const stepsColumnClasses = "flex flex-col gap-10";

export const stepsMediaClasses = "overflow-hidden rounded-2xl *:w-full";

export const stepsClasses = cva("grid gap-8", {
  variants: {
    orientation: {
      horizontal: "md:auto-cols-fr md:grid-flow-col",
      vertical: "max-w-2xl",
    } satisfies Record<StepsOrientation, string>,
    align: {
      start: "",
      center: "",
      end: "",
    } satisfies Record<SectionAlign, string>,
  },
  compoundVariants: [
    { orientation: "vertical", align: "start", className: "w-full" },
    { orientation: "vertical", align: "center", className: "mx-auto w-fit" },
    { orientation: "vertical", align: "end", className: "ms-auto w-fit" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    align: "start",
  },
});

export const stepClasses = cva("relative flex gap-4", {
  variants: {
    orientation: {
      horizontal: "md:flex-col md:gap-5",
      vertical: "",
    } satisfies Record<StepsOrientation, string>,
    align: {
      start: "",
      center: "",
      end: "",
    } satisfies Record<SectionAlign, string>,
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      align: "center",
      className: "md:items-center md:text-center",
    },
    {
      orientation: "horizontal",
      align: "end",
      className: "md:items-end md:text-end",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    align: "start",
  },
});

export const stepLineClasses = cva(
  "absolute top-12 -bottom-6 start-5 w-px bg-muted-foreground/25",
  {
    variants: {
      orientation: {
        horizontal: "md:top-5 md:bottom-auto md:h-px md:w-auto",
        vertical: "",
      } satisfies Record<StepsOrientation, string>,
      align: {
        start: "",
        center: "",
        end: "",
      } satisfies Record<SectionAlign, string>,
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        align: "start",
        className: "md:start-12 md:-end-6",
      },
      {
        orientation: "horizontal",
        align: "center",
        className: "md:start-[calc(50%+1.75rem)] md:end-[calc(-50%-0.25rem)]",
      },
      {
        orientation: "horizontal",
        align: "end",
        className: "md:start-[calc(100%+0.5rem)] md:end-[calc(-100%+1rem)]",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      align: "start",
    },
  },
);

export const stepMarkerClasses =
  "relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card code-xs font-medium tabular-nums [&_svg]:size-4.5";

export const stepTextClasses = cva("flex flex-col gap-2 pt-2", {
  variants: {
    orientation: {
      horizontal: "md:pt-0",
      vertical: "",
    } satisfies Record<StepsOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepTitleClasses = "heading-base";

export const stepBodyClasses = "description-base text-pretty";

export const stepsGridClasses = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

export const stepCardClasses = "flex h-full flex-col gap-2 p-5";

export const stepCardNumberClasses =
  "display-2xl text-muted-foreground tabular-nums";

export const stepsNumbersClasses = "grid gap-10 sm:grid-cols-2 lg:grid-cols-4";

export const stepNumberClasses = "flex flex-col gap-2";

export const stepBigNumberClasses = "display-5xl tabular-nums";

export const stepsDotsClasses =
  "relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6";

export const stepsDotsLineClasses =
  "absolute inset-x-[12.5%] top-6 hidden h-px bg-border lg:block";

export const stepDotClasses =
  "relative flex flex-col items-start gap-3 lg:items-center lg:text-center";

export const stepDotMarkerClasses =
  "flex size-12 items-center justify-center rounded-full border border-border bg-card heading-base tabular-nums";

export const stepsBesideClasses =
  "grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16";

export const stepsBesideTextClasses = "flex min-w-0 flex-col gap-8";
