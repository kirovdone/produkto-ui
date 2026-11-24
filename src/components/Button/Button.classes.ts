import { cva } from "class-variance-authority";
import type { ButtonAlign, ButtonSize } from "./Button.types";
import {
  appearanceVariants,
  controlPaint,
  toneVariants,
  type Tone,
} from "../../recipes/appearance";
import { glyphRow } from "../../recipes/menu";
import { borderRadiusVariants } from "../../recipes/borderRadius";

export const buttonClasses = cva(
  `group/button inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-invalid:inset-ring aria-invalid:inset-ring-destructive/60 ${glyphRow}`,
  {
    variants: {
      appearance: appearanceVariants,
      tone: toneVariants,
      size: {
        xs: "h-5 gap-0.5 px-1.5 label-xs [&_svg:not([class*='size-'])]:size-3.5 has-data-[icon=inline-start]:ps-1 has-data-[icon=inline-end]:pe-1",
        sm: "h-8 px-2 label-sm",
        base: "h-10 px-3 label-sm has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5",
        lg: "h-12 px-4 label-sm has-data-[icon=inline-start]:ps-3.5 has-data-[icon=inline-end]:pe-3.5",
      } satisfies Record<ButtonSize, string>,
      square: {
        true: "aspect-square px-0",
        false: "",
      },
      wrap: {
        true: "h-auto max-w-full shrink whitespace-normal text-start",
        false: "",
      },
      block: {
        true: "w-full",
        false: "",
      },
      muted: {
        true: "",
        false: "",
      },
      loading: {
        true: "[&>svg:not([data-part=spinner])]:hidden",
        false: "",
      },
      align: {
        start: "justify-start text-start",
        center: "",
        end: "justify-end text-end",
      } satisfies Record<ButtonAlign, string>,
      borderRadius: borderRadiusVariants,
    },
    compoundVariants: [
      ...controlPaint,
      {
        muted: true,
        class:
          "text-muted-foreground hover:text-foreground focus-visible:text-foreground data-[state=open]:text-foreground",
      },
      { wrap: true, size: "xs", class: "min-h-5 py-px" },
      { wrap: true, size: "sm", class: "min-h-8 py-1" },
      { wrap: true, size: "base", class: "min-h-10 py-2" },
      { wrap: true, size: "lg", class: "min-h-12 py-3" },
    ],
    defaultVariants: {
      appearance: "solid",
      tone: "neutral",
      size: "base",
      square: false,
      wrap: false,
      block: false,
      muted: false,
      loading: false,
      align: "center",
      borderRadius: "base",
    },
  },
);

export const buttonFieldClasses = cva(
  "bg-card transition-[color,background-color,box-shadow]",
  {
    variants: {
      tone: {
        neutral:
          "hover:bg-card hover:inset-ring-foreground/20 focus-visible:bg-card focus-visible:inset-ring-foreground/35",
        accent: "",
        destructive: "",
        success: "",
        warning: "",
        info: "",
      } satisfies Record<Tone, string>,
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);
