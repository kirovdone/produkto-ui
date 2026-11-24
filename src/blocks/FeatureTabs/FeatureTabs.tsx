"use client";

import { cn } from "../../cn";
import { cssVariables } from "../../helpers/cssVariables";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";
import {
  featureTabBarClasses,
  featureTabBarFullClasses,
  featureTabBodyClasses,
  featureTabClasses,
  featureTabIconClasses,
  featureTabTextClasses,
  featureTabTitleClasses,
  featureTabsClasses,
  featureTabsLineClasses,
  featureTabsListClasses,
  featureTabsPanelClasses,
} from "./FeatureTabs.classes";
import type {
  FeatureTab,
  FeatureTabsOrientation,
  FeatureTabsProps,
} from "./FeatureTabs.types";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const TabWords = ({
  item,
  orientation,
}: {
  item: FeatureTab;
  orientation: FeatureTabsOrientation;
}) => (
  <>
    <span
      data-part="feature-tab-title"
      className={featureTabTitleClasses({ orientation })}
    >
      {item.title}
    </span>
    {item.body && (
      <span
        data-part="feature-tab-body"
        className={featureTabBodyClasses({ orientation })}
      >
        {item.body}
      </span>
    )}
  </>
);

export const FeatureTabs = ({
  items,
  orientation = "horizontal",
  value,
  defaultValue = 0,
  onValueChange,
  interval,
  loop = true,
  trail = false,
  line = true,
  barPlacement = "above",
  children,
  className,
}: FeatureTabsProps) => {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const run = useRef<Animation | null>(null);
  const [own, setOwn] = useState(defaultValue);
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);
  const current = value ?? own;
  const count = items.length;
  const open = items[current];
  const duration = open?.duration ?? interval;
  const moving =
    Boolean(duration) && count > 1 && (loop || current < count - 1);
  const paused = held || !visible;
  const horizontal = orientation === "horizontal";
  const choose = (next: number) => {
    if (value === undefined) setOwn(next);
    onValueChange?.(next);
  };
  const moveOn = useEffectEvent(() => choose((current + 1) % count));

  useEffect(() => {
    const element = root.current;
    if (!moving || !element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [moving]);

  useEffect(() => {
    const element = bar.current;
    if (!moving || !element || typeof element.animate !== "function") return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const animation = element.animate([{ scale: "0 1" }, { scale: "1 1" }], {
      duration,
      easing: "linear",
      fill: "both",
    });
    animation.pause();
    animation.onfinish = () => moveOn();
    run.current = animation;
    return () => {
      run.current = null;
      animation.cancel();
    };
  }, [moving, duration, current]);

  useEffect(() => {
    const animation = run.current;
    if (!animation) return;
    if (paused) animation.pause();
    else animation.play();
  }, [paused, duration, current]);

  return (
    <Root
      ref={root}
      data-part="feature-tabs"
      data-orientation={orientation}
      data-paused={moving && paused ? "" : undefined}
      orientation={orientation}
      value={String(current)}
      onValueChange={(next) => choose(Number(next))}
      className={cn(featureTabsClasses({ orientation }), className)}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <List
        data-part="feature-tabs-list"
        className={featureTabsListClasses({ orientation })}
        style={
          horizontal
            ? cssVariables({ "--feature-tabs-count": count })
            : undefined
        }
      >
        {items.map((item, i) => (
          <Trigger
            key={`${item.title}-${i}`}
            value={String(i)}
            data-part="feature-tab"
            data-past={trail && i < current ? true : undefined}
            className={featureTabClasses({ orientation, barPlacement })}
          >
            {!horizontal && item.icon && (
              <span
                aria-hidden
                data-part="feature-tab-icon"
                className={featureTabIconClasses}
              >
                {item.icon}
              </span>
            )}
            {horizontal ? (
              <TabWords item={item} orientation={orientation} />
            ) : (
              <span className={featureTabTextClasses}>
                <TabWords item={item} orientation={orientation} />
              </span>
            )}
            {horizontal && i === current && (
              <span
                ref={bar}
                aria-hidden
                data-part="feature-tab-bar"
                className={cn(
                  featureTabBarClasses({ barPlacement }),
                  !moving && featureTabBarFullClasses,
                )}
              />
            )}
          </Trigger>
        ))}
      </List>
      {horizontal && line && open?.body && (
        <p className={featureTabsLineClasses}>{open.body}</p>
      )}
      <Content
        value={String(current)}
        data-part="feature-tabs-panel"
        className={featureTabsPanelClasses}
      >
        {children ?? open?.media}
      </Content>
    </Root>
  );
};
