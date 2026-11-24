import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const STEPS = [
  "2xs",
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
];

const twMerge = extendTailwindMerge<"text-role">({
  extend: {
    classGroups: {
      "text-role": [
        {
          heading: STEPS,
          body: STEPS,
          label: STEPS,
          description: STEPS,
          caption: STEPS,
          code: STEPS,
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
