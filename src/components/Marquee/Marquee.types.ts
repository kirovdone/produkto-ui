import type { ComponentProps } from "react";

export type MarqueeOrientation = "horizontal" | "vertical";

export interface MarqueeProps extends ComponentProps<"div"> {
  duration?: number;
  reverse?: boolean;
  orientation?: MarqueeOrientation;
}
