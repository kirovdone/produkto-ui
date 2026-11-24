import { cva } from "class-variance-authority";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import { framePaint } from "../../recipes/appearance";
import type { TextareaSize } from "./Textarea.types";
import {
  fieldDisabled,
  fieldFrame,
  fieldInvalid,
  fieldMotion,
  fieldPlaceholder,
  fieldStates,
} from "../../recipes/field";

const textareaSizes = {
  sm: "min-h-14 px-2 py-1",
  base: "min-h-16 px-3 py-2",
  lg: "min-h-18 px-3 py-3 body-base sm:body-sm",
} satisfies Record<TextareaSize, string>;

export const textareaClasses = cva(
  `flex field-sizing-content w-full resize-y ${fieldFrame} body-sm text-foreground ${fieldMotion} ${fieldPlaceholder} ${fieldStates} ${fieldDisabled} ${fieldInvalid} scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent`,
  {
    variants: {
      appearance: framePaint,
      size: textareaSizes,
      borderRadius: boxBorderRadiusVariants,
    },
    defaultVariants: {
      appearance: "solid",
      size: "base",
      borderRadius: "base",
    },
  },
);

export const textareaFrameSizeClasses = cva("", {
  variants: {
    size: textareaSizes,
  },
  defaultVariants: {
    size: "base",
  },
});
