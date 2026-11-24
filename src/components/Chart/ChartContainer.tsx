"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  Legend,
  ResponsiveContainer,
  Tooltip,
  type DefaultLegendContentProps,
  type TooltipValueType,
} from "recharts";
import { cn } from "../../cn";
import { cssVariables } from "../../helpers/cssVariables";
import { isObjectLike } from "../../helpers/typeGuards";
import { Icon } from "../Icon";
import {
  chartContainerClasses,
  chartLegendContentClasses,
  chartLegendIconClasses,
  chartLegendItemClasses,
  chartLegendSwatchClasses,
  chartTooltipContentClasses,
  chartTooltipIconClasses,
  chartTooltipIndicatorClasses,
  chartTooltipItemClasses,
  chartTooltipLabelClasses,
  chartTooltipListClasses,
  chartTooltipNameClasses,
  chartTooltipRowClasses,
  chartTooltipSeriesClasses,
  chartTooltipValueClasses,
} from "./Chart.classes";
import type {
  ChartConfig,
  ChartContainerProps,
  ChartLegendContentProps,
  ChartLegendProps,
  ChartSeries,
  ChartTooltipContentProps,
  ChartTooltipProps,
} from "./Chart.types";

type TooltipRow = NonNullable<ChartTooltipContentProps["payload"]>[number];

type LegendRow = NonNullable<DefaultLegendContentProps["payload"]>[number];

const FIRST_SIZE = { width: 320, height: 200 };

const NUMBER = new Intl.NumberFormat();

const SeriesContext = createContext<ChartConfig | null>(null);

const useSeries = () => {
  const config = useContext(SeriesContext);
  if (!config) throw new Error("Draw chart parts inside a ChartContainer.");
  return config;
};

const colorOf = ({ color }: ChartSeries) =>
  typeof color === "object"
    ? `light-dark(${color.light}, ${color.dark})`
    : color;

const seriesColors = (config: ChartConfig) =>
  cssVariables(
    Object.fromEntries(
      Object.entries(config).map(([key, series]) => [
        `--color-${key}`,
        colorOf(series),
      ]),
    ),
  );

const pointOf = (row: { payload?: unknown }) =>
  isObjectLike(row.payload) ? row.payload : {};

const keyOf = (
  row: { dataKey?: unknown; name?: unknown; payload?: unknown },
  nameKey?: string,
) => {
  const named = nameKey ? pointOf(row)[nameKey] : undefined;
  if (typeof named === "string") return named;
  return String(row.dataKey ?? row.name ?? "value");
};

const readValue = (
  value: TooltipValueType,
  valueFormatter?: (value: TooltipValueType) => ReactNode,
) => {
  if (valueFormatter) return valueFormatter(value);
  return typeof value === "number" ? NUMBER.format(value) : String(value);
};

export const ChartContainer = ({
  config,
  initialDimension = FIRST_SIZE,
  className,
  style,
  children,
  ...props
}: ChartContainerProps) => {
  return (
    <SeriesContext value={config}>
      <div
        data-part="chart"
        className={cn(chartContainerClasses, className)}
        style={{ ...seriesColors(config), ...style }}
        {...props}
      >
        <ResponsiveContainer initialDimension={initialDimension}>
          {children}
        </ResponsiveContainer>
      </div>
    </SeriesContext>
  );
};

export const ChartTooltip = ({ wrapperStyle, ...props }: ChartTooltipProps) => (
  <Tooltip wrapperStyle={{ zIndex: 50, ...wrapperStyle }} {...props} />
);

export const ChartTooltipContent = ({
  active,
  payload,
  label,
  labelFormatter,
  indicator = "dot",
  indicatorColor,
  showLabel = true,
  nameKey,
  valueFormatter,
  className,
}: ChartTooltipContentProps) => {
  const config = useSeries();
  const rows = (payload ?? []).filter((row) => row.type !== "none");
  if (!active || rows.length === 0) return null;

  const named =
    typeof label === "string" || typeof label === "number"
      ? (config[label]?.label ?? label)
      : null;
  const title = labelFormatter ? labelFormatter(label, rows) : named;
  const heading =
    !showLabel ||
    title === null ||
    title === undefined ||
    title === "" ? null : (
      <div data-part="chart-tooltip-label" className={chartTooltipLabelClasses}>
        {title}
      </div>
    );
  const inline = rows.length === 1 && indicator !== "dot";

  return (
    <div
      data-part="chart-tooltip-content"
      className={cn(chartTooltipContentClasses, className)}
    >
      {inline ? null : heading}
      <ul data-part="chart-tooltip-list" className={chartTooltipListClasses}>
        {rows.map((row: TooltipRow, index) => {
          const series = config[keyOf(row, nameKey)];
          const fill = pointOf(row).fill;
          return (
            <li
              key={`${keyOf(row, nameKey)}-${index}`}
              data-part="chart-tooltip-item"
              className={chartTooltipItemClasses({ indicator })}
            >
              {series?.icon ? (
                <Icon icon={series.icon} className={chartTooltipIconClasses} />
              ) : indicator === "none" ? null : (
                <span
                  data-part="chart-tooltip-indicator"
                  aria-hidden="true"
                  className={chartTooltipIndicatorClasses({ indicator })}
                  style={cssVariables({
                    "--chart-indicator":
                      indicatorColor ??
                      (typeof fill === "string" ? fill : row.color),
                  })}
                />
              )}
              <span
                data-part="chart-tooltip-row"
                className={chartTooltipRowClasses({ inline })}
              >
                <span className={chartTooltipNameClasses}>
                  {inline ? heading : null}
                  <span className={chartTooltipSeriesClasses}>
                    {series?.label ?? row.name}
                  </span>
                </span>
                {row.value === undefined || row.value === null ? null : (
                  <span className={chartTooltipValueClasses}>
                    {readValue(row.value, valueFormatter)}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const ChartLegend = ({
  itemSorter = null,
  ...props
}: ChartLegendProps) => <Legend itemSorter={itemSorter} {...props} />;

export const ChartLegendContent = ({
  payload,
  verticalAlign = "bottom",
  nameKey,
  showIcon = true,
  className,
}: ChartLegendContentProps) => {
  const config = useSeries();
  const rows = (payload ?? []).filter((row) => row.type !== "none");
  if (rows.length === 0) return null;
  return (
    <ul
      data-part="chart-legend-content"
      className={cn(chartLegendContentClasses({ verticalAlign }), className)}
    >
      {rows.map((row: LegendRow, index) => {
        const series = config[keyOf(row, nameKey)];
        return (
          <li
            key={`${keyOf(row, nameKey)}-${index}`}
            data-part="chart-legend-item"
            className={chartLegendItemClasses}
          >
            {series?.icon && showIcon ? (
              <Icon icon={series.icon} className={chartLegendIconClasses} />
            ) : (
              <span
                aria-hidden="true"
                className={chartLegendSwatchClasses}
                style={{ backgroundColor: row.color }}
              />
            )}
            {series?.label ?? row.value}
          </li>
        );
      })}
    </ul>
  );
};
