import type {
  Action,
  Close,
  Description,
  Provider,
  Root,
  Title,
  Viewport,
} from "@radix-ui/react-toast";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { ComponentProps, ReactNode } from "react";
import type { ButtonAppearance, ButtonSize, ButtonTone } from "../Button";

export type ToastSide = "top" | "bottom";

export type ToastAlign = "start" | "center" | "end";

export type ToastBorderRadius = BoxBorderRadius;

export type ToastType =
  "success" | "info" | "warning" | "destructive" | "loading";

export type ToastProviderProps = ComponentProps<typeof Provider>;

export interface ToastViewportProps extends ComponentProps<typeof Viewport> {
  side?: ToastSide;
  align?: ToastAlign;
}

export interface ToastProps extends ComponentProps<typeof Root> {
  borderRadius?: ToastBorderRadius;
}

export type ToastTitleProps = ComponentProps<typeof Title>;

export type ToastDescriptionProps = ComponentProps<typeof Description>;

export interface ToastActionProps extends ComponentProps<typeof Action> {
  appearance?: ButtonAppearance;
  tone?: ButtonTone;
  size?: ButtonSize;
}

export type ToastCloseProps = Omit<ComponentProps<typeof Close>, "children">;

export type ToastActionOptions = Omit<
  ToastActionProps,
  "altText" | "children"
> &
  ({ label: string; altText?: string } | { label: ReactNode; altText: string });

export interface ToastOptions {
  id?: string;
  description?: ReactNode;
  action?: ToastActionOptions;
  duration?: number;
  side?: ToastSide;
  align?: ToastAlign;
  borderRadius?: ToastBorderRadius;
}

export interface ToastPromiseOptions<Data> extends Omit<ToastOptions, "id"> {
  loading: ReactNode;
  success: ReactNode | ((data: Data) => ReactNode);
  destructive: ReactNode | ((reason: unknown) => ReactNode);
}

export interface ToasterProps {
  side?: ToastSide;
  align?: ToastAlign;
  duration?: number;
  className?: string;
}
