import type {
  Close,
  Content,
  Description,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import type { Size } from "../../recipes/size";

export type DrawerSide = "top" | "right" | "bottom" | "left";

export type DrawerSize = Extract<Size, "sm" | "base" | "lg">;

export type DrawerLayout = "floating" | "docked";

export type DrawerProps = ComponentProps<typeof Root>;

export type DrawerTriggerProps = ComponentProps<typeof Trigger>;

export type DrawerCloseProps = ComponentProps<typeof Close>;

export interface DrawerContentProps extends ComponentProps<typeof Content> {
  side?: DrawerSide;
  size?: DrawerSize;
  layout?: DrawerLayout;
  showCloseButton?: boolean;
  scrollable?: boolean;
}

export interface DrawerHeaderProps extends ComponentProps<"div"> {
  bordered?: boolean;
}

export interface DrawerFooterProps extends ComponentProps<"div"> {
  bordered?: boolean;
}

export type DrawerTitleProps = ComponentProps<typeof Title>;

export type DrawerDescriptionProps = ComponentProps<typeof Description>;
