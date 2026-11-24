import { cva } from "class-variance-authority";
import type { ArticleLayout } from "./Article.types";
import { blockBody } from "../../recipes/block";

export const articleBodyClasses = `${blockBody}`;

export const articleClasses = cva("min-w-0", {
  variants: {
    layout: {
      column: "mx-auto flex w-full max-w-2xl flex-col gap-10",
      contents: "grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16",
      split: "flex flex-col divide-y divide-border",
    } satisfies Record<ArticleLayout, string>,
  },
  defaultVariants: {
    layout: "column",
  },
});

export const articleContentsClasses =
  "flex flex-col gap-3 self-start rounded-2xl bg-muted p-5 lg:sticky lg:top-6";

export const articleContentsLabelClasses =
  "caption-xs uppercase tracking-widest";

export const articleContentsListClasses = "flex flex-col gap-0.5";

export const articleContentsLinkClasses = "-ms-2";

export const articleTextClasses = "flex min-w-0 max-w-2xl flex-col gap-10";

export const articlePartClasses = cva("flex min-w-0 flex-col", {
  variants: {
    layout: {
      column: "gap-3",
      contents: "gap-3",
      split:
        "gap-4 py-10 first:pt-0 lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16",
    } satisfies Record<ArticleLayout, string>,
  },
  defaultVariants: {
    layout: "column",
  },
});

export const articleHeadingClasses = "scroll-mt-6 heading-2xl text-balance";

export const articleProseClasses =
  "flex flex-col gap-4 body-base text-pretty [&_blockquote]:border-s-2 [&_blockquote]:border-foreground [&_blockquote]:ps-5 [&_blockquote]:heading-xl [&_figcaption]:pt-2 [&_figcaption]:caption-sm [&_ol]:list-decimal [&_ol]:ps-5 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:ps-5";

export const articleIntroClasses =
  "flex flex-col gap-4 description-lg text-pretty";

export const articlePageClasses = "flex flex-col gap-8";

export const articlePageHeaderClasses =
  "flex flex-col items-center gap-6 text-center";

export const articlePageTitleClasses =
  "display-3xl text-balance sm:display-4xl lg:display-5xl";

export const articlePageDateClasses = "description-sm";
