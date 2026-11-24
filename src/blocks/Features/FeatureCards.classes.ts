import { cva } from "class-variance-authority";
import type {
  FeatureCardsAppearance,
  FeatureCardsColumns,
  FeatureCardsOrientation,
  FeatureCardsRows,
  FeatureCardsSize,
} from "./FeatureCards.types";
import { cardArrow, cardHover, iconTile } from "../../recipes/block";

export const featureCardsClasses = cva("grid sm:grid-cols-2", {
  variants: {
    appearance: {
      solid: "gap-3 md:gap-4",
      soft: "gap-3 md:gap-4",
      outline: "-me-px gap-0 group-data-ruled/section:-mb-px",
      transparent: "gap-4 sm:gap-5",
    } satisfies Record<FeatureCardsAppearance, string>,
    columns: {
      2: "",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
    } satisfies Record<FeatureCardsColumns, string>,
    size: {
      sm: "",
      base: "",
    } satisfies Record<FeatureCardsSize, string>,
    orientation: {
      vertical: "",
      horizontal: "",
    } satisfies Record<FeatureCardsOrientation, string>,
    rows: {
      content: "",
      equal: "lg:auto-rows-fr",
    } satisfies Record<FeatureCardsRows, string>,
  },
  defaultVariants: {
    appearance: "solid",
    columns: 3,
    size: "base",
    orientation: "vertical",
    rows: "content",
  },
});

export const featureCardItemClasses = cva("flex min-w-0", {
  variants: {
    widow: {
      true: "sm:max-lg:col-span-2",
      false: "",
    },
  },
  defaultVariants: {
    widow: false,
  },
});

export const featureCardClasses = cva(
  "group/tile relative flex w-full min-w-0 text-start transition-shadow",
  {
    variants: {
      appearance: {
        solid: "gap-0 rounded-2xl p-0 has-[a]:hover:shadow-md",
        soft: "isolate overflow-hidden rounded-2xl border border-border bg-muted",
        outline: "border-e border-b border-border",
        transparent: "",
      } satisfies Record<FeatureCardsAppearance, string>,
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row items-stretch",
      } satisfies Record<FeatureCardsOrientation, string>,
      interactive: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        appearance: "soft",
        interactive: true,
        className: cardHover,
      },
    ],
    defaultVariants: {
      appearance: "solid",
      orientation: "vertical",
    },
  },
);

export const featureCardMediaClasses = cva(
  "relative flex min-h-44 overflow-hidden *:min-w-0 *:flex-1 [&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover",
  {
    variants: {
      appearance: {
        solid: "border-b border-border bg-muted/50",
        soft: "",
        outline: "px-5 pt-6 pb-8 sm:px-8 sm:pb-10",
        transparent: "h-56 flex-none rounded-2xl bg-muted",
      } satisfies Record<FeatureCardsAppearance, string>,
      fill: {
        true: "flex-1",
        false: "flex-none",
      },
      below: {
        true: "mt-auto",
        false: "",
      },
    },
    compoundVariants: [
      {
        appearance: "outline",
        fill: true,
        className: "pt-8 sm:pt-10",
      },
      {
        appearance: "solid",
        below: true,
        className: "border-t border-b-0",
      },
    ],
    defaultVariants: {
      appearance: "solid",
      below: false,
    },
  },
);

export const featureCardBodyClasses = cva("flex flex-col", {
  variants: {
    appearance: {
      solid: "p-5",
      soft: "p-5",
      outline: "px-5 pt-8 sm:px-8 sm:pt-10",
      transparent: "",
    } satisfies Record<FeatureCardsAppearance, string>,
    size: {
      sm: "gap-3",
      base: "gap-4",
    } satisfies Record<FeatureCardsSize, string>,
    media: {
      true: "flex-1",
      false: "flex-1",
    },
    below: {
      true: "flex-none",
      false: "",
    },
  },
  compoundVariants: [
    { appearance: "outline", media: false, className: "pb-8 sm:pb-10" },
    { appearance: "soft", media: true, below: true, className: "pb-0" },
    { appearance: "transparent", media: true, className: "pt-5" },
    {
      appearance: "transparent",
      media: false,
      className: "border-t border-border pt-5",
    },
  ],
  defaultVariants: {
    appearance: "solid",
    size: "base",
    media: false,
    below: false,
  },
});

