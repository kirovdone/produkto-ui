export const panelSurface =
  "rounded-xl border border-transparent bg-popover text-foreground shadow-sm";

export const panelSlides =
  "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

export const panelEnter = `${panelSlides} motion-safe:data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`;

export const panelExit =
  "motion-safe:data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

export const panelFrame = `z-50 flex flex-col overflow-hidden origin-(--panel-origin) ${panelSurface}`;

export const panelCapped = "max-h-[min(20rem,var(--panel-room))]";

export const panelWidth = "w-64";

export const menuPanel = `${panelFrame} ${panelCapped} ${panelWidth} ${panelEnter}`;
