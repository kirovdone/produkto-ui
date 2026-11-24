import type { ReactNode } from "react";
import type { BlockAction, SectionAlign } from "../../components/Section";

export type GalleryLayout =
  "grid" | "masonry" | "carousel" | "strip" | "marquee";

export type GalleryColumns = 2 | 3 | 4;

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface GalleryProps {
  items?: GalleryItem[];
  layout?: GalleryLayout;
  columns?: GalleryColumns;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}

export interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}
