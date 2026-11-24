"use client";

import { Indicator, Root } from "@radix-ui/react-progress";
import { cn } from "../../cn";
import {
  progressClasses,
  progressIndicatorClasses,
  progressSegmentClasses,
  progressSegmentsClasses,
} from "./Progress.classes";
import type { ProgressProps } from "./Progress.types";

export const Progress = ({
  className,
  value = null,
  max = 100,
  size = "base",
  borderRadius = "full",
  segments,
  ...props
}: ProgressProps) => {
  if (segments)
    return (
      <Root
        data-part="progress"
        data-size={size}
        data-radius={borderRadius}
        data-segmented=""
        value={value}
        max={segments}
        className={cn(progressSegmentsClasses({ size }), className)}
        {...props}
      >
        {Array.from({ length: segments }, (_, index) => (
          <span
            key={index}
            data-part="progress-segment"
            data-filled={value !== null && index < value ? "" : undefined}
            className={progressSegmentClasses({ size, borderRadius })}
          />
        ))}
      </Root>
    );
  const known = value !== null && max > 0 && value >= 0 && value <= max;
  const rest = known ? 100 - (value / max) * 100 : null;
  return (
    <Root
      data-part="progress"
      data-size={size}
      data-radius={borderRadius}
      value={value}
      max={max}
      className={cn(progressClasses({ size, borderRadius }), className)}
      {...props}
    >
      <Indicator
        data-part="progress-indicator"
        className={progressIndicatorClasses}
        style={
          rest === null
            ? undefined
            : {
                transform: `translateX(${-rest}%)`,
              }
        }
      />
    </Root>
  );
};
