import { fieldPlaceholderShown } from "../../recipes/field";
import { inputFrameInputClasses } from "../Input/InputFrame.classes";

export const datePickerTriggerClasses =
  "data-[empty=true]:text-muted-foreground";

export const datePickerFieldControlClasses = `${inputFrameInputClasses} flex w-full min-w-0 cursor-pointer items-center px-3 text-start whitespace-nowrap outline-none select-none disabled:cursor-not-allowed ${fieldPlaceholderShown}`;

export const datePickerFieldIconClasses = "cursor-pointer";

export const datePickerValueClasses = "min-w-0 truncate";

export const datePickerCalendarButtonClasses = "size-6";

export const datePickerContentClasses = "w-auto gap-0 p-2";
