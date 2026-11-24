import { cva } from "class-variance-authority";
import { surfaceFill } from "../../recipes/appearance";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import type {
  CollapsibleAppearance,
  CollapsibleSize,
} from "./Collapsible.types";

export const collapsibleClasses = cva("group/collapsible", {
  variants: {
    appearance: {
      solid: `overflow-hidden ${surfaceFill.solid}`,
      soft: `overflow-hidden ${surfaceFill.soft}`,
      outline: `overflow-hidden ${surfaceFill.outline}`,
      transparent: "",
    } satisfies Record<CollapsibleAppearance, string>,
    borderRadius: boxBorderRadiusVariants,
  },
  defaultVariants: {
    appearance: "solid",
    borderRadius: "base",
  },
});

export const collapsibleTriggerClasses = cva("", {
  variants: {
    appearance: {
      solid: "rounded-none",
      soft: "rounded-none",
      outline: "rounded-none",
      transparent: "",
    } satisfies Record<CollapsibleAppearance, string>,
  },
  defaultVariants: {
    appearance: "solid",
  },
});

export const collapsibleTriggerIconClasses =
  "pointer-events-none ms-auto transition-transform group-data-[state=open]/button:rotate-90";

export const collapsibleContentClasses =
  "overflow-hidden motion-safe:data-[state=closed]:animate-collapsible-up motion-safe:data-[state=open]:animate-collapsible-down";

export const collapsibleBodyClasses = cva("", {
  variants: {
    appearance: {
      solid: "body-sm",
      soft: "body-sm",
      outline: "body-sm",
      transparent: "",
    } satisfies Record<CollapsibleAppearance, string>,
    size: {
      sm: "",
      base: "",
      lg: "",
    } satisfies Record<CollapsibleSize, string>,
  },
  compoundVariants: [
    {
      appearance: ["solid", "soft", "outline"],
      size: "base",
      className: "px-3 pt-1 pb-3",
    },
    {
      appearance: ["solid", "soft", "outline"],
      size: "sm",
      className: "px-2 pt-1 pb-2",
    },
    {
      appearance: ["solid", "soft", "outline"],
      size: "lg",
      className: "px-4 pt-1 pb-4",
    },
  ],
  defaultVariants: {
    appearance: "solid",
    size: "base",
  },
});
