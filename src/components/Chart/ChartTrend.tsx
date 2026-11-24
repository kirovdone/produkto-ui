"use client";

import { useId } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  type XAxisTickContentProps,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ChartContainer";
import type { ChartTrendProps } from "./Chart.types";

const CURVES = { smooth: "monotone", sharp: "linear" } as const;

const SERIES = {
  strokeWidth: 1.25,
  isAnimationActive: false,
} as const;

const COLOR = "var(--color-value, var(--primary))";

const PREVIOUS = {
  ...SERIES,
  dataKey: "previous",
  stroke: "var(--color-previous, var(--muted-foreground))",
  strokeOpacity: 0.55,
  strokeDasharray: "4 4",
} as const;

const CURRENT = {
  ...SERIES,
  dataKey: "value",
  stroke: COLOR,
  strokeOpacity: 0.45,
} as const;

const FULL_MARGIN = { top: 4, right: 1, bottom: 0, left: 1 };

const spreadLabels = (labels: string[], count: number) => {
  const last = labels.length - 1;
  if (last < 1) return labels;
  const shown = Math.max(2, Math.min(count, Math.floor(last / 2) + 1));
  const picked = new Set(
    Array.from({ length: shown }, (_, at) =>
      Math.round((at * last) / (shown - 1)),
    ),
  );
  return [...picked].map((at) => labels[at]);
};

const edgeTick = ({
  x,
  y,
  index,
  visibleTicksCount,
  payload,
}: XAxisTickContentProps) => {
  const first = index === 0;
  const last = index === visibleTicksCount - 1;
  const toStart = first;
  const anchor = first || last ? (toStart ? "start" : "end") : "middle";
  return (
    <text
      x={Number(x)}
      y={Number(y)}
      dy="0.71em"
      textAnchor={anchor}
      className="recharts-cartesian-axis-tick-value"
      data-axis="x"
    >
      {String(payload.value)}
    </text>
  );
};

const SPARKLINE_MARGIN = { top: 2, right: 0, bottom: 2, left: 0 };

export const ChartTrend = ({
  data,
  config = {},
  type = "area",
  curve = "smooth",
  labelCount = 5,
  sparkline = false,
  valueFormatter,
  ...props
}: ChartTrendProps) => {
  const fill = `chart-trend-fill-${useId().replace(/[^\w-]/g, "")}`;
  const previous = data.some((point) => point.previous != null);
  const margin = sparkline ? SPARKLINE_MARGIN : FULL_MARGIN;

  const frame = (
    <>
      {sparkline ? null : <CartesianGrid vertical={false} />}
      <XAxis
        axisLine={false}
        dataKey="label"
        hide={sparkline}
        interval={sparkline ? "preserveStartEnd" : 0}
        minTickGap={24}
        ticks={
          sparkline
            ? undefined
            : spreadLabels(
                data.map((point) => point.label),
                labelCount,
              )
        }
        tick={sparkline ? undefined : edgeTick}
        tickLine={false}
        tickMargin={8}
      />
      <ChartTooltip
        allowEscapeViewBox={{ x: false, y: sparkline }}
        content={
          <ChartTooltipContent
            indicator="line"
            valueFormatter={valueFormatter}
          />
        }
      />
    </>
  );

  return (
    <ChartContainer
      data-part="chart-trend"
      data-chart={type}
      config={config}
      {...props}
    >
      {type === "line" ? (
        <LineChart accessibilityLayer data={data} margin={margin}>
          {frame}
          <Line {...CURRENT} type={CURVES[curve]} dot={false} />
          {previous ? (
            <Line {...PREVIOUS} type={CURVES[curve]} dot={false} />
          ) : null}
        </LineChart>
      ) : (
        <AreaChart accessibilityLayer data={data} margin={margin}>
          <defs>
            <linearGradient id={fill} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={COLOR} stopOpacity={0.04} />
              <stop offset="100%" stopColor={COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>
          {frame}
          <Area {...CURRENT} type={CURVES[curve]} fill={`url(#${fill})`} />
          {previous ? (
            <Area {...PREVIOUS} type={CURVES[curve]} fill="transparent" />
          ) : null}
        </AreaChart>
      )}
    </ChartContainer>
  );
};
