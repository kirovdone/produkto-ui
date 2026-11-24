import { cva } from "class-variance-authority";
import { fieldDisabled } from "../../recipes/field";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type { CheckboxSize } from "./Checkbox.types";

export const checkboxClasses = cva(
  `peer relative inline-flex shrink-0 cursor-pointer items-center justify-center bg-background inset-ring inset-ring-input shadow-sm outline-none transition after:absolute after:-inset-x-3 after:-inset-y-2 data-[state=unchecked]:focus-visible:bg-muted data-[state=checked]:focus-visible:bg-primary/80 ${fieldDisabled} aria-invalid:inset-ring-destructive/60 data-[state=unchecked]:enabled:hover:bg-muted data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:inset-ring-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:inset-ring-primary`,
  {
    variants: {
      size: {
        sm: "size-3.5",
        base: "size-4",
        lg: "size-5",
      } satisfies Record<CheckboxSize, string>,
      borderRadius: borderRadiusVariants,
    },
    defaultVariants: {
      size: "base",
      borderRadius: "xs",
    },
  },
);

export const checkboxIndicatorClasses =
  "group/checkbox-indicator flex size-full items-center justify-center text-current";

export const checkboxCheckIconClasses =
  "size-full group-data-[state=indeterminate]/checkbox-indicator:hidden";

export const checkboxIndeterminateIconClasses =
  "hidden size-4/5 group-data-[state=indeterminate]/checkbox-indicator:block";

export const checkboxErrorClasses = "order-last w-full";
