import type { ComponentProps, ReactNode } from "react";
import type {
  DefaultLegendContentProps,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  TooltipValueType,
} from "recharts";
import type { IconSvgElement } from "../Icon";

export interface ChartColorPair {
  light: string;
  dark: string;
}

export interface ChartSeries {
  label?: ReactNode;
  icon?: IconSvgElement;
  color?: string | ChartColorPair;
}

export type ChartConfig = Record<string, ChartSeries>;

export interface ChartContainerProps extends Omit<
  ComponentProps<"div">,
  "children"
> {
  config: ChartConfig;
  initialDimension?: { width: number; height: number };
  children: ComponentProps<typeof ResponsiveContainer>["children"];
}

export type ChartTooltipProps = ComponentProps<typeof Tooltip>;

export type ChartTooltipIndicator = "dot" | "line" | "dashed" | "none";

type TooltipState = TooltipContentProps<TooltipValueType, number | string>;

export interface ChartTooltipContentProps extends Partial<
  Pick<TooltipState, "active" | "payload" | "label" | "labelFormatter">
> {
  className?: string;
  indicator?: ChartTooltipIndicator;
  indicatorColor?: string;
  showLabel?: boolean;
  nameKey?: string;
  valueFormatter?: (value: TooltipValueType) => ReactNode;
}

export type ChartLegendProps = ComponentProps<typeof Legend>;

export interface ChartLegendContentProps extends Partial<
  Pick<DefaultLegendContentProps, "payload" | "verticalAlign">
> {
  className?: string;
  nameKey?: string;
  showIcon?: boolean;
}

export interface ChartPoint {
  label: string;
  value: number;
  previous?: number | null;
}

export type ChartCurve = "smooth" | "sharp";

export type ChartTrendType = "area" | "line";

export interface ChartTrendProps extends Omit<
  ChartContainerProps,
  "config" | "children"
> {
  type?: ChartTrendType;
  data: ChartPoint[];
  config?: ChartConfig;
  curve?: ChartCurve;
  labelCount?: number;
  sparkline?: boolean;
  valueFormatter?: (value: TooltipValueType) => ReactNode;
}

export interface ChartBar {
  label: string;
  value: number;
  icon?: IconSvgElement;
  media?: ReactNode;
}

export interface ChartBarsProps extends Omit<
  ChartContainerProps,
  "config" | "children" | "initialDimension"
> {
  type: "bars";
  data: ChartBar[];
  config?: ChartConfig;
  loading?: boolean;
  loadingIcon?: boolean;
}

export type ChartProps = ChartTrendProps | ChartBarsProps;
