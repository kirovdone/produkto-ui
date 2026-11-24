import type { BlockAction, SectionAlign } from "../../components/Section";
import type { HeadingLevel } from "../../recipes/heading";
import type { ReactNode } from "react";

export interface BlogAuthor {
  name: string;
  avatar?: string;
}

export interface BlogPost {
  title: string;
  link: string;
  media?: ReactNode;
  category?: string;
  categoryLink?: string;
  excerpt?: string;
  author?: BlogAuthor;
  date?: string;
}

export type BlogColumns = 2 | 3 | 4;

export type BlogHeadingLevel = HeadingLevel;

export type BlogLayout = "cards" | "index" | "featured" | "rows" | "wide";

export interface BlogGridProps {
  posts: BlogPost[];
  columns?: BlogColumns;
  actions?: BlockAction[];
  align?: SectionAlign;
  headingLevel?: BlogHeadingLevel;
}

export interface BlogProps {
  posts?: BlogPost[];
  layout?: BlogLayout;
  filter?: boolean;
  columns?: BlogColumns;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
