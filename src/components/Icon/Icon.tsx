import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "../../cn";
import { iconClasses } from "./Icon.classes";
import type { IconProps } from "./Icon.types";

export const Icon = ({ size = 16, className, ...props }: IconProps) => {
  const named = Boolean(props["aria-label"] || props["aria-labelledby"]);
  return (
    <HugeiconsIcon
      data-part="icon"
      aria-hidden={named ? undefined : true}
      role={named ? "img" : undefined}
      size={size}
      className={cn(iconClasses, className)}
      {...props}
    />
  );
};
