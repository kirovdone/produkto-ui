"use client";

import {
  ArrowRight01Icon,
  MinusSignIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import type {
  CheckboxItem,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Separator,
  SubContent,
  SubTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  createContext,
  useContext,
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "../../cn";
import { usePortalContainer } from "../../context/portalContainer";
import { useThemeScope } from "../../context/themeScope";
import { cssVariables } from "../../helpers/cssVariables";
import { Icon } from "../Icon";
import { ScrollArea } from "../ScrollArea";
import {
  dropdownMenuCheckClasses,
  dropdownMenuCheckDashClasses,
  dropdownMenuCheckTickClasses,
  dropdownMenuCheckboxItemClasses,
  dropdownMenuGroupClasses,
  dropdownMenuItemActionsClasses,
  dropdownMenuItemClasses,
  dropdownMenuItemDescriptionClasses,
  dropdownMenuItemIndicatorClasses,
  dropdownMenuItemLabelClasses,
  dropdownMenuItemTextClasses,
  dropdownMenuLabelClasses,
  dropdownMenuListClasses,
  dropdownMenuListInnerClasses,
  dropdownMenuRadioGroupClasses,
  dropdownMenuRadioItemClasses,
  dropdownMenuRadioItemDotClasses,
  dropdownMenuRowClasses,
  dropdownMenuSeparatorClasses,
  dropdownMenuShortcutClasses,
  dropdownMenuSubContentClasses,
  dropdownMenuSubTriggerClasses,
  dropdownMenuSubTriggerIconClasses,
} from "./DropdownMenu.classes";
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPortalProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSize,
  DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps,
} from "./DropdownMenu.types";

export interface MenuPrimitives {
  name: "dropdown-menu" | "context-menu";
  CheckboxItem: typeof CheckboxItem;
  Group: typeof Group;
  Item: typeof Item;
  ItemIndicator: typeof ItemIndicator;
  Label: typeof Label;
  Portal: typeof Portal;
  RadioGroup: typeof RadioGroup;
  RadioItem: typeof RadioItem;
  Separator: typeof Separator;
  SubContent: typeof SubContent;
  SubTrigger: typeof SubTrigger;
}

interface OfMenu {
  menu: MenuPrimitives;
}

export const MenuSize = createContext<DropdownMenuSize>("base");

export const CloseMenu = createContext<(() => void) | null>(null);

export const MenuList = ({
  menu,
  size,
  busy,
  onScroll,
  children,
}: OfMenu & {
  size: DropdownMenuSize;
  busy?: boolean;
  onScroll?: ComponentProps<typeof ScrollArea>["onScroll"];
  children: ReactNode;
}) => (
  <ScrollArea
    data-part={`${menu.name}-list`}
    aria-busy={busy || undefined}
    className={dropdownMenuListClasses}
    onScroll={onScroll}
  >
    <div className={dropdownMenuListInnerClasses({ size })}>
      <MenuSize value={size}>{children}</MenuSize>
    </div>
  </ScrollArea>
);

export const MenuPortal = ({
  menu,
  container,
  ...props
}: DropdownMenuPortalProps & OfMenu) => {
  const portal = usePortalContainer();
  return (
    <menu.Portal
      data-part={`${menu.name}-portal`}
      container={container ?? portal ?? undefined}
      {...props}
    />
  );
};

export const MenuGroup = ({
  menu,
  className,
  ...props
}: DropdownMenuGroupProps & OfMenu) => {
  const size = useContext(MenuSize);
  return (
    <menu.Group
      data-part={`${menu.name}-group`}
      className={cn(dropdownMenuGroupClasses({ size }), className)}
      {...props}
    />
  );
};

export const MenuLabel = ({
  menu,
  className,
  inset,
  ...props
}: DropdownMenuLabelProps & OfMenu) => {
  const size = useContext(MenuSize);
  return (
    <menu.Label
      data-part={`${menu.name}-label`}
      data-inset={inset || undefined}
      className={cn(dropdownMenuLabelClasses({ size }), className)}
      {...props}
    />
  );
};

const MenuRowActions = ({
  menu,
  children,
}: OfMenu & { children: ReactNode }) => {
  const close = useContext(CloseMenu);
  return (
    <div
      data-part={`${menu.name}-item-actions`}
      className={dropdownMenuItemActionsClasses}
      onClickCapture={() => {
        setTimeout(() => close?.());
      }}
    >
      {children}
    </div>
  );
};

export const MenuItem = ({
  menu,
  className,
  inset,
  tone,
  actions,
  description,
  style,
  children,
  ...props
}: DropdownMenuItemProps & OfMenu) => {
  const withActions = Boolean(actions?.length);
  const described = Boolean(description) && !props.asChild;
  const size = useContext(MenuSize);
  const id = useId();
  const item = (
    <menu.Item
      aria-labelledby={described ? `${id}-label` : undefined}
      aria-describedby={described ? `${id}-description` : undefined}
      data-part={`${menu.name}-item`}
      data-inset={inset || undefined}
      data-tone={tone}
      className={cn(
        dropdownMenuItemClasses({ size, tone, withActions, described }),
        className,
      )}
      style={
        actions?.length
          ? {
              ...style,
              ...cssVariables({ "--menu-row-actions": actions.length }),
            }
          : style
      }
      {...props}
    >
      {described ? (
        <span
          data-part={`${menu.name}-item-text`}
          className={dropdownMenuItemTextClasses({ size })}
        >
          <span id={`${id}-label`} className={dropdownMenuItemLabelClasses}>
            {children}
          </span>
          <span
            id={`${id}-description`}
            data-part={`${menu.name}-item-description`}
            className={dropdownMenuItemDescriptionClasses({ size })}
          >
            {description}
          </span>
        </span>
      ) : (
        children
      )}
    </menu.Item>
  );
  if (!withActions) return item;
  return (
    <div data-part={`${menu.name}-row`} className={dropdownMenuRowClasses}>
      {item}
      <MenuRowActions menu={menu}>{actions}</MenuRowActions>
    </div>
  );
};

export const MenuCheckboxItem = ({
  menu,
  className,
  inset,
  children,
  ...props
}: DropdownMenuCheckboxItemProps & OfMenu) => {
  const size = useContext(MenuSize);
  return (
    <menu.CheckboxItem
      data-part={`${menu.name}-checkbox-item`}
      data-inset={inset || undefined}
      className={cn(dropdownMenuCheckboxItemClasses({ size }), className)}
      {...props}
    >
      <span
        data-part={`${menu.name}-checkbox-item-indicator`}
        className={cn(dropdownMenuItemIndicatorClasses({ size }))}
      >
        <menu.ItemIndicator className={dropdownMenuCheckClasses}>
          <Icon icon={Tick02Icon} className={dropdownMenuCheckTickClasses} />
          <Icon icon={MinusSignIcon} className={dropdownMenuCheckDashClasses} />
        </menu.ItemIndicator>
      </span>
      {children}
    </menu.CheckboxItem>
  );
};

export const MenuRadioGroup = ({
  menu,
  className,
  ...props
}: DropdownMenuRadioGroupProps & OfMenu) => {
  const size = useContext(MenuSize);
  return (
    <menu.RadioGroup
      data-part={`${menu.name}-radio-group`}
      className={cn(dropdownMenuRadioGroupClasses({ size }), className)}
      {...props}
    />
  );
};

export const MenuRadioItem = ({
  menu,
  className,
  inset,
  children,
  ...props
}: DropdownMenuRadioItemProps & OfMenu) => {
  const size = useContext(MenuSize);
  return (
    <menu.RadioItem
      data-part={`${menu.name}-radio-item`}
      data-inset={inset || undefined}
      className={cn(dropdownMenuRadioItemClasses({ size }), className)}
      {...props}
    >
      <span
        data-part={`${menu.name}-radio-item-indicator`}
        className={cn(dropdownMenuItemIndicatorClasses({ size }))}
      >
        <menu.ItemIndicator
          className={cn(dropdownMenuRadioItemDotClasses({ size }))}
        />
      </span>
      {children}
    </menu.RadioItem>
  );
};

export const MenuSeparator = ({
  menu,
  className,
  ...props
}: DropdownMenuSeparatorProps & OfMenu) => {
  const size = useContext(MenuSize);
  return (
    <menu.Separator
      data-part={`${menu.name}-separator`}
      className={cn(dropdownMenuSeparatorClasses({ size }), className)}
      {...props}
    />
  );
};

export const MenuShortcut = ({
  menu,
  className,
  ...props
}: DropdownMenuShortcutProps & OfMenu) => {
  const size = useContext(MenuSize);
  return (
    <span
      data-part={`${menu.name}-shortcut`}
      className={cn(dropdownMenuShortcutClasses({ size }), className)}
      {...props}
    />
  );
};

export const MenuSubTrigger = ({
  menu,
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps & OfMenu) => {
  const size = useContext(MenuSize);
  return (
    <menu.SubTrigger
      data-part={`${menu.name}-sub-trigger`}
      data-inset={inset || undefined}
      className={cn(dropdownMenuSubTriggerClasses({ size }), className)}
      {...props}
    >
      {children}
      <Icon
        icon={ArrowRight01Icon}
        className={dropdownMenuSubTriggerIconClasses}
      />
    </menu.SubTrigger>
  );
};

export const MenuSubContent = ({
  menu,
  className,
  size: own,
  borderRadius,
  children,
  onScroll,
  ...props
}: DropdownMenuSubContentProps & OfMenu) => {
  const container = usePortalContainer();
  const theme = useThemeScope();
  const parent = useContext(MenuSize);
  const size = own ?? parent;
  return (
    <menu.Portal container={container ?? undefined}>
      <menu.SubContent
        data-part={`${menu.name}-sub-content`}
        data-theme={theme}
        data-size={size}
        data-radius={borderRadius}
        collisionBoundary={container ?? undefined}
        collisionPadding={container ? 8 : undefined}
        className={cn(
          dropdownMenuSubContentClasses({ menu: menu.name, borderRadius }),
          className,
        )}
        {...props}
      >
        <MenuList menu={menu} size={size} onScroll={onScroll}>
          {children}
        </MenuList>
      </menu.SubContent>
    </menu.Portal>
  );
};
