"use client";

import { createContext, use, useId, type ReactNode } from "react";
import { cn } from "../cn";
import { fieldError } from "../recipes/field";

interface FieldErrorState {
  invalid?: boolean;
  describedBy?: string;
}

const FieldErrorContext = createContext<FieldErrorState>({});

export const FieldErrorProvider = FieldErrorContext.Provider;

export const useFieldErrorContext = () => use(FieldErrorContext);

export const describedBy = (...ids: (string | undefined)[]) =>
  ids.filter(Boolean).join(" ") || undefined;

export const useFieldError = (error: ReactNode, own?: string) => {
  const id = useId();
  const shown = Boolean(error);
  return { id, shown, describedBy: describedBy(own, shown ? id : undefined) };
};

export const FieldErrorMessage = ({
  id,
  part,
  className,
  children,
}: {
  id: string;
  part: string;
  className?: string;
  children: ReactNode;
}) =>
  children ? (
    <div
      id={id}
      role="alert"
      data-part={part}
      className={cn(fieldError, className)}
    >
      {children}
    </div>
  ) : null;
