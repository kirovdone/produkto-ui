"use client";

import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { cn } from "../../cn";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import {
  checkboxCheckIconClasses,
  checkboxClasses,
  checkboxErrorClasses,
  checkboxIndeterminateIconClasses,
  checkboxIndicatorClasses,
} from "./Checkbox.classes";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({
  className,
  size = "base",
  borderRadius = "xs",
  error,
  ...props
}: CheckboxProps) => {
  const failed = useFieldError(error, props["aria-describedby"]);
  return (
    <>
      <Root
        data-part="checkbox"
        data-size={size}
        data-radius={borderRadius}
        className={cn(checkboxClasses({ size, borderRadius }), className)}
        {...props}
        aria-invalid={failed.shown || props["aria-invalid"]}
        aria-describedby={failed.describedBy}
      >
        <Indicator
          data-part="checkbox-indicator"
          className={checkboxIndicatorClasses}
        >
          <Icon
            icon={Tick02Icon}
            strokeWidth={2.5}
            className={checkboxCheckIconClasses}
          />
          <Icon
            icon={MinusSignIcon}
            strokeWidth={2.5}
            className={checkboxIndeterminateIconClasses}
          />
        </Indicator>
      </Root>
      <FieldErrorMessage
        id={failed.id}
        part="checkbox-error"
        className={checkboxErrorClasses}
      >
        {error}
      </FieldErrorMessage>
    </>
  );
};
