"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Content, Root, Trigger } from "@radix-ui/react-collapsible";
import { createContext, useContext } from "react";
import { cn } from "../../cn";
import { buttonClasses } from "../Button/Button.classes";
import { Icon } from "../Icon";
import {
  collapsibleBodyClasses,
  collapsibleClasses,
  collapsibleContentClasses,
  collapsibleTriggerClasses,
  collapsibleTriggerIconClasses,
} from "./Collapsible.classes";
import type {
  CollapsibleAppearance,
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleBorderRadius,
  CollapsibleSize,
  CollapsibleTriggerProps,
} from "./Collapsible.types";

const CollapsiblePaint = createContext<{
  appearance: CollapsibleAppearance;
  size: CollapsibleSize;
  borderRadius: CollapsibleBorderRadius;
}>({ appearance: "solid", size: "base", borderRadius: "base" });

export const Collapsible = ({
  className,
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  ...props
}: CollapsibleProps) => (
  <CollapsiblePaint.Provider value={{ appearance, size, borderRadius }}>
    <Root
      data-part="collapsible"
      data-appearance={appearance}
      data-size={size}
      data-radius={borderRadius}
      className={cn(
        collapsibleClasses({
          appearance,
          borderRadius: appearance === "transparent" ? null : borderRadius,
        }),
        className,
      )}
      {...props}
    />
  </CollapsiblePaint.Provider>
);

export const CollapsibleTrigger = ({
  asChild,
  className,
  children,
  ...props
}: CollapsibleTriggerProps) => {
  const { appearance, size, borderRadius } = useContext(CollapsiblePaint);
  if (asChild)
    return (
      <Trigger
        data-part="collapsible-trigger"
        asChild
        className={className}
        {...props}
      >
        {children}
      </Trigger>
    );
  return (
    <Trigger
      data-part="collapsible-trigger"
      className={cn(
        buttonClasses({
          appearance: "transparent",
          size,
          block: true,
          align: "start",
          borderRadius,
        }),
        collapsibleTriggerClasses({ appearance }),
        className,
      )}
      {...props}
    >
      {children}
      <Icon
        icon={ArrowRight01Icon}
        data-part="collapsible-trigger-icon"
        className={collapsibleTriggerIconClasses}
      />
    </Trigger>
  );
};

export const CollapsibleContent = ({
  className,
  children,
  ...props
}: CollapsibleContentProps) => {
  const { appearance, size } = useContext(CollapsiblePaint);
  return (
    <Content
      data-part="collapsible-content"
      className={collapsibleContentClasses}
      {...props}
    >
      <div
        data-part="collapsible-body"
        className={cn(collapsibleBodyClasses({ appearance, size }), className)}
      >
        {children}
      </div>
    </Content>
  );
};
