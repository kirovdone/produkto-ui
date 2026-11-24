import { cva } from "class-variance-authority";
import type { ClassNames } from "react-day-picker";
import type {
  DatePickerCaptionLayout,
  DatePickerDayTone,
} from "./DatePickerMonth.types";
import { framePaint } from "../../recipes/appearance";
import { fieldFrame } from "../../recipes/field";

export const datePickerMonthClasses =
  "group/date-picker-month w-fit bg-background p-3 [--cell-size:--spacing(8)] in-data-[part=card-content]:bg-transparent in-data-[part=popover-content]:bg-transparent in-data-[part=date-picker-content]:bg-transparent in-data-[part=date-picker-content]:p-0";

export const datePickerMonthNavButtonClasses =
  "select-none aria-disabled:opacity-50";

export const datePickerMonthNavClasses = cva(
  "absolute inset-x-0 top-0 flex items-center justify-between",
  {
    variants: {
      layout: {
        label: "h-5",
        dropdown: "h-7",
      } satisfies Record<DatePickerCaptionLayout, string>,
    },
  },
);

export const datePickerMonthMonthCaptionClasses = cva(
  "flex items-center justify-center px-6",
  {
    variants: {
      layout: {
        label: "h-5",
        dropdown: "h-7",
      } satisfies Record<DatePickerCaptionLayout, string>,
    },
  },
);

export const datePickerMonthCaptionLabelClasses = cva("select-none body-sm", {
  variants: {
    layout: {
      label: "",
      dropdown: "flex items-center gap-1.5 ps-2 pe-1.5",
    } satisfies Record<DatePickerCaptionLayout, string>,
  },
});

export const datePickerMonthDayClasses = cva(
  "group/day relative flex-1 p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-e-md",
  {
    variants: {
      weekNumber: {
        true: "[&:nth-child(2)[data-selected=true]_button]:rounded-s-md",
        false: "[&:first-child[data-selected=true]_button]:rounded-s-md",
      },
    },
  },
);

export const datePickerMonthPartClasses = {
  months: "relative flex flex-wrap gap-4",
  month: "flex flex-auto flex-col gap-3",
  dropdowns: "flex items-center justify-center gap-1 body-sm",
  dropdown_root: `relative inline-flex h-7 items-center ${fieldFrame} ${framePaint.solid} transition hover:border-foreground/20 has-[select:focus-visible]:border-foreground/35`,
  dropdown: "absolute inset-0 cursor-pointer appearance-none bg-card opacity-0",
  month_grid: "w-full border-collapse",
  weekdays: "mb-1 flex",
  weekday: "flex h-6 flex-1 items-center justify-center caption-xs select-none",
  week: "mt-1 flex w-full",
  range_start: "rounded-s-md bg-muted",
  range_middle: "rounded-none",
  range_end: "rounded-e-md bg-muted",
  hidden: "invisible",
  week_number_header: "min-w-(--cell-size) select-none",
  week_number:
    "flex min-w-(--cell-size) items-center justify-center caption-xs select-none",
} satisfies Partial<ClassNames>;

export const datePickerMonthPreviewStartClasses = "rounded-s-md bg-muted";

export const datePickerMonthPreviewEndClasses = "rounded-e-md bg-muted";

export const datePickerMonthDayButtonClasses = cva(
  "aspect-square h-auto min-w-(--cell-size) flex-col gap-0.5 px-1 leading-none label-sm data-[pick=middle]:rounded-none data-[pick=middle]:bg-muted data-[pick=middle]:text-foreground [&>span]:caption-xs [&>span]:opacity-70 [&>span]:[--caption-color:currentColor]",
  {
    variants: {
      tone: {
        picked: "",
        outside: "text-muted-foreground/40",
        plain: "text-foreground",
      } satisfies Record<DatePickerDayTone, string>,
      today: {
        true: "font-semibold",
        false: "",
      },
    },
    defaultVariants: {
      tone: "plain",
      today: false,
    },
  },
);
