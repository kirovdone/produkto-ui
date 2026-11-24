import { fieldError } from "../../recipes/field";
import { labelClasses } from "../Label";

export const formClasses = "flex flex-col items-start gap-4";

export const formFieldClasses = "flex w-full flex-col gap-2";

export const formLabelClasses = `${labelClasses()} data-invalid:text-destructive`;

export const formDescriptionClasses = "description-xs";

export const formMessageClasses = fieldError;
