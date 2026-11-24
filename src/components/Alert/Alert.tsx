import { cn } from "../../cn";
import {
  alertActionClasses,
  alertClasses,
  alertTitleClasses,
} from "./Alert.classes";
import type {
  AlertActionProps,
  AlertProps,
  AlertTitleProps,
} from "./Alert.types";

export const Alert = ({
  className,
  tone = "info",
  size = "base",
  borderRadius = "lg",
  ...props
}: AlertProps) => (
  <div
    data-part="alert"
    data-tone={tone}
    data-size={size}
    data-radius={borderRadius}
    role="alert"
    className={cn(alertClasses({ tone, size, borderRadius }), className)}
    {...props}
  />
);

export const AlertTitle = ({ className, ...props }: AlertTitleProps) => (
  <div
    data-part="alert-title"
    className={cn(alertTitleClasses, className)}
    {...props}
  />
);

export const AlertAction = ({ className, ...props }: AlertActionProps) => (
  <div
    data-part="alert-action"
    className={cn(alertActionClasses, className)}
    {...props}
  />
);
