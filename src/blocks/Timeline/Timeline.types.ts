import type { ReactNode } from "react";
import type { BlockAction, SectionAlign } from "../../components/Section";

export type TimelineOrientation = "vertical" | "horizontal";

export type TimelineLayout = "vertical" | "alternate" | "horizontal";

export type TimelineMarker = "dot" | "icon";

export type TimelineSide = "start" | "end";

export type TimelineView = "list" | "stage";

export interface TimelineStat {
  value: string;
  label: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  summary?: string;
  stat?: TimelineStat;
  note?: string;
  media?: ReactNode;
}

export interface TimelineProps {
  items?: TimelineItem[];
  view?: TimelineView;
  interval?: number;
  orientation?: TimelineOrientation;
  alternate?: boolean;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
