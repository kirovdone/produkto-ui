import type {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import type { Content as TabsContent } from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import type { IconSvgElement } from "../Icon";
import type { ScrollAreaProps } from "../ScrollArea";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type DialogProps = ComponentProps<typeof Root>;

export type DialogTriggerProps = ComponentProps<typeof Trigger>;

export type DialogPortalProps = ComponentProps<typeof Portal>;

export type DialogCloseProps = ComponentProps<typeof Close>;

export type DialogOverlayProps = ComponentProps<typeof Overlay>;

export type DialogSize = Extract<Size, "sm" | "base" | "lg">;

export type DialogBorderRadius = BoxBorderRadius;

export interface DialogTab<T extends string = string> {
  value: T;
  label: string;
  icon?: IconSvgElement;
  disabled?: boolean;
  group?: string;
}

export interface DialogSidebar<T extends string = string> {
  label: string;
  tabs: readonly DialogTab<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
}

export interface DialogContentProps<
  T extends string = string,
> extends ComponentProps<typeof Content> {
  size?: DialogSize;
  borderRadius?: DialogBorderRadius;
  alert?: boolean;
  scrollable?: boolean;
  sidebar?: DialogSidebar<T>;
}

export interface DialogHeaderProps extends ComponentProps<"div"> {
  bordered?: boolean;
}

export type DialogBodyProps = ScrollAreaProps;

export interface DialogPanelProps extends ComponentProps<typeof TabsContent> {
  scrollable?: boolean;
}

export interface DialogFooterProps extends ComponentProps<"div"> {
  bordered?: boolean;
}

export type DialogTitleProps = ComponentProps<typeof Title>;

export type DialogDescriptionProps = ComponentProps<typeof Description>;
