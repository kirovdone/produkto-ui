import { cn } from "../../cn";
import { Slot } from "@radix-ui/react-slot";
import { badgeClasses } from "./Badge.classes";
import type { BadgeProps } from "./Badge.types";

export const Badge = ({
  asChild = false,
  className,
  tone = "info",
  size = "base",
  borderRadius = "base",
  ...props
}: BadgeProps) => {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-part="badge"
      data-tone={tone}
      data-size={size}
      data-radius={borderRadius}
      className={cn(badgeClasses({ tone, size, borderRadius }), className)}
      {...props}
    />
  );
};
