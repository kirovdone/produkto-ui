import { cva } from "class-variance-authority";
import { framePaint } from "../../recipes/appearance";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import type { ColorPickerSize } from "./ColorPicker.types";
import { menuRow } from "../../recipes/menu";
import {
  fieldDisabled,
  fieldFrame,
  fieldInvalid,
  fieldStates,
} from "../../recipes/field";

export const colorPickerClasses = cva(
  `group/color-picker flex w-full cursor-pointer items-center justify-start gap-2 overflow-hidden ${fieldFrame} text-start body-sm text-foreground outline-none transition ${fieldStates} ${fieldDisabled} ${fieldInvalid} data-invalid:border-destructive/60 data-invalid:focus-visible:border-destructive`,
  {
    variants: {
      appearance: framePaint,
      size: {
        sm: "min-h-8 px-2 py-1",
        base: "min-h-10 px-3 py-2",
        lg: "min-h-12 px-3 py-2 body-base sm:body-sm",
      } satisfies Record<ColorPickerSize, string>,
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

export const colorPickerRootClasses =
  "relative flex w-full min-w-0 items-center";

export const colorPickerSwatchClasses =
  "block size-5 shrink-0 overflow-hidden rounded-md ring-1 ring-border ring-inset group-data-[size=sm]/color-picker:size-4 group-data-[size=sm]/color-picker:rounded-sm";

export const colorPickerOpacityLabelClasses = "ms-auto shrink-0 caption-xs";

export const colorPickerContentClasses =
  "flex max-h-80 w-64 flex-col gap-0 overflow-hidden p-0";

export const colorPickerTabsClasses = "flex min-h-0 flex-1 flex-col gap-0";

export const colorPickerHeaderClasses = "shrink-0 px-2 pt-2";

export const colorPickerPaletteClasses = "flex min-h-0 flex-1 flex-col p-2";

export const colorPickerPaletteScrollClasses = "min-h-0 flex-1";

export const colorPickerPaletteInnerClasses = "grid gap-1";

export const colorPickerSeparatorClasses = "my-1";

export const colorPickerPlaceholderClasses =
  "truncate text-muted-foreground/50";

export const colorPickerOptionsClasses = "flex flex-col";

export const colorPickerOptionClasses = `${menuRow} w-full text-foreground hover:bg-muted focus-visible:bg-muted aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:bg-muted`;

export const colorPickerOptionSwatchClasses =
  "block size-4 shrink-0 rounded-sm ring-1 ring-foreground/10 ring-inset";

export const colorPickerOptionCheckClasses = "ms-auto text-foreground";

export const colorPickerPanelClasses = "flex flex-col gap-1.5 p-2";

export const colorPickerAreaClasses =
  "relative h-32 w-full cursor-crosshair touch-none rounded-lg ring-1 ring-black/10 ring-inset outline-none";

export const colorPickerAreaThumbClasses =
  "pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)]";

export const colorPickerSlidersClasses = "flex flex-col gap-1";

export const colorPickerSliderClasses =
  "relative flex h-4 w-full touch-none items-center select-none";

export const colorPickerTrackClasses =
  "relative h-3 grow overflow-hidden rounded-full";

export const colorPickerThumbClasses =
  "block size-3 rounded-full bg-white shadow-[0_0_0_1.5px_rgba(0,0,0,0.45)] outline-none transition focus-visible:scale-125";

export const colorPickerFieldsClasses =
  "flex w-full shrink-0 items-center gap-1.5";

export const colorPickerInputClasses = "flex-1";

export const colorPickerOpacityClasses = "w-16 shrink-0";

export const colorPickerEyedropperClasses = "shrink-0";

export const colorPickerSwatchFillClasses = "block size-full";
