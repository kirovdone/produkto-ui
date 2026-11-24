"use client";

import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from "@radix-ui/react-context-menu";
import { cn } from "../../cn";
import { usePortalContainer } from "../../context/portalContainer";
import { useThemeScope } from "../../context/themeScope";
import { dropdownMenuContentClasses } from "../DropdownMenu";
import {
  MenuCheckboxItem,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuList,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSubContent,
  MenuSubTrigger,
  type MenuPrimitives,
} from "../DropdownMenu/MenuParts";
import { contextMenuTriggerClasses } from "./ContextMenu.classes";
import type {
  ContextMenuCheckboxItemProps,
  ContextMenuContentProps,
  ContextMenuGroupProps,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuPortalProps,
  ContextMenuProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuSeparatorProps,
  ContextMenuShortcutProps,
  ContextMenuSubContentProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuTriggerProps,
} from "./ContextMenu.types";

const MENU: MenuPrimitives = {
  name: "context-menu",
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
};

export const ContextMenu = (props: ContextMenuProps) => (
  <Root data-part="context-menu" {...props} />
);

export const ContextMenuTrigger = ({
  className,
  ...props
}: ContextMenuTriggerProps) => (
  <Trigger
    data-part="context-menu-trigger"
    className={cn(contextMenuTriggerClasses, className)}
    {...props}
  />
);

export const ContextMenuPortal = (props: ContextMenuPortalProps) => (
  <MenuPortal menu={MENU} {...props} />
);

export const ContextMenuContent = ({
  className,
  size = "base",
  borderRadius = "lg",
  children,
  onScroll,
  ...props
}: ContextMenuContentProps) => {
  const container = usePortalContainer();
  const theme = useThemeScope();
  return (
    <Portal container={container ?? undefined}>
      <Content
        data-part="context-menu-content"
        data-theme={theme}
        data-size={size}
        data-radius={borderRadius}
        collisionBoundary={container ?? undefined}
        collisionPadding={container ? 8 : undefined}
        className={cn(
          dropdownMenuContentClasses({ menu: MENU.name, borderRadius }),
          className,
        )}
        {...props}
      >
        <MenuList menu={MENU} size={size} onScroll={onScroll}>
          {children}
        </MenuList>
      </Content>
    </Portal>
  );
};

export const ContextMenuGroup = (props: ContextMenuGroupProps) => (
  <MenuGroup menu={MENU} {...props} />
);

export const ContextMenuLabel = (props: ContextMenuLabelProps) => (
  <MenuLabel menu={MENU} {...props} />
);

export const ContextMenuItem = ({
  tone = "neutral",
  ...props
}: ContextMenuItemProps) => <MenuItem menu={MENU} tone={tone} {...props} />;

export const ContextMenuCheckboxItem = (
  props: ContextMenuCheckboxItemProps,
) => <MenuCheckboxItem menu={MENU} {...props} />;

export const ContextMenuRadioGroup = (props: ContextMenuRadioGroupProps) => (
  <MenuRadioGroup menu={MENU} {...props} />
);

export const ContextMenuRadioItem = (props: ContextMenuRadioItemProps) => (
  <MenuRadioItem menu={MENU} {...props} />
);

export const ContextMenuSeparator = (props: ContextMenuSeparatorProps) => (
  <MenuSeparator menu={MENU} {...props} />
);

export const ContextMenuShortcut = (props: ContextMenuShortcutProps) => (
  <MenuShortcut menu={MENU} {...props} />
);

export const ContextMenuSub = (props: ContextMenuSubProps) => (
  <Sub data-part="context-menu-sub" {...props} />
);

export const ContextMenuSubTrigger = (props: ContextMenuSubTriggerProps) => (
  <MenuSubTrigger menu={MENU} {...props} />
);

export const ContextMenuSubContent = ({
  sideOffset = 16,
  alignOffset = -9,
  borderRadius = "lg",
  ...props
}: ContextMenuSubContentProps) => (
  <MenuSubContent
    menu={MENU}
    sideOffset={sideOffset}
    alignOffset={alignOffset}
    borderRadius={borderRadius}
    {...props}
  />
);
