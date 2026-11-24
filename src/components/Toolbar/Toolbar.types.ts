import type { ComponentProps, ReactNode } from "react";
import type { Content, Root as PopoverRoot } from "@radix-ui/react-popover";
import type {
  Button as ToolButton,
  Root,
  Separator as ToolSeparator,
  ToggleGroup,
  ToggleItem,
} from "@radix-ui/react-toolbar";
import type { AlignmentChoice } from "../../consts/alignments";
import type { Tone } from "../../recipes/appearance";
import type { BorderRadius } from "../../recipes/borderRadius";
import type {
  ButtonAppearance,
  ButtonBorderRadius,
  ButtonSize,
  ButtonTone,
} from "../Button";
import type { IconSvgElement } from "../Icon";
import type { LinkAnchorProps } from "../Link";
import type {
  ToggleAppearance,
  ToggleBorderRadius,
  ToggleSize,
} from "../Toggle";

export type ToolbarBorderRadius = BorderRadius;

export interface ToolbarRect {
  top: number;
  left: number;
  width?: number;
  height: number;
}

export interface ToolbarProps
  extends
    ComponentProps<typeof Root>,
    Pick<ComponentProps<typeof PopoverRoot>, "open" | "onOpenChange">,
    Pick<
      ComponentProps<typeof Content>,
      | "side"
      | "align"
      | "sideOffset"
      | "avoidCollisions"
      | "collisionBoundary"
      | "collisionPadding"
    > {
  rect?: ToolbarRect;
  tools?: readonly (ToolbarTool | false | null | undefined)[];
  borderRadius?: ToolbarBorderRadius;
}

export type ToolbarMenuRowTone = Extract<Tone, "neutral" | "destructive">;

export interface ToolbarMenuRow {
  label: string;
  icon?: IconSvgElement;
  tone?: ToolbarMenuRowTone;
  onClick?: () => void;
}

interface ToolbarToolBase {
  tooltip: string;
  icon: IconSvgElement;
}

export interface ToolbarButtonTool extends ToolbarToolBase {
  onClick: () => void;
  loading?: boolean;
}

export interface ToolbarMenuTool extends ToolbarToolBase {
  menu: readonly ToolbarMenuRow[];
  onOpenChange?: (open: boolean) => void;
}

export interface ToolbarPanelTool extends ToolbarToolBase {
  panel: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ToolbarChoiceTool {
  tooltip: string;
  choices: readonly AlignmentChoice[];
  value: string;
  onValueChange: (value: string) => void;
}

export type ToolbarTool =
  ToolbarButtonTool | ToolbarMenuTool | ToolbarPanelTool | ToolbarChoiceTool;

export interface ToolbarButtonProps extends Omit<
  ComponentProps<typeof ToolButton>,
  "asChild"
> {
  loading?: boolean;
  appearance?: ButtonAppearance;
  tone?: ButtonTone;
  size?: ButtonSize;
  borderRadius?: ButtonBorderRadius;
}

export type ToolbarLinkProps = Omit<LinkAnchorProps, "muted" | "underline">;

export type ToolbarSeparatorProps = ComponentProps<typeof ToolSeparator>;

export type ToolbarToggleGroupProps = ComponentProps<typeof ToggleGroup>;

export interface ToolbarToggleItemProps extends ComponentProps<
  typeof ToggleItem
> {
  appearance?: ToggleAppearance;
  size?: ToggleSize;
  borderRadius?: ToggleBorderRadius;
}
