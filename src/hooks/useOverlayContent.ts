"use client";

import { useCallback, useState, type Ref } from "react";
import { getTheme } from "../helpers/getTheme";
import { useUiHost } from "../host";
import { useReturnFocus } from "./useReturnFocus";
import { setRef as assignRef } from "../helpers/setRef";

interface OverlayContentOptions<T extends HTMLElement> {
  ref?: Ref<T>;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
}

export const useOverlayContent = <T extends HTMLElement>({
  ref,
  onOpenAutoFocus,
  onCloseAutoFocus,
}: OverlayContentOptions<T>) => {
  const { theme } = useUiHost();
  const returnFocus = useReturnFocus(onOpenAutoFocus, onCloseAutoFocus);
  const [node, setNode] = useState<T | null>(null);
  const setRef = useCallback(
    (element: T | null) => {
      setNode(element);
      assignRef(ref, element);
    },
    [ref],
  );
  return {
    node,
    props: {
      ref: setRef,
      "data-theme": theme ? getTheme(theme) : undefined,
      ...returnFocus,
    },
  };
};
