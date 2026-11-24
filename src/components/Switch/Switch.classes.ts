import { cva } from "class-variance-authority";
import type { SwitchBorderRadius, SwitchSize } from "./Switch.types";
import { fieldDisabled } from "../../recipes/field";
import { borderRadiusVariants } from "../../recipes/borderRadius";

export const switchClasses = cva(
  `peer group/switch relative inline-flex shrink-0 cursor-pointer items-center bg-muted-foreground/25 p-px outline-none transition-colors after:absolute after:-inset-x-3 after:-inset-y-2 data-[state=unchecked]:focus-visible:bg-muted-foreground/40 data-[state=checked]:focus-visible:bg-primary/80 ${fieldDisabled} aria-invalid:inset-ring aria-invalid:inset-ring-destructive/60 data-[state=checked]:bg-primary`,
  {
    variants: {
      size: {
        sm: "h-[11px] w-5",
        base: "h-3.5 w-6.5",
        lg: "h-4.5 w-8.5",
      } satisfies Record<SwitchSize, string>,
      borderRadius: {
        none: `${borderRadiusVariants.none} [--inner-radius:0px]`,
        xs: `${borderRadiusVariants.xs} [--inner-radius:var(--radius-xs)]`,
        sm: `${borderRadiusVariants.sm} [--inner-radius:var(--radius-sm)]`,
        base: `${borderRadiusVariants.base} [--inner-radius:var(--radius-md)]`,
        lg: `${borderRadiusVariants.lg} [--inner-radius:var(--radius-lg)]`,
        xl: `${borderRadiusVariants.xl} [--inner-radius:var(--radius-xl)]`,
        full: `${borderRadiusVariants.full} [--inner-radius:calc(infinity*1px)]`,
      } satisfies Record<SwitchBorderRadius, string>,
    },
    defaultVariants: {
      size: "base",
      borderRadius: "full",
    },
  },
);

export const switchThumbClasses =
  "pointer-events-none block rounded-(--inner-radius) bg-background shadow-sm transition-transform group-data-[size=base]/switch:size-3 group-data-[size=sm]/switch:size-[9px] group-data-[size=lg]/switch:size-4 data-[state=checked]:translate-x-full data-[state=checked]:bg-primary-foreground";

export const switchErrorClasses = "order-last w-full";
