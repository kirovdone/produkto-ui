import { cva } from "class-variance-authority";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type { AvatarSize } from "./Avatar.types";

export const avatarClasses = cva(
  "group/avatar relative flex shrink-0 select-none after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-foreground/10",
  {
    variants: {
      size: {
        xs: "size-5",
        sm: "size-6",
        base: "size-8",
        lg: "size-10",
        xl: "size-12",
      } satisfies Record<AvatarSize, string>,
      borderRadius: borderRadiusVariants,
    },
    defaultVariants: {
      size: "base",
      borderRadius: "full",
    },
  },
);

export const avatarImageClasses =
  "aspect-square size-full rounded-[inherit] object-cover";

export const avatarFallbackClasses =
  "flex size-full items-center justify-center rounded-[inherit] bg-muted caption-sm text-muted-foreground group-data-[size=xs]/avatar:caption-2xs group-data-[size=sm]/avatar:caption-2xs group-data-[size=xl]/avatar:caption-base";

export const avatarBadgeClasses =
  "absolute end-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden group-data-[size=base]/avatar:size-2.5 group-data-[size=base]/avatar:[&>svg]:size-2 group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2 group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5";

export const avatarGroupClasses =
  "group/avatar-group flex -space-x-2 *:data-[part=avatar]:ring-2 *:data-[part=avatar]:ring-background";

export const avatarGroupCountClasses =
  "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted caption-sm text-muted-foreground ring-2 ring-background select-none group-has-data-[size=xs]/avatar-group:size-5 group-has-data-[size=xs]/avatar-group:caption-2xs group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:caption-2xs group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=xl]/avatar-group:size-12 group-has-data-[size=xl]/avatar-group:caption-base [&>svg]:size-4 group-has-data-[size=xs]/avatar-group:[&>svg]:size-2.5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=xl]/avatar-group:[&>svg]:size-6";
