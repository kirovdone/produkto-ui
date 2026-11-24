"use client";

import { Calendar04Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { cn } from "../../cn";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import { format, isSameDay, isValid, parse, type Locale } from "date-fns";
import { DATE_PATTERN } from "../../helpers/formatDate";
import {
  createContext,
  useContext,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import type { DateRange } from "react-day-picker";
import { useTranslate } from "../../host";
import { Button } from "../Button";
import { DatePickerMonth } from "./DatePickerMonth";
import {
  InputFrame,
  InputFrameAddon,
  InputFrameClear,
  InputFrameInput,
} from "../Input/InputFrame";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../Popover";
import {
  datePickerCalendarButtonClasses,
  datePickerContentClasses,
  datePickerFieldControlClasses,
  datePickerFieldIconClasses,
  datePickerTriggerClasses,
  datePickerValueClasses,
} from "./DatePicker.classes";
import type {
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerFieldProps,
  DatePickerInputProps,
  DatePickerMode,
  DatePickerPresetProps,
  DatePickerProps,
  DatePickerTriggerProps,
  DatePickerSelection,
  DatePickerValueProps,
} from "./DatePicker.types";

interface DatePickerContextValue {
  mode: DatePickerMode;
  value: DatePickerSelection | undefined;
  setValue: (value: DatePickerSelection | undefined) => void;
  open: boolean;
  setOpen: (open: boolean, focusCalendar?: boolean) => void;
  focusCalendar: boolean;
  anchor: HTMLDivElement | null;
  setAnchor: (anchor: HTMLDivElement | null) => void;
  content: HTMLDivElement | null;
  setContent: (content: HTMLDivElement | null) => void;
  month: Date;
  setMonth: (month: Date) => void;
  locale?: Locale;
  disabled: boolean;
  resetTo?: DatePickerSelection;
  maxDays?: number;
}

const DatePickerContext = createContext<DatePickerContextValue | null>(null);

const useDatePicker = (part: string): DatePickerContextValue => {
  const context = useContext(DatePickerContext);
  if (!context) throw new Error(`${part} must be used within a DatePicker.`);
  return context;
};

const isRange = (value: DatePickerSelection | undefined): value is DateRange =>
  value !== undefined && !(value instanceof Date);

const firstDay = (value: DatePickerSelection | undefined) =>
  isRange(value) ? value.from : value;

const sameDay = (a: Date | undefined, b: Date | undefined) =>
  a && b ? isSameDay(a, b) : a === b;

const sameSelection = (
  a: DatePickerSelection | undefined,
  b: DatePickerSelection | undefined,
) =>
  isRange(a) && isRange(b)
    ? sameDay(a.from, b.from) && sameDay(a.to, b.to)
    : !isRange(a) && !isRange(b) && sameDay(a, b);

const formatDay = (date: Date | undefined, pattern: string, locale?: Locale) =>
  date && isValid(date) ? format(date, pattern, { locale }) : "";

const formatValue = (
  value: DatePickerSelection | undefined,
  mode: DatePickerMode,
  pattern: string | undefined,
  locale?: Locale,
) => {
  if (mode === "single")
    return formatDay(
      value instanceof Date ? value : undefined,
      pattern ?? DATE_PATTERN,
      locale,
    );
  const range = isRange(value) ? value : undefined;
  return [range?.from, range?.to]
    .map((day) => formatDay(day, pattern ?? DATE_PATTERN, locale))
    .filter(Boolean)
    .join(" - ");
};

const parseDay = (text: string, pattern: string, locale?: Locale) => {
  const typed = text.trim();
  if (!typed) return undefined;
  const exact = parse(typed, pattern, new Date(), { locale });
  if (isValid(exact)) return exact;
  const loose = /\d{4}/.test(typed) ? new Date(typed) : null;
  return loose && isValid(loose) ? loose : null;
};

const parseValue = (
  text: string,
  mode: DatePickerMode,
  pattern: string | undefined,
  locale?: Locale,
): DatePickerSelection | undefined | null => {
  if (mode === "single") return parseDay(text, pattern ?? DATE_PATTERN, locale);
  const [start = "", end = ""] = text.split(/\s+[-–]\s+/);
  const from = parseDay(start, pattern ?? DATE_PATTERN, locale);
  const to = parseDay(end, pattern ?? DATE_PATTERN, locale);
  if (from === null || to === null) return null;
  return from ? { from, to } : undefined;
};

const serialize = (value: DatePickerSelection | undefined) =>
  (isRange(value) ? [value.from, value.to] : [value])
    .map((day) => formatDay(day, "yyyy-MM-dd"))
    .filter(Boolean)
    .join("/");

export const DatePicker = (props: DatePickerProps) => {
  const {
    mode = "single",
    locale,
    disabled = false,
    name,
    form,
    children,
  } = props;
  const notify = (next: DatePickerSelection | undefined) => {
    if (props.mode === "range") {
      props.onValueChange?.(isRange(next) ? next : undefined);
    } else {
      props.onValueChange?.(next instanceof Date ? next : undefined);
    }
  };
  const controlled = "value" in props;
  const [own, setOwn] = useState<DatePickerSelection | undefined>(
    props.defaultValue,
  );
  const value = controlled ? props.value : own;
  const setValue = (next: DatePickerSelection | undefined) => {
    if (!controlled) setOwn(next);
    notify(next);
  };
  const [open, setOpen] = useControllableState({
    prop: props.open,
    defaultProp: props.defaultOpen ?? false,
    onChange: props.onOpenChange,
    caller: "DatePicker",
  });
  const [month, setMonth] = useState<Date>(
    () => firstDay(value) ?? props.defaultMonth ?? new Date(),
  );
  const [focusCalendar, setFocusCalendar] = useState(true);
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [content, setContent] = useState<HTMLDivElement | null>(null);

  const changeOpen = (next: boolean, focus = true) => {
    if (next && disabled) return;
    const day = next ? firstDay(value) : undefined;
    if (day) setMonth(day);
    if (next) setFocusCalendar(focus);
    setOpen(next);
  };

  return (
    <DatePickerContext.Provider
      value={{
        mode,
        value,
        setValue,
        open,
        setOpen: changeOpen,
        focusCalendar,
        anchor,
        setAnchor,
        content,
        setContent,
        month,
        setMonth,
        locale,
        disabled,
        resetTo: props.resetTo,
        ...(props.mode === "range" && props.maxDays
          ? { maxDays: props.maxDays }
          : {}),
      }}
    >
      <Popover onOpenChange={changeOpen} open={open}>
        {children}
      </Popover>
      {name ? (
        <input
          disabled={disabled}
          form={form}
          name={name}
          type="hidden"
          value={serialize(value)}
        />
      ) : null}
    </DatePickerContext.Provider>
  );
};

export const DatePickerValue = ({
  placeholder,
  format: pattern,
  className,
  ...props
}: DatePickerValueProps) => {
  const { value, mode, locale } = useDatePicker("DatePickerValue");
  const text = formatValue(value, mode, pattern, locale);
  return (
    <span
      data-part="date-picker-value"
      data-placeholder={text ? undefined : ""}
      className={cn(datePickerValueClasses, className)}
      {...props}
    >
      {text || placeholder}
    </span>
  );
};

DatePickerValue.writesWords = true;

export const DatePickerTrigger = ({
  appearance = "outline",
  disabled,
  className,
  children,
  ...props
}: DatePickerTriggerProps) => {
  const context = useDatePicker("DatePickerTrigger");
  return (
    <PopoverTrigger asChild>
      <Button
        data-part="date-picker-trigger"
        data-empty={!firstDay(context.value)}
        appearance={appearance}
        align="start"
        disabled={context.disabled || disabled}
        className={cn(datePickerTriggerClasses, className)}
        {...props}
      >
        {children ?? <DatePickerValue />}
      </Button>
    </PopoverTrigger>
  );
};

export const DatePickerField = ({
  appearance,
  size,
  borderRadius,
  clearable,
  showIcon = true,
  placeholder,
  disabled,
  className,
  onKeyDown,
  error,
  ...props
}: DatePickerFieldProps) => {
  const { setAnchor, ...context } = useDatePicker("DatePickerField");
  const failed = useFieldError(error, props["aria-describedby"]);
  const off = context.disabled || disabled;
  const resettable =
    clearable === true &&
    !off &&
    Boolean(firstDay(context.value)) &&
    !sameSelection(context.value, context.resetTo);

  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.key !== "ArrowDown") return;
    event.preventDefault();
    if (!context.open) return context.setOpen(true);
    const day = context.content?.querySelector(
      '[role="grid"] button[tabindex="0"]',
    );
    if (day instanceof HTMLElement) day.focus();
  };

  return (
    <>
      <PopoverAnchor asChild>
        <InputFrame
          ref={setAnchor}
          data-part="date-picker-field"
          appearance={appearance}
          size={size}
          borderRadius={borderRadius}
          className={className}
        >
          {showIcon ? (
            <InputFrameAddon
              className={datePickerFieldIconClasses}
              onClick={(event) => {
                event.preventDefault();
                if (!off) context.setOpen(!context.open);
              }}
            >
              <Icon icon={Calendar04Icon} />
            </InputFrameAddon>
          ) : null}
          <PopoverTrigger asChild>
            <button
              type="button"
              data-part="input-frame-control"
              data-placeholder={firstDay(context.value) ? undefined : ""}
              disabled={off}
              className={datePickerFieldControlClasses}
              onKeyDown={keyDown}
              {...props}
              data-invalid={failed.shown || undefined}
              aria-describedby={failed.describedBy}
            >
              <DatePickerValue placeholder={placeholder} />
            </button>
          </PopoverTrigger>
          {resettable ? (
            <InputFrameClear
              onClear={() => {
                context.setValue(context.resetTo);
                const control = context.anchor?.querySelector(
                  "[data-part=input-frame-control]",
                );
                if (control instanceof HTMLElement) control.focus();
              }}
            />
          ) : null}
        </InputFrame>
      </PopoverAnchor>
      <FieldErrorMessage id={failed.id} part="date-picker-error">
        {error}
      </FieldErrorMessage>
    </>
  );
};

