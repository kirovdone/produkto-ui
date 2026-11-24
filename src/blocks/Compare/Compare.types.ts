import type { ReactNode } from "react";
import type {
  BlockAction,
  SectionAlign,
  SectionWidth,
} from "../../components/Section";

export type CompareValue = boolean | string;

export type CompareLayout = "cards" | "scroll" | "options";

export interface CompareColumn {
  name: string;
  highlighted?: boolean;
  badge?: string;
  price?: string;
  cta?: BlockAction;
}

export interface CompareRow {
  feature: string;
  detail?: string;
  values: CompareValue[];
}

export interface CompareGroup {
  title: string;
  rows: CompareRow[];
}

export interface CompareTableProps {
  columns?: CompareColumn[];
  rows?: CompareRow[];
  groups?: CompareGroup[];
  layout?: CompareLayout;
  featuresLabel?: string;
  caption?: string;
  className?: string;
}

export interface CompareProps {
  columns?: CompareColumn[];
  rows?: CompareRow[];
  groups?: CompareGroup[];
  layout?: CompareLayout;
  featuresLabel?: string;
  caption?: string;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  width?: SectionWidth;
  muted?: boolean;
  className?: string;
}
