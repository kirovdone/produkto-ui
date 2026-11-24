import { cva } from "class-variance-authority";
import { textSizes } from "../Text/Text.classes";

export const linkClasses = cva(
  "cursor-pointer rounded-xs underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60 aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:inline-flex has-[>svg]:items-center has-[>svg]:gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1em] [&_svg:not([stroke-width='0'])_*]:[stroke-width:1.9]",
  {
    variants: {
      underline: {
        true: "underline hover:text-foreground",
        false: "hover:underline",
      },
      muted: {
        true: "text-muted-foreground hover:text-foreground",
        false: "",
      },
      size: textSizes,
    },
    defaultVariants: {
      underline: false,
      muted: false,
    },
  },
);
