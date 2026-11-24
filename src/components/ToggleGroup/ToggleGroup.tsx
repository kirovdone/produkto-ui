"use client";

import { Item, Root } from "@radix-ui/react-toggle-group";
import { cn } from "../../cn";
import { createContext, useContext } from "react";
import {
  toggleClasses,
  type ToggleAppearance,
  type ToggleBorderRadius,
  type ToggleSize,
} from "../Toggle";
import {
  toggleGroupClasses,
  toggleGroupItemClasses,
} from "./ToggleGroup.classes";
import type {
  ToggleGroupItemProps,
  ToggleGroupProps,
} from "./ToggleGroup.types";

const ToggleGroupContext = createContext<{
  appearance?: ToggleAppearance;
  size?: ToggleSize;
  borderRadius?: ToggleBorderRadius;
  joined: boolean;
}>({ joined: false });

export const ToggleGroup = ({
  className,
  appearance,
  size,
  borderRadius,
  joined = false,
  orientation,
  children,
  ...props
}: ToggleGroupProps) => (
  <Root
    data-part="toggle-group"
    data-appearance={appearance}
    data-size={size}
    data-radius={borderRadius}
    data-joined={joined || undefined}
    data-orientation={orientation ?? "horizontal"}
    orientation={orientation}
    className={cn(toggleGroupClasses, className)}
    {...props}
  >
    <ToggleGroupContext.Provider
      value={{ appearance, size, borderRadius, joined }}
    >
      {children}
    </ToggleGroupContext.Provider>
  </Root>
);

export const ToggleGroupItem = ({
  className,
  appearance = "outline",
  size = "base",
  borderRadius,
  ...props
}: ToggleGroupItemProps) => {
  const group = useContext(ToggleGroupContext);
  const itemAppearance = group.appearance ?? appearance;
  const itemSize = group.size ?? size;
  const itemBorderRadius = group.borderRadius ?? borderRadius;
  return (
    <Item
      data-part="toggle-group-item"
      data-appearance={itemAppearance}
      data-size={itemSize}
      data-radius={itemBorderRadius}
      data-joined={group.joined || undefined}
      className={cn(
        toggleClasses({
          appearance: itemAppearance,
          size: itemSize,
          borderRadius: itemBorderRadius,
        }),
        toggleGroupItemClasses,
        className,
      )}
      {...props}
    />
  );
};
