"use client";

import { ImageNotFound01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import { cn } from "../../cn";
import { useState } from "react";
import { imageClasses, imageFallbackClasses } from "./Image.classes";
import type { ImageProps } from "./Image.types";

export const Image = ({
  src,
  alt = "",
  width,
  height,
  className,
  style,
  borderRadius = "none",
  onError,
  children,
  ...props
}: ImageProps) => {
  const [failed, setFailed] = useState<string>();

  if (!src || failed === src)
    return (
      <div
        data-part="image-fallback"
        data-radius={borderRadius}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cn(
          imageFallbackClasses,
          imageClasses({ borderRadius }),
          className,
        )}
        style={{ width, height, ...style }}
      >
        {children ?? <Icon icon={ImageNotFound01Icon} />}
      </div>
    );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-part="image"
      data-radius={borderRadius}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(imageClasses({ borderRadius }), className)}
      style={style}
      onError={(event) => {
        onError?.(event);
        setFailed(src);
      }}
      {...props}
    />
  );
};
