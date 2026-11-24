"use client";

import {
  Cancel01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import {
  Icon as PasswordIcon,
  Input as PasswordInput,
  Root as PasswordRoot,
  Slot as PasswordSlot,
  Toggle as PasswordToggle,
} from "@radix-ui/react-password-toggle-field";
import { useId } from "react";
import { cn } from "../../cn";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import { useTranslate } from "../../host";
import {
  clearButtonSize,
  clearInput,
  useClearableText,
} from "../../hooks/useClearableText";
import { Button, buttonClasses } from "../Button";
import { Icon } from "../Icon";
import {
  inputClasses,
  inputClearClasses,
  inputClearedRoomClasses,
  inputRevealClasses,
  inputRootClasses,
} from "./Input.classes";
import type { InputFieldProps } from "./Input.types";

export const InputField = ({
  className,
  type,
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  clearable,
  error,
  onChange,
  ...props
}: InputFieldProps) => {
  const t = useTranslate();
  const revealId = useId();
  const failed = useFieldError(error, props["aria-describedby"]);
  const field = useClearableText({
    clearable,
    type,
    value: props.value,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    readOnly: props.readOnly,
    onChange,
  });
  const password = type === "password";
  const input = (
    <input
      {...(password ? {} : { type })}
      data-part="input"
      data-appearance={appearance}
      data-size={size}
      data-radius={borderRadius}
      className={cn(
        inputClasses({ appearance, size, borderRadius }),
        (field.shown || password) && inputClearedRoomClasses({ size }),
        className,
      )}
      {...props}
      aria-invalid={failed.shown || props["aria-invalid"]}
      aria-describedby={failed.describedBy}
      onChange={field.onChange}
    />
  );
  const message = (
    <FieldErrorMessage id={failed.id} part="input-error">
      {error}
    </FieldErrorMessage>
  );
  if (password)
    return (
      <>
        <PasswordRoot>
          <span data-part="input-root" className={inputRootClasses}>
            <PasswordInput asChild>{input}</PasswordInput>
            <PasswordSlot
              render={({ visible }) => (
                <PasswordToggle
                  data-part="input-reveal"
                  {...(props.id ? { "aria-controls": props.id } : {})}
                  aria-label={visible ? t("Hide password") : t("Show password")}
                  id={revealId}
                  disabled={props.disabled}
                  className={cn(
                    buttonClasses({
                      appearance: "transparent",
                      size: clearButtonSize(size),
                      square: true,
                    }),
                    inputClearClasses({ size }),
                    inputRevealClasses,
                  )}
                >
                  <PasswordIcon
                    visible={<Icon icon={ViewIcon} />}
                    hidden={<Icon icon={ViewOffIcon} />}
                  />
                </PasswordToggle>
              )}
            />
          </span>
        </PasswordRoot>
        {message}
      </>
    );
  if (!field.on)
    return (
      <>
        {input}
        {message}
      </>
    );
  return (
    <>
      <span data-part="input-root" className={inputRootClasses}>
        {input}
        {field.shown ? (
          <Button
            data-part="input-clear"
            aria-label={t("Clear")}
            appearance="transparent"
            tone="destructive"
            size={clearButtonSize(size)}
            className={inputClearClasses({ size })}
            onClick={(event) =>
              clearInput(
                event.currentTarget.parentElement?.querySelector("input"),
              )
            }
          >
            <Icon icon={Cancel01Icon} />
          </Button>
        ) : null}
      </span>
      {message}
    </>
  );
};
