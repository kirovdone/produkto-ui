import type { ReactNode } from "react";
import type { ThemeMode } from "../../host";
import type { BlockAction, SectionAlign } from "../../components/Section";

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export type StatsLayout = "row" | "cards" | "split";

export type StatsCount = 1 | 2 | 3 | 4 | 5;

export interface StatsProps {
  items?: StatItem[];
  layout?: StatsLayout;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  theme?: ThemeMode;
  className?: string;
}
