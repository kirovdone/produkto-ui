"use client";

import {
  Alert02Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Loading03Icon,
  MultiplicationSignCircleIcon,
} from "@hugeicons/core-free-icons";
import {
  Action,
  Close,
  Description,
  Provider,
  Root,
  Title,
  Viewport,
} from "@radix-ui/react-toast";
import { cn } from "../../cn";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { buttonClasses } from "../Button";
import { Icon, type IconSvgElement } from "../Icon";
import { usePortalContainer } from "../../context/portalContainer";
import { useTranslate } from "../../host";
import {
  toastActionClasses,
  toastClasses,
  toastCloseClasses,
  toastDescriptionClasses,
  toastIconClasses,
  toastTitleClasses,
  toastViewportClasses,
} from "./Toast.classes";
import type {
  ToastActionOptions,
  ToastActionProps,
  ToastAlign,
  ToastCloseProps,
  ToastDescriptionProps,
  ToasterProps,
  ToastOptions,
  ToastPromiseOptions,
  ToastProps,
  ToastProviderProps,
  ToastSide,
  ToastTitleProps,
  ToastType,
  ToastViewportProps,
} from "./Toast.types";

type Swipe = NonNullable<ToastProviderProps["swipeDirection"]>;

interface Place {
  side: ToastSide;
  align: ToastAlign;
}

const SIDE: ToastSide = "bottom";

const ALIGN: ToastAlign = "center";

const swipeOf = ({ side, align }: Place): Swipe =>
  align === "start"
    ? "left"
    : align === "end"
      ? "right"
      : side === "top"
        ? "up"
        : "down";

const keyOf = ({ side, align }: Place) => `${side}-${align}`;

const HOTKEY = ["F8"];

const NO_KEYS: string[] = [];

const PlaceViewport = createContext<(swipe: Swipe) => void>(() => {});

const subscribeNever = () => () => {};

const watchToasts = (
  list: HTMLOListElement,
  onFilled: (filled: boolean) => void,
) => {
  let frame = 0;
  const observer = new MutationObserver(() => {
    onFilled(list.childElementCount > 0);
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const region = list.parentElement;
        if (region && !region.matches(":hover"))
          region.dispatchEvent(new Event("pointerleave"));
      });
    });
  });
  observer.observe(list, { childList: true });
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
  };
};

export const ToastProvider = ({
  swipeDirection,
  children,
  ...props
}: ToastProviderProps) => {
  const [swipe, setSwipe] = useState<Swipe>(
    swipeOf({ side: SIDE, align: ALIGN }),
  );
  return (
    <Provider swipeDirection={swipeDirection ?? swipe} {...props}>
      <PlaceViewport.Provider value={setSwipe}>
        {children}
      </PlaceViewport.Provider>
    </Provider>
  );
};

