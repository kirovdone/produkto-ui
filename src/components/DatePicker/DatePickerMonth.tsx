"use client";

import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "../../cn";
import { useEffect, useRef, useState } from "react";
import {
  DateLib,
  DayPicker,
  defaultDateLib,
  type ChevronProps,
  type DateLibOptions,
  type DateRange,
  type Labels,
  type Modifiers,
} from "react-day-picker";
import { useTranslate } from "../../host";
import { Button, buttonClasses } from "../Button";
import {
  datePickerMonthCaptionLabelClasses,
  datePickerMonthClasses,
  datePickerMonthDayButtonClasses,
  datePickerMonthDayClasses,
  datePickerMonthMonthCaptionClasses,
  datePickerMonthNavButtonClasses,
  datePickerMonthNavClasses,
  datePickerMonthPartClasses,
  datePickerMonthPreviewEndClasses,
  datePickerMonthPreviewStartClasses,
} from "./DatePickerMonth.classes";
import type {
  DatePickerDayProps,
  DatePickerPick,
  DatePickerMonthProps,
} from "./DatePickerMonth.types";
import { Icon } from "../Icon";

const CHEVRONS = {
  up: ArrowUp01Icon,
  down: ArrowDown01Icon,
  left: ArrowLeft01Icon,
  right: ArrowRight01Icon,
};

const MonthChevron = ({ orientation = "left", className }: ChevronProps) => (
  <Icon
    icon={CHEVRONS[orientation]}
    size={orientation === "down" ? 14 : 15}
    className={cn(orientation === "down" && "text-muted-foreground", className)}
  />
);

const shortMonth = (month: Date, dateLib: DateLib = defaultDateLib) =>
  dateLib.format(month, "LLL");

const labelsIn = (t: (key: string) => string): Partial<Labels> => {
  const labelDay = (
    date: Date,
    modifiers?: Modifiers,
    options?: DateLibOptions,
    dateLib?: DateLib,
  ) =>
    [
      modifiers?.today && t("Today"),
      (dateLib ?? new DateLib(options)).format(date, "PPPP"),
      modifiers?.selected && t("selected"),
    ]
      .filter(Boolean)
      .join(", ");
  return {
    labelNav: () => t("Navigation bar"),
    labelPrevious: () => t("Previous month"),
    labelNext: () => t("Next month"),
    labelMonthDropdown: () => t("Month"),
    labelYearDropdown: () => t("Year"),
    labelDayButton: labelDay,
    labelGridcell: labelDay,
    labelWeekNumber: (weekNumber) => `${t("Week")} ${weekNumber}`,
    labelWeekNumberHeader: () => t("Week number"),
  };
};

const dayOf = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const previewOf = (range: DateRange | undefined, hovered: Date | undefined) => {
  if (!range?.from || !hovered) return {};
  const from = dayOf(range.from);
  if (range.to && dayOf(range.to) !== from) return {};
  const over = dayOf(hovered);
  if (over === from) return {};
  const low = Math.min(from, over);
  const high = Math.max(from, over);
  return {
    preview_start: (date: Date) => dayOf(date) === low,
    preview_end: (date: Date) => dayOf(date) === high,
    preview_middle: (date: Date) => dayOf(date) > low && dayOf(date) < high,
  };
};

const pickOf = (modifiers: Modifiers): DatePickerPick | undefined => {
  if (modifiers.range_middle || modifiers.preview_middle) return "middle";
  if (modifiers.range_start) return "start";
  if (modifiers.range_end) return "end";
  return modifiers.selected ? "single" : undefined;
};

export const DatePickerDay = ({
  day,
  modifiers,
  className,
  ...props
}: DatePickerDayProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  const pick = pickOf(modifiers);
  const picked =
    (pick !== undefined && pick !== "middle") ||
    Boolean(modifiers.preview_start || modifiers.preview_end);
  return (
    <Button
      ref={ref}
      appearance={picked ? "soft" : "transparent"}
      size="sm"
      block
      borderRadius="sm"
      data-date={day.isoDate}
      data-pick={pick}
      aria-current={modifiers.today ? "date" : undefined}
      className={cn(
        datePickerMonthDayButtonClasses({
          tone: picked ? "picked" : modifiers.outside ? "outside" : "plain",
          today: modifiers.today,
        }),
        className,
      )}
      {...props}
    />
  );
};

export const DatePickerMonth = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  appearance = "transparent",
  formatters,
  labels,
  locale,
  components,
  modifiers,
  modifiersClassNames,
  onDayMouseEnter,
  onDayMouseLeave,
  ...props
}: DatePickerMonthProps) => {
  const [hovered, setHovered] = useState<Date | undefined>();
  const preview = previewOf(
    props.mode === "range" ? props.selected : undefined,
    hovered,
  );
  const t = useTranslate();
  const layout = captionLayout === "label" ? "label" : "dropdown";
  const navButton = cn(
    buttonClasses({ appearance, size: "xs", square: true }),
    datePickerMonthNavButtonClasses,
  );

  return (
    <DayPicker
      data-part="date-picker-month"
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(datePickerMonthClasses, className)}
      classNames={{
        ...datePickerMonthPartClasses,
        nav: datePickerMonthNavClasses({ layout }),
        button_previous: navButton,
        button_next: navButton,
        month_caption: datePickerMonthMonthCaptionClasses({ layout }),
        caption_label: datePickerMonthCaptionLabelClasses({ layout }),
        day: datePickerMonthDayClasses({
          weekNumber: Boolean(props.showWeekNumber),
        }),
        ...classNames,
      }}
      formatters={{ formatMonthDropdown: shortMonth, ...formatters }}
      locale={locale}
      labels={{ ...(locale?.labels ? undefined : labelsIn(t)), ...labels }}
      components={{
        Chevron: MonthChevron,
        DayButton: DatePickerDay,
        ...components,
      }}
      modifiers={{ ...preview, ...modifiers }}
      modifiersClassNames={{
        preview_start: datePickerMonthPreviewStartClasses,
        preview_end: datePickerMonthPreviewEndClasses,
        ...modifiersClassNames,
      }}
      onDayMouseEnter={(date, dayModifiers, event) => {
        setHovered(date);
        onDayMouseEnter?.(date, dayModifiers, event);
      }}
      onDayMouseLeave={(date, dayModifiers, event) => {
        setHovered(undefined);
        onDayMouseLeave?.(date, dayModifiers, event);
      }}
      {...props}
    />
  );
};
