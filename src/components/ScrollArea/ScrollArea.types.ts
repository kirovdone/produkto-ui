import type { Root, Scrollbar } from "@radix-ui/react-scroll-area";
import type { ComponentProps, Ref } from "react";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export interface ScrollAreaProps extends ComponentProps<typeof Root> {
  orientation?: ScrollAreaOrientation;
  viewportRef?: Ref<HTMLDivElement>;
}

export type ScrollBarProps = ComponentProps<typeof Scrollbar>;

export type ScrollBarOrientation = NonNullable<ScrollBarProps["orientation"]>;
