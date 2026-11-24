import type { ButtonAppearance, ButtonTone } from "../../components/Button";
import type { HeadingLevel } from "../../recipes/heading";
import type { SectionAlign } from "../../components/Section";
import type { ReactNode } from "react";

export type PricingPeriod = "monthly" | "yearly";

export type PricingHeadingLevel = HeadingLevel;

export interface PricingPrice {
  monthly: string;
  yearly?: string;
}

export interface PricingFeature {
  label: string;
  included?: boolean;
}

export interface PricingAction {
  label: string;
  link?: string;
  onClick?: () => void;
  appearance?: ButtonAppearance;
  tone?: ButtonTone;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export interface PricingPlan {
  name: string;
  description?: string;
  price: string | PricingPrice;
  features?: (string | PricingFeature)[];
  action?: PricingAction;
  highlighted?: boolean;
  badge?: string;
}

export interface PricingPlansProps {
  plans: PricingPlan[];
  period?: PricingPeriod;
  defaultPeriod?: PricingPeriod;
  onPeriodChange?: (period: PricingPeriod) => void;
  align?: SectionAlign;
  headingLevel?: PricingHeadingLevel;
  className?: string;
}

export type PricingLayout = "cards" | "split";

export interface PricingProps {
  plans?: PricingPlan[];
  layout?: PricingLayout;
  period?: PricingPeriod;
  defaultPeriod?: PricingPeriod;
  onPeriodChange?: (period: PricingPeriod) => void;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
