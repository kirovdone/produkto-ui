"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../cn";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { revealClasses } from "./Reveal.classes";
import type { RevealProps } from "./Reveal.types";

const WATCH: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -8% 0px",
};

const subscribe = () => () => {};

const watchable = () => typeof IntersectionObserver !== "undefined";

export const Reveal = ({
  asChild = false,
  className,
  ref,
  ...props
}: RevealProps) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const observable = useSyncExternalStore(subscribe, watchable, () => true);

  const setRefs = useCallback(
    (element: HTMLDivElement | null) => {
      setNode(element);
      if (typeof ref === "function") return ref(element);
      if (ref) ref.current = element;
    },
    [ref],
  );

  useEffect(() => {
    if (!node || visible || !observable) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setVisible(true);
      observer.disconnect();
    }, WATCH);
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, visible, observable]);

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-part="reveal"
      className={cn(revealClasses, className)}
      {...props}
      ref={setRefs}
      data-state={visible || !observable ? "visible" : "hidden"}
    />
  );
};
