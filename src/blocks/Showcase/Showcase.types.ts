import type { ReactNode } from "react";
import type { SectionAlign } from "../../components/Section";

export interface ShowcaseItem {
  title: string;
  description?: string;
  src: string;
  alt: string;
  link?: string;
}

export interface ShowcaseProps {
  items?: ShowcaseItem[];
  interval?: number;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
