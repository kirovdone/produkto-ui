import type { ReactNode } from "react";
import type { BlockAction, SectionAlign } from "../../components/Section";

export type ProjectsLayout = "grid" | "featured" | "list" | "alternate";

export type ProjectsColumns = 2 | 3 | 4;

export interface ProjectItem {
  title: string;
  image: ReactNode;
  alt?: string;
  description?: string;
  tags?: string[];
  year?: string | number;
  link?: string;
}

export interface ProjectsProps {
  items?: ProjectItem[];
  layout?: ProjectsLayout;
  columns?: ProjectsColumns;
  filter?: boolean;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}

export interface ProjectFact {
  label: string;
  value: ReactNode;
}
