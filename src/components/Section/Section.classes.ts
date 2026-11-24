import { cva } from "class-variance-authority";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type {
  BlockAvatarSize,
  SectionAlign,
  SectionHeaderLayout,
  SectionWidth,
} from "./Section.types";

export const sectionClasses = cva("py-16 text-foreground", {
  variants: {
    muted: {
      true: "bg-muted",
      false: "bg-background",
    },
    ruled: {
      true: "group/section border-t border-border py-0 not-has-[+[data-ruled]]:border-b",
      false: "",
    },
  },
  defaultVariants: {
    muted: false,
    ruled: false,
  },
});

export const sectionRulerClasses =
  "relative border-x border-border px-5 py-12 before:pointer-events-none before:absolute before:-top-[4.5px] before:-left-[4.5px] before:z-10 before:size-2 before:border before:border-border before:bg-background after:pointer-events-none after:absolute after:-top-[4.5px] after:-right-[4.5px] after:z-10 after:size-2 after:border after:border-border after:bg-background has-[>[data-part=feature-card-frame]:only-child]:p-0 sm:px-8 sm:py-16";

export const sectionContentClasses = cva(
  "mx-auto w-full px-5 sm:px-8 lg:px-12",
  {
    variants: {
      width: {
        narrow: "max-w-3xl",
        base: "max-w-6xl",
        wide: "max-w-7xl",
      } satisfies Record<SectionWidth, string>,
    },
    defaultVariants: {
      width: "base",
    },
  },
);

export const sectionHeaderClasses = cva("gap-4", {
  variants: {
    layout: {
      stacked: "flex flex-col",
      split: "grid sm:grid-cols-2 sm:items-end sm:gap-x-12",
    } satisfies Record<SectionHeaderLayout, string>,
    align: {
      start: "",
      center: "",
      end: "",
    } satisfies Record<SectionAlign, string>,
  },
  compoundVariants: [
    { layout: "stacked", align: "start", className: "items-start" },
    {
      layout: "stacked",
      align: "center",
      className: "mx-auto items-center text-center",
    },
    {
      layout: "stacked",
      align: "end",
      className: "ms-auto items-end text-end",
    },
  ],
  defaultVariants: {
    layout: "stacked",
    align: "start",
  },
});

export const sectionHeaderSpacingClasses = "mb-8 sm:mb-12";

export const sectionHeaderPartClasses = "flex flex-col items-start gap-4";

export const sectionActionsSpacingClasses = "mt-8 sm:mt-10";

export const sectionHeaderActionsSpacingClasses = "mt-6 sm:mt-8";

export const sectionEyebrowClasses =
  "inline-flex items-center code-xs font-medium tracking-wider text-muted-foreground uppercase";

export const sectionTitleClasses =
  "display-2xl text-balance sm:display-3xl lg:display-4xl";

export const sectionTaglineClasses = "text-muted-foreground";

export const sectionDescriptionClasses = "max-w-2xl description-lg text-pretty";

export const blockActionsClasses = cva("flex flex-wrap items-center gap-3", {
  variants: {
    align: {
      start: "",
      center: "justify-center",
      end: "justify-end",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    align: "start",
  },
});

export const blockActionClasses = cva("", {
  variants: {
    borderRadius: borderRadiusVariants,
  },
});

export const blockAvatarClasses = cva(
  "*:data-[part=avatar-fallback]:inset-ring *:data-[part=avatar-fallback]:inset-ring-border",
  {
    variants: {
      size: {
        sm: "size-9 *:data-[part=avatar-fallback]:caption-base",
        base: "size-10 *:data-[part=avatar-fallback]:caption-lg",
        lg: "size-12 *:data-[part=avatar-fallback]:caption-xl",
        xl: "size-20 *:data-[part=avatar-fallback]:caption-4xl",
      } satisfies Record<BlockAvatarSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);
