import type {
  BlockAction,
  BlockLink,
  BlockMenuAction,
  BlockSocialLink,
  SectionAlign,
  SectionWidth,
} from "../../components/Section";
import type { ReactNode } from "react";
import type { ThemeMode } from "../../host";

export type FooterSocialPlacement = "lead" | "fine";

export interface FooterColumn {
  title: string;
  links: BlockLink[];
}

export interface FooterCall {
  title: ReactNode;
  actions: (BlockAction | BlockMenuAction)[];
}

export interface FooterProps {
  id?: string;
  brand?: ReactNode;
  description?: ReactNode;
  columns?: FooterColumn[];
  links?: BlockLink[];
  social?: BlockSocialLink[];
  socialPlacement?: FooterSocialPlacement;
  legal?: BlockLink[];
  copyright?: ReactNode;
  call?: FooterCall;
  wordmark?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  theme?: ThemeMode;
  width?: SectionWidth;
  className?: string;
  children?: ReactNode;
}
