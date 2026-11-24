import type { ReactNode } from "react";
import type { BlockAction, SectionAlign } from "../../components/Section";

export interface TestimonialAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface TestimonialItem {
  quote: string;
  author: TestimonialAuthor;
  rating?: number;
  media?: ReactNode;
}

export type TestimonialsLayout =
  "grid" | "single" | "carousel" | "wall" | "photo" | "marquee" | "films";

export type TestimonialLook = "card" | "center" | "start";

export type TestimonialsColumns = 2 | 3;

export interface TestimonialsProps {
  items?: TestimonialItem[];
  layout?: TestimonialsLayout;
  columns?: TestimonialsColumns;
  media?: ReactNode;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
