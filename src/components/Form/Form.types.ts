import type {
  Control,
  Field,
  Label,
  Message,
  Root,
  ValidityState,
} from "@radix-ui/react-form";
import type { ComponentProps } from "react";
import type { ButtonProps } from "../Button";

export type FormProps = ComponentProps<typeof Root>;

export type FormFieldProps = ComponentProps<typeof Field>;

export type FormLabelProps = ComponentProps<typeof Label>;

export type FormControlProps = Omit<ComponentProps<typeof Control>, "asChild">;

export type FormDescriptionProps = Omit<
  ComponentProps<typeof Message>,
  "match" | "forceMatch"
>;

export type FormMessageProps = ComponentProps<typeof Message>;

export type FormValidityStateProps = Omit<
  ComponentProps<typeof ValidityState>,
  "__scopeForm"
>;

export type FormSubmitProps = ButtonProps;
