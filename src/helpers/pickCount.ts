export const pickCount = <T extends number>(
  counts: readonly [T, ...T[]],
  value: number,
): T =>
  counts.find((count) => count === value) ??
  (value < counts[0] ? counts[0] : counts[counts.length - 1]);
