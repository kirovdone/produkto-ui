import type { ReactNode } from "react";
import type { Appearance } from "../../recipes/appearance";
import type {
  BlockAction,
  SectionAlign,
  SectionHeaderLayout,
} from "../../components/Section";

export type ProductGridLayout = "grid" | "rows" | "featured" | "carousel";

export type ProductGridColumns = 2 | 3 | 4;

export type ProductGridAppearance = Extract<
  Appearance,
  "solid" | "transparent"
>;

export interface ProductItem {
  name: string;
  description?: string;
  meta?: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  alt?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  link: string;
  onAdd?: () => void;
}

export interface ProductGridProps {
  items?: ProductItem[];
  layout?: ProductGridLayout;
  columns?: ProductGridColumns;
  appearance?: ProductGridAppearance;
  quickAdd?: boolean;
  onAdd?: (item: ProductItem) => void;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  headerLayout?: SectionHeaderLayout;
  muted?: boolean;
  className?: string;
}
