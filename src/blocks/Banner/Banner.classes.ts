import { cva } from "class-variance-authority";
import type { SectionAlign } from "../../components/Section";
import type { BannerAppearance } from "./Banner.types";

export const bannerClasses = cva("w-full", {
  variants: {
    appearance: {
      outline: "border-b border-border bg-background text-foreground",
      solid: "bg-primary text-primary-foreground",
      soft: "bg-muted text-foreground",
    } satisfies Record<BannerAppearance, string>,
    sticky: {
      true: "sticky top-0 z-50",
      false: "",
    },
  },
  defaultVariants: {
    appearance: "outline",
    sticky: false,
  },
});

export const bannerContentClasses = "flex min-h-11 items-center gap-3 py-1.5";

export const bannerBodyClasses = cva(
  "flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2 py-1",
  {
    variants: {
      align: {
        start: "",
        center: "sm:justify-center sm:text-center",
        end: "sm:justify-end sm:text-end",
      } satisfies Record<SectionAlign, string>,
      dismissible: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { align: "center", dismissible: true, className: "sm:ps-11" },
    ],
    defaultVariants: {
      align: "center",
      dismissible: false,
    },
  },
);

export const bannerTextClasses = "flex min-w-0 items-start gap-1";

export const bannerIconClasses =
  "mt-0.5 flex shrink-0 items-center justify-center [&_svg]:size-4";

export const bannerMessageClasses = "min-w-0 label-sm text-pretty text-current";

export const bannerMarqueeClasses = "min-w-0 flex-1";

export const bannerMovingItemClasses =
  "flex shrink-0 items-center gap-1.5 pe-10 label-sm whitespace-nowrap text-current [&_svg]:size-4";

export const bannerLinkClasses = cva(
  "inline-flex items-center gap-1.5 rounded-sm font-semibold whitespace-nowrap underline decoration-current/40 underline-offset-4 outline-none transition-colors hover:decoration-current focus-visible:ring-2 focus-visible:ring-current/50 [&_svg]:size-4 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
  {
    variants: {
      spaced: {
        true: "ms-2",
        false: "",
      },
    },
    defaultVariants: {
      spaced: true,
    },
  },
);

export const bannerActionClasses = cva("shrink-0", {
  variants: {
    appearance: {
      outline: "",
      solid:
        "bg-primary-foreground text-primary shadow-none hover:bg-primary-foreground/90 focus-visible:bg-primary-foreground/90 focus-visible:ring-2 focus-visible:ring-primary-foreground/50",
      soft: "",
    } satisfies Record<BannerAppearance, string>,
  },
  defaultVariants: {
    appearance: "outline",
  },
});

export const bannerCloseClasses = cva(
  "-me-2 shrink-0 self-start sm:self-center",
  {
    variants: {
      appearance: {
        outline: "text-muted-foreground hover:text-foreground",
        solid:
          "text-primary-foreground/80 hover:bg-primary-foreground/15 hover:text-primary-foreground focus-visible:bg-primary-foreground/15 focus-visible:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary-foreground/50",
        soft: "text-muted-foreground hover:bg-foreground/10 hover:text-foreground",
      } satisfies Record<BannerAppearance, string>,
    },
    defaultVariants: {
      appearance: "outline",
    },
  },
);
