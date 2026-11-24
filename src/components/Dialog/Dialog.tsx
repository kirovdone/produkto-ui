"use client";

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import {
  Content as TabsContent,
  List as TabsList,
  Root as TabsRoot,
  Trigger as TabsTrigger,
} from "@radix-ui/react-tabs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  ArrowRight01Icon,
  Cancel01Icon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
} from "@hugeicons/core-free-icons";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
} from "react";
import { Icon } from "../Icon";
import { cn } from "../../cn";
import { ScrollArea } from "../ScrollArea";
import { Button } from "../Button";
import { PortalContainerProvider } from "../../context/portalContainer";
import { ThemeScopeProvider } from "../../context/themeScope";
import { useTranslate } from "../../host";
import { useOverlayContent } from "../../hooks/useOverlayContent";
import {
  dialogBodyClasses,
  dialogBodyInnerClasses,
  dialogCloseButtonClasses,
  dialogContentClasses,
  dialogDescriptionClasses,
  dialogFooterClasses,
  dialogHeaderClasses,
  dialogMainClasses,
  dialogOverlayClasses,
  dialogPanelClasses,
  dialogPanelFillClasses,
  dialogScrollClasses,
  dialogScrollInnerClasses,
  dialogSidebarClasses,
  dialogSidebarGroupClasses,
  dialogSidebarListClasses,
  dialogSidebarToggleClasses,
  dialogTabClasses,
  dialogTabHeaderClasses,
  dialogTabsClasses,
  dialogTabTitleClasses,
  dialogTrailClasses,
  dialogTrailRootClasses,
  dialogTrailSeparatorClasses,
  dialogTitleClasses,
} from "./Dialog.classes";
import type {
  DialogBodyProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPanelProps,
  DialogPortalProps,
  DialogProps,
  DialogSidebar,
  DialogTitleProps,
  DialogTriggerProps,
} from "./Dialog.types";

export const Dialog = (props: DialogProps) => (
  <Root data-part="dialog" {...props} />
);

export const DialogTrigger = (props: DialogTriggerProps) => (
  <Trigger data-part="dialog-trigger" {...props} />
);

export const DialogPortal = (props: DialogPortalProps) => (
  <Portal data-part="dialog-portal" {...props} />
);

export const DialogClose = (props: DialogCloseProps) => (
  <Close data-part="dialog-close" {...props} />
);

export const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <Overlay
    data-part="dialog-overlay"
    className={cn(dialogOverlayClasses, className)}
    {...props}
  />
);

const DialogSidebarLayout = <T extends string>({
  sidebar: { label, tabs, value, defaultValue, onValueChange },
  children,
}: {
  sidebar: DialogSidebar<T>;
  children: ReactNode;
}) => {
  const t = useTranslate();
  const rail = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [peek, setPeek] = useState(false);
  const peeking = collapsed && peek;
  const [held, setHeld] = useState(value);
  if (value !== undefined && value !== held) setHeld(value);
  const [active, setActive] = useControllableState<T | undefined>({
    prop: value ?? held,
    defaultProp: defaultValue ?? tabs.find((tab) => !tab.disabled)?.value,
    onChange: (next) => {
      if (next !== undefined) onValueChange?.(next);
    },
    caller: "Dialog",
  });
  const current = tabs.find((tab) => tab.value === active);

  useEffect(() => {
    if (!peeking) return;
    const away = (event: PointerEvent) => {
      const box = rail.current;
      if (!box || (event.target instanceof Node && box.contains(event.target)))
        return;
      setPeek(false);
    };
    document.addEventListener("pointermove", away);
    document.addEventListener("pointerdown", away);
    return () => {
      document.removeEventListener("pointermove", away);
      document.removeEventListener("pointerdown", away);
    };
  }, [peeking]);

  return (
    <TabsRoot
      data-part="dialog-tabs"
      orientation="vertical"
      value={active ?? ""}
      onValueChange={(next) => {
        const tab = tabs.find((candidate) => candidate.value === next);
        if (tab) setActive(tab.value);
      }}
      className={dialogTabsClasses}
    >
      <ScrollArea
        ref={rail}
        data-part="dialog-sidebar"
        data-collapsed={(collapsed && !peeking) || undefined}
        data-peek={peeking || undefined}
        orientation="both"
        className={dialogSidebarClasses}
        onPointerEnter={() => {
          if (collapsed) setPeek(true);
        }}
        onFocus={() => {
          if (collapsed) setPeek(true);
        }}
        onBlur={(event: FocusEvent<HTMLDivElement>) => {
          const box = event.currentTarget;
          if (!box.contains(event.relatedTarget) && !box.matches(":hover"))
            setPeek(false);
        }}
      >
        <TabsList
          aria-label={label}
          data-part="dialog-sidebar-list"
          className={dialogSidebarListClasses}
        >
          {tabs.map((tab, index) => (
            <Fragment key={tab.value}>
              {tab.group && tab.group !== tabs[index - 1]?.group ? (
                <span
                  data-part="dialog-sidebar-group"
                  className={dialogSidebarGroupClasses}
                >
                  {tab.group}
                </span>
              ) : null}
              <TabsTrigger
                data-part="dialog-tab"
                disabled={tab.disabled}
                value={tab.value}
                className={dialogTabClasses}
              >
                {tab.icon ? <Icon icon={tab.icon} /> : null}
                <span className="truncate">{tab.label}</span>
              </TabsTrigger>
            </Fragment>
          ))}
        </TabsList>
      </ScrollArea>
      <div data-part="dialog-main" className={dialogMainClasses}>
        <DialogHeader bordered className={dialogTabHeaderClasses}>
          <Button
            data-part="dialog-sidebar-toggle"
            appearance="transparent"
            size="sm"
            aria-label={collapsed ? t("Expand sidebar") : t("Collapse sidebar")}
            aria-expanded={!collapsed}
            className={dialogSidebarToggleClasses}
            onClick={() => {
              setPeek(false);
              setCollapsed((shut) => !shut);
            }}
          >
            <Icon icon={collapsed ? PanelLeftCloseIcon : PanelLeftOpenIcon} />
          </Button>
          <div data-part="dialog-trail" className={dialogTrailClasses}>
            <Title asChild>
              <span className={dialogTrailRootClasses}>{label}</span>
            </Title>
            {current ? (
              <>
                <Icon
                  icon={ArrowRight01Icon}
                  className={dialogTrailSeparatorClasses}
                />
                <h2 className={dialogTabTitleClasses}>{current.label}</h2>
              </>
            ) : null}
          </div>
        </DialogHeader>
        {children}
      </div>
    </TabsRoot>
  );
};

