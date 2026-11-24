import type { Root } from "@radix-ui/react-radio-group";
import type { ComponentProps, ReactNode } from "react";
import type { Size } from "../../recipes/size";

export type RatingSize = Extract<Size, "sm" | "base" | "lg">;

export interface RatingProps extends Omit<
  ComponentProps<typeof Root>,
  "value" | "defaultValue" | "onValueChange"
> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: RatingSize;
  error?: ReactNode;
}
