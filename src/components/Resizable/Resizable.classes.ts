export const resizablePanelGroupClasses =
  "flex size-full data-[orientation=vertical]:flex-col";

export const resizableHandleClasses =
  "relative flex w-px shrink-0 items-center justify-center bg-border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/60 data-[separator=active]:bg-muted-foreground/60 data-[separator=hover]:bg-muted-foreground/40 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full [&[aria-orientation=horizontal]>div]:rotate-90";

export const resizableHandleGripClasses =
  "z-10 flex h-6 w-1 shrink-0 rounded-lg bg-inherit";
