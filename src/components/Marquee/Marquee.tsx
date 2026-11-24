"use client";

import { useEffect, useRef } from "react";
import { cn } from "../../cn";
import {
  marqueeClasses,
  marqueeGroupClasses,
  marqueeTrackClasses,
} from "./Marquee.classes";
import type { MarqueeProps } from "./Marquee.types";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const DEFAULT_DURATION = 60000;

export const Marquee = ({
  duration = DEFAULT_DURATION,
  reverse = false,
  orientation = "horizontal",
  children,
  className,
  ...props
}: MarqueeProps) => {
  const track = useRef<HTMLDivElement>(null);
  const run = useRef<Animation | null>(null);

  useEffect(() => {
    const element = track.current;
    if (!element || typeof element.animate !== "function") return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const animation = element.animate(
      [
        { translate: "0 0" },
        { translate: orientation === "vertical" ? "0 -50%" : "-50% 0" },
      ],
      {
        duration,
        easing: "linear",
        iterations: Infinity,
        direction: reverse ? "reverse" : "normal",
      },
    );
    run.current = animation;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) animation.play();
      else animation.pause();
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      run.current = null;
      animation.cancel();
    };
  }, [duration, reverse, orientation]);

  return (
    <div
      data-part="marquee"
      data-orientation={orientation}
      className={cn(marqueeClasses({ orientation }), className)}
      onPointerEnter={() => run.current?.pause()}
      onPointerLeave={() => run.current?.play()}
      {...props}
    >
      <div
        ref={track}
        data-part="marquee-track"
        className={marqueeTrackClasses({ orientation })}
      >
        <div
          data-part="marquee-group"
          className={marqueeGroupClasses({ orientation })}
        >
          {children}
        </div>
        <div
          aria-hidden
          inert
          data-part="marquee-group"
          className={marqueeGroupClasses({ orientation })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
