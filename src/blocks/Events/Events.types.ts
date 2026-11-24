import type { ReactNode } from "react";
import type {
  BlockAction,
  BlockLink,
  SectionAlign,
} from "../../components/Section";

export interface EventItem {
  title: string;
  date: string;
  time?: string;
  place?: string;
  category?: string;
  price?: string;
  description?: ReactNode;
  image?: string | ReactNode;
  alt?: string;
  link?: string;
  action?: BlockLink;
}

export type EventsLayout = "list" | "cards" | "tabs" | "schedule";

export interface EventsProps {
  items?: EventItem[];
  layout?: EventsLayout;
  locale?: string;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
