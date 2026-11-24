import { cva } from "class-variance-authority";
import { surfaceFill } from "../../recipes/appearance";
import { fieldDisabled } from "../../recipes/field";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import type { AccordionAppearance, AccordionSize } from "./Accordion.types";

export const accordionClasses = cva("group/accordion flex w-full flex-col", {
  variants: {
    appearance: {
      solid: "gap-2",
      soft: "gap-2",
      outline: "gap-2",
      transparent: "",
    } satisfies Record<AccordionAppearance, string>,
  },
  defaultVariants: {
    appearance: "solid",
  },
});

export const accordionItemClasses = cva("", {
  variants: {
    appearance: {
      solid: `overflow-hidden ${surfaceFill.solid}`,
      soft: `overflow-hidden ${surfaceFill.soft}`,
      outline: `overflow-hidden ${surfaceFill.outline}`,
      transparent: "border-b border-border last:border-b-0",
    } satisfies Record<AccordionAppearance, string>,
    borderRadius: boxBorderRadiusVariants,
  },
  defaultVariants: {
    appearance: "solid",
    borderRadius: "base",
  },
});

export const accordionUnstyledTriggerClasses =
  "group/accordion-trigger flex min-h-8 min-w-8 flex-1 items-center text-start [&_svg]:shrink-0";

export const accordionTriggerClasses = cva(
  `${accordionUnstyledTriggerClasses} cursor-pointer gap-2 label-sm transition-colors outline-none ${fieldDisabled}`,
  {
    variants: {
      size: {
        sm: "gap-1.5 p-2 data-[state=open]:border-b data-[state=open]:border-border",
        base: "p-4",
        lg: "gap-3 p-5 label-base [&_svg:not([class*='size-'])]:size-5",
      } satisfies Record<AccordionSize, string>,
      appearance: {
        solid: "focus-visible:bg-muted enabled:hover:bg-muted",
        soft: "focus-visible:bg-foreground/5 enabled:hover:bg-foreground/5",
        outline: "focus-visible:bg-muted enabled:hover:bg-muted",
        transparent: "focus-visible:bg-muted enabled:hover:bg-muted",
      } satisfies Record<AccordionAppearance, string>,
    },
    defaultVariants: {
      appearance: "solid",
      size: "base",
    },
  },
);

export const accordionTriggerIconClasses =
  "pointer-events-none ms-auto transition-transform group-data-[state=open]/accordion-trigger:rotate-90";

export const accordionUnstyledContentClasses =
  "overflow-hidden motion-safe:data-[state=closed]:animate-accordion-up motion-safe:data-[state=open]:animate-accordion-down";

export const accordionContentClasses = `${accordionUnstyledContentClasses} body-sm`;

export const accordionContentBodyClasses = cva(
  "[&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
  {
    variants: {
      appearance: {
        solid: "",
        soft: "",
        outline: "",
        transparent: "bg-muted",
      } satisfies Record<AccordionAppearance, string>,
      size: {
        sm: "",
        base: "",
        lg: "body-base",
      } satisfies Record<AccordionSize, string>,
    },
    compoundVariants: [
      {
        appearance: ["solid", "soft", "outline"],
        size: "base",
        className: "p-4",
      },
      {
        appearance: ["solid", "soft", "outline"],
        size: "sm",
        className: "p-2",
      },
      {
        appearance: ["solid", "soft", "outline"],
        size: "lg",
        className: "p-5",
      },
      { appearance: "transparent", size: "base", className: "p-4" },
      { appearance: "transparent", size: "sm", className: "p-2" },
      { appearance: "transparent", size: "lg", className: "p-5" },
    ],
    defaultVariants: {
      appearance: "solid",
      size: "base",
    },
  },
);
