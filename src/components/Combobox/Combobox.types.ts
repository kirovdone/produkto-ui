import type { ComponentProps, ReactNode } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { PopoverContent } from "../Popover";
import type { InputBorderRadius, InputSize } from "../Input";

export type ComboboxRender = {
  render(item: unknown, index: number): ReactNode;
}["render"];

export interface ComboboxItemGroup<Item> {
  value?: unknown;
  items: readonly Item[];
}

export type ComboboxSelection<Item, Multiple> = Multiple extends true
  ? Item[]
  : Item | null;

export interface ComboboxProps<
  Item = unknown,
  Multiple extends boolean | undefined = false,
> {
  items?: readonly (Item | ComboboxItemGroup<Item>)[];
  itemToStringValue?: (item: NoInfer<Item>) => string;
  filter?: ((item: NoInfer<Item>, query: string) => boolean) | null;
  multiple?: Multiple;
  value?: ComboboxSelection<Item, Multiple>;
  defaultValue?: ComboboxSelection<Item, Multiple>;
  onValueChange?: (value: ComboboxSelection<NoInfer<Item>, Multiple>) => void;
  autoHighlight?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  form?: string;
  required?: boolean;
  children?: ReactNode;
}

export interface ComboboxInputProps extends Omit<
  ComponentProps<"input">,
  "size" | "children"
> {
  showTrigger?: boolean;
  clearable?: boolean;
  loading?: boolean;
  appearance?: ComboboxAppearance;
  borderRadius?: InputBorderRadius;
  size?: InputSize;
  start?: ReactNode;
  end?: ReactNode;
  error?: ReactNode;
}

export type ComboboxAppearance = Appearance;

export interface ComboboxTriggerProps extends ComponentProps<"button"> {
  asChild?: boolean;
  appearance?: ComboboxAppearance;
  size?: InputSize;
  borderRadius?: InputBorderRadius;
}

export interface ComboboxValueProps {
  children?: ReactNode | { render(value: unknown): ReactNode }["render"];
  placeholder?: ReactNode;
}

export type ComboboxContentProps = ComponentProps<typeof PopoverContent>;

export interface ComboboxListProps extends Omit<
  ComponentProps<"div">,
  "children"
> {
  children?: ReactNode | ComboboxRender;
}

export interface ComboboxItemProps extends Omit<
  ComponentProps<"div">,
  "value"
> {
  value: unknown;
  disabled?: boolean;
}

export interface ComboboxGroupProps extends ComponentProps<"div"> {
  items?: readonly unknown[];
}

export type ComboboxLabelProps = ComponentProps<"div">;

export interface ComboboxCollectionProps {
  children: ComboboxRender;
}

export type ComboboxEmptyProps = Omit<ComponentProps<"div">, "children">;

export type ComboboxSeparatorProps = ComponentProps<"div">;

export interface ComboboxChipsProps extends ComponentProps<"div"> {
  appearance?: ComboboxAppearance;
  size?: InputSize;
  borderRadius?: InputBorderRadius;
  showTrigger?: boolean;
  error?: ReactNode;
}

export interface ComboboxChipProps extends ComponentProps<"span"> {
  value?: unknown;
  showRemove?: boolean;
}

export type ComboboxChipsInputProps = Omit<ComponentProps<"input">, "size">;
