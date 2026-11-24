export const formatCssColor = (color?: string | null): string | null =>
  color
    ? color
        .trim()
        .replace(/\s*([(),/])\s*/g, "$1")
        .replace(/\s+/g, " ")
    : null;
