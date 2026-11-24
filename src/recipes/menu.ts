import { GAP } from "../consts/tokens";

export const glyphs =
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([stroke-width='0'])_*]:[stroke-width:1.9]";

export const glyphRow = `${GAP.glyph} ${glyphs}`;

export const menuRow = `relative flex min-h-8 cursor-pointer items-center rounded-md px-2 body-sm outline-none select-none transition-colors data-disabled:pointer-events-none data-disabled:opacity-50 ${glyphRow}`;

export const menuRowLit =
  "data-highlighted:bg-muted data-highlighted:text-foreground";

export const menuRowDestructive =
  "text-destructive data-highlighted:bg-destructive/10 data-highlighted:text-destructive";

export const menuRowOpen =
  "data-[state=open]:bg-muted data-[state=open]:text-foreground";

export const menuIndent = "data-inset:ps-7";

export const menuStack = "space-y-1";

export const menuPad = "space-y-1 p-1";

export const menuScroll = "min-h-0 flex-1";

export const menuLabel = "px-2 py-1.5 caption-xs";

export const menuSeparator = "-mx-1 my-3 h-px bg-border";

export const menuShortcut =
  "ms-auto ps-4 caption-xs tracking-wider [unicode-bidi:plaintext]";

export const menuIndicator =
  "pointer-events-none flex size-4 shrink-0 items-center justify-center";

export const menuDot = "block size-2 rounded-full bg-current";

export const menuCheck = "group/indicator flex";

export const menuCheckTick =
  "group-data-[state=indeterminate]/indicator:hidden";

export const menuCheckDash =
  "hidden group-data-[state=indeterminate]/indicator:block";

export const menuSubIcon = "ms-auto text-muted-foreground";

export const optionEmpty =
  "flex items-center justify-center px-4 py-6 text-center description-sm";
