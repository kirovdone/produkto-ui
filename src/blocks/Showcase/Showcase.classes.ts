import { cva } from "class-variance-authority";
import {
  pagerButton,
  pagerMark,
  pagerMarkCurrent,
  pagerMarkIdle,
  pagerRow,
} from "../../recipes/pager";
import type { SectionAlign } from "../../components/Section";

export const showcaseClasses = "flex flex-col gap-6 sm:gap-8";

export const showcaseTrackClasses = "py-2";

export const showcaseSlideClasses = "basis-[70%] sm:basis-[36%] lg:basis-[22%]";

export const showcaseCardClasses = "border-muted";

export const showcaseMediaClasses =
  "-mx-(--card-spacing) first:-mt-(--card-spacing)";

export const showcaseImageClasses =
  "aspect-square w-full border-b border-muted bg-muted object-cover object-top";

export const showcaseLinkClasses =
  "outline-none after:absolute after:inset-0 after:rounded-lg hover:underline focus-visible:after:ring-2 focus-visible:after:ring-ring/60 focus-visible:after:ring-inset";

export const showcaseControlsClasses = cva("flex items-center gap-3", {
  variants: {
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    align: "start",
  },
});

export const showcasePagerClasses = pagerRow;

export const showcasePageClasses = pagerButton;

export const showcasePageMarkClasses = cva(pagerMark, {
  variants: {
    current: {
      true: pagerMarkCurrent,
      false: pagerMarkIdle,
    },
  },
  defaultVariants: {
    current: false,
  },
});
