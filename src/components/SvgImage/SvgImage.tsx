"use client";

import { cn } from "../../cn";
import SVG from "react-inlinesvg";
import { cleanSvg } from "../../helpers/cleanSvg";
import { cssVariables } from "../../helpers/cssVariables";
import { svgImageClasses } from "./SvgImage.classes";
import type { SvgImageProps } from "./SvgImage.types";

const STROKE_WIDTH = /stroke(?:-width|Width)="[^"]*"/g;
const DEFAULT_STROKE_WIDTH = 1.5;

const strokeWidthOf = (value: number | string | undefined): number => {
  const width = typeof value === "string" ? Number(value.trim()) : value;
  return typeof width === "number" && Number.isFinite(width) && width > 0
    ? width
    : DEFAULT_STROKE_WIDTH;
};

export const SvgImage = ({
  src,
  size = 24,
  strokeWidth,
  className,
  style,
  children,
  ...props
}: SvgImageProps) => {
  const named = Boolean(props["aria-label"] || props["aria-labelledby"]);
  const width = strokeWidthOf(strokeWidth);
  return (
    <span
      data-part="svg-image"
      aria-hidden={named ? undefined : true}
      role={named ? "img" : undefined}
      className={cn(svgImageClasses, className)}
      style={{ ...cssVariables({ "--svg-image-size": `${size}px` }), ...style }}
      {...props}
    >
      <SVG
        key={`${src}-${width}`}
        src={src}
        preProcessor={(code) =>
          (cleanSvg(code) ?? "").replace(
            STROKE_WIDTH,
            `stroke-width="${width}"`,
          )
        }
      >
        {children}
      </SVG>
    </span>
  );
};
