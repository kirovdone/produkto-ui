import type { ReactNode } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { HeadingLevel } from "../../recipes/heading";
import type { BlockLink } from "../../components/Section";
import type { Size } from "../../recipes/size";

export type FeatureCardsAppearance = Extract<
  Appearance,
  "solid" | "soft" | "outline" | "transparent"
>;

export type FeatureCardsColumns = 2 | 3 | 4 | 5;

export type FeatureCardsRows = "content" | "equal";

export type FeatureCardsSize = Extract<Size, "sm" | "base">;

export type FeatureCardsOrientation = "vertical" | "horizontal";

export type FeatureCardsMediaPlacement = "above" | "below";

export type FeatureCardsHeadingLevel = HeadingLevel;

export interface FeatureItem {
  title?: string;
  description?: string;
  icon?: ReactNode;
  media?: ReactNode;
  link?: string;
  links?: BlockLink[];
}

export interface FeatureCardsProps {
  items: FeatureItem[];
  appearance?: FeatureCardsAppearance;
  size?: FeatureCardsSize;
  columns?: FeatureCardsColumns;
  orientation?: FeatureCardsOrientation;
  rows?: FeatureCardsRows;
  mediaPlacement?: FeatureCardsMediaPlacement;
  headingLevel?: FeatureCardsHeadingLevel;
  arrows?: boolean;
}
