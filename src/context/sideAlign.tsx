"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type DOMAttributes,
  type ReactNode,
  type SyntheticEvent,
} from "react";

type Side = "start" | "end";

interface SideAlign {
  side: Side;
  measure: (event: SyntheticEvent<Element>) => void;
}

const SideAlignContext = createContext<SideAlign | null>(null);

const PANELS = [
  "sidebar-inner",
  "card",
  "dialog-content",
  "drawer-content",
  "chat",
]
  .map((part) => `[data-part="${part}"]`)
  .join(",");

const sideOf = (trigger: Element): Side => {
  const box = trigger.getBoundingClientRect();
  const panel = trigger.closest(PANELS);
  const left = panel
    ? panel.getBoundingClientRect().left + panel.clientLeft
    : 0;
  const width = panel
    ? panel.clientWidth
    : document.documentElement.clientWidth;
  const offset = box.left + box.width / 2 - (left + width / 2);
  if (Math.abs(offset) < 1) return "start";
  return offset > 0 ? "end" : "start";
};

export const SideAlignProvider = ({ children }: { children: ReactNode }) => {
  const [side, setSide] = useState<Side>("start");
  const measure = useCallback(
    (event: SyntheticEvent<Element>) => setSide(sideOf(event.currentTarget)),
    [],
  );
  const value = useMemo(() => ({ side, measure }), [side, measure]);
  return <SideAlignContext value={value}>{children}</SideAlignContext>;
};

export const useSide = (): Side => use(SideAlignContext)?.side ?? "start";

type Opening<E extends Element> = Pick<
  DOMAttributes<E>,
  "onClick" | "onKeyDown" | "onPointerDown" | "onPointerEnter"
>;

export const useMeasuredSide = <E extends Element>({
  onClick,
  onKeyDown,
  onPointerDown,
  onPointerEnter,
}: Opening<E>): Opening<E> => {
  const measure = use(SideAlignContext)?.measure;
  if (!measure) return { onClick, onKeyDown, onPointerDown, onPointerEnter };
  return {
    onClick: (event) => {
      measure(event);
      onClick?.(event);
    },
    onKeyDown: (event) => {
      measure(event);
      onKeyDown?.(event);
    },
    onPointerDown: (event) => {
      measure(event);
      onPointerDown?.(event);
    },
    onPointerEnter: (event) => {
      measure(event);
      onPointerEnter?.(event);
    },
  };
};
