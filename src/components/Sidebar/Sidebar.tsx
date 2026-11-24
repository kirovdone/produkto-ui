"use client";

import {
  Menu01Icon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import { Slot } from "@radix-ui/react-slot";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { cn } from "../../cn";
import { useTranslate } from "../../host";
import { Button } from "../Button";
import { ScrollArea } from "../ScrollArea";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../Drawer";
import { Skeleton } from "../Skeleton";
import {
  sidebarClasses,
  sidebarContainerClasses,
  sidebarContentClasses,
  sidebarContentInnerClasses,
  sidebarFooterClasses,
  sidebarGapClasses,
  sidebarGroupClasses,
  sidebarGroupContentClasses,
  sidebarGroupLabelClasses,
  sidebarHeaderClasses,
  sidebarInnerClasses,
  sidebarInsetClasses,
  sidebarMenuButtonClasses,
  sidebarMenuClasses,
  sidebarMenuItemClasses,
  sidebarMenuSkeletonClasses,
  sidebarMenuSkeletonIconClasses,
  sidebarMenuSkeletonTextClasses,
  sidebarMenuSubButtonClasses,
  sidebarMenuSubClasses,
  sidebarMenuSubItemClasses,
  sidebarMobileClasses,
  sidebarMobileInnerClasses,
  sidebarProviderClasses,
  sidebarBorderRadiusClasses,
  sidebarTriggerClasses,
} from "./Sidebar.classes";
import type {
  SidebarContentProps,
  SidebarContextValue,
  SidebarFooterProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarInsetProps,
  SidebarMenuButtonProps,
  SidebarMenuItemProps,
  SidebarMenuProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubButtonProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarTriggerProps,
} from "./Sidebar.types";
import { cssVariables } from "../../helpers/cssVariables";

const WIDTH = { open: "16rem", phone: "18rem", rail: "3.5rem" };

const OPEN_MENU = '[aria-haspopup][aria-expanded="true"]';

const PHONE = "(max-width: 767px)";

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Draw sidebar parts inside a SidebarProvider.");
  return context;
};

