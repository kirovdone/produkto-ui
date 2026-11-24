"use client";

import { Slot } from "@radix-ui/react-slot";
import { use } from "react";
import { cn } from "../../cn";
import { wordsIn } from "../../helpers/wordsIn";
import { HostLink, useUiHost } from "../../host";
import { Spinner } from "../Spinner";
import { InTooltip, Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import { buttonClasses, buttonFieldClasses } from "./Button.classes";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  href,
  target,
  rel,
  className,
  appearance = "solid",
  tone = "neutral",
  size = "base",
  wrap = false,
  block = false,
  muted = false,
  align = "center",
  borderRadius = "base",
  loading = false,
  type = "button",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const host = useUiHost();
  const square = !wordsIn(children);
  const off = disabled || loading;
  const linked = href !== undefined && href !== "" && !off;
  const inTooltip = use(InTooltip);
  const asField =
    appearance === "solid" && tone !== "accent" && host.solidLikeFields;
  const Comp = linked ? Slot : "button";
  const button = (
    <Comp
      data-part="button"
      data-appearance={appearance}
      data-tone={tone}
      data-size={size}
      data-square={square || undefined}
      data-wrap={wrap || undefined}
      data-block={block || undefined}
      data-radius={borderRadius}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={linked ? undefined : off}
      className={cn(
        buttonClasses({
          appearance: asField ? "outline" : appearance,
          tone,
          size,
          square,
          wrap,
          block,
          muted,
          align,
          borderRadius,
          loading,
        }),
        asField && buttonFieldClasses({ tone }),
        className,
      )}
      type={linked ? undefined : type}
      {...props}
    >
      {linked ? (
        <HostLink href={href} target={target} rel={rel}>
          {children}
        </HostLink>
      ) : (
        <>
          {loading ? <Spinner /> : null}
          {children}
        </>
      )}
    </Comp>
  );
  const label = props["aria-label"];
  if (!host.buttonTooltips || inTooltip || !label || !square) return button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};
