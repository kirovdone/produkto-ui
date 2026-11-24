import { cva } from "class-variance-authority";
import type { SectionAlign } from "../../components/Section";
import type { StatsCount, StatsLayout } from "./Stats.types";
import { blockBody } from "../../recipes/block";

export const statsContentClasses = `${blockBody}`;

export const statsClasses = cva("grid", {
  variants: {
    layout: {
      row: "gap-x-8 gap-y-10",
      cards: "gap-4 sm:gap-6",
      split: "gap-x-8 gap-y-10",
    } satisfies Record<StatsLayout, string>,
    count: {
      1: "",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
      5: "sm:grid-cols-2 lg:grid-cols-3",
    } satisfies Record<StatsCount, string>,
  },
  defaultVariants: {
    layout: "row",
    count: 1,
  },
});

export const statClasses = cva("flex flex-col gap-2", {
  variants: {
    layout: {
      row: "",
      cards: "rounded-2xl border border-border p-6",
      split: "",
    } satisfies Record<StatsLayout, string>,
    align: {
      start: "",
      center: "items-center text-center",
      end: "items-end text-end",
    } satisfies Record<SectionAlign, string>,
  },
  compoundVariants: [
    {
      layout: ["row", "split"],
      align: "start",
      className: "border-s border-border ps-6",
    },
    {
      layout: ["row", "split"],
      align: "end",
      className: "border-e border-border pe-6",
    },
  ],
  defaultVariants: {
    layout: "row",
    align: "start",
  },
});

export const statLabelClasses = "label-base";

export const statValueClasses = cva("order-first display-4xl", {
  variants: {
    layout: {
      row: "sm:display-5xl",
      cards: "",
      split: "",
    } satisfies Record<StatsLayout, string>,
  },
  defaultVariants: {
    layout: "row",
  },
});

export const statDescriptionClasses = "description-sm text-pretty";

export const statsSplitClasses =
  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16";

export const statsSplitTextClasses = "flex min-w-0 flex-col items-start gap-8";
