import type { ComponentProps } from "react";

export type TextSize =
  "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

export type TextWeight = "normal" | "medium" | "semibold";

export type TextAlign = "start" | "center" | "end";

interface TextOwnProps {
  asChild?: boolean;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  truncate?: boolean;
  muted?: boolean;
}

type TextSpanProps = { as?: "span" } & ComponentProps<"span">;

type TextDivProps = { as: "div" } & ComponentProps<"div">;

type TextLabelProps = { as: "label" } & ComponentProps<"label">;

type TextParagraphProps = { as: "p" } & ComponentProps<"p">;

export type TextProps = TextOwnProps &
  (TextSpanProps | TextDivProps | TextLabelProps | TextParagraphProps);
