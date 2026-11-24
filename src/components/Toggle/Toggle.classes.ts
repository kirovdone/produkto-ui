import { cva } from "class-variance-authority";
import type { ToggleAppearance, ToggleSize } from "./Toggle.types";
import { framePaint } from "../../recipes/appearance";
import { glyphRow } from "../../recipes/menu";
import { borderRadiusVariants } from "../../recipes/borderRadius";

export const toggleClasses = cva(
  `group/toggle inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap label-sm transition-colors outline-none select-none hover:bg-muted hover:text-muted-foreground focus-visible:bg-muted focus-visible:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 aria-invalid:inset-ring aria-invalid:inset-ring-destructive/60 aria-pressed:bg-foreground/7 aria-pressed:text-foreground aria-checked:bg-foreground/7 aria-checked:text-foreground ${glyphRow}`,
  {
    variants: {
      appearance: {
        solid: framePaint.solid,
        soft: `${framePaint.soft} hover:bg-foreground/10 focus-visible:bg-foreground/10 aria-pressed:bg-foreground/10 aria-checked:bg-foreground/10`,
        outline: framePaint.outline,
        transparent: framePaint.transparent,
      } satisfies Record<ToggleAppearance, string>,
      size: {
        xs: "h-5 min-w-5 gap-0.5 px-1 label-xs has-data-[icon=inline-start]:ps-0.5 has-data-[icon=inline-end]:pe-0.5",
        sm: "h-8 min-w-8 px-2 has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5",
        base: "h-10 min-w-10 px-3 has-data-[icon=inline-start]:ps-2.5 has-data-[icon=inline-end]:pe-2.5",
        lg: "h-12 min-w-12 px-4 has-data-[icon=inline-start]:ps-3.5 has-data-[icon=inline-end]:pe-3.5",
      } satisfies Record<ToggleSize, string>,
      borderRadius: borderRadiusVariants,
    },
    defaultVariants: {
      appearance: "solid",
      size: "base",
      borderRadius: "base",
    },
  },
);