export const featureCardIconClasses = `${iconTile}`;

export const featureCardInlineIconClasses =
  "flex shrink-0 text-foreground [&_img]:size-5 [&_svg]:size-5";

export const featureCardInlineTitleClasses = "flex items-center gap-2";

export const featureCardSmallTitleClasses = "label-base text-foreground";

export const featureCardTextClasses = "flex flex-col gap-3";

export const featureCardTitleLineClasses =
  "flex items-start justify-between gap-3";

export const featureCardEndClasses = "-my-1.5 flex shrink-0 items-center gap-1";

export const featureCardTitleClasses = "heading-base";

export const featureCardOutlineTitleClasses = "heading-lg";

export const featureCardDescriptionClasses = "description-base text-pretty";

export const featureCardLinksClasses = "mt-auto flex flex-wrap gap-1 pt-1";

export const featureCardLinkItemClasses =
  "relative z-10 inline-flex h-7 items-center rounded-md bg-background px-2.5 label-xs text-foreground inset-ring inset-ring-border transition-colors outline-none hover:bg-primary hover:text-primary-foreground hover:inset-ring-primary focus-visible:inset-ring-ring";

export const featureCardOutlineLinksClasses =
  "flex flex-wrap gap-x-5 gap-y-2 pt-1";

export const featureCardOutlineLinkClasses =
  "relative z-10 inline-flex items-center gap-1 label-sm text-foreground underline-offset-4 outline-none hover:underline focus-visible:underline [&_svg]:size-4";

export const featureCardFrameClasses =
  "overflow-hidden border-t border-border group-data-ruled/section:border-t-0";

export const featureCardLinkClasses =
  "outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-ring/60 focus-visible:after:ring-inset";

export const featureCardArrowClasses = cardArrow;

export const featureCardRowMediaClasses = cva(
  "relative flex w-24 shrink-0 overflow-hidden *:min-w-0 *:flex-1 [&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover",
  {
    variants: {
      appearance: {
        solid: "border-e border-border bg-muted/50",
        soft: "",
        outline: "border-e border-border",
        transparent: "rounded-xl bg-muted",
      } satisfies Record<FeatureCardsAppearance, string>,
    },
    defaultVariants: {
      appearance: "solid",
    },
  },
);

export const featureCardRowBodyClasses = cva(
  "flex min-w-0 flex-1 flex-col gap-3",
  {
    variants: {
      appearance: {
        solid: "py-5 ps-5",
        soft: "py-5 ps-5",
        outline: "py-5 ps-5",
        transparent: "py-3",
      } satisfies Record<FeatureCardsAppearance, string>,
      end: {
        true: "pe-2",
        false: "",
      },
      media: {
        true: "",
        false: "",
      },
      described: {
        true: "justify-start",
        false: "justify-center",
      },
    },
    compoundVariants: [
      { appearance: "solid", end: false, className: "pe-5" },
      { appearance: "soft", end: false, className: "pe-5" },
      { appearance: "outline", end: false, className: "pe-5" },
      { appearance: "transparent", media: true, className: "ps-4" },
    ],
    defaultVariants: {
      appearance: "solid",
      end: false,
      media: false,
      described: false,
    },
  },
);

export const featureCardRowEndClasses = cva(
  "flex shrink-0 items-center gap-1",
  {
    variants: {
      appearance: {
        solid: "pe-5",
        soft: "pe-5",
        outline: "pe-5",
        transparent: "",
      } satisfies Record<FeatureCardsAppearance, string>,
    },
    defaultVariants: {
      appearance: "solid",
    },
  },
);
