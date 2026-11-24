import type { BlockAction, SectionAlign } from "../../components/Section";
import type { ReactNode } from "react";

export interface FaqItem {
  question: string;
  answer: ReactNode;
}

export type FaqLayout = "stacked" | "split" | "columns";

export interface FaqTopic {
  label: string;
  items: readonly FaqItem[];
}

export interface FaqContact {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: BlockAction[];
}

export interface FaqProps {
  items?: readonly FaqItem[];
  topics?: readonly FaqTopic[];
  contact?: FaqContact;
  layout?: FaqLayout;
  note?: ReactNode;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  tagline?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  structuredData?: boolean;
  className?: string;
}