export const ToastViewport = ({
  side = SIDE,
  align = ALIGN,
  hotkey = HOTKEY,
  label,
  className,
  ref,
  ...props
}: ToastViewportProps) => {
  const t = useTranslate();
  const container = usePortalContainer();
  const place = useContext(PlaceViewport);
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  const [list, setList] = useState<HTMLOListElement | null>(null);
  const [filled, setFilled] = useState(false);
  const refs = useCallback(
    (node: HTMLOListElement | null) => {
      setList(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );
  useEffect(() => place(swipeOf({ side, align })), [place, side, align]);
  useEffect(() => (list ? watchToasts(list, setFilled) : undefined), [list]);
  return mounted
    ? createPortal(
        <Viewport
          ref={refs}
          data-part="toast-viewport"
          data-side={side}
          data-align={align}
          hotkey={filled ? hotkey : NO_KEYS}
          label={(label ?? t("Notifications ({hotkey})")).replace(
            "{hotkey}",
            hotkey.join("+").replace(/Key|Digit/g, ""),
          )}
          className={cn(toastViewportClasses({ side, align }), className)}
          {...props}
        />,
        container ?? document.body,
      )
    : null;
};

export const Toast = ({
  className,
  borderRadius = "lg",
  ...props
}: ToastProps) => (
  <Root
    data-part="toast"
    data-radius={borderRadius}
    className={cn(toastClasses({ borderRadius }), className)}
    {...props}
  />
);

export const ToastTitle = ({ className, ...props }: ToastTitleProps) => (
  <Title
    data-part="toast-title"
    className={cn(toastTitleClasses, className)}
    {...props}
  />
);

export const ToastDescription = ({
  className,
  ...props
}: ToastDescriptionProps) => (
  <Description
    data-part="toast-description"
    className={cn(toastDescriptionClasses, className)}
    {...props}
  />
);

export const ToastAction = ({
  className,
  appearance = "outline",
  tone = "neutral",
  size = "sm",
  ...props
}: ToastActionProps) => (
  <Action
    data-part="toast-action"
    data-appearance={appearance}
    data-tone={tone}
    data-size={size}
    className={cn(
      buttonClasses({ appearance, tone, size }),
      toastActionClasses,
      className,
    )}
    {...props}
  />
);

export const ToastClose = ({ className, ...props }: ToastCloseProps) => {
  const t = useTranslate();
  return (
    <Close
      data-part="toast-close"
      aria-label={t("Close")}
      className={cn(
        buttonClasses({ appearance: "transparent", size: "xs", square: true }),
        toastCloseClasses,
        className,
      )}
      {...props}
    >
      <Icon icon={Cancel01Icon} />
    </Close>
  );
};

interface QueuedToast extends Omit<ToastOptions, "id"> {
  id: string;
  key: number;
  type?: ToastType;
  title: ReactNode;
  open: boolean;
  replaced: boolean;
}

const LEAVE_MS = 1000;

let queue: QueuedToast[] = [];
let made = 0;
const hosts = new Set<symbol>();
const listeners = new Set<() => void>();

const publish = (next: QueuedToast[]) => {
  queue = next;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const leave = (leaving: QueuedToast[]) => {
  if (!leaving.length) return;
  const keys = leaving.map((item) => item.key);
  publish(
    queue.map((item) =>
      keys.includes(item.key) ? { ...item, open: false } : item,
    ),
  );
  setTimeout(
    () => publish(queue.filter((item) => !keys.includes(item.key))),
    LEAVE_MS,
  );
};

const close = (key: number) =>
  leave(queue.filter((item) => item.open && item.key === key));

const dismiss = (id?: string) =>
  leave(
    queue.filter((item) => item.open && (id === undefined || item.id === id)),
  );

const show = (
  type: ToastType | undefined,
  title: ReactNode,
  { id, ...options }: ToastOptions = {},
): string => {
  made += 1;
  const key = made;
  const current =
    id === undefined
      ? undefined
      : queue.find((item) => item.open && item.id === id);
  if (current) {
    publish(
      queue.map((item) =>
        item === current
          ? { ...item, ...options, key, type, title, replaced: true }
          : item,
      ),
    );
    return current.id;
  }
  const entry: QueuedToast = {
    ...options,
    id: id ?? `toast-${key}`,
    key,
    type,
    title,
    open: true,
    replaced: false,
  };
  publish([...queue, entry]);
  return entry.id;
};

const typed =
  (type: ToastType) =>
  (title: ReactNode, options?: ToastOptions): string =>
    show(type, title, options);

const promise = <Data,>(
  task: Promise<Data> | (() => Promise<Data>),
  { loading, success, destructive, ...options }: ToastPromiseOptions<Data>,
): string => {
  const id = show("loading", loading, options);
  new Promise<Data>((resolve) =>
    resolve(typeof task === "function" ? task() : task),
  ).then(
    (data) => {
      show("success", typeof success === "function" ? success(data) : success, {
        ...options,
        id,
      });
    },
    (reason: unknown) => {
      show(
        "destructive",
        typeof destructive === "function" ? destructive(reason) : destructive,
        { ...options, id },
      );
    },
  );
  return id;
};

export const toast = Object.assign(
  (title: ReactNode, options?: ToastOptions): string =>
    show(undefined, title, options),
  {
    success: typed("success"),
    info: typed("info"),
    warning: typed("warning"),
    destructive: typed("destructive"),
    loading: typed("loading"),
    promise,
    dismiss,
  },
);

const TYPE_ICONS: Record<ToastType, IconSvgElement> = {
  success: CheckmarkCircle02Icon,
  info: InformationCircleIcon,
  warning: Alert02Icon,
  destructive: MultiplicationSignCircleIcon,
  loading: Loading03Icon,
};

const STILL: CSSProperties = { animationName: "none" };

const QueuedAction = ({ label, altText, ...props }: ToastActionOptions) => (
  <ToastAction
    altText={altText ?? (typeof label === "string" ? label : "")}
    {...props}
  >
    {label}
  </ToastAction>
);

const Queued = ({ item }: { item: QueuedToast }) => (
  <Toast
    duration={item.type === "loading" ? Infinity : item.duration}
    onOpenChange={(open) => {
      if (!open) close(item.key);
    }}
    open={item.open}
    borderRadius={item.borderRadius}
    style={item.replaced && item.open ? STILL : undefined}
  >
    {item.type ? (
      <Icon
        icon={TYPE_ICONS[item.type]}
        aria-hidden
        className={toastIconClasses({ type: item.type })}
      />
    ) : null}
    <ToastTitle>{item.title}</ToastTitle>
    {item.description ? (
      <ToastDescription>{item.description}</ToastDescription>
    ) : null}
    {item.action ? <QueuedAction {...item.action} /> : null}
    <ToastClose />
  </Toast>
);

export const Toaster = ({
  side = SIDE,
  align = ALIGN,
  duration,
  className,
}: ToasterProps) => {
  const [host] = useState(() => Symbol("Toaster"));
  const shown = useSyncExternalStore(
    subscribe,
    () => (hosts.values().next().value === host ? queue : null),
    () => null,
  );
  useEffect(() => {
    hosts.add(host);
    publish(queue);
    return () => {
      hosts.delete(host);
      publish(queue);
    };
  }, [host]);
  if (!shown) return null;
  const placed = (item: QueuedToast): Place => ({
    side: item.side ?? side,
    align: item.align ?? align,
  });
  const places = [
    ...new Map(
      [{ side, align }, ...shown.map(placed)].map((place) => [
        keyOf(place),
        place,
      ]),
    ).values(),
  ];
  return (
    <>
      {places.map((at) => (
        <ToastProvider duration={duration} key={keyOf(at)}>
          {shown
            .filter((item) => keyOf(placed(item)) === keyOf(at))
            .map((item) => (
              <Queued item={item} key={item.key} />
            ))}
          <ToastViewport
            className={className}
            side={at.side}
            align={at.align}
          />
        </ToastProvider>
      ))}
    </>
  );
};
