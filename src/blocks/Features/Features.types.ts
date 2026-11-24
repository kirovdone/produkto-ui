import type { ReactNode } from "react";
import type { FeatureCardsProps, FeatureItem } from "./FeatureCards.types";
import type { BlockAction, SectionAlign } from "../../components/Section";

export interface FeaturesProps extends Omit<FeatureCardsProps, "items"> {
  items: FeatureItem[];
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
