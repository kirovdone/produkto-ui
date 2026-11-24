"use client";

import { Root } from "@radix-ui/react-toggle";
import { cn } from "../../cn";
import { toggleClasses } from "./Toggle.classes";
import type { ToggleProps } from "./Toggle.types";

export const Toggle = ({
  className,
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  ...props
}: ToggleProps) => (
  <Root
    data-part="toggle"
    data-appearance={appearance}
    data-size={size}
    data-radius={borderRadius}
    className={cn(toggleClasses({ appearance, size, borderRadius }), className)}
    {...props}
  />
);
