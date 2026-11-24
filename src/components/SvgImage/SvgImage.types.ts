import type { ComponentProps } from "react";

export interface SvgImageProps extends ComponentProps<"span"> {
  src: string;
  size?: number;
  strokeWidth?: number | string;
}
