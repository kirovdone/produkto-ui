"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import {
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from "@radix-ui/react-accordion";
import { createContext, useContext } from "react";
import { cn } from "../../cn";
import {
  accordionClasses,
  accordionContentBodyClasses,
  accordionContentClasses,
  accordionItemClasses,
  accordionTriggerClasses,
  accordionTriggerIconClasses,
  accordionUnstyledContentClasses,
  accordionUnstyledTriggerClasses,
} from "./Accordion.classes";
import type {
  AccordionAppearance,
  AccordionSize,
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionBorderRadius,
  AccordionTriggerProps,
} from "./Accordion.types";

const AccordionPaint = createContext<{
  appearance: AccordionAppearance;
  size: AccordionSize;
  borderRadius: AccordionBorderRadius;
  unstyled: boolean;
}>({
  appearance: "solid",
  size: "base",
  borderRadius: "base",
  unstyled: false,
});

export const Accordion = ({
  className,
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  unstyled = false,
  ...props
}: AccordionProps) => (
  <AccordionPaint.Provider value={{ appearance, size, borderRadius, unstyled }}>
    <Root
      data-part="accordion"
      data-appearance={unstyled ? undefined : appearance}
      data-size={unstyled ? undefined : size}
      data-radius={unstyled ? undefined : borderRadius}
      data-unstyled={unstyled ? "" : undefined}
      className={cn(!unstyled && accordionClasses({ appearance }), className)}
      {...props}
    />
  </AccordionPaint.Provider>
);

export const AccordionItem = ({ className, ...props }: AccordionItemProps) => {
  const { appearance, borderRadius, unstyled } = useContext(AccordionPaint);
  return (
    <Item
      data-part="accordion-item"
      className={cn(
        !unstyled &&
          accordionItemClasses({
            appearance,
            borderRadius: appearance === "transparent" ? null : borderRadius,
          }),
        className,
      )}
      {...props}
    />
  );
};

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => {
  const { appearance, size, unstyled } = useContext(AccordionPaint);
  return (
    <Header className="flex">
      <Trigger
        data-part="accordion-trigger"
        className={cn(
          unstyled
            ? accordionUnstyledTriggerClasses
            : accordionTriggerClasses({ appearance, size }),
          className,
        )}
        {...props}
      >
        {children}
        <Icon
          icon={ArrowRight01Icon}
          data-part="accordion-trigger-icon"
          className={accordionTriggerIconClasses}
        />
      </Trigger>
    </Header>
  );
};

export const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionContentProps) => {
  const { appearance, size, unstyled } = useContext(AccordionPaint);
  return (
    <Content
      data-part="accordion-content"
      className={
        unstyled ? accordionUnstyledContentClasses : accordionContentClasses
      }
      {...props}
    >
      <div
        data-part="accordion-body"
        className={cn(
          !unstyled && accordionContentBodyClasses({ appearance, size }),
          className,
        )}
      >
        {children}
      </div>
    </Content>
  );
};
