"use client";

import { StarIcon } from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import { Item, Root } from "@radix-ui/react-radio-group";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { cn } from "../../cn";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import { useState } from "react";
import { clamp } from "../../helpers/clamp";
import { useTranslate } from "../../host";
import {
  ratingClasses,
  ratingItemClasses,
  ratingStarClasses,
  ratingStarFillClasses,
  ratingStarTrackClasses,
} from "./Rating.classes";
import type { RatingProps } from "./Rating.types";

const RatingStar = ({ fill }: { fill: number }) => (
  <span data-part="rating-star" className={ratingStarClasses}>
    <Icon icon={StarIcon} aria-hidden className={ratingStarTrackClasses} />
    <span
      className={ratingStarFillClasses}
      style={{ width: `${clamp(fill, 0, 1) * 100}%` }}
    >
      <Icon icon={StarIcon} aria-hidden />
    </span>
  </span>
);

export const Rating = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  max = 5,
  readOnly = false,
  size = "base",
  error,
  name,
  form,
  required,
  disabled,
  loop,
  orientation,
  asChild,
  onPointerLeave,
  className,
  ...props
}: RatingProps) => {
  const t = useTranslate();
  const failed = useFieldError(error, props["aria-describedby"]);
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? 0,
    onChange: onValueChange,
    caller: "Rating",
  });
  const [hovered, setHovered] = useState<number>();
  const stars = Array.from({ length: max }, (_, index) => index + 1);
  const shown = hovered ?? value;
  const label = (count: number) =>
    t("{{value}} out of {{max}}")
      .replace("{{value}}", String(count))
      .replace("{{max}}", String(max));

  const message = (
    <FieldErrorMessage id={failed.id} part="rating-error">
      {error}
    </FieldErrorMessage>
  );

  if (readOnly || (valueProp !== undefined && !onValueChange))
    return (
      <>
        <div
          role="img"
          aria-label={label(value)}
          data-part="rating"
          data-size={size}
          className={cn(ratingClasses({ size }), className)}
          onPointerLeave={onPointerLeave}
          {...props}
          data-invalid={failed.shown || undefined}
          aria-describedby={failed.describedBy}
        >
          {stars.map((star) => (
            <RatingStar fill={value - star + 1} key={star} />
          ))}
          {name ? (
            <input
              disabled={disabled}
              form={form}
              name={name}
              type="hidden"
              value={value}
            />
          ) : null}
        </div>
        {message}
      </>
    );

  return (
    <>
      <Root
        data-part="rating"
        data-size={size}
        asChild={asChild}
        disabled={disabled}
        form={form}
        loop={loop}
        name={name}
        orientation={orientation}
        required={required}
        value={value ? String(value) : null}
        onValueChange={(next) => setValue(Number(next))}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          setHovered(undefined);
        }}
        className={cn(ratingClasses({ size }), className)}
        {...props}
        aria-invalid={failed.shown || props["aria-invalid"]}
        aria-describedby={failed.describedBy}
      >
        {stars.map((star) => (
          <Item
            aria-label={label(star)}
            data-part="rating-item"
            className={ratingItemClasses}
            key={star}
            onPointerEnter={disabled ? undefined : () => setHovered(star)}
            value={String(star)}
          >
            <RatingStar fill={shown - star + 1} />
          </Item>
        ))}
      </Root>
      {message}
    </>
  );
};
