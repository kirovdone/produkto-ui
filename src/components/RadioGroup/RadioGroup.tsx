"use client";

import { Indicator, Item, Root } from "@radix-ui/react-radio-group";
import { createContext, use } from "react";
import { cn } from "../../cn";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import {
  radioGroupClasses,
  radioGroupIndicatorClasses,
  radioGroupIndicatorDotClasses,
  radioGroupItemClasses,
} from "./RadioGroup.classes";
import type {
  RadioGroupItemProps,
  RadioGroupProps,
  RadioGroupSize,
} from "./RadioGroup.types";

const GroupSize = createContext<RadioGroupSize>("base");

export const RadioGroup = ({
  className,
  size = "base",
  error,
  ...props
}: RadioGroupProps) => {
  const failed = useFieldError(error, props["aria-describedby"]);
  return (
    <GroupSize.Provider value={size}>
      <Root
        data-part="radio-group"
        data-size={size}
        className={cn(radioGroupClasses({ size }), className)}
        {...props}
        aria-invalid={failed.shown || props["aria-invalid"]}
        aria-describedby={failed.describedBy}
      />
      <FieldErrorMessage id={failed.id} part="radio-group-error">
        {error}
      </FieldErrorMessage>
    </GroupSize.Provider>
  );
};

export const RadioGroupItem = ({
  className,
  size,
  ...props
}: RadioGroupItemProps) => {
  const groupSize = use(GroupSize);
  const itemSize = size ?? groupSize;
  return (
    <Item
      data-part="radio-group-item"
      data-size={itemSize}
      className={cn(radioGroupItemClasses({ size: itemSize }), className)}
      {...props}
    >
      <Indicator
        data-part="radio-group-indicator"
        className={radioGroupIndicatorClasses}
      >
        <span className={radioGroupIndicatorDotClasses} />
      </Indicator>
    </Item>
  );
};
