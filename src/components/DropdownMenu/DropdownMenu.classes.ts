import { cva } from "class-variance-authority";
import {
  menuCheck,
  menuCheckDash,
  menuCheckTick,
  menuDot,
  menuIndent,
  menuIndicator,
  menuLabel,
  menuPad,
  menuRow,
  menuRowDestructive,
  menuRowLit,
  menuRowOpen,
  menuScroll,
  menuSeparator,
  menuShortcut,
  menuStack,
  menuSubIcon,
  optionEmpty,
} from "../../recipes/menu";
import { menuPanel, panelExit } from "../../recipes/panel";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import type {
  DropdownMenuItemTone,
  DropdownMenuBorderRadius,
  DropdownMenuSize,
} from "./DropdownMenu.types";

const room = {
  "dropdown-menu":
    "[--panel-room:var(--radix-dropdown-menu-content-available-height)] [--panel-origin:var(--radix-dropdown-menu-content-transform-origin)]",
  "context-menu":
    "[--panel-room:var(--radix-context-menu-content-available-height)] [--panel-origin:var(--radix-context-menu-content-transform-origin)]",
};

const panelBorderRadius = {
  none: `${boxBorderRadiusVariants.none} [--inner-radius:0px]`,
  xs: `${boxBorderRadiusVariants.xs} [--inner-radius:var(--radius-xs)]`,
  sm: `${boxBorderRadiusVariants.sm} [--inner-radius:var(--radius-sm)]`,
  base: `${boxBorderRadiusVariants.base} [--inner-radius:var(--radius-md)]`,
  lg: `${boxBorderRadiusVariants.lg} [--inner-radius:var(--radius-md)]`,
  xl: `${boxBorderRadiusVariants.xl} [--inner-radius:var(--radius-md)]`,
} satisfies Record<DropdownMenuBorderRadius, string>;

const row = menuRow.replace("rounded-md", "rounded-(--inner-radius)");

const rowSize = {
  sm: "min-h-7 body-xs [&_svg:not([class*='size-'])]:size-3.5 data-inset:ps-6.5",
  base: "",
  lg: "min-h-10 px-3 body-base sm:body-sm [&_svg:not([class*='size-'])]:size-5 data-inset:ps-9",
} satisfies Record<DropdownMenuSize, string>;

const stack = {
  sm: "space-y-0.5",
  base: menuStack,
  lg: "space-y-1.5",
} satisfies Record<DropdownMenuSize, string>;

const edge = {
  sm: "p-0.5",
  base: "p-1",
  lg: "p-1.5",
} satisfies Record<DropdownMenuSize, string>;

const sized = (size: Record<DropdownMenuSize, string>, base = "") =>
  cva(base, {
    variants: {
      size,
    },
    defaultVariants: {
      size: "base",
    },
  });

export const dropdownMenuContentClasses = cva(
  `group/menu ${menuPanel} ${panelExit}`,
  {
    variants: {
      menu: room,
      borderRadius: panelBorderRadius,
    },
    defaultVariants: {
      menu: "dropdown-menu",
      borderRadius: "lg",
    },
  },
);

export const dropdownMenuListClasses = menuScroll;

export const dropdownMenuEmptyClasses = sized(
  {
    sm: "px-3 py-5 description-xs",
    base: "",
    lg: "px-5 py-7 description-base sm:description-sm",
  },
  optionEmpty,
);

export const dropdownMenuLoadingClasses = sized({
  sm: "h-7",
  base: "",
  lg: "h-10 px-3",
});

export const dropdownMenuListInnerClasses = sized({
  sm: "space-y-0.5 p-0.5",
  base: menuPad,
  lg: "space-y-1.5 p-1.5",
});

export const dropdownMenuGroupClasses = sized(stack);

export const dropdownMenuLabelClasses = sized(
  {
    sm: "py-1 caption-2xs data-inset:ps-6.5",
    base: "",
    lg: "px-3 py-2 caption-sm sm:caption-xs data-inset:ps-9",
  },
  `${menuLabel} ${menuIndent}`,
);

