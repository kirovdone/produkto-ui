import { cva } from "class-variance-authority";
import type {
  TestimonialLook,
  TestimonialsColumns,
} from "./Testimonials.types";
import { blockBody } from "../../recipes/block";

export const testimonialsContentClasses = `${blockBody}`;

export const testimonialsClasses = cva("grid gap-4 sm:gap-6", {
  variants: {
    columns: {
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
    } satisfies Record<TestimonialsColumns, string>,
  },
  defaultVariants: {
    columns: 3,
  },
});

export const testimonialsWallClasses = cva(
  "columns-1 gap-4 *:mb-4 *:break-inside-avoid sm:gap-6 sm:*:mb-6",
  {
    variants: {
      columns: {
        2: "sm:columns-2",
        3: "sm:columns-2 lg:columns-3",
      } satisfies Record<TestimonialsColumns, string>,
    },
    defaultVariants: {
      columns: 3,
    },
  },
);

export const testimonialsPhotoClasses =
  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16";

export const testimonialsMediaClasses =
  "w-full min-w-0 overflow-hidden rounded-2xl *:w-full";

export const testimonialsCarouselClasses = "flex flex-col gap-8";

export const testimonialsControlsClasses =
  "flex items-center justify-between gap-4";

export const testimonialsArrowsClasses = "flex items-center gap-2";

export const testimonialsArrowClasses = "static my-0";

export const testimonialsMarqueeClasses = "flex flex-col gap-4 sm:gap-6";

export const testimonialsMovingRowClasses = "flex gap-4 pe-4 sm:gap-6 sm:pe-6";

export const testimonialsMovingItemClasses = "flex w-80 shrink-0";

export const testimonialItemClasses = "flex";

export const testimonialCardClasses = "w-full rounded-2xl p-6";

export const testimonialClasses = cva("flex flex-col", {
  variants: {
    look: {
      card: "flex-1 justify-between gap-6",
      center: "mx-auto max-w-3xl items-center gap-8 text-center sm:gap-10",
      start: "max-w-2xl items-start gap-6",
    } satisfies Record<TestimonialLook, string>,
  },
  defaultVariants: {
    look: "card",
  },
});

export const testimonialQuoteClasses = cva("", {
  variants: {
    look: {
      card: "body-base text-pretty",
      center: "body-2xl font-medium text-balance sm:body-3xl",
      start: "body-xl font-medium text-pretty sm:body-2xl",
    } satisfies Record<TestimonialLook, string>,
  },
  defaultVariants: {
    look: "card",
  },
});

export const testimonialAuthorClasses = "flex items-center gap-3 text-start";

export const testimonialAuthorTextClasses = "min-w-0";

export const testimonialNameClasses = cva("", {
  variants: {
    look: {
      card: "heading-sm",
      center: "heading-base",
      start: "heading-sm",
    } satisfies Record<TestimonialLook, string>,
  },
  defaultVariants: {
    look: "card",
  },
});

export const testimonialRoleClasses = cva("text-muted-foreground", {
  variants: {
    look: {
      card: "description-sm",
      center: "description-base",
      start: "description-sm",
    } satisfies Record<TestimonialLook, string>,
  },
  defaultVariants: {
    look: "card",
  },
});

export const testimonialFilmClasses =
  "aspect-video overflow-hidden rounded-xl bg-muted *:size-full";

export const testimonialFilmCardClasses = "w-full gap-5 rounded-2xl p-4";
