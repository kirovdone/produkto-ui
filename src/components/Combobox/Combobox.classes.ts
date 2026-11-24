import { selectTriggerClasses } from "../Select";
import {
  glyphs,
  menuLabel,
  menuPad,
  menuRow,
  menuRowLit,
  menuStack,
  optionEmpty,
} from "../../recipes/menu";

export const comboboxInputClasses = "w-auto";

export const comboboxTriggerClasses = selectTriggerClasses;

export const comboboxContentClasses = `group/combobox-content min-w-(--radix-popover-trigger-width) gap-0 overflow-hidden p-0 *:data-[part=combobox-input]:m-1 *:data-[part=combobox-input]:mb-0 *:data-[part=combobox-input]:w-auto not-has-[[data-part=combobox-item]]:not-has-[[data-part=combobox-empty]]:not-has-[[data-part=combobox-input]]:hidden ${glyphs}`;

export const comboboxListClasses =
  "max-h-72 min-h-0 not-has-[[data-part=combobox-item]]:hidden [&>[data-part=scroll-area-viewport]]:scroll-py-2 [&>[data-part=scroll-area-viewport]]:overscroll-contain";

export const comboboxListInnerClasses = menuPad;

export const comboboxItemClasses = `${menuRow} w-full ${menuRowLit} data-selected:not-data-disabled:bg-muted data-selected:not-data-disabled:text-foreground`;

export const comboboxGroupClasses = `${menuStack} not-has-[[data-part=combobox-item]]:hidden`;

export const comboboxLabelClasses = menuLabel;

export const comboboxEmptyClasses = `${optionEmpty} group-has-[[data-part=combobox-item]]/combobox-content:hidden`;

export const comboboxSeparatorClasses =
  "pointer-events-none -mx-1 my-1 h-px bg-border";

export const comboboxTriggerIconClasses =
  "pointer-events-none text-muted-foreground";
