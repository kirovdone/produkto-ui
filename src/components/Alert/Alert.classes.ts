import { cva } from "class-variance-authority";
import type { AlertSize } from "./Alert.types";
import { statusPaint } from "../../recipes/appearance";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";

export const alertClasses = cva(
  "group/alert relative flex w-full items-center border text-start [&>svg]:shrink-0",
  {
    variants: {
      tone: statusPaint,
      size: {
        sm: "min-h-8 gap-1.5 px-2 py-1 body-xs [&>svg:not([class*='size-'])]:size-3.5",
        base: "min-h-10 gap-2 px-3 py-1 body-sm [&>svg:not([class*='size-'])]:size-4",
        lg: "min-h-12 gap-3 px-4 py-1 body-base [&>svg:not([class*='size-'])]:size-5",
      } satisfies Record<AlertSize, string>,
      borderRadius: boxBorderRadiusVariants,
    },
    defaultVariants: {
      tone: "info",
      size: "base",
      borderRadius: "lg",
    },
  },
);

export const alertTitleClasses =
  "min-w-0 flex-1 py-1 text-pretty group-data-[size=sm]/alert:py-0.5 group-data-[size=lg]/alert:py-1.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:transition-colors [&_a]:hover:text-foreground";

export const alertActionClasses =
  "ms-2 flex shrink-0 items-center gap-2 group-data-[size=sm]/alert:ms-1.5 group-data-[size=sm]/alert:gap-1.5 group-data-[size=lg]/alert:ms-3 group-data-[size=lg]/alert:gap-3";
