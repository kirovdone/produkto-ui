import { cva } from "class-variance-authority";
import type { HeroHeight, HeroLayout, HeroPlace, HeroSize } from "./Hero.types";

export const heroClasses = cva("relative isolate overflow-hidden", {
  variants: {
    height: {
      auto: "2xl:pt-24",
      screen:
        "flex min-h-[calc(100svh_-_var(--navbar-height))] flex-col justify-center",
    } satisfies Record<HeroHeight, string>,
    cover: {
      true: "flex flex-col *:data-[part=section-content]:w-full",
      false: "",
    },
    place: {
      middle: "",
      foot: "",
    } satisfies Record<HeroPlace, string>,
  },
  compoundVariants: [
    { cover: true, height: "auto", className: "min-h-[36rem]" },
    { cover: true, place: "middle", className: "justify-center" },
    { cover: true, place: "foot", className: "justify-end" },
  ],
  defaultVariants: {
    height: "auto",
    cover: false,
    place: "middle",
  },
});

export const heroCoverBackdropClasses =
  "absolute inset-0 -z-10 *:size-full *:object-cover";

export const heroScrimClasses = cva(
  "pointer-events-none absolute inset-0 -z-5",
  {
    variants: {
      place: {
        middle: "bg-black/60",
        foot: "bg-linear-to-t from-black/75 via-black/50 to-black/30",
      } satisfies Record<HeroPlace, string>,
    },
    defaultVariants: {
      place: "middle",
    },
  },
);

export const heroFrameClasses = cva(
  "relative isolate flex min-h-[32rem] flex-col overflow-hidden rounded-3xl px-6 py-12 text-foreground sm:px-12 sm:py-16",
  {
    variants: {
      place: {
        middle: "justify-center",
        foot: "justify-end",
      } satisfies Record<HeroPlace, string>,
    },
    defaultVariants: {
      place: "middle",
    },
  },
);

export const heroBackdropClasses =
  "pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,transparent_25%,black)] *:absolute *:inset-x-0 *:bottom-0 *:h-auto *:min-h-[80%] *:w-full *:object-cover *:object-bottom";

export const heroContentClasses = cva("grid grid-cols-[minmax(0,1fr)]", {
  variants: {
    layout: {
      center: "gap-10",
      split: "items-center gap-12 lg:grid-cols-2 lg:gap-16",
      start: "gap-12 lg:gap-16",
      stacked: "gap-10",
    } satisfies Record<HeroLayout, string>,
    mediaFirst: {
      true: "lg:*:data-[part=hero-media]:order-first",
      false: "",
    },
  },
  defaultVariants: {
    layout: "center",
    mediaFirst: false,
  },
});

export const heroTextClasses = cva("flex min-w-0 flex-col gap-6", {
  variants: {
    layout: {
      center: "mx-auto w-full items-center text-center",
      split: "items-start",
      start:
        "items-start lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-16",
      stacked: "w-full max-w-3xl items-start",
    } satisfies Record<HeroLayout, string>,
  },
  defaultVariants: {
    layout: "center",
  },
});

export const heroAnnouncementClasses = cva("max-w-full gap-2 py-1 pe-3", {
  variants: {
    badge: {
      true: "ps-1",
      false: "ps-3",
    },
  },
  defaultVariants: {
    badge: false,
  },
});

export const heroAnnouncementBadgeClasses = "rounded-full";

export const heroAnnouncementLabelClasses = "truncate";

export const heroTitleClasses = cva("text-balance", {
  variants: {
    layout: {
      center: "",
      split: "",
      start: "lg:col-start-1 lg:row-span-2 lg:row-start-2",
      stacked: "",
    } satisfies Record<HeroLayout, string>,
    size: {
      base: "display-3xl sm:display-4xl",
      lg: "display-4xl sm:display-5xl",
    } satisfies Record<HeroSize, string>,
  },
  compoundVariants: [
    {
      layout: ["center", "stacked"],
      size: "base",
      className: "lg:display-5xl",
    },
    {
      layout: ["center", "stacked"],
      size: "lg",
      className: "lg:display-6xl",
    },
  ],
  defaultVariants: {
    layout: "center",
    size: "base",
  },
});

export const heroDescriptionClasses = cva(
  "max-w-2xl description-lg text-pretty sm:description-xl",
  {
    variants: {
      layout: {
        center: "",
        split: "",
        start: "lg:col-start-2 lg:row-start-2 lg:self-end",
        stacked: "",
      } satisfies Record<HeroLayout, string>,
    },
    defaultVariants: {
      layout: "center",
    },
  },
);

export const heroActionsClasses = cva("mt-2", {
  variants: {
    layout: {
      center: "",
      split: "",
      start: "lg:col-start-2 lg:row-start-3 lg:mt-0 lg:self-end",
      stacked: "",
    } satisfies Record<HeroLayout, string>,
  },
  defaultVariants: {
    layout: "center",
  },
});

export const heroNoteClasses = "-mt-2 description-sm text-pretty";

export const heroMediaClasses = "w-full min-w-0 overflow-hidden *:w-full";
