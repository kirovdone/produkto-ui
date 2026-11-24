import type { ComponentProps, ReactNode } from "react";
import type { ButtonAppearance, ButtonTone } from "../Button";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { ThemeMode } from "../../host";
import type { Size } from "../../recipes/size";

export interface BlockLink {
  label: string;
  link: string;
}

export interface BlockSocialLink extends BlockLink {
  icon: ReactNode;
}

export type BlockActionBorderRadius = BorderRadius;

export interface BlockAction extends BlockLink {
  appearance?: ButtonAppearance;
  tone?: ButtonTone;
  icon?: ReactNode;
  iconOnly?: boolean;
  borderRadius?: BlockActionBorderRadius;
}

export interface BlockMenuItem {
  label: string;
  icon?: ReactNode;
  link?: string;
  onSelect?: () => void;
}

export interface BlockMenuAction {
  label: string;
  appearance?: ButtonAppearance;
  tone?: ButtonTone;
  icon?: ReactNode;
  iconOnly?: boolean;
  borderRadius?: BlockActionBorderRadius;
  items: BlockMenuItem[];
}

export interface BlockItem {
  title: string;
  body?: ReactNode;
  icon?: ReactNode;
}

export type SectionWidth = "narrow" | "base" | "wide";

export type SectionAlign = "start" | "center" | "end";

export type SectionHeaderLayout = "stacked" | "split";

export interface SectionHeading {
  eyebrow?: string;
  title?: ReactNode;
  tagline?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
}

export type SectionHeaderProps = Omit<
  ComponentProps<"header">,
  "title" | "color"
> &
  SectionHeading & {
    layout?: SectionHeaderLayout;
    actions?: (BlockAction | BlockMenuAction)[];
  };

export type SectionProps = Omit<ComponentProps<"section">, "title" | "color"> &
  SectionHeading & {
    headerLayout?: SectionHeaderLayout;
    width?: SectionWidth;
    muted?: boolean;
    ruled?: boolean;
    theme?: ThemeMode;
    actions?: (BlockAction | BlockMenuAction)[];
  };

export type BlockActionsSize = Extract<Size, "sm" | "base" | "lg">;

export interface BlockActionsProps {
  actions?: (BlockAction | BlockMenuAction)[];
  align?: SectionAlign;
  size?: BlockActionsSize;
  className?: string;
}

export type BlockAvatarSize = Extract<Size, "sm" | "base" | "lg" | "xl">;

export interface BlockAvatarProps {
  name: string;
  src?: string;
  size?: BlockAvatarSize;
  className?: string;
}
