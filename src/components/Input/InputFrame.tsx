"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { createContext, use, useId } from "react";
import { cn } from "../../cn";
import {
  describedBy,
  FieldErrorMessage,
  FieldErrorProvider,
  useFieldError,
  useFieldErrorContext,
} from "../../context/fieldError";
import { useTranslate } from "../../host";
import {
  clearButtonSize,
  clearInput,
  useClearableText,
} from "../../hooks/useClearableText";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { textareaClasses } from "../Textarea/Textarea.classes";
import { InputField } from "./InputField";
import {
  inputFrameAddonClasses,
  inputFrameChipClasses,
  inputFrameChipRemoveClasses,
  inputFrameChipTextClasses,
  inputFrameChipsClasses,
  inputFrameChipsInputClasses,
  inputFrameClasses,
  inputFrameInputClasses,
  inputFrameTextareaClasses,
} from "./InputFrame.classes";
import type {
  InputFrameAddonProps,
  InputFrameChipProps,
  InputFrameChipsInputProps,
  InputFrameChipsProps,
  InputFrameClearProps,
  InputFrameInputProps,
  InputFrameProps,
  InputFrameTextareaProps,
} from "./InputFrame.types";
import type { InputSize } from "./Input.types";

const FrameSize = createContext<InputSize>("base");

export const InputFrame = ({
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  error,
  className,
  ...props
}: InputFrameProps) => {
  const failed = useFieldError(error);
  return (
    <FrameSize.Provider value={size}>
      <FieldErrorProvider
        value={{ invalid: failed.shown, describedBy: failed.describedBy }}
      >
        <div
          data-part="input-frame"
          data-appearance={appearance}
          data-size={size}
          data-radius={borderRadius}
          role="group"
          className={cn(
            inputFrameClasses({ appearance, borderRadius }),
            className,
          )}
          {...props}
        />
      </FieldErrorProvider>
      <FieldErrorMessage id={failed.id} part="input-error">
        {error}
      </FieldErrorMessage>
    </FrameSize.Provider>
  );
};

export const InputFrameAddon = ({
  className,
  align = "inline-start",
  onClick,
  ...props
}: InputFrameAddonProps) => (
  <div
    role="group"
    data-part="input-frame-addon"
    data-align={align}
    className={cn(inputFrameAddonClasses({ align }), className)}
    onClick={(event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      const target =
        event.target instanceof Element
          ? event.target.closest("button, a, input, select, textarea")
          : null;
      if (target && event.currentTarget.contains(target)) return;
      const control = event.currentTarget.parentElement?.querySelector(
        "[data-part=input-frame-control]",
      );
      if (control instanceof HTMLElement) control.focus();
    }}
    {...props}
  />
);

export const InputFrameClear = ({
  onClear,
  ...props
}: InputFrameClearProps) => {
  const t = useTranslate();
  const frameSize = use(FrameSize);
  return (
    <InputFrameAddon align="inline-end">
      <Button
        aria-label={t("Clear")}
        data-part="input-frame-clear"
        appearance="transparent"
        tone="destructive"
        size={clearButtonSize(frameSize)}
        onClick={onClear}
        {...props}
      >
        <Icon icon={Cancel01Icon} />
      </Button>
    </InputFrameAddon>
  );
};

export const InputFrameInput = ({
  className,
  clearable,
  onChange,
  ...props
}: InputFrameInputProps) => {
  const field = useClearableText({
    clearable,
    type: props.type,
    value: props.value,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    readOnly: props.readOnly,
    onChange,
  });
  const frame = useFieldErrorContext();
  return (
    <>
      <InputField
        data-part="input-frame-control"
        appearance="transparent"
        className={cn(inputFrameInputClasses, className)}
        {...props}
        aria-invalid={frame.invalid || props["aria-invalid"]}
        aria-describedby={describedBy(
          props["aria-describedby"],
          frame.describedBy,
        )}
        onChange={field.onChange}
      />
      {field.shown ? (
        <InputFrameClear
          onClear={(event) =>
            clearInput(
              event.currentTarget
                .closest("[data-part=input-frame]")
                ?.querySelector("[data-part=input-frame-control]"),
            )
          }
        />
      ) : null}
    </>
  );
};

export const InputFrameChips = ({
  className,
  onClick,
  ...props
}: InputFrameChipsProps) => (
  <div
    data-part="input-frame-chips"
    className={cn(inputFrameChipsClasses, className)}
    onClick={(event) => {
      onClick?.(event);
      if (
        event.defaultPrevented ||
        (event.target instanceof Element &&
          event.target.closest("button, input"))
      )
        return;
      event.currentTarget.querySelector("input")?.focus();
    }}
    {...props}
  />
);

export const InputFrameChip = ({
  onRemove,
  holdFocus = false,
  className,
  children,
  ...props
}: InputFrameChipProps) => {
  const t = useTranslate();
  const textId = useId();
  const removeId = useId();
  return (
    <span
      data-part="input-frame-chip"
      className={cn(inputFrameChipClasses, className)}
      {...props}
    >
      <span id={textId} className={inputFrameChipTextClasses}>
        {children}
      </span>
      {onRemove ? (
        <button
          type="button"
          id={removeId}
          data-part="input-frame-chip-remove"
          aria-label={t("Remove")}
          aria-labelledby={`${removeId} ${textId}`}
          tabIndex={holdFocus ? -1 : undefined}
          className={inputFrameChipRemoveClasses}
          onMouseDown={
            holdFocus ? (event) => event.preventDefault() : undefined
          }
          onClick={onRemove}
        >
          <Icon icon={Cancel01Icon} />
        </button>
      ) : null}
    </span>
  );
};

export const InputFrameChipsInput = ({
  className,
  ...props
}: InputFrameChipsInputProps) => {
  const frame = useFieldErrorContext();
  return (
    <InputField
      data-part="input-frame-control"
      appearance="transparent"
      className={cn(
        inputFrameInputClasses,
        inputFrameChipsInputClasses,
        className,
      )}
      {...props}
      aria-invalid={frame.invalid || props["aria-invalid"]}
      aria-describedby={describedBy(
        props["aria-describedby"],
        frame.describedBy,
      )}
    />
  );
};

export const InputFrameTextarea = ({
  className,
  ...props
}: InputFrameTextareaProps) => {
  const frame = useFieldErrorContext();
  return (
    <textarea
      data-part="input-frame-control"
      data-appearance="transparent"
      className={cn(
        textareaClasses({ appearance: "transparent" }),
        inputFrameTextareaClasses,
        className,
      )}
      {...props}
      aria-invalid={frame.invalid || props["aria-invalid"]}
      aria-describedby={describedBy(
        props["aria-describedby"],
        frame.describedBy,
      )}
    />
  );
};
