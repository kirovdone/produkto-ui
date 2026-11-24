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
} from "@radix-ui/react-dropdown-menu";
import {
  Children,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useId,
} from "react";
import { cn } from "../../cn";
import { SkeletonRow } from "../Skeleton";
import { usePortalContainer } from "../../context/portalContainer";
import { useThemeScope } from "../../context/themeScope";
import { useTranslate } from "../../host";
import {
  SideAlignProvider,
  useMeasuredSide,
  useSide,
} from "../../context/sideAlign";
import {
  dropdownMenuContentClasses,
  dropdownMenuEmptyClasses,
  dropdownMenuFooterClasses,
  dropdownMenuHeaderClasses,
  dropdownMenuLoadingClasses,
} from "./DropdownMenu.classes";
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPortalProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSize,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
} from "./DropdownMenu.types";
import {
  CloseMenu,
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
  MenuSize,
  MenuSubContent,
  MenuSubTrigger,
  type MenuPrimitives,
} from "./MenuParts";

const MENU: MenuPrimitives = {
  name: "dropdown-menu",
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

const LOADING_ROWS = 3;

const MORE_ROWS = 2;

const LoadingRows = ({
  count,
  size,
}: {
  count: number;
  size: DropdownMenuSize;
}) =>
  Array.from({ length: count }, (_, index) => (
    <SkeletonRow
      key={index}
      data-part="dropdown-menu-loading"
      className={dropdownMenuLoadingClasses({ size })}
    />
  ));

let openMenu: { id: string; close: () => void } | null = null;

export const DropdownMenu = ({
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: DropdownMenuProps) => {
  const id = useId();
  const nested = useContext(CloseMenu) !== null;
  const [inner, setInner] = useState(defaultOpen);
  const shown = open ?? inner;
  const latestClose = useRef<() => void>(() => {});
  const change = useCallback(
    (next: boolean) => {
      if (!nested && next) {
        if (openMenu && openMenu.id !== id) openMenu.close();
        openMenu = { id, close: () => latestClose.current() };
      } else if (!nested && openMenu?.id === id) {
        openMenu = null;
      }
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
    },
    [id, nested, open, onOpenChange],
  );
  const close = useCallback(() => change(false), [change]);
  useLayoutEffect(() => {
    latestClose.current = close;
  });
  useEffect(
    () => () => {
      if (openMenu?.id === id) openMenu = null;
    },
    [id],
  );
  return (
    <CloseMenu.Provider value={close}>
      <SideAlignProvider>
        <Root
          data-part="dropdown-menu"
          open={shown}
          onOpenChange={change}
          {...props}
        />
      </SideAlignProvider>
    </CloseMenu.Provider>
  );
};

export const DropdownMenuPortal = (props: DropdownMenuPortalProps) => (
  <MenuPortal menu={MENU} {...props} />
);

export const DropdownMenuTrigger = (props: DropdownMenuTriggerProps) => {
  const measured = useMeasuredSide(props);
  return <Trigger data-part="dropdown-menu-trigger" {...props} {...measured} />;
};

export const DropdownMenuContent = ({
  className,
  align,
  sideOffset = 8,
  size = "base",
  borderRadius = "lg",
  header,
  footer,
  loading = false,
  loadingMore = false,
  onScroll,
  children,
  ...props
}: DropdownMenuContentProps) => {
  const t = useTranslate();
  const container = usePortalContainer();
  const theme = useThemeScope();
  const side = useSide();
  const rows = Children.toArray(children).length > 0;
  return (
    <Portal container={container ?? undefined}>
      <Content
        data-part="dropdown-menu-content"
        data-theme={theme}
        data-size={size}
        data-radius={borderRadius}
        data-header={header ? "" : undefined}
        data-footer={footer ? "" : undefined}
        align={align ?? side}
        sideOffset={sideOffset}
        collisionBoundary={container ?? undefined}
        collisionPadding={container ? 8 : undefined}
        className={cn(dropdownMenuContentClasses({ borderRadius }), className)}
        {...props}
      >
        <MenuSize value={size}>
          {header ? (
            <div
              data-part="dropdown-menu-header"
              className={dropdownMenuHeaderClasses({ size })}
              onKeyDown={(event) => event.stopPropagation()}
            >
              {header}
            </div>
          ) : null}
          <MenuList
            menu={MENU}
            size={size}
            busy={loading || loadingMore}
            onScroll={onScroll}
          >
            {loading ? (
              <LoadingRows count={LOADING_ROWS} size={size} />
            ) : rows ? (
              <>
                {children}
                {loadingMore ? (
                  <LoadingRows count={MORE_ROWS} size={size} />
                ) : null}
              </>
            ) : loadingMore ? (
              <LoadingRows count={LOADING_ROWS} size={size} />
            ) : (
              <div
                data-part="dropdown-menu-empty"
                className={cn(dropdownMenuEmptyClasses({ size }))}
              >
                {t("No items found")}
              </div>
            )}
          </MenuList>
          {footer ? (
            <div
              data-part="dropdown-menu-footer"
              className={dropdownMenuFooterClasses({ size })}
            >
              {footer}
            </div>
          ) : null}
        </MenuSize>
      </Content>
    </Portal>
  );
};

export const DropdownMenuGroup = (props: DropdownMenuGroupProps) => (
  <MenuGroup menu={MENU} {...props} />
);

export const DropdownMenuLabel = (props: DropdownMenuLabelProps) => (
  <MenuLabel menu={MENU} {...props} />
);

export const DropdownMenuItem = ({
  tone = "neutral",
  ...props
}: DropdownMenuItemProps) => <MenuItem menu={MENU} tone={tone} {...props} />;

export const DropdownMenuCheckboxItem = (
  props: DropdownMenuCheckboxItemProps,
) => <MenuCheckboxItem menu={MENU} {...props} />;

export const DropdownMenuRadioGroup = (props: DropdownMenuRadioGroupProps) => (
  <MenuRadioGroup menu={MENU} {...props} />
);

export const DropdownMenuRadioItem = (props: DropdownMenuRadioItemProps) => (
  <MenuRadioItem menu={MENU} {...props} />
);

export const DropdownMenuSeparator = (props: DropdownMenuSeparatorProps) => (
  <MenuSeparator menu={MENU} {...props} />
);

export const DropdownMenuShortcut = (props: DropdownMenuShortcutProps) => (
  <MenuShortcut menu={MENU} {...props} />
);

export const DropdownMenuSub = (props: DropdownMenuSubProps) => (
  <Sub data-part="dropdown-menu-sub" {...props} />
);

export const DropdownMenuSubTrigger = (props: DropdownMenuSubTriggerProps) => (
  <MenuSubTrigger menu={MENU} {...props} />
);

export const DropdownMenuSubContent = ({
  sideOffset = 16,
  alignOffset = -9,
  borderRadius = "lg",
  ...props
}: DropdownMenuSubContentProps) => (
  <MenuSubContent
    menu={MENU}
    sideOffset={sideOffset}
    alignOffset={alignOffset}
    borderRadius={borderRadius}
    {...props}
  />
);
