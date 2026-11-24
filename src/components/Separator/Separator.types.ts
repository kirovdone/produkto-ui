import type { Root } from "@radix-ui/react-separator";
import type { ComponentProps } from "react";

export type SeparatorProps = ComponentProps<typeof Root>;

export type SeparatorOrientation = NonNullable<SeparatorProps["orientation"]>;
