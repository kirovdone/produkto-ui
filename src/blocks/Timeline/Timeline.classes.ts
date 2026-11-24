import { cva } from "class-variance-authority";
import type { SectionAlign } from "../../components/Section";
import type {
  TimelineLayout,
  TimelineMarker,
  TimelineSide,
} from "./Timeline.types";
import { blockBody } from "../../recipes/block";

export const timelineBodyClasses = `${blockBody}`;

export const timelineScrollerClasses =
  "-m-2 rounded-2xl p-2 has-focus-visible:ring-2 has-focus-visible:ring-ring/60";

export const timelineScrollClasses =
  "[&>[data-part=scroll-area-viewport]]:snap-x [&>[data-part=scroll-area-viewport]]:scroll-ps-10 [&>[data-part=scroll-area-viewport]]:mask-r-from-[calc(100%-2.5rem)]";

export const timelineClasses = cva("", {
  variants: {
    layout: {
      vertical: "flex w-full max-w-3xl flex-col",
      alternate: "flex w-full max-w-3xl flex-col lg:mx-auto lg:max-w-5xl",
      horizontal: "flex pe-10 pb-6 outline-none",
    } satisfies Record<TimelineLayout, string>,
    align: {
      start: "",
      center: "",
      end: "",
    } satisfies Record<SectionAlign, string>,
  },
  compoundVariants: [
    { layout: "vertical", align: "center", className: "mx-auto w-fit" },
    { layout: "vertical", align: "end", className: "ms-auto w-fit" },
    { layout: "alternate", align: "center", className: "mx-auto" },
    { layout: "alternate", align: "end", className: "ms-auto" },
  ],
  defaultVariants: {
    layout: "vertical",
    align: "start",
  },
});

export const timelineItemClasses = cva("group/item relative", {
  variants: {
    layout: {
      vertical:
        "grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:grid-cols-[7rem_auto_minmax(0,1fr)] md:gap-x-6",
      alternate:
        "grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-8",
      horizontal:
        "flex min-w-64 flex-1 shrink-0 snap-start flex-col gap-4 sm:min-w-72",
    } satisfies Record<TimelineLayout, string>,
  },
  defaultVariants: {
    layout: "vertical",
  },
});

export const timelineRailClasses = cva("flex items-center gap-2", {
  variants: {
    layout: {
      vertical:
        "col-start-1 row-span-2 row-start-1 flex-col md:col-start-2 md:row-span-1",
      alternate:
        "col-start-1 row-span-2 row-start-1 flex-col lg:col-start-2 lg:row-span-1",
      horizontal: "",
    } satisfies Record<TimelineLayout, string>,
  },
  defaultVariants: {
    layout: "vertical",
  },
});

export const timelineMarkerClasses = cva(
  "relative flex shrink-0 items-center justify-center",
  {
    variants: {
      marker: {
        dot: "size-5",
        icon: "size-10 rounded-full border border-border bg-card text-foreground [&_svg]:size-4.5",
      } satisfies Record<TimelineMarker, string>,
    },
    defaultVariants: {
      marker: "dot",
    },
  },
);

export const timelineDotClasses = cva("rounded-full", {
  variants: {
    marker: {
      dot: "size-2.5 bg-primary ring-4 ring-primary/15",
      icon: "size-2 bg-muted-foreground/60",
    } satisfies Record<TimelineMarker, string>,
  },
  defaultVariants: {
    marker: "dot",
  },
});

export const timelineLineClasses = cva("flex-1 bg-muted-foreground/25", {
  variants: {
    layout: {
      vertical: "mb-2 w-px",
      alternate: "mb-2 w-px",
      horizontal: "me-2 h-px",
    } satisfies Record<TimelineLayout, string>,
  },
  defaultVariants: {
    layout: "vertical",
  },
});

