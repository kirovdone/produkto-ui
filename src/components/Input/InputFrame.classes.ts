import { cva } from "class-variance-authority";
import type { InputBorderRadius } from "./Input.types";
import type { InputFrameAddonAlign } from "./InputFrame.types";
import { borderRadiusVariants } from "../../recipes/borderRadius";
import { controlLook, framePaint, markLook } from "../../recipes/appearance";
import { fieldMotion } from "../../recipes/field";
import { glyphRow } from "../../recipes/menu";

export const inputFrameClasses = cva(
  `group/input-frame relative flex min-h-10 data-[size=sm]:min-h-8 data-[size=lg]:min-h-12 w-full min-w-0 items-center rounded-lg body-sm ${fieldMotion} hover:border-foreground/20 has-[>textarea]:items-stretch has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:items-stretch has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:items-stretch has-[>[data-align=inline-start]]:[&>[data-part=input-frame-control]]:ps-1.5 has-[>[data-align=inline-start]>button[data-size=xs]]:[&>[data-part=input-frame-control]]:ps-[3.5px] has-[>[data-align=inline-end]]:[&>[data-part=input-frame-control]]:pe-1.5 has-[>[data-align=inline-end]>button[data-size=xs]]:[&>[data-part=input-frame-control]]:pe-[3.5px] has-[[data-part=input-frame-control]:focus-visible]:border-foreground/35 has-[[data-part=input-frame-control][aria-invalid=true]]:border-destructive/60 has-[[data-part=input-frame-control][aria-invalid=true]:focus-visible]:border-destructive has-[[data-part=input-frame-control][data-invalid]]:border-destructive/60 has-[[data-part=input-frame-control][data-invalid]:focus-visible]:border-destructive has-[[data-part=input-frame-control]:disabled]:cursor-not-allowed has-[[data-part=input-frame-control]:disabled]:opacity-50`,
  {
    variants: {
      appearance: framePaint,
      borderRadius: {
        none: `${borderRadiusVariants.none} [--inner-radius:0px]`,
        xs: `${borderRadiusVariants.xs} [--inner-radius:var(--radius-xs)]`,
        sm: `${borderRadiusVariants.sm} [--inner-radius:var(--radius-sm)]`,
        base: `${borderRadiusVariants.base} [--inner-radius:var(--radius-md)]`,
        lg: `${borderRadiusVariants.lg} [--inner-radius:var(--radius-lg)]`,
        xl: `${borderRadiusVariants.xl} [--inner-radius:var(--radius-xl)]`,
        full: `${borderRadiusVariants.full} data-[size=sm]:rounded-full [--inner-radius:calc(infinity*1px)] [&>[data-part=input-frame-control]:first-child]:ps-4 [&>[data-part=input-frame-chips]>input:first-child]:ps-4`,
      } satisfies Record<InputBorderRadius, string>,
    },
    defaultVariants: {
      appearance: "solid",
      borderRadius: "base",
    },
  },
);

const addonButtonClasses =
  "[&>button]:rounded-(--inner-radius) [&>button]:shadow-none [&>button_svg:not([class*='size-'])]:size-4";

const addonSelectClasses =
  "[&>[data-part=select-trigger]]:my-1 [&>[data-part=select-trigger]]:min-h-0 [&>[data-part=select-trigger]]:py-0 [&>[data-part=select-trigger]]:self-stretch [&>[data-part=select-trigger]]:w-fit [&>[data-part=select-trigger]]:rounded-(--inner-radius) [&>[data-part=select-trigger]]:border-transparent [&>[data-part=select-trigger]]:bg-transparent [&>[data-part=select-trigger]]:text-foreground [&>[data-part=select-trigger]]:hover:border-transparent [&>[data-part=select-trigger]]:hover:bg-foreground/7 [&>[data-part=select-trigger]]:focus-visible:border-transparent [&>[data-part=select-trigger]]:focus-visible:bg-foreground/7";

