import { cva } from "class-variance-authority";
import type {
  CookieConsentAlign,
  CookieConsentLayout,
} from "./CookieConsent.types";

export const cookieConsentClasses = cva(
  "fixed z-40 flex flex-col bg-card text-foreground shadow-sm motion-safe:animate-in fade-in-0 slide-in-from-bottom-2",
  {
    variants: {
      layout: {
        card: "bottom-4 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border",
        bar: "inset-x-0 bottom-0 max-h-dvh border-t border-border",
      } satisfies Record<CookieConsentLayout, string>,
      align: {
        start: "",
        center: "",
        end: "",
      } satisfies Record<CookieConsentAlign, string>,
    },
    compoundVariants: [
      { layout: "card", align: "start", className: "start-4" },
      { layout: "card", align: "center", className: "inset-x-0 mx-auto" },
      { layout: "card", align: "end", className: "end-4" },
    ],
    defaultVariants: {
      layout: "card",
      align: "start",
    },
  },
);

export const cookieConsentContentClasses = cva(
  "flex min-h-0 flex-1 flex-col gap-4",
  {
    variants: {
      layout: {
        card: "p-5",
        bar: "mx-auto w-full max-w-6xl px-6 py-5",
      } satisfies Record<CookieConsentLayout, string>,
      customizing: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        layout: "bar",
        customizing: false,
        className: "md:flex-row md:items-center md:justify-between md:gap-10",
      },
    ],
    defaultVariants: {
      layout: "card",
      customizing: false,
    },
  },
);

export const cookieConsentTextClasses = "flex min-w-0 flex-col gap-1.5";

export const cookieConsentTitleClasses = "heading-base outline-none";

export const cookieConsentMessageClasses = "description-sm";

export const cookieConsentActionsClasses = cva(
  "flex shrink-0 flex-wrap items-center gap-2",
  {
    variants: {
      layout: {
        card: "",
        bar: "md:flex-nowrap",
      } satisfies Record<CookieConsentLayout, string>,
    },
    defaultVariants: {
      layout: "card",
    },
  },
);

export const cookieConsentScrollClasses = cva("min-h-0 flex-1", {
  variants: {
    layout: {
      card: "-mx-5",
      bar: "-mx-6",
    } satisfies Record<CookieConsentLayout, string>,
  },
  defaultVariants: {
    layout: "card",
  },
});

export const cookieConsentCategoriesClasses = cva(
  "flex flex-col divide-y divide-border border-y border-border",
  {
    variants: {
      layout: {
        card: "mx-5",
        bar: "mx-6 md:grid md:auto-cols-fr md:grid-flow-col md:gap-8 md:divide-y-0",
      } satisfies Record<CookieConsentLayout, string>,
    },
    defaultVariants: {
      layout: "card",
    },
  },
);

export const cookieConsentCategoryClasses = "flex flex-col gap-1 py-3";

export const cookieConsentCategoryHeadClasses =
  "flex min-h-6 items-center justify-between gap-4";

export const cookieConsentCategoryLabelClasses =
  "flex-wrap gap-2 text-foreground";

export const cookieConsentCategoryDescriptionClasses = "description-sm";
