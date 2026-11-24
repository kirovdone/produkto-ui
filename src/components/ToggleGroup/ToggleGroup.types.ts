import type { Item, Root } from "@radix-ui/react-toggle-group";
import type { ComponentProps } from "react";
import type {
  ToggleAppearance,
  ToggleBorderRadius,
  ToggleSize,
} from "../Toggle";

export type ToggleGroupProps = ComponentProps<typeof Root> & {
  appearance?: ToggleAppearance;
  size?: ToggleSize;
  borderRadius?: ToggleBorderRadius;
  joined?: boolean;
};

export type ToggleGroupItemProps = ComponentProps<typeof Item> & {
  appearance?: ToggleAppearance;
  size?: ToggleSize;
  borderRadius?: ToggleBorderRadius;
};
