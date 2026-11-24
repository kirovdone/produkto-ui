"use client";

import { cn } from "../../cn";
import { Group, Panel, Separator } from "react-resizable-panels";
import {
  resizableHandleClasses,
  resizableHandleGripClasses,
  resizablePanelGroupClasses,
} from "./Resizable.classes";
import type {
  ResizableHandleProps,
  ResizablePanelGroupProps,
  ResizablePanelProps,
} from "./Resizable.types";

export const ResizablePanelGroup = ({
  orientation = "horizontal",
  className,
  ...props
}: ResizablePanelGroupProps) => {
  return (
    <Group
      data-part="resizable-panel-group"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(resizablePanelGroupClasses, className)}
      {...props}
    />
  );
};

export const ResizablePanel = (props: ResizablePanelProps) => (
  <Panel data-part="resizable-panel" {...props} />
);

export const ResizableHandle = ({
  showHandle = false,
  className,
  children,
  ...props
}: ResizableHandleProps) => (
  <Separator
    data-part="resizable-handle"
    className={cn(resizableHandleClasses, className)}
    {...props}
  >
    {showHandle && (
      <div
        data-part="resizable-handle-grip"
        className={resizableHandleGripClasses}
      />
    )}
    {children}
  </Separator>
);
