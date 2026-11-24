export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

export const isOneOf = <T extends string | number>(
  values: readonly T[],
  value: unknown,
): value is T => values.some((allowed) => allowed === value);

export const isObjectLike = (
  value: unknown,
): value is Record<string, unknown> => !!value && typeof value === "object";

export const toIdString = (value: unknown): unknown =>
  value === null || value === undefined ? value : String(value) || value;

export const asText = (value: unknown): string =>
  typeof value === "string" ? value : "";

export const asOptionalText = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

export const asNumber = (value: unknown): number | undefined =>
  typeof value === "number" ? value : undefined;

export const asTextOrNumber = (value: unknown): string | number | undefined =>
  typeof value === "string" || typeof value === "number" ? value : undefined;

export const toRecord = (value: unknown): Record<string, unknown> =>
  isObjectLike(value) ? value : {};

export const toList = (value: unknown): unknown[] =>
  Array.isArray(value) ? value : [];

export const instanceOf = <T>(
  type: abstract new (...args: never[]) => T,
  value: unknown,
): T => {
  if (value instanceof type) return value;
  throw new TypeError(`Expected ${type.name}, found ${String(value)}`);
};
