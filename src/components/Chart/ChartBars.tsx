"use client";

import { cn } from "../../cn";
import { useId } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  XAxis,
  YAxis,
  type LabelProps,
  type TooltipValueType,
} from "recharts";
import { useTranslate } from "../../host";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ChartContainer";
import { NotFound } from "../NotFound";
import { SkeletonRow } from "../Skeleton";
import {
  chartBarsClasses,
  chartBarsLabelClasses,
  chartBarsLoadingClasses,
  chartBarsRowClasses,
  chartBarsShareClasses,
  chartBarsValueClasses,
} from "./ChartBars.classes";
import type { ChartBarsProps, ChartConfig } from "./Chart.types";
import { Icon } from "../Icon";

const ROW = 40;

const BAR = 32;

const GAP = 4;

const COLOR = "var(--color-value, var(--primary))";

const MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };

const PLACEHOLDERS = [0, 1, 2, 3, 4];

const DOMAIN: [number, (max: number) => number] = [
  0,
  (max) => Math.max(max, 1),
];

export const ChartBars = ({
  type: _bars,
  data,
  config,
  loading = false,
  loadingIcon = false,
  className,
  style,
  ...props
}: ChartBarsProps) => {
  const t = useTranslate();
  const fill = `chart-bars-fill-${useId().replace(/[^\w-]/g, "")}`;

  if (loading)
    return (
      <div
        data-part="chart-bars"
        aria-busy
        className={cn(chartBarsLoadingClasses, className)}
        style={style}
        {...props}
      >
        {PLACEHOLDERS.map((index) => (
          <SkeletonRow key={index} icon={loadingIcon} />
        ))}
      </div>
    );

  if (!data.length)
    return (
      <NotFound
        appearance="transparent"
        className={className}
        style={style}
        {...props}
      >
        {t("No items found")}
      </NotFound>
    );

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const rows: ChartConfig = Object.fromEntries(
    data.map((item) => [item.label, { label: item.label, icon: item.icon }]),
  );

  const share = (value: TooltipValueType) => {
    const amount = Number(value);
    const percent = total > 0 ? (amount / total) * 100 : 0;
    return (
      <>
        {amount.toLocaleString()}{" "}
        <span className={chartBarsShareClasses}>{percent.toFixed(1)}%</span>
      </>
    );
  };

  const row = ({ viewBox, parentViewBox, index }: LabelProps) => {
    const item = data[Number(index)];
    if (
      !item ||
      !viewBox ||
      !parentViewBox ||
      !("y" in viewBox) ||
      !("width" in parentViewBox)
    )
      return null;
    const plot = parentViewBox;
    return (
      <foreignObject
        x={plot.x}
        y={viewBox.y}
        width={plot.width}
        height={viewBox.height}
      >
        <div className={chartBarsRowClasses}>
          <span className={chartBarsLabelClasses}>
            {item.media ?? (item.icon ? <Icon icon={item.icon} /> : null)}
            <span className="truncate">{item.label}</span>
          </span>
          <span className={chartBarsValueClasses}>
            {item.value.toLocaleString()}
          </span>
        </div>
      </foreignObject>
    );
  };

  return (
    <ChartContainer
      data-part="chart-bars"
      config={{ ...rows, ...config }}
      initialDimension={{ width: 320, height: data.length * ROW }}
      className={cn(chartBarsClasses, className)}
      style={{ height: data.length * ROW, ...style }}
      {...props}
    >
      <BarChart
        accessibilityLayer
        barCategoryGap={GAP}
        data={data}
        layout="vertical"
        margin={MARGIN}
      >
        <defs>
          <linearGradient id={fill} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={COLOR} stopOpacity={0.04} />
            <stop offset="100%" stopColor={COLOR} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="value" domain={DOMAIN} hide type="number" />
        <YAxis dataKey="label" hide type="category" />
        <ChartTooltip
          content={
            <ChartTooltipContent
              showLabel={false}
              indicatorColor={COLOR}
              nameKey="label"
              valueFormatter={share}
            />
          }
        />
        <Bar
          barSize={BAR}
          dataKey="value"
          fill={`url(#${fill})`}
          isAnimationActive={false}
          radius={8}
        >
          <LabelList content={row} dataKey="label" />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
