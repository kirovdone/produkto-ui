import { ChartBars } from "./ChartBars";
import { ChartTrend } from "./ChartTrend";
import type { ChartProps } from "./Chart.types";

export const Chart = (props: ChartProps) =>
  props.type === "bars" ? <ChartBars {...props} /> : <ChartTrend {...props} />;
