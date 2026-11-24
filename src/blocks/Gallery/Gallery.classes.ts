import { cva } from "class-variance-authority";
import type { GalleryColumns, GalleryLayout } from "./Gallery.types";

export const galleryClasses = cva("", {
  variants: {
    layout: {
      grid: "grid grid-cols-2 gap-3 sm:gap-5",
      masonry: "columns-2 gap-3 *:mb-3 *:break-inside-avoid sm:gap-5 sm:*:mb-5",
      carousel: "flex flex-col gap-6",
      strip:
        "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 [&>li:first-child]:col-span-2 sm:[&>li:first-child]:col-span-3 [&>li:first-child_[data-part=gallery-trigger]]:aspect-[21/9]",
      marquee: "flex gap-3 pe-3 sm:gap-5 sm:pe-5",
    } satisfies Record<GalleryLayout, string>,
    columns: {
      2: "",
      3: "",
      4: "",
    } satisfies Record<GalleryColumns, string>,
  },
  compoundVariants: [
    { layout: "grid", columns: 3, className: "lg:grid-cols-3" },
    { layout: "grid", columns: 4, className: "md:grid-cols-3 lg:grid-cols-4" },
    { layout: "masonry", columns: 3, className: "lg:columns-3" },
    { layout: "masonry", columns: 4, className: "md:columns-3 lg:columns-4" },
  ],
  defaultVariants: {
    layout: "grid",
    columns: 3,
  },
});

export const gallerySlideClasses = cva("", {
  variants: {
    columns: {
      2: "basis-4/5 sm:basis-[46%]",
      3: "basis-4/5 sm:basis-[46%] lg:basis-[31%]",
      4: "basis-3/5 sm:basis-[31%] lg:basis-[23.5%]",
    } satisfies Record<GalleryColumns, string>,
  },
  defaultVariants: {
    columns: 3,
  },
});

export const galleryControlsClasses = "flex items-center justify-end gap-2";

export const galleryControlClasses = "static my-0";

export const galleryFigureClasses =
  "group/figure flex min-w-0 flex-col gap-2.5";

export const galleryTriggerClasses = cva(
  "relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      layout: {
        grid: "aspect-4/3",
        masonry: "",
        carousel: "aspect-4/3",
        strip: "aspect-4/3",
        marquee: "aspect-4/3 w-60 sm:w-72",
      } satisfies Record<GalleryLayout, string>,
    },
    defaultVariants: {
      layout: "grid",
    },
  },
);

export const galleryImageClasses = cva(
  "block transition-transform ease-out motion-safe:group-hover/figure:scale-[1.03]",
  {
    variants: {
      layout: {
        grid: "size-full object-cover",
        masonry: "h-auto w-full",
        carousel: "size-full object-cover",
        strip: "size-full object-cover",
        marquee: "size-full object-cover",
      } satisfies Record<GalleryLayout, string>,
    },
    defaultVariants: {
      layout: "grid",
    },
  },
);

export const galleryCaptionClasses = "description-sm text-pretty";

export const galleryItemClasses = "min-w-0";

export const galleryMarqueeClasses = "w-full";

export const galleryLightboxClasses = "gap-0 overflow-hidden p-0 sm:max-w-4xl";

export const galleryLightboxHeaderClasses = "border-b border-border p-4 pe-12";

export const galleryStageClasses =
  "relative aspect-4/3 max-h-[calc(100dvh-10rem)] w-full bg-muted";

export const galleryLightboxImageClasses =
  "absolute inset-0 size-full object-contain";

export const galleryStepClasses = cva(
  "absolute top-1/2 z-10 -translate-y-1/2",
  {
    variants: {
      side: {
        previous: "start-3",
        next: "end-3",
      },
    },
  },
);
