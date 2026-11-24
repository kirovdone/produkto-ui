import type { BoxBorderRadius } from "../../recipes/borderRadius";

export type VideoMode = "page" | "ground" | "large";

export type VideoBorderRadius = BoxBorderRadius;

export interface VideoProps {
  src: string;
  poster: string;
  alt: string;
  mode?: VideoMode;
  borderRadius?: VideoBorderRadius;
  className?: string;
}
