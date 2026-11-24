import { cva } from "class-variance-authority";
import type { RatingSize } from "./Rating.types";

export const ratingClasses = cva(
  "group/rating inline-flex w-fit items-center text-primary data-disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "gap-0.5 [&_svg]:size-4",
        base: "gap-1 [&_svg]:size-5",
        lg: "gap-1 [&_svg]:size-6",
      } satisfies Record<RatingSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const ratingItemClasses =
  "inline-flex cursor-pointer rounded-sm outline-none focus-visible:opacity-80 disabled:cursor-not-allowed";

export const ratingStarClasses = "relative inline-flex shrink-0";

export const ratingStarTrackClasses =
  "fill-current text-muted-foreground/25 group-aria-invalid/rating:fill-muted-foreground/25 group-aria-invalid/rating:text-destructive/60 group-data-invalid/rating:fill-muted-foreground/25 group-data-invalid/rating:text-destructive/60";

export const ratingStarFillClasses =
  "absolute inset-y-0 start-0 flex overflow-hidden [&>svg]:shrink-0 [&>svg]:fill-current";
