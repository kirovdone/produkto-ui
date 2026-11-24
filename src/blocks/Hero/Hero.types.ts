import type { ReactNode } from "react";
import type { BreadcrumbTrailItem } from "../../components/Breadcrumb";
import type { BlockAction, BlockLink } from "../../components/Section";
import type { Size } from "../../recipes/size";

export type HeroLayout = "center" | "split" | "start" | "stacked";

export type HeroSize = Extract<Size, "base" | "lg">;

export type HeroHeight = "auto" | "screen";

export type HeroPlace = "middle" | "foot";

export interface HeroProps {
  id?: string;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbTrailItem[];
  announcement?: BlockLink;
  title?: ReactNode;
  tagline?: ReactNode;
  description?: ReactNode;
  actions?: BlockAction[];
  note?: ReactNode;
  media?: ReactNode;
  backdrop?: ReactNode;
  cover?: boolean;
  framed?: boolean;
  place?: HeroPlace;
  mediaFirst?: boolean;
  layout?: HeroLayout;
  size?: HeroSize;
  titleSize?: HeroSize;
  height?: HeroHeight;
  muted?: boolean;
  className?: string;
  children?: ReactNode;
}