export const DatePickerInput = ({
  format: pattern,
  appearance,
  size,
  borderRadius,
  disabled,
  clearable,
  error,
  className,
  onChange,
  onBlur,
  onClick,
  onKeyDown,
  ...props
}: DatePickerInputProps) => {
  const t = useTranslate();
  const { setAnchor, ...context } = useDatePicker("DatePickerInput");
  const shown = formatValue(
    context.value,
    context.mode,
    pattern,
    context.locale,
  );
  const [text, setText] = useState(shown);
  const [synced, setSynced] = useState(shown);
  if (shown !== synced) {
    setSynced(shown);
    setText(shown);
  }
  const off = context.disabled || disabled;
  const resettable =
    clearable === true &&
    !off &&
    Boolean(firstDay(context.value)) &&
    !sameSelection(context.value, context.resetTo);

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    const typed = event.target.value;
    setText(typed);
    const next = parseValue(typed, context.mode, pattern, context.locale);
    if (next === null) return;
    setSynced(formatValue(next, context.mode, pattern, context.locale));
    context.setValue(next);
    const day = firstDay(next);
    if (day) context.setMonth(day);
  };

  const blur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    if (parseValue(text, context.mode, pattern, context.locale) !== null)
      setText(shown);
  };

  const click = (event: MouseEvent<HTMLInputElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || context.open) return;
    context.setOpen(true, false);
  };

  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.key !== "ArrowDown") return;
    event.preventDefault();
    if (!context.open) return context.setOpen(true);
    const day = context.content?.querySelector(
      '[role="grid"] button[tabindex="0"]',
    );
    if (day instanceof HTMLElement) day.focus();
  };

  return (
    <PopoverAnchor asChild>
      <InputFrame
        ref={setAnchor}
        data-part="date-picker-input"
        appearance={appearance}
        size={size}
        borderRadius={borderRadius}
        error={error}
        className={className}
      >
        <InputFrameAddon>
          <PopoverTrigger asChild>
            <Button
              aria-label={t("Select date")}
              appearance="transparent"
              disabled={off}
              size="xs"
              className={datePickerCalendarButtonClasses}
            >
              <Icon icon={Calendar04Icon} />
            </Button>
          </PopoverTrigger>
        </InputFrameAddon>
        <InputFrameInput
          disabled={off}
          onBlur={blur}
          onChange={change}
          onClick={click}
          onKeyDown={keyDown}
          value={text}
          {...props}
        />
        {resettable ? (
          <InputFrameClear
            onClear={() => {
              context.setValue(context.resetTo);
              setText(
                formatValue(
                  context.resetTo,
                  context.mode,
                  pattern,
                  context.locale,
                ),
              );
              const control = context.anchor?.querySelector(
                "[data-part=input-frame-control]",
              );
              if (control instanceof HTMLElement) control.focus();
            }}
          />
        ) : null}
      </InputFrame>
    </PopoverAnchor>
  );
};

