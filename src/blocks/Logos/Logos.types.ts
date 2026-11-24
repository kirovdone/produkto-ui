import type { ReactNode } from "react";

export interface LogoItem {
  name: string;
  media?: ReactNode;
}

export type LogosLayout = "row" | "grid" | "marquee" | "split";

export type LogosColumns = 3 | 4;

export interface LogosProps {
  id?: string;
  title?: ReactNode;
  logos?: (LogoItem | ReactNode)[];
  layout?: LogosLayout;
  muted?: boolean;
  className?: string;
}
