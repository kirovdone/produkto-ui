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
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import { cn } from "../../cn";
import { ScrollArea } from "../ScrollArea";
import { Button } from "../Button";
import { PortalContainerProvider } from "../../context/portalContainer";
import { ThemeScopeProvider } from "../../context/themeScope";
import { useTranslate } from "../../host";
import { useOverlayContent } from "../../hooks/useOverlayContent";
import {
  drawerBodyClasses,
  drawerCloseButtonClasses,
  drawerContentClasses,
  drawerDescriptionClasses,
  drawerFooterClasses,
  drawerHeaderClasses,
  drawerOverlayClasses,
  drawerTitleClasses,
} from "./Drawer.classes";
import type {
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerProps,
  DrawerTitleProps,
  DrawerTriggerProps,
} from "./Drawer.types";

export const Drawer = (props: DrawerProps) => (
  <Root data-part="drawer" {...props} />
);

export const DrawerTrigger = (props: DrawerTriggerProps) => (
  <Trigger data-part="drawer-trigger" {...props} />
);

export const DrawerClose = (props: DrawerCloseProps) => (
  <Close data-part="drawer-close" {...props} />
);

export const DrawerContent = ({
  className,
  children,
  side = "right",
  size = "base",
  layout = "floating",
  showCloseButton = true,
  scrollable = true,
  onScroll,
  ref,
  onOpenAutoFocus,
  onCloseAutoFocus,
  ...props
}: DrawerContentProps) => {
  const t = useTranslate();
  const content = useOverlayContent({
    ref,
    onOpenAutoFocus,
    onCloseAutoFocus,
  });
  return (
    <Portal data-part="drawer-portal">
      <Overlay data-part="drawer-overlay" className={drawerOverlayClasses} />
      <Content
        data-part="drawer-content"
        data-side={side}
        data-size={size}
        data-layout={layout}
        className={cn(
          drawerContentClasses({ side, size, layout, scrollable }),
          className,
        )}
        {...content.props}
        {...props}
        onScroll={scrollable ? undefined : onScroll}
      >
        <PortalContainerProvider value={content.node}>
          <ThemeScopeProvider value={undefined}>
            {scrollable ? (
              <ScrollArea
                data-part="drawer-body"
                className={drawerBodyClasses}
                onScroll={onScroll}
              >
                {children}
              </ScrollArea>
            ) : (
              children
            )}
          </ThemeScopeProvider>
        </PortalContainerProvider>
        {showCloseButton ? (
          <Close data-part="drawer-close" asChild>
            <Button
              aria-label={t("Close")}
              appearance="transparent"
              size="sm"
              className={drawerCloseButtonClasses}
            >
              <Icon icon={Cancel01Icon} />
            </Button>
          </Close>
        ) : null}
      </Content>
    </Portal>
  );
};

export const DrawerHeader = ({
  className,
  bordered = false,
  ...props
}: DrawerHeaderProps) => (
  <div
    data-part="drawer-header"
    data-bordered={bordered || undefined}
    className={cn(drawerHeaderClasses({ bordered }), className)}
    {...props}
  />
);

export const DrawerFooter = ({
  className,
  bordered = false,
  ...props
}: DrawerFooterProps) => (
  <div
    data-part="drawer-footer"
    data-bordered={bordered || undefined}
    className={cn(drawerFooterClasses({ bordered }), className)}
    {...props}
  />
);

export const DrawerTitle = ({ className, ...props }: DrawerTitleProps) => (
  <Title
    data-part="drawer-title"
    className={cn(drawerTitleClasses, className)}
    {...props}
  />
);

export const DrawerDescription = ({
  className,
  ...props
}: DrawerDescriptionProps) => (
  <Description
    data-part="drawer-description"
    className={cn(drawerDescriptionClasses, className)}
    {...props}
  />
);
