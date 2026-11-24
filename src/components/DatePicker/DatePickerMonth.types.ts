import type { ComponentProps } from "react";
import type { DayButtonProps, DayPicker } from "react-day-picker";
import type { Appearance } from "../../recipes/appearance";

export type { DateRange } from "react-day-picker";

export type DatePickerMonthAppearance = Appearance;

export type DatePickerMonthProps = ComponentProps<typeof DayPicker> & {
  appearance?: DatePickerMonthAppearance;
};

export type DatePickerDayProps = DayButtonProps;

export type DatePickerCaptionLayout = "label" | "dropdown";

export type DatePickerDayTone = "picked" | "outside" | "plain";

export type DatePickerPick = "single" | "start" | "end" | "middle";
