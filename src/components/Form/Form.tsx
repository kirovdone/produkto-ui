"use client";

import {
  Control,
  Field,
  Label,
  Message,
  Root,
  Submit,
  ValidityState,
} from "@radix-ui/react-form";
import { cn } from "../../cn";
import { Button } from "../Button";
import {
  formClasses,
  formDescriptionClasses,
  formFieldClasses,
  formLabelClasses,
  formMessageClasses,
} from "./Form.classes";
import type {
  FormControlProps,
  FormDescriptionProps,
  FormFieldProps,
  FormLabelProps,
  FormMessageProps,
  FormProps,
  FormSubmitProps,
  FormValidityStateProps,
} from "./Form.types";

export const Form = ({ className, ...props }: FormProps) => (
  <Root data-part="form" className={cn(formClasses, className)} {...props} />
);

export const FormField = ({ className, ...props }: FormFieldProps) => (
  <Field
    data-part="form-field"
    className={cn(formFieldClasses, className)}
    {...props}
  />
);

export const FormLabel = ({ className, ...props }: FormLabelProps) => (
  <Label
    data-part="form-label"
    className={cn(formLabelClasses, className)}
    {...props}
  />
);

export const FormControl = ({ name, ...props }: FormControlProps) => (
  <ValidityState name={name}>
    {(validity) => (
      <Control
        data-part="form-control"
        asChild
        name={name}
        {...(validity?.valid === false ? { "aria-invalid": true } : {})}
        {...props}
      />
    )}
  </ValidityState>
);

export const FormDescription = ({
  className,
  ...props
}: FormDescriptionProps) => (
  <Message
    data-part="form-description"
    className={cn(formDescriptionClasses, className)}
    {...props}
  />
);

export const FormMessage = ({ className, ...props }: FormMessageProps) => (
  <Message
    data-part="form-message"
    className={cn(formMessageClasses, className)}
    {...props}
  />
);

export const FormValidityState = (props: FormValidityStateProps) => (
  <ValidityState {...props} />
);

export const FormSubmit = (props: FormSubmitProps) => (
  <Submit asChild>
    <Button data-part="form-submit" {...props} />
  </Submit>
);
