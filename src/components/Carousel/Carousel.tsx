"use client";

import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";
import { Icon, type IconSvgElement } from "../Icon";
import { cn } from "../../cn";
import Fade from "embla-carousel-fade";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { useTranslate } from "../../host";
import { Button } from "../Button";
import {
  carouselClasses,
  carouselContentClasses,
  carouselDotClasses,
  carouselDotMarkClasses,
  carouselDotsClasses,
  carouselItemClasses,
  carouselStepClasses,
  carouselViewportClasses,
} from "./Carousel.classes";
import type {
  CarouselApi,
  CarouselContentProps,
  CarouselDotsProps,
  CarouselItemProps,
  CarouselNextProps,
  CarouselOrientation,
  CarouselPreviousProps,
  CarouselProps,
  CarouselStepDirection,
  CarouselStepProps,
} from "./Carousel.types";

const NO_SLIDES: HTMLElement[] = [];

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const IN_VIEW = 0.3;

interface CarouselParts {
  viewportRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  orientation: CarouselOrientation;
  slides: HTMLElement[];
  snaps: number;
  current: number;
  canGoBack: boolean;
  canGoForward: boolean;
}

const PartsContext = createContext<CarouselParts | null>(null);

const useParts = () => {
  const parts = useContext(PartsContext);
  if (!parts) throw new Error("Draw carousel parts inside a Carousel.");
  return parts;
};

const STEP_ICONS = {
  back: { horizontal: ArrowLeft01Icon, vertical: ArrowUp01Icon },
  forward: { horizontal: ArrowRight01Icon, vertical: ArrowDown01Icon },
} satisfies Record<
  CarouselStepDirection,
  Record<CarouselOrientation, IconSvgElement>
>;

const TYPING = ["INPUT", "SELECT", "TEXTAREA"];

const isTyping = (target: EventTarget) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || TYPING.includes(target.tagName));

const watch = (api: CarouselApi) => (notify: () => void) => {
  if (!api) return () => {};
  api.on("reInit", notify).on("select", notify);
  return () => {
    api.off("reInit", notify).off("select", notify);
  };
};

const useEmblaValue = <T,>(
  api: CarouselApi,
  value: (embla: NonNullable<CarouselApi>) => T,
  fallback: T,
) => {
  const subscribe = useMemo(() => watch(api), [api]);
  return useSyncExternalStore(
    subscribe,
    () => (api ? value(api) : fallback),
    () => fallback,
  );
};

