import { MoreHorizontalCircle01Icon } from "@hugeicons/core-free-icons";
import { cn } from "../../cn";
import { Icon } from "../Icon";
import { ellipsisClasses } from "./Ellipsis.classes";
import type { EllipsisProps } from "./Ellipsis.types";

export const Ellipsis = ({ className, children, ...props }: EllipsisProps) => (
  <span
    data-part="ellipsis"
    role="presentation"
    aria-hidden="true"
    className={cn(ellipsisClasses, className)}
    {...props}
  >
    <Icon icon={MoreHorizontalCircle01Icon} />
    {children}
  </span>
);
