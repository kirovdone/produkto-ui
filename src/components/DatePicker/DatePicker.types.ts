import type { Locale } from "date-fns";
import type { ComponentProps, ReactNode } from "react";
import type { DateRange, PropsBase } from "react-day-picker";
import type { Appearance } from "../../recipes/appearance";
import type { ButtonProps } from "../Button";
import type { InputBorderRadius, InputSize } from "../Input";
import type { PopoverContent } from "../Popover";

export type DatePickerMode = "single" | "range";

export type DatePickerSelection = Date | DateRange;

interface DatePickerSharedProps {
  defaultMonth?: Date;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  locale?: Locale;
  disabled?: boolean;
  name?: string;
  form?: string;
  children?: ReactNode;
}

export interface DatePickerSingleProps extends DatePickerSharedProps {
  mode?: "single";
  value?: Date;
  defaultValue?: Date;
  resetTo?: Date;
  onValueChange?: (value: Date | undefined) => void;
}

export interface DatePickerRangeProps extends DatePickerSharedProps {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  resetTo?: DateRange;
  maxDays?: number;
  onValueChange?: (value: DateRange | undefined) => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

export type DatePickerTriggerProps = ButtonProps;

export type DatePickerFieldAppearance = Appearance;

export interface DatePickerFieldProps extends Omit<
  ComponentProps<"button">,
  "children"
> {
  appearance?: DatePickerFieldAppearance;
  size?: InputSize;
  borderRadius?: InputBorderRadius;
  clearable?: boolean;
  showIcon?: boolean;
  placeholder?: ReactNode;
  error?: ReactNode;
}

export interface DatePickerValueProps extends ComponentProps<"span"> {
  placeholder?: ReactNode;
  format?: string;
}

export interface DatePickerInputProps extends Omit<
  ComponentProps<"input">,
  "value" | "defaultValue" | "type" | "size"
> {
  format?: string;
  appearance?: DatePickerFieldAppearance;
  size?: InputSize;
  borderRadius?: InputBorderRadius;
  clearable?: boolean;
  error?: ReactNode;
}

export type DatePickerContentProps = ComponentProps<typeof PopoverContent>;

export type DatePickerCalendarAppearance = Appearance;

export interface DatePickerCalendarProps extends Omit<
  PropsBase,
  "mode" | "required" | "month" | "defaultMonth" | "onMonthChange" | "locale"
> {
  appearance?: DatePickerCalendarAppearance;
}

export interface DatePickerPresetProps extends Omit<ButtonProps, "value"> {
  value: DatePickerSelection;
}
