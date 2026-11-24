import { cva } from "class-variance-authority";
import type { ToastAlign, ToastSide, ToastType } from "./Toast.types";
import { panelSurface } from "../../recipes/panel";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";

export const toastViewportClasses = cva(
  "group/toast-viewport pointer-events-none fixed z-9999 flex w-full max-w-100 gap-2 p-4 outline-none",
  {
    variants: {
      side: {
        top: "top-0 flex-col-reverse",
        bottom: "bottom-0 flex-col",
      } satisfies Record<ToastSide, string>,
      align: {
        start: "start-0",
        center: "inset-x-0 mx-auto",
        end: "end-0",
      } satisfies Record<ToastAlign, string>,
    },
    defaultVariants: {
      side: "bottom",
      align: "center",
    },
  },
);

export const toastClasses = cva(
  `pointer-events-auto relative grid w-full grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-y-0.5 overflow-hidden ${panelSurface} p-3 text-start body-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/60 [&>svg]:col-start-1 [&>svg]:row-span-2 [&>svg]:row-start-1 [&>svg]:me-2 motion-safe:data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom group-data-[side=top]/toast-viewport:data-[state=open]:slide-in-from-top motion-safe:data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:data-[swipe-direction=right]:slide-out-to-right data-[state=closed]:data-[swipe-direction=left]:slide-out-to-left data-[state=closed]:data-[swipe-direction=up]:slide-out-to-top data-[state=closed]:data-[swipe-direction=down]:slide-out-to-bottom data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=move]:translate-y-(--radix-toast-swipe-move-y) data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:translate-y-0 data-[swipe=cancel]:transition-[translate] data-[swipe=cancel]:duration-200 data-[swipe=cancel]:ease-out data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=end]:translate-y-(--radix-toast-swipe-end-y)`,
  {
    variants: {
      borderRadius: boxBorderRadiusVariants,
    },
    defaultVariants: {
      borderRadius: "lg",
    },
  },
);

export const toastIconClasses = cva("", {
  variants: {
    type: {
      success: "text-success",
      info: "text-info",
      warning: "text-warning",
      destructive: "text-destructive",
      loading: "motion-safe:animate-spin text-muted-foreground",
    } satisfies Record<ToastType, string>,
  },
});

export const toastTitleClasses = "col-start-2 body-sm";

export const toastDescriptionClasses = "col-start-2 description-sm";

export const toastActionClasses = "col-start-3 row-span-2 row-start-1 ms-4";

export const toastCloseClasses =
  "col-start-4 row-span-2 row-start-1 ms-2 text-muted-foreground transition-colors hover:text-foreground";
