import { panelExit } from "./panel";

export const scrim =
  "fixed inset-0 isolate z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs motion-safe:data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-safe:data-[state=closed]:animate-out data-[state=closed]:fade-out-0";

export const modalFrame =
  "fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] flex-col overflow-hidden rounded-xl border border-transparent bg-popover body-sm text-foreground shadow-sm outline-none";

export const modalEnter = `motion-safe:data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 ${panelExit}`;

export const modalBody = "min-h-0 flex-1";

export const modalActions =
  "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end";

export const modalTitle = "heading-base";

export const modalDescription =
  "description-sm *:[a]:underline *:[a]:underline-offset-3 *:[a]:transition-colors *:[a]:hover:text-foreground";
