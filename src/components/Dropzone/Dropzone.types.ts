import type {
  ComponentProps,
  ComponentType,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";
import type { IconSvgElement } from "../Icon";

export type DropzoneSource = "device" | "library";

export type DropzoneMedia = "image" | "icon" | "file" | "video";

export type DropzoneSize = Extract<Size, "sm" | "base" | "lg">;

export type DropzoneBorderRadius = BoxBorderRadius;

export interface DropzoneFile {
  key: string;
  name?: string;
  src?: string;
  preview?: string;
  alt?: string;
  data?: string;
  file?: File;
  media?: DropzoneMedia;
}

interface DropzoneTileProps {
  media?: DropzoneMedia;
  size?: DropzoneSize;
  borderRadius?: DropzoneBorderRadius;
  src?: string;
  alt?: string;
  icon?: IconSvgElement;
  label?: string;
}

export interface DropzoneItemLinkProps
  extends DropzoneTileProps, Omit<ComponentProps<"a">, "children" | "media"> {
  actionIcon?: IconSvgElement;
}

export interface DropzoneItemProps
  extends
    DropzoneTileProps,
    Omit<ComponentProps<"button">, "children" | "onClick" | "type"> {
  loading?: boolean;
  invalid?: boolean;
  onRemove: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => void;
}

export interface FilesPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: DropzoneFile[];
  onValueChange: (value: DropzoneFile[]) => void;
  maxFiles: number;
  accept?: readonly string[];
}

export interface DropzoneProps extends Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange"
> {
  source?: DropzoneSource;
  media?: DropzoneMedia;
  size?: DropzoneSize;
  borderRadius?: DropzoneBorderRadius;
  value?: DropzoneFile[];
  defaultValue?: DropzoneFile[];
  onValueChange?: (value: DropzoneFile[]) => void;
  accept?: string | readonly string[];
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  block?: boolean;
  picker?: ComponentType<FilesPickerProps>;
  error?: ReactNode;
}
