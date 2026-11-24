import { cva } from "class-variance-authority";
import { framePaint } from "../../recipes/appearance";
import {
  fieldDisabled,
  fieldFrame,
  fieldInvalid,
  fieldMotion,
  fieldPlaceholder,
} from "../../recipes/field";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type { InputSize } from "./Input.types";

export const inputClasses = cva(
  `w-full min-w-0 ${fieldFrame} py-1 body-sm text-foreground ${fieldMotion} selection:bg-primary selection:text-primary-foreground ${fieldPlaceholder} hover:border-foreground/20 focus-visible:border-foreground/35 disabled:pointer-events-none ${fieldDisabled} ${fieldInvalid} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-calendar-picker-indicator]:hidden`,
  {
    variants: {
      appearance: framePaint,
      size: {
        sm: "h-8 px-2",
        base: "h-10 px-3",
        lg: "h-12 px-3 body-base sm:body-sm",
      } satisfies Record<InputSize, string>,
      borderRadius: {
        ...borderRadiusVariants,
        full: `${borderRadiusVariants.full} px-4`,
      },
    },
    defaultVariants: {
      appearance: "solid",
      size: "base",
      borderRadius: "base",
    },
  },
);

export const inputRootClasses = "relative flex w-full min-w-0 items-center";

export const inputClearedRoomClasses = cva("", {
  variants: {
    size: {
      sm: "pe-7",
      base: "pe-10",
      lg: "pe-11",
    } satisfies Record<InputSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const inputClearClasses = cva("absolute top-1/2 -translate-y-1/2", {
  variants: {
    size: {
      sm: "end-1.5",
      base: "end-1",
      lg: "end-2",
    } satisfies Record<InputSize, string>,
  },
  defaultVariants: {
    size: "base",
  },
});

export const inputRevealClasses =
  "text-muted-foreground transition-colors hover:text-foreground";