export const timelineDateClasses = cva("caption-sm tabular-nums", {
  variants: {
    layout: {
      vertical: "col-start-2 row-start-1 md:col-start-1",
      alternate: "col-start-2 row-start-1",
      horizontal: "order-first",
    } satisfies Record<TimelineLayout, string>,
    align: {
      start: "",
      center: "",
      end: "",
    } satisfies Record<SectionAlign, string>,
    marker: {
      dot: "",
      icon: "",
    } satisfies Record<TimelineMarker, string>,
    side: {
      start: "",
      end: "",
    } satisfies Record<TimelineSide, string>,
  },
  compoundVariants: [
    { layout: "vertical", marker: "icon", className: "pt-2.5" },
    { layout: "alternate", marker: "icon", className: "pt-2.5" },
    { layout: "vertical", align: "center", className: "md:text-end" },
    {
      layout: "alternate",
      side: "start",
      className: "lg:col-start-3",
    },
    {
      layout: "alternate",
      side: "end",
      className: "lg:col-start-1 lg:text-end",
    },
  ],
  defaultVariants: {
    layout: "vertical",
    marker: "dot",
  },
});

export const timelineContentClasses = cva("flex min-w-0 flex-col gap-2", {
  variants: {
    layout: {
      vertical:
        "col-start-2 row-start-2 pt-1 pb-10 group-last/item:pb-0 md:col-start-3 md:row-start-1",
      alternate:
        "col-start-2 row-start-2 pt-1 pb-10 group-last/item:pb-0 lg:row-start-1",
      horizontal: "pe-8",
    } satisfies Record<TimelineLayout, string>,
    marker: {
      dot: "",
      icon: "",
    } satisfies Record<TimelineMarker, string>,
    side: {
      start: "",
      end: "",
    } satisfies Record<TimelineSide, string>,
  },
  compoundVariants: [
    { layout: "vertical", marker: "dot", className: "md:pt-0" },
    { layout: "vertical", marker: "icon", className: "md:pt-2.5" },
    { layout: "alternate", marker: "dot", className: "lg:pt-0" },
    { layout: "alternate", marker: "icon", className: "lg:pt-2.5" },
    {
      layout: "alternate",
      side: "start",
      className: "lg:col-start-1 lg:items-end lg:text-end",
    },
    { layout: "alternate", side: "end", className: "lg:col-start-3" },
  ],
  defaultVariants: {
    layout: "vertical",
    marker: "dot",
  },
});

export const timelineTitleClasses = "heading-lg text-balance";

export const timelineDescriptionClasses = "description-base text-pretty";

export const timelineStageClasses = "grid overflow-hidden rounded-2xl bg-muted";

export const timelineStagePanelClasses =
  "invisible col-start-1 row-start-1 grid min-w-0 opacity-0 transition-[opacity,visibility] duration-500 data-[open=true]:visible data-[open=true]:opacity-100 motion-reduce:transition-none lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]";

export const timelineStageWordsClasses =
  "flex min-w-0 flex-col gap-4 p-6 sm:p-8 lg:p-10";

export const timelineStageDateClasses =
  "display-4xl tabular-nums lg:display-5xl";

export const timelineStageTitleClasses = "heading-lg text-balance";

export const timelineStageDescriptionClasses = "description-base text-pretty";

export const timelineStageStatClasses =
  "flex flex-wrap items-baseline gap-x-2 border-t border-border pt-4";

export const timelineStageStatValueClasses = "display-4xl tabular-nums";

export const timelineStageStatLabelClasses = "description-base";

export const timelineStageNoteClasses = "description-sm text-pretty";

export const timelineStageControlsClasses = "mt-auto flex gap-2 pt-2";

export const timelineStageFrameClasses =
  "flex min-w-0 items-end px-6 sm:px-8 lg:ps-0 lg:pe-10 lg:pt-10";

export const timelineStageMediaClasses =
  "relative aspect-[16/10] w-full overflow-hidden rounded-t-xl border border-b-0 border-border bg-background [&_img]:block [&_img]:size-full [&_img]:object-cover [&_img]:object-top";

export const timelineStageEmptyClasses =
  "size-full bg-[repeating-linear-gradient(135deg,var(--muted)_0_10px,var(--border)_10px_20px)]";
