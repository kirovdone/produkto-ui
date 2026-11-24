import type { ComponentProps } from "react";
import type { Appearance } from "../../recipes/appearance";
import type { BoxBorderRadius } from "../../recipes/borderRadius";
import type { Size } from "../../recipes/size";

export type CardSize = Extract<Size, "sm" | "base" | "lg">;

export type CardBorderRadius = BoxBorderRadius;

export type CardAppearance = Appearance;

export type CardOverflow = "hidden" | "visible";

export interface CardProps extends ComponentProps<"div"> {
  appearance?: CardAppearance;
  size?: CardSize;
  borderRadius?: CardBorderRadius;
  overflow?: CardOverflow;
  disabled?: boolean;
}

export type CardHeaderProps = ComponentProps<"div">;

export type CardTitleText = "heading" | "label" | "body" | "description";

export type CardTitleProps = ComponentProps<"div"> & {
  truncate?: boolean;
  text?: CardTitleText;
};

export type CardDescriptionProps = ComponentProps<"div"> & {
  truncate?: boolean;
};

export type CardActionProps = ComponentProps<"div">;

export type CardContentProps = ComponentProps<"div">;

export type CardMediaProps = ComponentProps<"div">;

export type CardFooterProps = ComponentProps<"div">;
