import type { Size } from "./size";

export type FieldSize = Extract<Size, "sm" | "base" | "lg">;

export const fieldFrame = "rounded-lg";

export const fieldMotion = "transition outline-none";

export const fieldStates =
  "hover:border-foreground/20 focus-visible:border-foreground/35";

export const fieldInvalid =
  "aria-invalid:border-destructive/60 aria-invalid:focus-visible:border-destructive";

export const fieldDisabled = "disabled:cursor-not-allowed disabled:opacity-50";

export const fieldError = "description-xs text-destructive";

export const fieldPlaceholder = "placeholder:text-muted-foreground/50";

export const fieldPlaceholderShown =
  "data-placeholder:text-muted-foreground/50";
