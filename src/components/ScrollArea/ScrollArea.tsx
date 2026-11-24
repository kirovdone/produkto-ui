"use client";

import {
  Corner,
  Root,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";
import { cn } from "../../cn";
import {
  scrollAreaClasses,
  scrollAreaThumbClasses,
  scrollAreaViewportClasses,
  scrollBarClasses,
} from "./ScrollArea.classes";
import type { ScrollAreaProps, ScrollBarProps } from "./ScrollArea.types";

export const ScrollArea = ({
  orientation = "vertical",
  viewportRef,
  onScroll,
  className,
  children,
  ...props
}: ScrollAreaProps) => (
  <Root
    data-part="scroll-area"
    data-orientation={orientation}
    className={cn(scrollAreaClasses, className)}
    {...props}
  >
    <Viewport
      ref={viewportRef}
      data-part="scroll-area-viewport"
      className={scrollAreaViewportClasses({ orientation })}
      onScroll={onScroll}
    >
      {children}
    </Viewport>
    {orientation === "horizontal" ? null : <ScrollBar />}
    {orientation === "vertical" ? null : <ScrollBar orientation="horizontal" />}
    <Corner data-part="scroll-area-corner" />
  </Root>
);

export const ScrollBar = ({
  orientation = "vertical",
  className,
  ...props
}: ScrollBarProps) => (
  <Scrollbar
    data-part="scroll-area-scrollbar"
    orientation={orientation}
    className={cn(scrollBarClasses({ orientation }), className)}
    {...props}
  >
    <Thumb data-part="scroll-area-thumb" className={scrollAreaThumbClasses} />
  </Scrollbar>
);
