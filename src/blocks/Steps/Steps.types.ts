import type { ThemeMode } from "../../host";
import type { ReactNode } from "react";
import type {
  BlockAction,
  BlockItem,
  SectionAlign,
} from "../../components/Section";

export type StepsOrientation = "horizontal" | "vertical";

export type StepsLayout = "line" | "cards" | "numbers" | "dots";

export interface StepsProps {
  items?: BlockItem[];
  orientation?: StepsOrientation;
  layout?: StepsLayout;
  beside?: boolean;
  theme?: ThemeMode;
  media?: ReactNode;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  tagline?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
