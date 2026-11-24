import type { ComponentProps, ReactNode } from "react";
import type { Root } from "@radix-ui/react-label";
import type { Size } from "../../recipes/size";

export type LabelSize = Extract<Size, "sm" | "base" | "lg">;

export type LabelProps = ComponentProps<typeof Root> & {
  size?: LabelSize;
  required?: boolean;
  info?: ReactNode;
};
