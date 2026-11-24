import { cva } from "class-variance-authority";
import { panelSurface } from "../../recipes/panel";
import type { ChartTooltipIndicator } from "./Chart.types";

const rechartsDefaults = [
  "[&_[stroke='#ccc']]:stroke-border",
  "[&_[fill='#ccc']]:fill-muted",
  "[&_[fill='#eee']]:fill-muted",
  "[&_[stroke='#fff']]:stroke-transparent",
  "[&_:is(.recharts-cartesian-axis-tick-value,.recharts-polar-angle-axis-tick-value,.recharts-polar-radius-axis-tick-value)]:fill-muted-foreground",
].join(" ");

const rechartsFocus =
  "[&_:is(.recharts-surface,.recharts-layer,.recharts-sector)]:outline-none [&_.recharts-surface]:[direction:ltr] [&_.recharts-surface:focus-visible]:ring-2 [&_.recharts-surface:focus-visible]:ring-ring/60";

export const chartContainerClasses = `flex aspect-video justify-center body-xs text-foreground ${rechartsDefaults} ${rechartsFocus}`;

export const chartTooltipContentClasses = `flex min-w-32 flex-col gap-2 ${panelSurface} px-3 py-2 body-sm`;

export const chartTooltipLabelClasses = "text-foreground";

export const chartTooltipListClasses = "flex flex-col gap-1";

export const chartTooltipItemClasses = cva("flex gap-2", {
  variants: {
    indicator: {
      dot: "items-center",
      line: "items-stretch",
      dashed: "items-stretch",
      none: "items-center",
    } satisfies Record<ChartTooltipIndicator, string>,
  },
  defaultVariants: {
    indicator: "dot",
  },
});

export const chartTooltipIndicatorClasses = cva(
  "shrink-0 rounded-[2px] border-(--chart-indicator)",
  {
    variants: {
      indicator: {
        dot: "size-2.5 bg-(--chart-indicator)",
        line: "w-1 bg-(--chart-indicator)",
        dashed: "border-s-[3px] border-dashed",
        none: "hidden",
      } satisfies Record<ChartTooltipIndicator, string>,
    },
    defaultVariants: {
      indicator: "dot",
    },
  },
);

export const chartTooltipIconClasses = "size-2.5 text-muted-foreground";

export const chartTooltipRowClasses = cva(
  "flex flex-1 justify-between gap-3 leading-none",
  {
    variants: {
      inline: {
        true: "items-end",
        false: "items-center",
      },
    },
    defaultVariants: {
      inline: false,
    },
  },
);

export const chartTooltipNameClasses = "flex flex-col gap-1";

export const chartTooltipSeriesClasses = "text-muted-foreground";

export const chartTooltipValueClasses =
  "font-semibold text-foreground tabular-nums";

export const chartLegendContentClasses = cva(
  "flex flex-wrap items-center justify-center gap-4",
  {
    variants: {
      verticalAlign: {
        top: "pb-3",
        middle: "pt-3",
        bottom: "pt-3",
      },
    },
    defaultVariants: {
      verticalAlign: "bottom",
    },
  },
);

export const chartLegendItemClasses = "flex items-center gap-1.5";

export const chartLegendIconClasses = "size-3 text-muted-foreground";

export const chartLegendSwatchClasses = "size-2 shrink-0 rounded-[2px]";
