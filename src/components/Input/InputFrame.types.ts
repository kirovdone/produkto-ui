import type { ComponentProps, MouseEvent, ReactNode } from "react";
import type { ButtonProps } from "../Button";
import type {
  InputAppearance,
  InputFieldProps,
  InputBorderRadius,
  InputSize,
} from "./Input.types";

export type InputFrameAddonAlign =
  "inline-start" | "inline-end" | "block-start" | "block-end";

export interface InputFrameProps extends ComponentProps<"div"> {
  appearance?: InputAppearance;
  size?: InputSize;
  borderRadius?: InputBorderRadius;
  error?: ReactNode;
}

export interface InputFrameAddonProps extends ComponentProps<"div"> {
  align?: InputFrameAddonAlign;
}

export type InputFrameInputProps = Omit<InputFieldProps, "error">;

export type InputFrameChipsProps = ComponentProps<"div">;

export interface InputFrameChipProps extends ComponentProps<"span"> {
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  holdFocus?: boolean;
}

export type InputFrameChipsInputProps = Omit<
  InputFieldProps,
  "clearable" | "error"
>;

export interface InputFrameClearProps extends Omit<
  ButtonProps,
  "onClick" | "children" | "size"
> {
  onClear: (event: MouseEvent<HTMLElement>) => void;
}

export type InputFrameTextareaProps = ComponentProps<"textarea">;
