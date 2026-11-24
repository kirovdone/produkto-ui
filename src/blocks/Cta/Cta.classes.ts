import { cva } from "class-variance-authority";

export const ctaClasses = cva("", {
  variants: {
    layout: {
      row: "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16",
      stacked: "flex flex-col items-center gap-8",
      split: "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
    },
  },
  defaultVariants: {
    layout: "row",
  },
});

export const ctaCardClasses = "rounded-2xl p-6 sm:p-10 lg:p-12";

export const ctaHeaderClasses = "min-w-0";

export const ctaTextClasses = "flex min-w-0 flex-col gap-8";

export const ctaActionsClasses = "shrink-0";

export const ctaMediaRowClasses = "mt-4 w-full";

export const ctaBackdropFrameClasses = cva(
  "relative isolate flex overflow-hidden rounded-3xl px-5 sm:px-10",
  {
    variants: {
      open: {
        true: "min-h-[24rem] items-center justify-center py-16 sm:min-h-[28rem]",
        false:
          "min-h-[26rem] items-center justify-center py-16 sm:min-h-[32rem]",
      },
    },
    defaultVariants: { open: false },
  },
);

export const ctaBackdropClasses = cva(
  "absolute inset-0 -z-10 *:size-full *:object-cover",
  {
    variants: {
      open: {
        true: "opacity-50 [mask-image:radial-gradient(ellipse_45%_55%_at_50%_50%,rgb(0_0_0/0.25),black)]",
        false: "",
      },
    },
    defaultVariants: { open: false },
  },
);

export const ctaPanelClasses = cva(
  "flex w-full max-w-3xl flex-col items-center gap-8",
  {
    variants: {
      open: {
        true: "",
        false:
          "rounded-2xl border border-border bg-background/90 px-6 py-10 backdrop-blur-md sm:px-12 sm:py-12",
      },
    },
    defaultVariants: { open: false },
  },
);

export const ctaMediaClasses =
  "w-full min-w-0 overflow-hidden rounded-2xl *:w-full";

export const ctaCoverClasses = "text-foreground";

export const ctaScrimClasses =
  "pointer-events-none absolute inset-0 -z-5 bg-black/60";

export const ctaCallsClasses = "grid gap-4 md:grid-cols-2";

export const ctaCallClasses =
  "flex flex-col items-start justify-between gap-8 rounded-2xl p-6 sm:p-8";

export const ctaLinksClasses =
  "grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16";

export const ctaLinkListClasses = "flex flex-col border-t border-border";

export const ctaBigLinkClasses =
  "flex items-center justify-between gap-4 rounded-sm border-b border-border py-6 heading-lg outline-none transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/60 [&_svg]:size-5 [&_svg]:shrink-0";
