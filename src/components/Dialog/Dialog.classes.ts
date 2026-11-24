import { cva } from "class-variance-authority";
import { transparentControl } from "../../recipes/control";
import { glyphRow } from "../../recipes/menu";
import {
  modalActions,
  modalBody,
  modalDescription,
  modalEnter,
  modalFrame,
  modalTitle,
  scrim,
} from "../../recipes/modal";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";
import type { DialogSize } from "./Dialog.types";

export const dialogOverlayClasses = scrim;

export const dialogContentClasses = cva(
  `group/dialog-content ${modalFrame} ${modalEnter}`,
  {
    variants: {
      size: {
        base: "sm:max-w-md",
        sm: "sm:max-w-sm",
        lg: "h-[calc(100dvh-1.5rem)] max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] bg-background sm:h-[80vh] sm:max-h-176 sm:max-w-2xl lg:max-w-4xl",
      } satisfies Record<DialogSize, string>,
      borderRadius: boxBorderRadiusVariants,
      scrollable: {
        true: "",
        false:
          "gap-4 p-4 has-[>[data-part=dialog-body]]:gap-0 has-[>[data-part=dialog-body]]:p-0 has-[>[data-part=dialog-tabs]]:gap-0 has-[>[data-part=dialog-tabs]]:p-0",
      },
    },
    defaultVariants: {
      size: "base",
      borderRadius: "lg",
      scrollable: true,
    },
  },
);

export const dialogScrollClasses = modalBody;

export const dialogScrollInnerClasses = "flex flex-col gap-4 p-4";

export const dialogCloseButtonClasses =
  "absolute top-2 end-2 group-has-[[data-part=dialog-header][data-bordered]]/dialog-content:top-3 group-has-[[data-part=dialog-header][data-bordered]]/dialog-content:end-3";

export const dialogHeaderClasses = cva("flex flex-col gap-2 pe-8", {
  variants: {
    bordered: {
      true: "box-content min-h-8 shrink-0 justify-center gap-0.5 border-b border-border p-3 pe-13",
      false: "",
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

export const dialogBodyClasses = modalBody;

export const dialogBodyInnerClasses = "space-y-3 p-3";

export const dialogFooterClasses = cva(modalActions, {
  variants: {
    bordered: {
      true: "box-content min-h-8 shrink-0 flex-row items-center justify-end border-t border-border p-3",
      false: "",
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

export const dialogTitleClasses = modalTitle;

export const dialogDescriptionClasses = modalDescription;

export const dialogTabsClasses = "flex h-full min-h-0 flex-col sm:flex-row";

export const dialogSidebarClasses =
  "group/dialog-sidebar shrink-0 border-b border-border bg-sidebar pe-11 transition-[width] ease-linear sm:w-48 sm:border-e sm:border-b-0 sm:pe-0 sm:data-[collapsed]:w-14 sm:[&>[data-part=scroll-area-viewport]>div]:block!";

export const dialogSidebarToggleClasses = "hidden sm:inline-flex";

export const dialogSidebarListClasses =
  "flex gap-2 p-3 text-foreground sm:flex-col";

export const dialogSidebarGroupClasses =
  "hidden shrink-0 px-2 pt-3 caption-xs first:pt-0 sm:block sm:group-data-[collapsed]/dialog-sidebar:hidden";

export const dialogTabClasses = `inline-flex h-8 shrink-0 cursor-pointer items-center overflow-hidden rounded-lg px-2 body-sm whitespace-nowrap transition-[width,color,background-color] outline-none ${transparentControl} disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-muted data-[state=active]:text-foreground sm:w-full sm:group-data-[collapsed]/dialog-sidebar:w-8 ${glyphRow}`;

export const dialogMainClasses = "flex min-h-0 min-w-0 flex-1 flex-col";

export const dialogTabHeaderClasses =
  "flex-row items-center justify-start gap-2";

export const dialogTabTitleClasses =
  "min-w-0 flex-1 truncate label-sm text-foreground";

export const dialogTrailClasses =
  "flex min-w-0 flex-1 items-center gap-2 label-sm";

export const dialogTrailRootClasses = "shrink-0 text-muted-foreground";

export const dialogTrailSeparatorClasses = "shrink-0 text-muted-foreground";

export const dialogPanelClasses = "flex min-h-0 flex-1 flex-col outline-none";

export const dialogPanelFillClasses = "flex min-h-0 flex-1 flex-col p-3";
