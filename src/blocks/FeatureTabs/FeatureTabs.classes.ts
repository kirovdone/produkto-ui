import { cva } from "class-variance-authority";
import { iconTile } from "../../recipes/block";
import type {
  FeatureTabsBarPlacement,
  FeatureTabsOrientation,
} from "./FeatureTabs.types";

export const featureTabsClasses = cva("", {
  variants: {
    orientation: {
      horizontal: "flex flex-col gap-6 md:gap-8",
      vertical:
        "grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12",
    } satisfies Record<FeatureTabsOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const featureTabsListClasses = cva("", {
  variants: {
    orientation: {
      horizontal:
        "grid grid-cols-[repeat(var(--feature-tabs-count),minmax(0,1fr))] gap-3 md:gap-8",
      vertical: "flex flex-col gap-1",
    } satisfies Record<FeatureTabsOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const featureTabClasses = cva(
  "relative flex min-w-0 cursor-pointer text-start outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
  {
    variants: {
      orientation: {
        horizontal:
          "group/switch flex-col gap-1.5 before:absolute before:inset-x-0 before:h-0.5 before:bg-border data-[state=active]:before:bg-foreground/25 data-past:before:bg-primary",
        vertical:
          "group/tab w-full items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-muted/60 data-[state=active]:bg-muted",
      } satisfies Record<FeatureTabsOrientation, string>,
      barPlacement: {
        above: "",
        below: "",
      } satisfies Record<FeatureTabsBarPlacement, string>,
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        barPlacement: "above",
        className: "pt-4 before:top-0",
      },
      {
        orientation: "horizontal",
        barPlacement: "below",
        className: "pb-4 before:bottom-0",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      barPlacement: "above",
    },
  },
);

export const featureTabIconClasses = `${iconTile}`;

export const featureTabTextClasses = "flex min-w-0 flex-col gap-1 pt-2";

export const featureTabTitleClasses = cva("min-w-0", {
  variants: {
    orientation: {
      horizontal:
        "label-sm text-muted-foreground transition-colors group-hover/switch:text-foreground group-data-[state=active]/switch:text-foreground md:label-lg",
      vertical: "heading-base",
    } satisfies Record<FeatureTabsOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const featureTabBodyClasses = cva("hidden description-sm text-pretty", {
  variants: {
    orientation: {
      horizontal:
        "opacity-60 transition-opacity group-hover/switch:opacity-100 group-data-[state=active]/switch:opacity-100 md:block",
      vertical: "group-data-[state=active]/tab:block",
    } satisfies Record<FeatureTabsOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const featureTabsLineClasses = "description-sm text-pretty md:hidden";

export const featureTabBarClasses = cva(
  "absolute inset-x-0 h-0.5 scale-x-0 bg-primary motion-reduce:scale-x-100 origin-left",
  {
    variants: {
      barPlacement: {
        above: "top-0",
        below: "bottom-0",
      } satisfies Record<FeatureTabsBarPlacement, string>,
    },
    defaultVariants: {
      barPlacement: "above",
    },
  },
);

export const featureTabBarFullClasses = "scale-x-100";

export const featureTabsPanelClasses =
  "min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/60";
