import type { ReactNode } from "react";
import type { SectionAlign } from "../../components/Section";

export interface ArticleSection {
  id: string;
  title: string;
  children: ReactNode;
}

export type ArticleLayout = "column" | "contents" | "split";

export type ArticleOpening = "band" | "page";

export interface ArticleProps {
  sections?: ArticleSection[];
  layout?: ArticleLayout;
  opening?: ArticleOpening;
  intro?: ReactNode;
  contentsLabel?: string;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
