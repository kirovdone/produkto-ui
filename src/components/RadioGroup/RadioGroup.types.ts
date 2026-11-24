import type { Item, Root } from "@radix-ui/react-radio-group";
import type { ComponentProps, ReactNode } from "react";
import type { Size } from "../../recipes/size";

export type RadioGroupSize = Extract<Size, "sm" | "base" | "lg">;

export interface RadioGroupProps extends ComponentProps<typeof Root> {
  size?: RadioGroupSize;
  error?: ReactNode;
}

export interface RadioGroupItemProps extends ComponentProps<typeof Item> {
  size?: RadioGroupSize;
}