export const inputFrameAddonClasses = cva(
  `flex cursor-text items-center justify-center label-sm text-muted-foreground select-none group-data-[disabled=true]/input-frame:opacity-50 ${glyphRow} ${addonButtonClasses} ${addonSelectClasses}`,
  {
    variants: {
      align: {
        "inline-start":
          "order-first self-stretch group-has-[>textarea]/input-frame:items-end group-has-[>textarea]/input-frame:pb-[3px] ps-[11px] group-data-[size=sm]/input-frame:ps-[7px] has-[>button]:ps-1 group-data-[size=lg]/input-frame:has-[>button]:ps-2 has-[>button[data-size=xs]]:ps-2 group-data-[size=sm]/input-frame:has-[>button[data-size=xs]]:ps-1",
        "inline-end":
          "order-last self-stretch group-has-[>textarea]/input-frame:items-end group-has-[>textarea]/input-frame:pb-[3px] group-data-[size=lg]/input-frame:group-has-[>textarea]/input-frame:pb-[7px] pe-[11px] group-data-[size=sm]/input-frame:pe-[7px] has-[>button]:pe-1 group-data-[size=lg]/input-frame:has-[>button]:pe-2 has-[>button[data-size=xs]]:pe-2 group-data-[size=sm]/input-frame:has-[>button[data-size=xs]]:pe-1",
        "block-start":
          "order-first w-full flex-wrap justify-start px-2 pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2 pb-2 [.border-t]:pt-2",
      } satisfies Record<InputFrameAddonAlign, string>,
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

export const inputFrameInputClasses =
  "h-auto flex-1 self-stretch rounded-none border-0 bg-transparent py-2 group-data-[size=sm]/input-frame:px-[7px] group-data-[size=sm]/input-frame:py-1 group-data-[size=lg]/input-frame:body-base sm:group-data-[size=lg]/input-frame:body-sm shadow-none hover:bg-transparent hover:shadow-none focus-visible:shadow-none disabled:opacity-100";

export const inputFrameTextareaClasses =
  "flex-1 resize-none rounded-none border-0 bg-transparent group-data-[size=lg]/input-frame:body-base sm:group-data-[size=lg]/input-frame:body-sm shadow-none hover:bg-transparent hover:shadow-none focus-visible:shadow-none disabled:opacity-100";

export const inputFrameChipsClasses =
  "flex min-w-0 flex-1 cursor-text flex-wrap items-center gap-1 self-stretch group-has-[>[data-align=inline-end]]/input-frame:pe-1 has-[>[data-part=input-frame-chip]]:py-1 has-[>[data-part=input-frame-chip]]:ps-1 group-data-[size=lg]/input-frame:has-[>[data-part=input-frame-chip]]:py-2 group-data-[size=lg]/input-frame:has-[>[data-part=input-frame-chip]]:ps-2 has-[>[data-part=input-frame-chip]]:[&>input]:py-0 has-[>[data-part=input-frame-chip]]:[&>input]:ps-1";

export const inputFrameChipClasses = `inline-flex h-7.5 max-w-full min-w-0 items-center gap-1 rounded-(--inner-radius) ps-2 pe-1.5 label-sm ${markLook("neutral", "outline")} group-data-[size=sm]/input-frame:h-5.5 group-data-[size=sm]/input-frame:pe-1 group-data-[size=sm]/input-frame:label-xs group-data-[size=sm]/input-frame:text-foreground`;

export const inputFrameChipTextClasses = "truncate";

export const inputFrameChipRemoveClasses = `flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition-colors [&_svg]:size-3.5 ${controlLook("destructive", "transparent")} group-data-[radius=full]/input-frame:rounded-full group-data-[size=sm]/input-frame:size-4 group-data-[size=sm]/input-frame:[&_svg]:size-3`;

export const inputFrameChipsInputClasses = "min-w-24 flex-1";
