import type { ComponentProps } from "react";
import type { HostLinkProps } from "../../host";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type BreadcrumbSize = Extract<Size, "sm" | "base" | "lg">;

export type BreadcrumbBorderRadius = BorderRadius;

export type BreadcrumbProps = ComponentProps<"nav">;

export type BreadcrumbListProps = ComponentProps<"ol">;

export type BreadcrumbItemProps = ComponentProps<"li">;

export interface BreadcrumbLinkProps extends HostLinkProps {
  size?: BreadcrumbSize;
  borderRadius?: BreadcrumbBorderRadius;
}

export interface BreadcrumbPageProps extends ComponentProps<"span"> {
  size?: BreadcrumbSize;
}

export interface BreadcrumbSeparatorProps extends ComponentProps<"li"> {
  size?: BreadcrumbSize;
}

export interface BreadcrumbEllipsisProps extends ComponentProps<"span"> {
  size?: BreadcrumbSize;
}

export interface BreadcrumbTrailItem {
  label: string;
  link?: string;
}

export type BreadcrumbAlign = "start" | "center" | "end";

export interface BreadcrumbTrailProps extends Omit<
  ComponentProps<"nav">,
  "children"
> {
  items: BreadcrumbTrailItem[];
  align?: BreadcrumbAlign;
  size?: BreadcrumbSize;
  borderRadius?: BreadcrumbBorderRadius;
}
