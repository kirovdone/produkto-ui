"use client";

import {
  Button as ToolButton,
  Link as ToolLink,
  Root,
  Separator as ToolSeparator,
} from "@radix-ui/react-toolbar";
import {
  Anchor,
  Content,
  Portal,
  Root as PopoverRoot,
} from "@radix-ui/react-popover";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { cn } from "../../cn";
import { usePortalContainer } from "../../context/portalContainer";
import { useThemeScope } from "../../context/themeScope";
import { useTranslate } from "../../host";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Separator } from "../Separator";
import { ToggleGroup, ToggleGroupItem } from "../ToggleGroup";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import {
  toolbarClasses,
  toolbarLayerClasses,
  toolbarLinkClasses,
  toolbarSeparatorClasses,
} from "./Toolbar.classes";
import type {
  ToolbarButtonProps,
  ToolbarChoiceTool,
  ToolbarLinkProps,
  ToolbarMenuTool,
  ToolbarProps,
  ToolbarBorderRadius,
  ToolbarRect,
  ToolbarSeparatorProps,
  ToolbarToggleGroupProps,
  ToolbarToggleItemProps,
  ToolbarTool,
} from "./Toolbar.types";

const FORM_FIELDS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

const ToolbarContext = createContext<{
  borderRadius: ToolbarBorderRadius;
  orientation: NonNullable<ToolbarProps["orientation"]>;
}>({ borderRadius: "base", orientation: "horizontal" });

const headerBottom = () =>
  typeof document === "undefined"
    ? 0
    : Math.max(
        0,
        document.querySelector("[data-app-header]")?.getBoundingClientRect()
          .bottom ?? 0,
      );

const ToolbarAtRect = ({
  rect,
  open = true,
  onOpenChange,
  side = "top",
  align = "start",
  sideOffset = 10,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  borderRadius,
  className,
  onKeyDown,
  onMouseDown,
  ...props
}: Omit<ToolbarProps, "tools" | "borderRadius"> & {
  rect: ToolbarRect;
  borderRadius: ToolbarBorderRadius;
}) => {
  const container = usePortalContainer();
  const theme = useThemeScope();
  const { top, left, width = 0, height } = rect;
  const anchor = useMemo(
    () => ({
      current: {
        getBoundingClientRect: () =>
          DOMRect.fromRect({ x: left, y: top, width, height }),
      },
    }),
    [top, left, width, height],
  );
  const boundary = collisionBoundary ?? container ?? undefined;
  return (
    <PopoverRoot open={open} onOpenChange={onOpenChange}>
      <Anchor virtualRef={anchor} />
      <Portal container={container ?? undefined}>
        <Content
          data-part="toolbar-layer"
          data-theme={theme}
          role={undefined}
          side={side}
          align={align}
          sideOffset={sideOffset}
          avoidCollisions={avoidCollisions}
          collisionBoundary={boundary}
          collisionPadding={
            collisionPadding ?? (boundary ? 8 : { top: headerBottom() })
          }
          hideWhenDetached
          onOpenAutoFocus={(event) => event.preventDefault()}
          className={toolbarLayerClasses}
        >
          <Root
            data-part="toolbar"
            data-floating=""
            data-radius={borderRadius}
            className={cn(toolbarClasses({ borderRadius }), className)}
            onKeyDown={(event) => {
              onKeyDown?.(event);
              if (event.key === "Tab") event.stopPropagation();
            }}
            onMouseDown={(event) => {
              onMouseDown?.(event);
              if (!(
                event.target instanceof Element &&
                FORM_FIELDS.has(event.target.tagName)
              )) {
                event.preventDefault();
              }
            }}
            {...props}
          />
        </Content>
      </Portal>
    </PopoverRoot>
  );
};

const choiceMenu = (
  { tooltip, choices, value, onValueChange }: ToolbarChoiceTool,
  translate: (key: string) => string,
): ToolbarMenuTool => ({
  tooltip,
  icon: (choices.find((choice) => choice.value === value) ?? choices[0]).icon,
  menu: choices.map((choice) => ({
    label: translate(choice.label),
    icon: choice.icon,
    onClick:
      choice.value === value ? undefined : () => onValueChange(choice.value),
  })),
});

