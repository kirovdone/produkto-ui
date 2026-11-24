import type { ComponentProps } from "react";
import type { StatusTone } from "../../recipes/appearance";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type AlertTone = StatusTone;

export type AlertSize = Extract<Size, "sm" | "base" | "lg">;

export type AlertBorderRadius = BoxBorderRadius;

export interface AlertProps extends Omit<ComponentProps<"div">, "color"> {
  tone?: AlertTone;
  size?: AlertSize;
  borderRadius?: AlertBorderRadius;
}

export type AlertTitleProps = ComponentProps<"div">;

export type AlertActionProps = ComponentProps<"div">;
