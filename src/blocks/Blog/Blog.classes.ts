import { cva } from "class-variance-authority";
import type { BlogColumns } from "./Blog.types";
import { blockBody, cardHover } from "../../recipes/block";

export const blogBodyClasses = `${blockBody}`;

export const blogClasses = cva("grid gap-3 md:gap-4", {
  variants: {
    columns: {
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    } satisfies Record<BlogColumns, string>,
  },
  defaultVariants: {
    columns: 3,
  },
});

export const blogPostClasses = `group/tile relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-muted ${cardHover}`;

export const blogMediaClasses =
  "aspect-video overflow-hidden *:size-full *:object-cover";

export const blogPostContentClasses =
  "flex flex-1 flex-col items-start gap-3 p-5";

export const blogTitleClasses = "label-base text-foreground";

export const blogCategoryLinkClasses =
  "relative z-10 rounded-xs transition-colors outline-none hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60";

export const blogLinkClasses =
  "outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-ring/60";

export const blogExcerptClasses = "description-base text-pretty";

export const blogBylineClasses = "mt-auto flex min-w-0 items-center gap-3 pt-2";

export const blogBylineTextClasses = "flex min-w-0 flex-col";

export const blogAuthorClasses = "truncate heading-sm";

export const blogDateClasses = "caption-sm";

export const blogIndexClasses = "divide-y divide-border border-y border-border";

export const blogIndexRowClasses =
  "group/row relative grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[9rem_minmax(0,1fr)]";

export const blogIndexDateClasses = "caption-sm tabular-nums sm:pt-1";

export const blogRowsClasses = "divide-y divide-border border-y border-border";

export const blogRowClasses =
  "group/row relative grid items-center gap-5 py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8";

export const blogRowMediaClasses =
  "aspect-4/3 overflow-hidden rounded-xl *:size-full *:object-cover";

export const blogRowTextClasses = "flex min-w-0 flex-col items-start gap-2";

export const blogRowTitleClasses = "heading-lg text-pretty";

export const blogRowLinkClasses =
  "underline-offset-4 outline-none group-hover/row:underline after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-ring/60";

export const blogFeaturedClasses =
  "grid items-start gap-3 md:gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]";

export const blogSideClasses = "flex flex-col gap-3 md:gap-4";

export const blogSideRowClasses = `group/tile relative flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-muted p-3 ${cardHover}`;

export const blogThumbClasses =
  "aspect-square w-20 shrink-0 overflow-hidden rounded-xl *:size-full *:object-cover sm:w-24";

export const blogSideTitleClasses = "label-base text-pretty text-foreground";

export const blogFilteredClasses = "flex flex-col gap-8";

export const blogFilterClasses = "flex-wrap";

export const blogFilterChipClasses = "rounded-full";

export const blogWideClasses = "flex flex-col gap-3 md:gap-4";

export const blogWidePostClasses = `group/tile relative grid min-w-0 overflow-hidden rounded-2xl border border-border bg-muted p-3 md:grid-cols-2 md:items-center md:gap-4 ${cardHover}`;

export const blogWideMediaClasses =
  "aspect-video overflow-hidden rounded-xl *:size-full *:object-cover md:aspect-4/3";

export const blogWideTextClasses =
  "flex min-w-0 flex-col items-start gap-3 p-3 md:p-6";

export const blogWideTitleClasses = "heading-2xl text-balance text-foreground";
