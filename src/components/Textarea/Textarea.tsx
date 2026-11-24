"use client";

import { cn } from "../../cn";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import {
  InputFrame,
  InputFrameAddon,
  InputFrameTextarea,
} from "../Input/InputFrame";
import { textareaClasses, textareaFrameSizeClasses } from "./Textarea.classes";
import type { TextareaProps } from "./Textarea.types";

export const Textarea = ({
  className,
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  error,
  end,
  ...props
}: TextareaProps) => {
  const failed = useFieldError(
    end === undefined ? error : undefined,
    props["aria-describedby"],
  );
  if (end !== undefined)
    return (
      <InputFrame
        appearance={appearance}
        size={size}
        borderRadius={borderRadius}
        error={error}
        className={className}
      >
        <InputFrameTextarea
          className={textareaFrameSizeClasses({ size })}
          {...props}
        />
        {end !== null && end !== false ? (
          <InputFrameAddon align="inline-end">{end}</InputFrameAddon>
        ) : null}
      </InputFrame>
    );
  return (
    <>
      <textarea
        data-part="textarea"
        data-appearance={appearance}
        data-size={size}
        data-radius={borderRadius}
        className={cn(
          textareaClasses({ appearance, size, borderRadius }),
          className,
        )}
        {...props}
        aria-invalid={failed.shown || props["aria-invalid"]}
        aria-describedby={failed.describedBy}
      />
      <FieldErrorMessage id={failed.id} part="textarea-error">
        {error}
      </FieldErrorMessage>
    </>
  );
};
