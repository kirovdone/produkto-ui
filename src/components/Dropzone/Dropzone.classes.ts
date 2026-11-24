import { cva } from "class-variance-authority";
import { fieldMotion, fieldStates } from "../../recipes/field";
import { glyphs } from "../../recipes/menu";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import type { DropzoneMedia, DropzoneSize } from "./Dropzone.types";

const glyphSize = {
  sm: "[&_svg:not([class*='size-'])]:size-3.5",
  base: "",
  lg: "[&_svg:not([class*='size-'])]:size-5",
} satisfies Record<DropzoneSize, string>;

const sizedGlyphs = (base: string) =>
  cva(base, {
    variants: {
      size: glyphSize,
    },
    defaultVariants: {
      size: "base",
    },
  });

export const dropzoneClasses = cva("relative", {
  variants: {
    block: {
      true: "flex size-full min-h-0 flex-col",
      false: "grid grid-cols-5",
    },
    size: {
      sm: "gap-1.5",
      base: "gap-2",
      lg: "gap-3",
    } satisfies Record<DropzoneSize, string>,
  },
  compoundVariants: [
    { block: false, size: "sm", className: "max-w-2xs" },
    { block: false, size: "base", className: "max-w-xs" },
    { block: false, size: "lg", className: "max-w-sm" },
  ],
  defaultVariants: {
    block: false,
    size: "base",
  },
});

export const dropzoneItemsClasses = cva("grid shrink-0", {
  variants: {
    size: {
      sm: "grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] gap-1.5",
      base: "grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-2",
      lg: "grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-3",
    } satisfies Record<DropzoneSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const dropzoneItemClasses = cva(
  `group/dropzone-item relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden border border-border ${fieldMotion} ${fieldStates} data-invalid:border-destructive/60 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      media: {
        image: "bg-muted",
        icon: "bg-background text-foreground",
        file: "flex-col bg-muted text-muted-foreground",
        video: "bg-muted",
      } satisfies Record<DropzoneMedia, string>,
      size: {
        sm: "",
        base: "",
        lg: "",
      } satisfies Record<DropzoneSize, string>,
      borderRadius: boxBorderRadiusVariants,
    },
    compoundVariants: [
      { media: "file", size: "sm", className: "gap-0.5 p-1.5" },
      { media: "file", size: "base", className: "gap-1 p-2" },
      { media: "file", size: "lg", className: "gap-1.5 p-2.5" },
    ],
    defaultVariants: {
      media: "image",
      size: "base",
      borderRadius: "base",
    },
  },
);

export const dropzoneItemImageClasses = "size-full object-cover";

export const dropzoneItemIconClasses = cva("[&_svg]:stroke-current", {
  variants: {
    size: {
      sm: "size-5",
      base: "size-6",
      lg: "size-8",
    } satisfies Record<DropzoneSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const dropzoneItemGlyphClasses = sizedGlyphs(`flex ${glyphs}`);

export const dropzoneItemLabelClasses = cva(
  "w-full truncate text-center text-foreground",
  {
    variants: {
      size: {
        sm: "text-2xs",
        base: "text-xs",
        lg: "text-sm",
      } satisfies Record<DropzoneSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const dropzoneItemPlayClasses = sizedGlyphs(
  `pointer-events-none absolute inset-0 flex items-center justify-center text-white drop-shadow-sm ${glyphs}`,
);

export const dropzoneItemLoadingClasses = sizedGlyphs(
  "absolute inset-0 flex items-center justify-center bg-background/60",
);

export const dropzoneItemRemoveClasses = sizedGlyphs(
  `absolute inset-0 flex items-center justify-center bg-destructive/60 text-white opacity-0 transition-opacity group-hover/dropzone-item:opacity-100 group-focus-visible/dropzone-item:opacity-100 ${glyphs}`,
);

export const dropzoneItemDownloadClasses = sizedGlyphs(
  `absolute inset-0 flex items-center justify-center bg-foreground/50 text-background opacity-0 transition-opacity group-hover/dropzone-item:opacity-100 group-focus-visible/dropzone-item:opacity-100 ${glyphs}`,
);

export const dropzoneTriggerClasses = cva(
  `relative flex w-full cursor-pointer items-center justify-center border border-border bg-card border-dashed text-muted-foreground ${fieldMotion} ${fieldStates} has-focus-visible:border-foreground/35 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-drag-active:border-primary data-drag-active:text-foreground aria-invalid:border-destructive/60 data-invalid:border-destructive/60 has-aria-invalid:border-destructive/60`,
  {
    variants: {
      block: {
        true: "flex-1",
        false: "aspect-square",
      },
      size: glyphSize,
      borderRadius: boxBorderRadiusVariants,
    },
    compoundVariants: [
      { block: true, size: "sm", className: "min-h-28" },
      { block: true, size: "base", className: "min-h-32" },
      { block: true, size: "lg", className: "min-h-40" },
    ],
    defaultVariants: {
      block: false,
      size: "base",
      borderRadius: "base",
    },
  },
);

export const dropzoneFormInputClasses =
  "pointer-events-none absolute inset-0 size-full opacity-0";
