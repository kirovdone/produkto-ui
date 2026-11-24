"use client";

import { Loading03Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import { cn } from "../../cn";
import { useTranslate } from "../../host";
import { spinnerClasses } from "./Spinner.classes";
import type { SpinnerProps } from "./Spinner.types";

export const Spinner = ({
  className,
  "aria-label": label,
  ...props
}: SpinnerProps) => {
  const t = useTranslate();
  return (
    <Icon
      icon={Loading03Icon}
      data-part="spinner"
      role="status"
      aria-label={label ?? t("Loading")}
      className={cn(spinnerClasses, className)}
      {...props}
    />
  );
};