export const dropdownMenuItemClasses = cva(`${row} ${menuIndent}`, {
  variants: {
    size: rowSize,
    tone: {
      neutral: menuRowLit,
      destructive: menuRowDestructive,
    } satisfies Record<DropdownMenuItemTone, string>,
    withActions: {
      true: "pe-[calc(var(--menu-row-actions)*1.5rem+0.5rem)]",
      false: "",
    },
    described: {
      true: "py-2",
      false: "",
    },
  },
  compoundVariants: [
    {
      tone: "neutral",
      withActions: true,
      className:
        "group-hover/menu-row:bg-muted group-hover/menu-row:text-foreground",
    },
    {
      tone: "destructive",
      withActions: true,
      className: "group-hover/menu-row:bg-destructive/10",
    },
    { tone: "destructive", size: "lg", className: "sm:text-destructive" },
    { described: true, size: "sm", className: "py-1.5" },
    { described: true, size: "lg", className: "py-2.5" },
  ],
  defaultVariants: {
    size: "base",
    tone: "neutral",
    withActions: false,
    described: false,
  },
});

export const dropdownMenuItemTextClasses = sized(
  {
    sm: "gap-0.5",
    base: "gap-1",
    lg: "gap-1.5",
  },
  "flex min-w-0 flex-1 flex-col",
);

export const dropdownMenuItemLabelClasses = "flex min-w-0 items-center gap-1.5";

export const dropdownMenuItemDescriptionClasses = sized({
  sm: "description-2xs",
  base: "description-xs",
  lg: "description-sm sm:description-xs",
});

export const dropdownMenuRowClasses = "group/menu-row relative";

export const dropdownMenuItemActionsClasses =
  "absolute inset-y-0 end-1.5 flex items-center gap-1";

export const dropdownMenuCheckboxItemClasses = sized(
  rowSize,
  `${row} ${menuRowLit} ${menuIndent}`,
);

export const dropdownMenuRadioGroupClasses = sized(stack);

export const dropdownMenuRadioItemClasses = sized(
  rowSize,
  `${row} ${menuRowLit} ${menuIndent}`,
);

export const dropdownMenuItemIndicatorClasses = sized(
  {
    sm: "size-3.5",
    base: "",
    lg: "size-5",
  },
  menuIndicator,
);

export const dropdownMenuRadioItemDotClasses = sized(
  {
    sm: "size-1.5",
    base: "",
    lg: "size-2.5",
  },
  menuDot,
);

export const dropdownMenuSeparatorClasses = sized(
  {
    sm: "-mx-0.5 my-2",
    base: "",
    lg: "-mx-1.5 my-4",
  },
  menuSeparator,
);

export const dropdownMenuHeaderClasses = sized(
  edge,
  "shrink-0 border-b border-border",
);

export const dropdownMenuFooterClasses = sized(
  edge,
  "shrink-0 border-t border-border",
);

export const dropdownMenuShortcutClasses = sized(
  {
    sm: "ps-3 caption-2xs",
    base: "",
    lg: "ps-5 caption-sm sm:caption-xs",
  },
  menuShortcut,
);

export const dropdownMenuSubTriggerClasses = sized(
  rowSize,
  `${row} ${menuRowLit} ${menuIndent} ${menuRowOpen}`,
);

export const dropdownMenuSubTriggerIconClasses = menuSubIcon;

export const dropdownMenuSubContentClasses = cva(`${menuPanel} ${panelExit}`, {
  variants: {
    menu: room,
    borderRadius: panelBorderRadius,
  },
  defaultVariants: {
    menu: "dropdown-menu",
    borderRadius: "lg",
  },
});

export const dropdownMenuCheckClasses = menuCheck;

export const dropdownMenuCheckTickClasses = menuCheckTick;

export const dropdownMenuCheckDashClasses = menuCheckDash;
