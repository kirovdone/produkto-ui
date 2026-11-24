import type {
  BlockAction,
  BlockLink,
  SectionAlign,
} from "../../components/Section";
import type { Appearance } from "../../recipes/appearance";
import type { ThemeMode } from "../../host";
import type { ReactNode } from "react";

export type CtaAppearance = Extract<
  Appearance,
  "solid" | "soft" | "transparent"
>;

export interface CtaCall {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: BlockAction[];
}

export interface CtaProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  tagline?: ReactNode;
  description?: ReactNode;
  actions?: BlockAction[];
  calls?: CtaCall[];
  links?: BlockLink[];
  media?: ReactNode;
  backdrop?: ReactNode;
  cover?: boolean;
  appearance?: CtaAppearance;
  align?: SectionAlign;
  theme?: ThemeMode;
  className?: string;
}
