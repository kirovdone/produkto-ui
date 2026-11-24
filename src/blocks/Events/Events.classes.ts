import { cva } from "class-variance-authority";
import type { EventsLayout } from "./Events.types";

type Shape = Extract<EventsLayout, "list" | "cards">;
import { blockBody, cardFrame } from "../../recipes/block";

export const eventsBodyClasses = `${blockBody}`;

export const eventsClasses = cva("", {
  variants: {
    layout: {
      list: "divide-y divide-border border-y border-border",
      cards: "grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3",
    } satisfies Record<Shape, string>,
  },
  defaultVariants: {
    layout: "list",
  },
});

export const eventClasses = cva("group relative min-w-0", {
  variants: {
    layout: {
      list: "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-3 py-5 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:gap-x-6",
      cards: `${cardFrame} flex flex-col overflow-hidden transition-colors hover:bg-hover`,
    } satisfies Record<Shape, string>,
  },
  defaultVariants: {
    layout: "list",
  },
});

export const eventDateClasses = cva(
  "flex size-16 shrink-0 flex-col items-center justify-center rounded-xl border border-border bg-card leading-none",
  {
    variants: {
      layout: {
        list: "",
        cards: "absolute start-3 top-3 z-10",
      } satisfies Record<Shape, string>,
    },
    defaultVariants: {
      layout: "list",
    },
  },
);

export const eventDayClasses = "heading-xl tabular-nums";

export const eventMonthClasses = "pt-1 caption-xs uppercase tracking-widest";

export const eventFrameClasses = cva("relative aspect-4/3 overflow-hidden", {
  variants: {
    muted: {
      true: "bg-background",
      false: "bg-muted",
    },
  },
  defaultVariants: {
    muted: false,
  },
});

export const eventImageClasses = "size-full *:size-full *:object-cover";

export const eventContentClasses = cva("flex min-w-0 flex-col gap-1", {
  variants: {
    layout: {
      list: "",
      cards: "flex-1 p-5",
    } satisfies Record<Shape, string>,
  },
  defaultVariants: {
    layout: "list",
  },
});

export const eventCategoryClasses = "caption-xs uppercase tracking-widest";

export const eventTitleClasses = "heading-base text-balance";

export const eventLinkClasses =
  "underline-offset-4 outline-none group-hover:underline after:absolute after:inset-0 after:rounded-[inherit] focus-visible:after:ring-2 focus-visible:after:ring-ring/60";

export const eventMetaClasses = "description-sm";

export const eventDescriptionClasses = "pt-1 description-sm text-pretty";

export const eventPriceClasses = cva("label-base tabular-nums", {
  variants: {
    layout: {
      list: "col-start-2 sm:col-start-auto",
      cards: "",
    } satisfies Record<Shape, string>,
  },
  defaultVariants: {
    layout: "list",
  },
});

export const eventActionClasses = cva("relative z-10", {
  variants: {
    layout: {
      list: "col-start-2 justify-self-start sm:col-start-auto",
      cards: "",
    } satisfies Record<Shape, string>,
  },
  defaultVariants: {
    layout: "list",
  },
});

export const eventFooterClasses =
  "flex items-center justify-between gap-3 px-5 pb-5";

export const eventTimeClasses = "w-14 shrink-0 label-base tabular-nums";

export const eventsTabsClasses = "flex w-full flex-col items-start gap-6";

export const eventsPanelClasses = "w-full";
