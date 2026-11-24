import { cva } from "class-variance-authority";
import { fieldDisabled } from "../../recipes/field";
import type { RadioGroupSize } from "./RadioGroup.types";

export const radioGroupClasses = cva(
  "group/radio-group flex flex-col data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap",
  {
    variants: {
      size: {
        sm: "gap-1.5 data-[orientation=horizontal]:gap-x-3",
        base: "gap-2 data-[orientation=horizontal]:gap-x-4",
        lg: "gap-3 data-[orientation=horizontal]:gap-x-5",
      } satisfies Record<RadioGroupSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const radioGroupItemClasses = cva(
  `peer relative inline-flex aspect-square shrink-0 cursor-pointer items-center justify-center rounded-full bg-background inset-ring inset-ring-input shadow-sm outline-none transition after:absolute after:-inset-x-3 after:-inset-y-2 data-[state=unchecked]:focus-visible:bg-muted data-[state=checked]:focus-visible:bg-primary/80 ${fieldDisabled} aria-invalid:inset-ring-destructive/60 group-aria-invalid/radio-group:inset-ring-destructive/60 data-[state=unchecked]:enabled:hover:bg-muted data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:inset-ring-primary`,
  {
    variants: {
      size: {
        sm: "size-3.5",
        base: "size-4",
        lg: "size-5",
      } satisfies Record<RadioGroupSize, string>,
    },
    defaultVariants: {
      size: "base",
    },
  },
);

export const radioGroupIndicatorClasses =
  "flex size-full items-center justify-center";

export const radioGroupIndicatorDotClasses = "size-2/5 rounded-full bg-current";