export const Carousel = ({
  opts,
  plugins,
  orientation = "horizontal",
  setApi,
  interval,
  fade = false,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  className,
  ...props
}: CarouselProps) => {
  const t = useTranslate();
  const root = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [held, setHeld] = useState(false);
  const shownPlugins = useMemo(
    () => (fade ? [...(plugins ?? []), Fade()] : plugins),
    [fade, plugins],
  );
  const [viewportRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    shownPlugins,
  );
  const slides = useEmblaValue(api, (embla) => embla.slideNodes(), NO_SLIDES);
  const snaps = useEmblaValue(api, (embla) => embla.scrollSnapList().length, 0);
  const current = useEmblaValue(api, (embla) => embla.selectedScrollSnap(), 0);
  const canGoBack = useEmblaValue(api, (embla) => embla.canScrollPrev(), false);
  const canGoForward = useEmblaValue(
    api,
    (embla) => embla.canScrollNext(),
    false,
  );

  useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    const element = root.current;
    if (!interval || !element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSeen(Boolean(entry?.isIntersecting)),
      { threshold: IN_VIEW },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [interval]);

  useEffect(() => {
    if (!api || !interval || held || !seen || snaps < 2) return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const timer = setTimeout(
      () => api.scrollTo((current + 1) % snaps),
      interval,
    );
    return () => clearTimeout(timer);
  }, [api, interval, held, seen, current, snaps]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (!api || event.defaultPrevented || isTyping(event.target)) return;
    const across = orientation === "horizontal";
    const forwardKey = across ? "ArrowRight" : "ArrowDown";
    const backKey = across ? "ArrowLeft" : "ArrowUp";
    const moves: Record<string, () => void> = {
      [backKey]: () => api.scrollPrev(),
      [forwardKey]: () => api.scrollNext(),
      Home: () => api.scrollTo(0),
      End: () => api.scrollTo(api.scrollSnapList().length - 1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    move();
  };

  const parts = useMemo<CarouselParts>(
    () => ({
      viewportRef,
      api,
      orientation,
      slides,
      snaps,
      current,
      canGoBack,
      canGoForward,
    }),
    [
      viewportRef,
      api,
      orientation,
      slides,
      snaps,
      current,
      canGoBack,
      canGoForward,
    ],
  );

  return (
    <PartsContext value={parts}>
      <div
        ref={root}
        role="region"
        aria-roledescription={t("carousel")}
        data-part="carousel"
        data-orientation={orientation}
        data-fade={fade ? "" : undefined}
        onKeyDown={handleKeyDown}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          setHeld(true);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          setHeld(false);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          setHeld(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          setHeld(false);
        }}
        className={cn(carouselClasses, className)}
        {...props}
      />
    </PartsContext>
  );
};

export const CarouselContent = ({
  className,
  ...props
}: CarouselContentProps) => {
  const { viewportRef, orientation } = useParts();
  return (
    <div
      ref={viewportRef}
      data-part="carousel-viewport"
      className={carouselViewportClasses}
    >
      <div
        data-part="carousel-content"
        className={cn(carouselContentClasses({ orientation }), className)}
        {...props}
      />
    </div>
  );
};

export const CarouselItem = ({
  className,
  ref,
  ...props
}: CarouselItemProps) => {
  const t = useTranslate();
  const { orientation, slides } = useParts();
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const setRefs = useCallback(
    (element: HTMLDivElement | null) => {
      setNode(element);
      if (typeof ref === "function") return ref(element);
      if (ref) ref.current = element;
    },
    [ref],
  );

  const index = node ? slides.indexOf(node) : -1;

  return (
    <div
      role="group"
      aria-roledescription={t("slide")}
      aria-label={
        index < 0 ? undefined : `${index + 1} ${t("of")} ${slides.length}`
      }
      data-part="carousel-item"
      className={cn(carouselItemClasses({ orientation }), className)}
      {...props}
      ref={setRefs}
    />
  );
};

const CarouselStep = ({
  toward,
  appearance = "outline",
  size = "sm",
  onClick,
  className,
  children,
  ...props
}: CarouselStepProps) => {
  const t = useTranslate();
  const { api, orientation, canGoBack, canGoForward } = useParts();
  const back = toward === "back";
  const open = back ? canGoBack : canGoForward;
  const named = children === undefined || children === null;
  return (
    <Button
      data-part={back ? "carousel-previous" : "carousel-next"}
      aria-label={
        named ? (back ? t("Previous slide") : t("Next slide")) : undefined
      }
      appearance={appearance}
      size={size}
      borderRadius="full"
      aria-disabled={open ? undefined : true}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !open) return;
        if (back) api?.scrollPrev();
        else api?.scrollNext();
      }}
      className={cn(carouselStepClasses({ toward, orientation }), className)}
      {...props}
    >
      {children ?? <Icon icon={STEP_ICONS[toward][orientation]} />}
    </Button>
  );
};

export const CarouselPrevious = (props: CarouselPreviousProps) => (
  <CarouselStep toward="back" {...props} />
);

export const CarouselNext = (props: CarouselNextProps) => (
  <CarouselStep toward="forward" {...props} />
);

export const CarouselDots = ({
  max,
  className,
  ...props
}: CarouselDotsProps) => {
  const t = useTranslate();
  const { api, snaps, current } = useParts();
  if (snaps < 2) return null;
  const shown = Math.min(max ?? snaps, snaps);
  const first = Math.min(
    Math.max(current - Math.floor(shown / 2), 0),
    snaps - shown,
  );
  return (
    <div
      data-part="carousel-dots"
      className={cn(carouselDotsClasses, className)}
      {...props}
    >
      {Array.from({ length: shown }, (_, offset) => first + offset).map(
        (index) => (
          <button
            key={index}
            type="button"
            data-part="carousel-dot"
            aria-label={`${index + 1} ${t("of")} ${snaps}`}
            aria-current={index === current ? "true" : undefined}
            onClick={() => api?.scrollTo(index)}
            className={carouselDotClasses}
          >
            <span
              className={carouselDotMarkClasses({
                current: index === current,
              })}
            />
          </button>
        ),
      )}
    </div>
  );
};
