import type { Fallback, Image, Root } from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import type { BorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type AvatarSize = Extract<Size, "xs" | "sm" | "base" | "lg" | "xl">;

export type AvatarBorderRadius = BorderRadius;

export interface AvatarProps extends Omit<
  ComponentProps<typeof Root>,
  "color"
> {
  size?: AvatarSize;
  borderRadius?: AvatarBorderRadius;
}

export type AvatarImageProps = ComponentProps<typeof Image>;

export type AvatarFallbackProps = ComponentProps<typeof Fallback>;

export type AvatarBadgeProps = ComponentProps<"span">;

export type AvatarGroupProps = ComponentProps<"div">;

export type AvatarGroupCountProps = ComponentProps<"div">;
