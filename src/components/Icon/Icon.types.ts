import type { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";

export type { IconSvgElement } from "@hugeicons/react";

export type IconProps = Omit<
  ComponentProps<typeof HugeiconsIcon>,
  "color" | "primaryColor" | "secondaryColor" | "disableSecondaryOpacity"
>;
