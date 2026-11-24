import { cva } from "class-variance-authority";
import type { SectionAlign } from "../../components/Section";
import { blockBody, blockCard, iconTile } from "../../recipes/block";

export const contactClasses = cva("", {
  variants: {
    layout: {
      stacked: `${blockBody}`,
      split:
        "grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16",
    },
  },
  defaultVariants: {
    layout: "stacked",
  },
});

export const contactIntroClasses = "flex min-w-0 flex-col gap-10";

export const contactDetailsClasses = cva("", {
  variants: {
    layout: {
      list: "flex flex-col gap-6",
      cards: "grid w-full gap-4 sm:gap-6",
    },
    count: {
      1: "max-w-sm",
      2: "sm:grid-cols-2",
      3: "md:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
      more: "sm:grid-cols-2 lg:grid-cols-3",
    },
    align: {
      start: "",
      center: "mx-auto",
      end: "ms-auto",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    layout: "list",
  },
});

export const contactDetailClasses = cva("flex min-w-0", {
  variants: {
    layout: {
      list: "gap-4",
      cards: "",
    },
  },
  defaultVariants: {
    layout: "list",
  },
});

export const contactCardClasses = cva(`w-full min-w-0 ${blockCard}`, {
  variants: {
    align: {
      start: "items-start",
      center: "items-center text-center",
      end: "items-end text-end",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    align: "start",
  },
});

export const contactIconClasses = `${iconTile}`;

export const contactDetailTextClasses = cva("flex min-w-0 flex-col", {
  variants: {
    layout: {
      list: "gap-0.5",
      cards: "gap-1",
    },
  },
  defaultVariants: {
    layout: "list",
  },
});

export const contactLabelClasses = "description-sm";

export const contactValueClasses =
  "body-base font-medium wrap-break-word whitespace-pre-line";

export const contactPanelClasses = cva("w-full max-w-2xl", {
  variants: {
    align: {
      start: "",
      center: "mx-auto",
      end: "ms-auto",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    align: "start",
  },
});

export const contactFormCardClasses = "w-full min-w-0 rounded-2xl p-6 sm:p-8";

export const contactFormClasses = "flex flex-col gap-5";

export const contactFieldsClasses = "grid gap-5 sm:grid-cols-2";

export const contactMessageClasses = "min-h-32";

export const contactThanksClasses =
  "flex flex-col items-center gap-3 py-10 text-center outline-none";

export const contactThanksTitleClasses = "heading-lg";

export const contactThanksTextClasses = "description-base text-pretty";

export const contactFieldClasses = "flex flex-col gap-2";

export const contactVisitClasses = cva(
  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
  {
    variants: {
      mapFirst: {
        true: "lg:[&>[data-part=contact-intro]]:order-2",
        false: "",
      },
    },
    defaultVariants: {
      mapFirst: false,
    },
  },
);

export const contactMapClasses =
  "aspect-4/3 w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-muted *:size-full";

export const contactStatusClasses = "self-start";

export const contactHoursBlockClasses = "flex flex-col gap-2";

export const contactHoursCardClasses = "flex flex-col gap-1 p-5";

export const contactHoursTitleClasses = "heading-sm";

export const contactHoursClasses = "flex flex-col";

export const contactHourClasses =
  "flex items-baseline justify-between gap-4 border-b border-border py-3 description-sm last:border-b-0 data-today:font-semibold data-today:text-foreground";

export const contactActionClasses =
  "mt-2 inline-flex items-center gap-1 self-start label-sm text-foreground [&_svg]:size-4";

export const contactLocationsClasses =
  "grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3";

export const contactLocationItemClasses = "flex";

export const contactLocationClasses = "w-full gap-0 overflow-hidden p-0";

export const contactLocationMapClasses =
  "aspect-video overflow-hidden bg-muted *:size-full *:object-cover";

export const contactLocationBodyClasses = "flex flex-col gap-4 p-5";

export const contactLocationNameClasses = "heading-lg text-pretty";
