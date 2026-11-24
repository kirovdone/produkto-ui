"use client";

import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";
import { cn } from "../../cn";
import { createContext, useContext } from "react";
import { usePortalContainer } from "../../context/portalContainer";
import { useThemeScope } from "../../context/themeScope";
import { tooltipArrowClasses, tooltipContentClasses } from "./Tooltip.classes";
import type {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
} from "./Tooltip.types";

const Provided = createContext(false);

export const TooltipProvider = ({
  delayDuration = 200,
  ...props
}: TooltipProviderProps) => (
  <Provided.Provider value>
    <Provider delayDuration={delayDuration} {...props} />
  </Provided.Provider>
);

export const InTooltip = createContext(false);

export const Tooltip = (props: TooltipProps) => {
  const tooltip = (
    <InTooltip value>
      <Root {...props} />
    </InTooltip>
  );
  return useContext(Provided) ? (
    tooltip
  ) : (
    <TooltipProvider>{tooltip}</TooltipProvider>
  );
};

export const TooltipTrigger = (props: TooltipTriggerProps) => (
  <Trigger data-part="tooltip-trigger" {...props} />
);

export const TooltipContent = ({
  className,
  sideOffset = 4,
  size = "base",
  borderRadius = "sm",
  children,
  ...props
}: TooltipContentProps) => {
  const container = usePortalContainer();
  const theme = useThemeScope();
  return (
    <Portal container={container ?? undefined} forceMount={props.forceMount}>
      <Content
        data-part="tooltip-content"
        data-theme={theme}
        data-size={size}
        data-radius={borderRadius}
        sideOffset={sideOffset}
        collisionBoundary={container ?? undefined}
        collisionPadding={container ? 8 : undefined}
        className={cn(tooltipContentClasses({ size, borderRadius }), className)}
        {...props}
      >
        {children}
        <Arrow asChild>
          <svg
            className={tooltipArrowClasses}
            height={5}
            viewBox="0 0 10 5"
            width={10}
          >
            <path d="M0 0 5 5 10 0" />
          </svg>
        </Arrow>
      </Content>
    </Portal>
  );
};
