import type { ReactNode } from "react";
import type { ThemeMode } from "../../host";
import type {
  BlockAction,
  BlockLink,
  BlockMenuAction,
  BlockSocialLink,
  SectionAlign,
  SectionWidth,
} from "../../components/Section";

export interface NavbarLink extends BlockLink {
  icon?: ReactNode;
  description?: string;
  active?: boolean;
}

export type NavbarColumns = 1 | 2 | 3 | 4 | 5;

export type NavbarRows = 2 | 3 | 4 | 5 | 6;

export interface NavbarMenu {
  label: string;
  links: NavbarLink[];
  columns?: NavbarColumns;
  rows?: NavbarRows;
}

export interface NavbarGroup {
  label: string;
  links: NavbarLink[];
}

export type NavbarGroupCount = 1 | 2 | 3 | 4 | 5;

export interface NavbarGroupedMenu {
  label: string;
  groups: NavbarGroup[];
  footer?: NavbarLink;
}

export type NavbarItem = NavbarLink | NavbarMenu | NavbarGroupedMenu;

export type NavbarWidth = SectionWidth | "full";

export type NavbarAlign = SectionAlign;

export type NavbarLayout = "row" | "split";

export type NavbarArrangement = NavbarAlign | "split";

export interface NavbarProps {
  id?: string;
  brand?: ReactNode;
  brandLink?: string;
  items?: NavbarItem[];
  actions?: (BlockAction | BlockMenuAction)[];
  social?: BlockSocialLink[];
  align?: NavbarAlign;
  layout?: NavbarLayout;
  width?: NavbarWidth;
  sticky?: boolean;
  floating?: boolean;
  over?: boolean;
  muted?: boolean;
  bordered?: boolean;
  theme?: ThemeMode;
  className?: string;
  children?: ReactNode;
}
