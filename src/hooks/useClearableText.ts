"use client";

import { useState, type ChangeEvent } from "react";

const CLEARABLE_TYPES = new Set([
  "text",
  "email",
  "tel",
  "url",
  "search",
  "number",
]);

const filledWith = (value: unknown): boolean =>
  value !== undefined && value !== null && String(value) !== "";

interface ClearableText {
  clearable?: boolean;
  type?: string;
  value?: unknown;
  defaultValue?: unknown;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const clearButtonSize = (fieldSize?: string): "xs" | "sm" =>
  fieldSize === "sm" ? "xs" : "sm";

export const clearInput = (input: Element | null | undefined) => {
  if (!(input instanceof HTMLInputElement)) return;
  Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set?.call(input, "");
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
};

export const useClearableText = ({
  clearable,
  type,
  value,
  defaultValue,
  disabled,
  readOnly,
  onChange,
}: ClearableText) => {
  const [typed, setTyped] = useState(() => filledWith(value ?? defaultValue));
  const on =
    clearable === true && (type === undefined || CLEARABLE_TYPES.has(type));
  const filled = value === undefined ? typed : filledWith(value);
  return {
    on,
    shown: on && filled && !disabled && !readOnly,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      setTyped(event.target.value !== "");
    },
  };
};
