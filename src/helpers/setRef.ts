import type { Ref } from "react";

export const setRef = <T>(ref: Ref<T> | undefined, node: T | null): void => {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
};
