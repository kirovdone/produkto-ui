import type { CSSProperties } from "react";

const isVariable = (name: string): name is `--${string}` =>
  name.startsWith("--");

export const cssVariables = (
  values: Record<string, string | number | undefined>,
): CSSProperties => {
  const style: { [name: `--${string}`]: string | number | undefined } = {};
  for (const [name, value] of Object.entries(values)) {
    if (isVariable(name)) style[name] = value;
  }
  return style;
};
