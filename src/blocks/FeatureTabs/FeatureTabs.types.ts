import type { ReactNode } from "react";

export type FeatureTabsOrientation = "horizontal" | "vertical";

export type FeatureTabsBarPlacement = "above" | "below";

export interface FeatureTab {
  title: string;
  body?: ReactNode;
  icon?: ReactNode;
  media?: ReactNode;
  duration?: number;
}

export interface FeatureTabsProps {
  items: FeatureTab[];
  orientation?: FeatureTabsOrientation;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  interval?: number;
  loop?: boolean;
  trail?: boolean;
  line?: boolean;
  barPlacement?: FeatureTabsBarPlacement;
  children?: ReactNode;
  className?: string;
}