export const DialogContent = <T extends string>({
  className,
  children,
  sidebar,
  size = sidebar ? "lg" : "base",
  borderRadius = "lg",
  alert = false,
  scrollable = true,
  onScroll,
  onInteractOutside,
  ref,
  onOpenAutoFocus,
  onCloseAutoFocus,
  ...props
}: DialogContentProps<T>) => {
  const t = useTranslate();
  const content = useOverlayContent({
    ref,
    onOpenAutoFocus,
    onCloseAutoFocus,
  });
  const scrolls = scrollable && !sidebar;
  return (
    <DialogPortal>
      <DialogOverlay />
      <Content
        data-part="dialog-content"
        data-size={size}
        data-radius={borderRadius}
        {...(alert ? { role: "alertdialog" } : {})}
        {...(sidebar ? { "aria-describedby": undefined } : {})}
        className={cn(
          dialogContentClasses({ size, borderRadius, scrollable: scrolls }),
          className,
        )}
        {...content.props}
        {...props}
        onInteractOutside={(event) => {
          onInteractOutside?.(event);
          if (alert) event.preventDefault();
        }}
        onScroll={scrolls ? undefined : onScroll}
      >
        <PortalContainerProvider value={content.node}>
          <ThemeScopeProvider value={undefined}>
            {sidebar ? (
              <DialogSidebarLayout sidebar={sidebar}>
                {children}
              </DialogSidebarLayout>
            ) : scrolls ? (
              <ScrollArea
                data-part="dialog-body"
                className={dialogScrollClasses}
                onScroll={onScroll}
              >
                <div className={dialogScrollInnerClasses}>{children}</div>
              </ScrollArea>
            ) : (
              children
            )}
          </ThemeScopeProvider>
        </PortalContainerProvider>
        <Close data-part="dialog-close" asChild>
          <Button
            aria-label={t("Close")}
            appearance="transparent"
            size="sm"
            className={dialogCloseButtonClasses}
          >
            <Icon icon={Cancel01Icon} />
          </Button>
        </Close>
      </Content>
    </DialogPortal>
  );
};

export const DialogHeader = ({
  className,
  bordered = false,
  ...props
}: DialogHeaderProps) => (
  <div
    data-part="dialog-header"
    data-bordered={bordered || undefined}
    className={cn(dialogHeaderClasses({ bordered }), className)}
    {...props}
  />
);

export const DialogBody = ({
  className,
  children,
  ...props
}: DialogBodyProps) => (
  <ScrollArea
    data-part="dialog-body"
    className={cn(dialogBodyClasses, className)}
    {...props}
  >
    <div className={dialogBodyInnerClasses}>{children}</div>
  </ScrollArea>
);

export const DialogPanel = ({
  className,
  scrollable = true,
  children,
  ...props
}: DialogPanelProps) => (
  <TabsContent
    data-part="dialog-panel"
    className={cn(dialogPanelClasses, className)}
    {...props}
  >
    {scrollable ? (
      <DialogBody>{children}</DialogBody>
    ) : (
      <div className={dialogPanelFillClasses}>{children}</div>
    )}
  </TabsContent>
);

export const DialogFooter = ({
  className,
  bordered = false,
  ...props
}: DialogFooterProps) => (
  <div
    data-part="dialog-footer"
    data-bordered={bordered || undefined}
    className={cn(dialogFooterClasses({ bordered }), className)}
    {...props}
  />
);

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <Title
    data-part="dialog-title"
    className={cn(dialogTitleClasses, className)}
    {...props}
  />
);

export const DialogDescription = ({
  className,
  ...props
}: DialogDescriptionProps) => (
  <Description
    data-part="dialog-description"
    className={cn(dialogDescriptionClasses, className)}
    {...props}
  />
);
