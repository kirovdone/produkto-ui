import type { ComponentProps, ReactNode } from "react";
import type { Appearance } from "../../recipes/appearance";
import type {
  BlockAction,
  BlockLink,
  SectionAlign,
  SectionWidth,
} from "../../components/Section";

export type BannerAppearance = Extract<
  Appearance,
  "solid" | "soft" | "outline"
>;

export interface BannerProps extends Omit<
  ComponentProps<"div">,
  "title" | "color" | "children"
> {
  message?: ReactNode;
  icon?: ReactNode;
  link?: BlockLink;
  action?: BlockAction;
  appearance?: BannerAppearance;
  align?: SectionAlign;
  width?: SectionWidth;
  sticky?: boolean;
  marquee?: boolean;
  dismissible?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onDismiss?: () => void;
}
