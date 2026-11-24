"use client";

import {
  Anchor,
  Content,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-popover";
import { cn } from "../../cn";
import { ScrollArea } from "../ScrollArea";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { usePortalContainer } from "../../context/portalContainer";
import { useThemeScope } from "../../context/themeScope";
import {
  SideAlignProvider,
  useMeasuredSide,
  useSide,
} from "../../context/sideAlign";
import {
  popoverBodyClasses,
  popoverBodyInnerClasses,
  popoverContentClasses,
  popoverDescriptionClasses,
  popoverHeaderClasses,
  popoverTitleClasses,
} from "./Popover.classes";
import type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverProps,
  PopoverSize,
  PopoverTitleProps,
  PopoverTriggerProps,
} from "./Popover.types";

type Named = "title" | "description";

const NameContent = createContext<
  ((part: Named, id: string | undefined) => void) | null
>(null);

const ContentSize = createContext<PopoverSize>("base");

const useNameContent = (part: Named, id: string) => {
  const name = useContext(NameContent);
  useEffect(() => {
    if (!name) return;
    name(part, id);
    return () => name(part, undefined);
  }, [name, part, id]);
};

export const Popover = (props: PopoverProps) => (
  <SideAlignProvider>
    <Root {...props} />
  </SideAlignProvider>
);

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const measured = useMeasuredSide(props);
  return <Trigger data-part="popover-trigger" {...props} {...measured} />;
};

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const measured = useMeasuredSide(props);
  return <Anchor data-part="popover-anchor" {...props} {...measured} />;
};

export const PopoverContent = ({
  className,
  align,
  sideOffset = 8,
  size = "base",
  borderRadius = "lg",
  scrollable = true,
  onScroll,
  children,
  ...props
}: PopoverContentProps) => {
  const container = usePortalContainer();
  const theme = useThemeScope();
  const side = useSide();
  const [names, setNames] = useState<Partial<Record<Named, string>>>({});
  const name = useCallback(
    (part: Named, id: string | undefined) =>
      setNames((known) =>
        known[part] === id ? known : { ...known, [part]: id },
      ),
    [],
  );
  return (
    <Portal container={container ?? undefined} forceMount={props.forceMount}>
      <Content
        data-part="popover-content"
        data-theme={theme}
        data-size={size}
        data-radius={borderRadius}
        align={align ?? side}
        sideOffset={sideOffset}
        collisionBoundary={container ?? undefined}
        collisionPadding={container ? 8 : undefined}
        aria-labelledby={names.title}
        aria-describedby={names.description}
        className={cn(
          popoverContentClasses({ size, borderRadius, scrollable }),
          className,
        )}
        {...props}
        onScroll={scrollable ? undefined : onScroll}
      >
        <NameContent.Provider value={name}>
          <ContentSize value={size}>
            {scrollable ? (
              <ScrollArea
                data-part="popover-body"
                className={popoverBodyClasses}
                onScroll={onScroll}
              >
                <div className={popoverBodyInnerClasses({ size })}>
                  {children}
                </div>
              </ScrollArea>
            ) : (
              children
            )}
          </ContentSize>
        </NameContent.Provider>
      </Content>
    </Portal>
  );
};

export const PopoverHeader = ({
  bordered = false,
  className,
  ...props
}: PopoverHeaderProps) => {
  const size = useContext(ContentSize);
  return (
    <div
      data-part="popover-header"
      data-bordered={bordered || undefined}
      className={cn(popoverHeaderClasses({ size, bordered }), className)}
      {...props}
    />
  );
};

export const PopoverTitle = ({
  className,
  id,
  ...props
}: PopoverTitleProps) => {
  const own = useId();
  const titleId = id ?? own;
  const size = useContext(ContentSize);
  useNameContent("title", titleId);
  return (
    <div
      data-part="popover-title"
      id={titleId}
      className={cn(popoverTitleClasses({ size }), className)}
      {...props}
    />
  );
};

export const PopoverDescription = ({
  className,
  id,
  ...props
}: PopoverDescriptionProps) => {
  const own = useId();
  const descriptionId = id ?? own;
  const size = useContext(ContentSize);
  useNameContent("description", descriptionId);
  return (
    <p
      data-part="popover-description"
      id={descriptionId}
      className={cn(popoverDescriptionClasses({ size }), className)}
      {...props}
    />
  );
};
