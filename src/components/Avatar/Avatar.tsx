"use client";

import { cn } from "../../cn";
import { Fallback, Image, Root } from "@radix-ui/react-avatar";
import {
  avatarBadgeClasses,
  avatarClasses,
  avatarFallbackClasses,
  avatarGroupClasses,
  avatarGroupCountClasses,
  avatarImageClasses,
} from "./Avatar.classes";
import type {
  AvatarBadgeProps,
  AvatarFallbackProps,
  AvatarGroupCountProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarProps,
} from "./Avatar.types";

export const Avatar = ({
  className,
  size = "base",
  borderRadius = "full",
  ...props
}: AvatarProps) => (
  <Root
    data-part="avatar"
    data-size={size}
    data-radius={borderRadius}
    className={cn(avatarClasses({ size, borderRadius }), className)}
    {...props}
  />
);

export const AvatarImage = ({ className, ...props }: AvatarImageProps) => (
  <Image
    data-part="avatar-image"
    className={cn(avatarImageClasses, className)}
    {...props}
  />
);

export const AvatarFallback = ({
  className,
  ...props
}: AvatarFallbackProps) => (
  <Fallback
    data-part="avatar-fallback"
    className={cn(avatarFallbackClasses, className)}
    {...props}
  />
);

export const AvatarBadge = ({ className, ...props }: AvatarBadgeProps) => (
  <span
    data-part="avatar-badge"
    className={cn(avatarBadgeClasses, className)}
    {...props}
  />
);

export const AvatarGroup = ({ className, ...props }: AvatarGroupProps) => (
  <div
    data-part="avatar-group"
    className={cn(avatarGroupClasses, className)}
    {...props}
  />
);

export const AvatarGroupCount = ({
  className,
  ...props
}: AvatarGroupCountProps) => (
  <div
    data-part="avatar-group-count"
    className={cn(avatarGroupCountClasses, className)}
    {...props}
  />
);
