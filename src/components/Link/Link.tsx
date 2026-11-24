import { HostLink } from "../../host";
import { cn } from "../../cn";
import { linkClasses } from "./Link.classes";
import type { LinkButtonProps, LinkProps } from "./Link.types";

const isButton = (props: LinkProps): props is LinkButtonProps =>
  props.href === undefined;

export const Link = (props: LinkProps) => {
  if (isButton(props)) {
    const {
      underline = false,
      muted = false,
      size,
      className,
      ...rest
    } = props;
    return (
      <button
        type="button"
        data-part="link"
        data-size={size}
        className={cn(linkClasses({ underline, muted, size }), className)}
        {...rest}
      />
    );
  }
  const { underline = false, muted = false, size, className, ...rest } = props;
  return (
    <HostLink
      data-part="link"
      data-size={size}
      className={cn(linkClasses({ underline, muted, size }), className)}
      {...rest}
    />
  );
};
