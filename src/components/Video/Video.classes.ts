import { cva } from "class-variance-authority";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";

export const videoClasses = cva(
  "relative isolate aspect-video w-full overflow-hidden bg-muted",
  {
    variants: {
      borderRadius: boxBorderRadiusVariants,
    },
    defaultVariants: {
      borderRadius: "xl",
    },
  },
);

export const videoMediaClasses = "block size-full object-cover";

export const videoGroundClasses = "absolute inset-0";

export const videoPlayClasses =
  "absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground shadow-sm transition-transform duration-200 hover:scale-105 motion-reduce:transition-none";

export const videoToggleClasses =
  "absolute right-4 bottom-4 z-10 grid size-11 place-items-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/40";

export const videoDialogClasses = "max-w-4xl overflow-hidden p-0";
