import { cn } from "../../cn";
import {
  skeletonClasses,
  skeletonRowClasses,
  skeletonRowIconClasses,
  skeletonRowLineClasses,
} from "./Skeleton.classes";
import type { SkeletonProps, SkeletonRowProps } from "./Skeleton.types";

export const Skeleton = ({
  className,
  borderRadius = "sm",
  ...props
}: SkeletonProps) => (
  <div
    data-part="skeleton"
    data-radius={borderRadius}
    className={cn(skeletonClasses({ borderRadius }), className)}
    {...props}
  />
);

export const SkeletonRow = ({
  icon = false,
  className,
  ...props
}: SkeletonRowProps) => (
  <div
    data-part="skeleton-row"
    className={cn(skeletonRowClasses, className)}
    {...props}
  >
    {icon ? (
      <Skeleton
        data-part="skeleton-row-icon"
        className={skeletonRowIconClasses}
      />
    ) : null}
    <Skeleton
      data-part="skeleton-row-line"
      className={skeletonRowLineClasses}
    />
  </div>
);
