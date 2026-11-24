import { cn } from "../../cn";
import {
  notFoundClasses,
  notFoundDescriptionClasses,
  notFoundTextClasses,
  notFoundTitleClasses,
} from "./NotFound.classes";
import type { NotFoundProps } from "./NotFound.types";

export const NotFound = ({
  className,
  appearance = "solid",
  size = "base",
  borderRadius = "lg",
  title,
  action,
  children,
  ...props
}: NotFoundProps) => (
  <div
    role="status"
    data-part="not-found"
    data-appearance={appearance}
    data-size={size}
    data-radius={borderRadius}
    className={cn(
      notFoundClasses({
        appearance,
        size,
        borderRadius,
        stacked: Boolean(action || title),
      }),
      className,
    )}
    {...props}
  >
    {title ? (
      <div data-part="not-found-text" className={notFoundTextClasses}>
        <p
          data-part="not-found-title"
          className={notFoundTitleClasses({ size })}
        >
          {title}
        </p>
        <div
          data-part="not-found-description"
          className={notFoundDescriptionClasses({ size })}
        >
          {children}
        </div>
      </div>
    ) : (
      children
    )}
    {action ? <div data-part="not-found-action">{action}</div> : null}
  </div>
);
