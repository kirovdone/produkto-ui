import { cva } from "class-variance-authority";
import {
  glyphRow,
  glyphs,
  menuLabel,
  menuPad,
  menuRow,
  menuRowLit,
  menuScroll,
  menuSeparator,
  menuStack,
} from "../../recipes/menu";
import {
  panelCapped,
  panelEnter,
  panelExit,
  panelSurface,
  panelWidth,
} from "../../recipes/panel";
import { framePaint } from "../../recipes/appearance";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type { SelectTriggerSize } from "./Select.types";
import {
  fieldDisabled,
  fieldFrame,
  fieldInvalid,
  fieldMotion,
  fieldPlaceholderShown,
  fieldStates,
} from "../../recipes/field";

export const selectTriggerClasses = cva(
  `flex w-full cursor-pointer items-center justify-between ${fieldFrame} text-start body-sm whitespace-nowrap ${fieldMotion} select-none ${fieldStates} ${fieldDisabled} ${fieldInvalid} ${fieldPlaceholderShown} ${glyphRow} [&>svg]:text-muted-foreground *:data-[part=select-value]:flex *:data-[part=select-value]:min-w-0 *:data-[part=select-value]:flex-1 *:data-[part=select-value]:items-center *:data-[part=select-value]:gap-1.5 *:data-[part=select-value]:overflow-hidden`,
  {
    variants: {
      appearance: framePaint,
      size: {
        sm: "min-h-8 px-2 py-1",
        base: "min-h-10 py-2 ps-3 pe-2",
        lg: "min-h-12 py-2 ps-3 pe-2.5 body-base sm:body-sm",
      } satisfies Record<SelectTriggerSize, string>,
      borderRadius: {
        ...borderRadiusVariants,
        full: `${borderRadiusVariants.full} ps-4`,
      },
    },
    defaultVariants: {
      appearance: "solid",
      size: "base",
      borderRadius: "base",
    },
  },
);

export const selectRootClasses = "relative flex w-full min-w-0 items-center";

export const selectContentClasses = `relative z-9999 [--panel-room:var(--radix-select-content-available-height)] ${panelCapped} ${panelWidth} min-w-(--radix-select-trigger-width) max-w-(--radix-select-content-available-width) origin-(--radix-select-content-transform-origin) overflow-hidden ${panelSurface} ${panelEnter} ${panelExit} data-[align-trigger=true]:animate-none ${glyphs}`;

export const selectScrollClasses = menuScroll;

export const selectViewportClasses = menuPad;

export const selectGroupClasses = menuStack;

export const selectLabelClasses = menuLabel;

export const selectItemClasses = `${menuRow} w-full ${menuRowLit}`;

export const selectItemTextClasses = "flex min-w-0 items-center gap-2";

export const selectSeparatorClasses = `pointer-events-none ${menuSeparator}`;
