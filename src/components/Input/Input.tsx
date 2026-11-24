"use client";

import type { ReactNode } from "react";
import { InputField } from "./InputField";
import {
  InputFrame,
  InputFrameAddon,
  InputFrameChip,
  InputFrameChips,
  InputFrameChipsInput,
  InputFrameInput,
} from "./InputFrame";
import type { InputProps } from "./Input.types";

const shown = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false;

export const Input = ({
  start,
  end,
  chips,
  onChipRemove,
  appearance,
  size,
  borderRadius,
  error,
  className,
  clearable,
  ...props
}: InputProps) => {
  if (start === undefined && end === undefined && chips === undefined)
    return (
      <InputField
        appearance={appearance}
        size={size}
        borderRadius={borderRadius}
        error={error}
        clearable={clearable}
        className={className}
        {...props}
      />
    );
  return (
    <InputFrame
      appearance={appearance}
      size={size}
      borderRadius={borderRadius}
      error={error}
      className={className}
    >
      {shown(start) ? <InputFrameAddon>{start}</InputFrameAddon> : null}
      {chips === undefined ? (
        <InputFrameInput clearable={clearable} {...props} />
      ) : (
        <InputFrameChips>
          {chips.map((chip) => (
            <InputFrameChip
              key={chip}
              onRemove={onChipRemove ? () => onChipRemove(chip) : undefined}
            >
              {chip}
            </InputFrameChip>
          ))}
          <InputFrameChipsInput {...props} />
        </InputFrameChips>
      )}
      {shown(end) ? (
        <InputFrameAddon align="inline-end">{end}</InputFrameAddon>
      ) : null}
    </InputFrame>
  );
};
