"use client";

import { Root, Thumb } from "@radix-ui/react-switch";
import { cn } from "../../cn";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import {
  switchClasses,
  switchErrorClasses,
  switchThumbClasses,
} from "./Switch.classes";
import type { SwitchProps } from "./Switch.types";

export const Switch = ({
  className,
  size = "base",
  borderRadius = "full",
  error,
  ...props
}: SwitchProps) => {
  const failed = useFieldError(error, props["aria-describedby"]);
  return (
    <>
      <Root
        data-part="switch"
        data-size={size}
        data-radius={borderRadius}
        className={cn(switchClasses({ size, borderRadius }), className)}
        {...props}
        aria-invalid={failed.shown || props["aria-invalid"]}
        aria-describedby={failed.describedBy}
      >
        <Thumb data-part="switch-thumb" className={switchThumbClasses} />
      </Root>
      <FieldErrorMessage
        id={failed.id}
        part="switch-error"
        className={switchErrorClasses}
      >
        {error}
      </FieldErrorMessage>
    </>
  );
};
