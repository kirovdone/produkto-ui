import { cva } from "class-variance-authority";
import type {
  ScrollAreaOrientation,
  ScrollBarOrientation,
} from "./ScrollArea.types";

export const scrollAreaClasses = "relative flex flex-col overflow-hidden";

export const scrollAreaViewportClasses = cva(
  "min-h-0 w-full flex-1 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-inset",
  {
    variants: {
      orientation: {
        vertical: "[&>div]:flex! [&>div]:min-h-full [&>div]:flex-col",
        horizontal: "",
        both: "",
      } satisfies Record<ScrollAreaOrientation, string>,
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);

export const scrollBarClasses = cva(
  "flex touch-none p-0.5 transition-colors select-none motion-safe:data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 motion-safe:data-[state=visible]:animate-in data-[state=visible]:fade-in-0",
  {
    variants: {
      orientation: {
        vertical: "w-2",
        horizontal: "h-2 flex-col",
      } satisfies Record<ScrollBarOrientation, string>,
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);

export const scrollAreaThumbClasses =
  "relative flex-1 rounded-full bg-muted-foreground/30 transition-colors before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-4 before:min-w-4 before:-translate-1/2 hover:bg-muted-foreground/50";
