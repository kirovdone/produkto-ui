import type {
  Group,
  Panel,
  PanelImperativeHandle,
  Separator,
} from "react-resizable-panels";
import type { ComponentProps } from "react";

export type ResizablePanelGroupProps = ComponentProps<typeof Group>;

export type ResizablePanelProps = ComponentProps<typeof Panel>;

export type ResizablePanelHandle = PanelImperativeHandle;

export interface ResizableHandleProps extends ComponentProps<typeof Separator> {
  showHandle?: boolean;
}
