import { cn } from "../../cn";
import { Slot } from "@radix-ui/react-slot";
import type { ElementType } from "react";
import { textClasses } from "./Text.classes";
import type { TextProps } from "./Text.types";

export const Text = ({
  as = "span",
  asChild = false,
  size,
  weight,
  align,
  truncate,
  muted,
  className,
  ...props
}: TextProps) => {
  const Comp: ElementType = asChild ? Slot : as;
  return (
    <Comp
      data-part="text"
      data-size={size}
      className={cn(
        textClasses({ size, weight, align, truncate, muted }),
        className,
      )}
      {...props}
    />
  );
};
