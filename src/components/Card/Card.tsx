import { cn } from "../../cn";
import {
  cardActionClasses,
  cardClasses,
  cardDescriptionClasses,
  cardTextTruncateClasses,
  cardFooterClasses,
  cardHeaderClasses,
  cardMediaClasses,
  cardTitleClasses,
  cardBodyTitleClasses,
  cardDescriptionTitleClasses,
  cardLabelTitleClasses,
} from "./Card.classes";
import type {
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardMediaProps,
  CardProps,
  CardTitleProps,
} from "./Card.types";

export const Card = ({
  className,
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  overflow = "hidden",
  disabled = false,
  ...props
}: CardProps) => (
  <div
    data-part="card"
    data-appearance={appearance}
    data-size={size}
    data-radius={borderRadius}
    data-overflow={overflow}
    data-disabled={disabled || undefined}
    inert={disabled || undefined}
    className={cn(
      cardClasses({ appearance, size, borderRadius, overflow, disabled }),
      className,
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    data-part="card-header"
    className={cn(cardHeaderClasses, className)}
    {...props}
  />
);

export const CardTitle = ({
  className,
  truncate,
  text = "heading",
  children,
  ...props
}: CardTitleProps) => (
  <div
    data-part="card-title"
    className={cn(
      text === "label"
        ? cardLabelTitleClasses
        : text === "body"
          ? cardBodyTitleClasses
          : text === "description"
            ? cardDescriptionTitleClasses
            : cardTitleClasses,
      className,
    )}
    {...props}
  >
    {truncate ? (
      <span className={cardTextTruncateClasses}>{children}</span>
    ) : (
      children
    )}
  </div>
);

export const CardDescription = ({
  className,
  truncate,
  ...props
}: CardDescriptionProps) => (
  <div
    data-part="card-description"
    className={cn(
      cardDescriptionClasses,
      truncate && cardTextTruncateClasses,
      className,
    )}
    {...props}
  />
);

export const CardAction = ({ className, ...props }: CardActionProps) => (
  <div
    data-part="card-action"
    className={cn(cardActionClasses, className)}
    {...props}
  />
);

export const CardMedia = ({ className, ...props }: CardMediaProps) => (
  <div
    data-part="card-media"
    className={cn(cardMediaClasses, className)}
    {...props}
  />
);

export const CardContent = (props: CardContentProps) => (
  <div data-part="card-content" {...props} />
);

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    data-part="card-footer"
    className={cn(cardFooterClasses, className)}
    {...props}
  />
);