const watchPhone = (onChange: () => void) => {
  const query = window.matchMedia(PHONE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const useOnPhone = () =>
  useSyncExternalStore(
    watchPhone,
    () => window.matchMedia(PHONE).matches,
    () => false,
  );

const togglesSidebar = (event: KeyboardEvent | ReactKeyboardEvent) =>
  (event.metaKey || event.ctrlKey) && event.key === "b";

export const SidebarProvider = ({
  defaultOpen = true,
  className,
  style,
  onKeyDown,
  children,
  ...props
}: SidebarProviderProps) => {
  const nested = useContext(SidebarContext) !== null;
  const isMobile = useOnPhone();
  const [openMobile, setOpenMobile] = useState(false);
  const [open, setOpen] = useState(defaultOpen);

  const toggleSidebar = useCallback(
    () => (isMobile ? setOpenMobile : setOpen)((shown) => !shown),
    [isMobile],
  );

  useEffect(() => {
    if (nested) return;
    const onWindowKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || !togglesSidebar(event)) return;
      event.preventDefault();
      toggleSidebar();
    };
    window.addEventListener("keydown", onWindowKeyDown);
    return () => window.removeEventListener("keydown", onWindowKeyDown);
  }, [nested, toggleSidebar]);

  const context = useMemo<SidebarContextValue>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [open, openMobile, isMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={context}>
      <div
        data-part="sidebar-wrapper"
        style={{
          ...cssVariables({
            "--sidebar-width": WIDTH.open,
            "--sidebar-width-icon": WIDTH.rail,
          }),
          ...style,
        }}
        className={cn(sidebarProviderClasses, className)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || !togglesSidebar(event)) return;
          event.preventDefault();
          toggleSidebar();
        }}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  side = "start",
  expandOnHover = false,
  borderRadius = "base",
  className,
  children,
  ...props
}: SidebarProps) => {
  const t = useTranslate();
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  const panel = useRef<HTMLDivElement | null>(null);
  const [peek, setPeek] = useState(false);
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    setPeek(false);
  }
  const peeking = expandOnHover && state === "collapsed" && peek;

  useEffect(() => {
    if (!peeking) return;
    const away = (event: PointerEvent) => {
      const box = panel.current;
      if (!box || (event.target instanceof Node && box.contains(event.target)))
        return;
      if (box.querySelector(OPEN_MENU)) return;
      setPeek(false);
    };
    document.addEventListener("pointermove", away);
    document.addEventListener("pointerdown", away);
    return () => {
      document.removeEventListener("pointermove", away);
      document.removeEventListener("pointerdown", away);
    };
  }, [peeking]);

  if (isMobile)
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile}>
        <DrawerContent
          {...props}
          data-part="sidebar"
          data-mobile="true"
          data-radius={borderRadius}
          side={side === "start" ? "left" : "right"}
          showCloseButton={false}
          scrollable={false}
          className={cn(
            sidebarMobileClasses,
            sidebarBorderRadiusClasses({ borderRadius }),
          )}
          style={cssVariables({ "--sidebar-width": WIDTH.phone })}
        >
          <DrawerHeader className="sr-only">
            <DrawerTitle>{t("Sidebar")}</DrawerTitle>
            <DrawerDescription>
              {t("The menu's pages and actions.")}
            </DrawerDescription>
          </DrawerHeader>
          <div data-part="sidebar-inner" className={sidebarMobileInnerClasses}>
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );

  return (
    <div
      data-part="sidebar"
      data-state={peeking ? "expanded" : state}
      data-collapsible={state === "collapsed" && !peeking ? "icon" : ""}
      data-peek={peeking ? "" : undefined}
      data-expand-on-hover={expandOnHover ? "" : undefined}
      data-side={side}
      data-radius={borderRadius}
      className={cn(
        sidebarClasses,
        sidebarBorderRadiusClasses({ borderRadius }),
      )}
    >
      <div data-part="sidebar-gap" className={sidebarGapClasses} />
      <div
        ref={panel}
        data-part="sidebar-container"
        data-side={side}
        className={cn(sidebarContainerClasses, className)}
        {...(expandOnHover
          ? {
              onPointerEnter: () => setPeek(true),
              onFocus: () => setPeek(true),
              onBlur: (event: FocusEvent<HTMLDivElement>) => {
                const box = event.currentTarget;
                if (
                  !box.contains(event.relatedTarget) &&
                  !box.matches(":hover") &&
                  !box.querySelector(OPEN_MENU)
                )
                  setPeek(false);
              },
            }
          : {})}
        {...props}
      >
        <div data-part="sidebar-inner" className={sidebarInnerClasses}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const SidebarTrigger = ({
  className,
  onClick,
  children,
  toggle = false,
  ...props
}: SidebarTriggerProps) => {
  const t = useTranslate();
  const { isMobile, open, openMobile, toggleSidebar } = useSidebar();
  if (toggle && isMobile) return null;
  const label = toggle
    ? open
      ? t("Collapse sidebar")
      : t("Expand sidebar")
    : t("Open menu");
  return (
    <Button
      data-part="sidebar-trigger"
      appearance="transparent"
      size="sm"
      aria-label={label}
      aria-expanded={isMobile ? openMobile : open}
      aria-haspopup={isMobile ? "dialog" : undefined}
      className={cn(toggle ? undefined : sidebarTriggerClasses, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggleSidebar();
      }}
      {...props}
    >
      {children ?? (
        <Icon
          icon={
            toggle
              ? open
                ? PanelLeftOpenIcon
                : PanelLeftCloseIcon
              : Menu01Icon
          }
        />
      )}
    </Button>
  );
};

export const SidebarInset = ({ className, ...props }: SidebarInsetProps) => (
  <main
    data-part="sidebar-inset"
    className={cn(sidebarInsetClasses, className)}
    {...props}
  />
);

export const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => (
  <div
    data-part="sidebar-header"
    className={cn(sidebarHeaderClasses, className)}
    {...props}
  />
);

export const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => (
  <div
    data-part="sidebar-footer"
    className={cn(sidebarFooterClasses, className)}
    {...props}
  />
);

export const SidebarContent = ({
  ref,
  className,
  children,
  ...props
}: SidebarContentProps) => (
  <ScrollArea
    data-part="sidebar-content"
    viewportRef={ref}
    className={cn(sidebarContentClasses, className)}
    {...props}
  >
    <div className={sidebarContentInnerClasses}>{children}</div>
  </ScrollArea>
);

export const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => (
  <div
    data-part="sidebar-group"
    className={cn(sidebarGroupClasses, className)}
    {...props}
  />
);

export const SidebarGroupLabel = ({
  className,
  ...props
}: SidebarGroupLabelProps) => (
  <div
    data-part="sidebar-group-label"
    className={cn(sidebarGroupLabelClasses, className)}
    {...props}
  />
);

export const SidebarGroupContent = ({
  className,
  ...props
}: SidebarGroupContentProps) => (
  <div
    data-part="sidebar-group-content"
    className={cn(sidebarGroupContentClasses, className)}
    {...props}
  />
);

export const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => (
  <ul
    data-part="sidebar-menu"
    className={cn(sidebarMenuClasses, className)}
    {...props}
  />
);

export const SidebarMenuItem = ({
  className,
  ...props
}: SidebarMenuItemProps) => (
  <li
    data-part="sidebar-menu-item"
    className={cn(sidebarMenuItemClasses, className)}
    {...props}
  />
);

export const SidebarMenuButton = ({
  asChild = false,
  active = false,
  className,
  ...props
}: SidebarMenuButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-part="sidebar-menu-button"
      data-active={active}
      type={asChild ? undefined : "button"}
      className={cn(sidebarMenuButtonClasses, className)}
      {...props}
    />
  );
};

export const SidebarMenuSkeleton = ({
  showIcon = false,
  className,
  ...props
}: SidebarMenuSkeletonProps) => (
  <div
    data-part="sidebar-menu-skeleton"
    className={cn(sidebarMenuSkeletonClasses, className)}
    {...props}
  >
    {showIcon ? (
      <Skeleton
        data-part="sidebar-menu-skeleton-icon"
        className={sidebarMenuSkeletonIconClasses}
      />
    ) : null}
    <Skeleton
      data-part="sidebar-menu-skeleton-text"
      className={sidebarMenuSkeletonTextClasses}
    />
  </div>
);

export const SidebarMenuSub = ({
  className,
  ...props
}: SidebarMenuSubProps) => (
  <ul
    data-part="sidebar-menu-sub"
    className={cn(sidebarMenuSubClasses, className)}
    {...props}
  />
);

export const SidebarMenuSubItem = ({
  className,
  ...props
}: SidebarMenuSubItemProps) => (
  <li
    data-part="sidebar-menu-sub-item"
    className={cn(sidebarMenuSubItemClasses, className)}
    {...props}
  />
);

export const SidebarMenuSubButton = ({
  asChild = false,
  active = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-part="sidebar-menu-sub-button"
      data-active={active}
      className={cn(sidebarMenuSubButtonClasses, className)}
      {...props}
    />
  );
};
