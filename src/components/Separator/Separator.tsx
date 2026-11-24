"use client";

import { Root } from "@radix-ui/react-separator";
import { cn } from "../../cn";
import { separatorClasses } from "./Separator.classes";
import type { SeparatorProps } from "./Separator.types";

export const Separator = ({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) => (
  <Root
    data-part="separator"
    decorative={decorative}
    orientation={orientation}
    className={cn(separatorClasses({ orientation }), className)}
    {...props}
  />
);
