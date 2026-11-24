"use client";

import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { Root } from "@radix-ui/react-label";
import { Slottable } from "@radix-ui/react-slot";
import { cn } from "../../cn";
import { useTranslate } from "../../host";
import { Icon } from "../Icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import {
  labelClasses,
  labelInfoClasses,
  labelRequiredClasses,
  labelRowClasses,
} from "./Label.classes";
import type { LabelProps } from "./Label.types";

export const Label = ({
  size = "base",
  required,
  info,
  className,
  children,
  ...props
}: LabelProps) => {
  const t = useTranslate();
  const label = (
    <Root
      data-part="label"
      data-size={size}
      className={cn(labelClasses({ size }), className)}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {required && (
        <span
          aria-hidden
          data-part="label-required"
          className={labelRequiredClasses}
        >
          *
        </span>
      )}
    </Root>
  );
  if (!info) return label;
  return (
    <span data-part="label-row" className={labelRowClasses}>
      {label}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            data-part="label-info"
            aria-label={t("More information")}
            className={labelInfoClasses({ size })}
          >
            <Icon icon={InformationCircleIcon} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{info}</TooltipContent>
      </Tooltip>
    </span>
  );
};
