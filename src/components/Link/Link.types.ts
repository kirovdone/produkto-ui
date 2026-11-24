import type { ComponentProps } from "react";
import type { HostLinkProps } from "../../host";
import type { TextSize } from "../Text/Text.types";

interface LinkLook {
  underline?: boolean;
  muted?: boolean;
  size?: TextSize;
}

export type LinkAnchorProps = LinkLook & HostLinkProps;

export type LinkButtonProps = LinkLook &
  Omit<ComponentProps<"button">, "type"> & { href?: undefined };

export type LinkProps = LinkAnchorProps | LinkButtonProps;