const ToolbarToolItem = ({ tool }: { tool: ToolbarTool }) => {
  const translate = useTranslate();
  const drawn = "choices" in tool ? choiceMenu(tool, translate) : tool;
  const button = (
    <ToolbarButton
      data-part="toolbar-tool"
      aria-label={drawn.tooltip}
      size="xs"
      loading={"loading" in drawn && Boolean(drawn.loading)}
      {...("onClick" in drawn && { onClick: drawn.onClick })}
    >
      <Icon icon={drawn.icon} />
    </ToolbarButton>
  );
  const named = (trigger: ReactNode) => (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent>{drawn.tooltip}</TooltipContent>
    </Tooltip>
  );

  if ("menu" in drawn)
    return (
      <DropdownMenu modal={false} onOpenChange={drawn.onOpenChange}>
        {named(<DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>)}
        <DropdownMenuContent>
          {drawn.menu.map((row) => (
            <DropdownMenuItem
              key={row.label}
              disabled={!row.onClick}
              tone={row.tone}
              onSelect={row.onClick}
            >
              {row.icon && <Icon icon={row.icon} />}
              {row.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );

  if ("panel" in drawn)
    return (
      <Popover open={drawn.open} onOpenChange={drawn.onOpenChange}>
        {named(<PopoverTrigger asChild>{button}</PopoverTrigger>)}
        <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()}>
          {drawn.panel}
        </PopoverContent>
      </Popover>
    );

  return named(button);
};

export const Toolbar = ({
  rect,
  tools,
  children,
  open,
  onOpenChange,
  side,
  align,
  sideOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  borderRadius = "base",
  orientation,
  className,
  ...props
}: ToolbarProps) => {
  const content = (
    <ToolbarContext
      value={{ borderRadius, orientation: orientation ?? "horizontal" }}
    >
      {tools?.map(
        (tool) => tool && <ToolbarToolItem key={tool.tooltip} tool={tool} />,
      )}
      {children}
    </ToolbarContext>
  );
  return rect ? (
    <ToolbarAtRect
      rect={rect}
      open={open}
      onOpenChange={onOpenChange}
      side={side}
      align={align}
      sideOffset={sideOffset}
      avoidCollisions={avoidCollisions}
      collisionBoundary={collisionBoundary}
      collisionPadding={collisionPadding}
      borderRadius={borderRadius}
      orientation={orientation}
      className={className}
      {...props}
    >
      {content}
    </ToolbarAtRect>
  ) : (
    <Root
      data-part="toolbar"
      data-radius={borderRadius}
      orientation={orientation}
      className={cn(toolbarClasses({ borderRadius }), className)}
      {...props}
    >
      {content}
    </Root>
  );
};

export const ToolbarButton = ({
  loading,
  appearance = "transparent",
  tone,
  size = "sm",
  borderRadius,
  children,
  ...props
}: ToolbarButtonProps) => {
  const toolbar = useContext(ToolbarContext);
  return (
    <ToolButton data-part="toolbar-button" {...props} asChild>
      <Button
        loading={loading}
        appearance={appearance}
        tone={tone}
        size={size}
        borderRadius={borderRadius ?? toolbar.borderRadius}
      >
        {children}
      </Button>
    </ToolButton>
  );
};

export const ToolbarLink = ({ className, ...props }: ToolbarLinkProps) => (
  <ToolLink asChild>
    <Link
      data-part="toolbar-link"
      muted
      className={cn(toolbarLinkClasses, className)}
      {...props}
    />
  </ToolLink>
);

export const ToolbarSeparator = ({
  className,
  ...props
}: ToolbarSeparatorProps) => {
  const toolbar = useContext(ToolbarContext);
  const orientation =
    props.orientation ??
    (toolbar.orientation === "horizontal" ? "vertical" : "horizontal");
  return (
    <ToolSeparator data-part="toolbar-separator" {...props} asChild>
      <Separator
        orientation={orientation}
        className={cn(toolbarSeparatorClasses({ orientation }), className)}
      />
    </ToolSeparator>
  );
};

export const ToolbarToggleGroup = ({
  className,
  ...props
}: ToolbarToggleGroupProps) => {
  const toolbar = useContext(ToolbarContext);
  return (
    <ToggleGroup
      data-part="toolbar-toggle-group"
      orientation={toolbar.orientation}
      className={cn("gap-1", className)}
      {...props}
      rovingFocus={false}
    />
  );
};

export const ToolbarToggleItem = ({
  appearance = "transparent",
  size = "sm",
  borderRadius,
  ...props
}: ToolbarToggleItemProps) => {
  const toolbar = useContext(ToolbarContext);
  return (
    <ToolButton asChild>
      <ToggleGroupItem
        data-part="toolbar-toggle-item"
        appearance={appearance}
        size={size}
        borderRadius={borderRadius ?? toolbar.borderRadius}
        {...props}
      />
    </ToolButton>
  );
};