export const DatePickerContent = ({
  align,
  className,
  onInteractOutside,
  onOpenAutoFocus,
  ...props
}: DatePickerContentProps) => {
  const { anchor, setContent, focusCalendar } =
    useDatePicker("DatePickerContent");
  return (
    <PopoverContent
      ref={setContent}
      data-part="date-picker-content"
      align={align ?? "start"}
      scrollable={false}
      className={cn(datePickerContentClasses, className)}
      onInteractOutside={(event) => {
        onInteractOutside?.(event);
        if (event.target instanceof Node && anchor?.contains(event.target))
          event.preventDefault();
      }}
      onOpenAutoFocus={(event) => {
        onOpenAutoFocus?.(event);
        if (!focusCalendar) event.preventDefault();
      }}
      {...props}
    />
  );
};

const shiftDay = (day: Date, by: number) =>
  new Date(day.getFullYear(), day.getMonth(), day.getDate() + by);

export const DatePickerCalendar = (props: DatePickerCalendarProps) => {
  const context = useDatePicker("DatePickerCalendar");
  const [start, setStart] = useState<Date>();
  const shared = {
    autoFocus: context.focusCalendar,
    locale: context.locale,
    month: context.month,
    onMonthChange: context.setMonth,
    ...props,
  };
  const reach = start && context.maxDays ? context.maxDays - 1 : null;
  const own =
    props.disabled === undefined
      ? []
      : Array.isArray(props.disabled)
        ? props.disabled
        : [props.disabled];
  if (context.mode === "range")
    return (
      <DatePickerMonth
        {...shared}
        mode="range"
        disabled={
          start && reach !== null
            ? [
                ...own,
                { before: shiftDay(start, -reach) },
                { after: shiftDay(start, reach) },
              ]
            : props.disabled
        }
        onSelect={(_, day) => {
          if (!start) {
            setStart(day);
            return context.setValue({ from: day, to: undefined });
          }
          setStart(undefined);
          context.setValue(
            day < start ? { from: day, to: start } : { from: start, to: day },
          );
          context.setOpen(false);
        }}
        selected={isRange(context.value) ? context.value : undefined}
      />
    );
  return (
    <DatePickerMonth
      {...shared}
      mode="single"
      onSelect={(next) => {
        context.setValue(next);
        if (next) context.setOpen(false);
      }}
      selected={context.value instanceof Date ? context.value : undefined}
    />
  );
};

export const DatePickerPreset = ({
  value,
  appearance = "outline",
  size = "sm",
  disabled,
  onClick,
  ...props
}: DatePickerPresetProps) => {
  const context = useDatePicker("DatePickerPreset");
  return (
    <Button
      data-part="date-picker-preset"
      appearance={appearance}
      size={size}
      disabled={context.disabled || disabled}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        context.setValue(value);
        const day = firstDay(value);
        if (day) context.setMonth(day);
        context.setOpen(false);
      }}
      {...props}
    />
  );
};
