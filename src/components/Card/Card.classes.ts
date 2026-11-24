import { cva } from "class-variance-authority";
import { surfaceFill } from "../../recipes/appearance";
import type { CardOverflow, CardBorderRadius, CardSize } from "./Card.types";
import { glyphRow } from "../../recipes/menu";
import { boxBorderRadiusVariants } from "../../recipes/borderRadius";

export const cardClasses = cva(
  "group/card relative flex flex-col gap-(--card-spacing) p-(--card-spacing) text-start body-sm text-foreground",
  {
    variants: {
      appearance: surfaceFill,
      size: {
        sm: "[--card-spacing:--spacing(3)]",
        base: "[--card-spacing:--spacing(4)]",
        lg: "[--card-spacing:--spacing(5)]",
      } satisfies Record<CardSize, string>,
      borderRadius: {
        none: `${boxBorderRadiusVariants.none} [--card-radius:0px]`,
        xs: `${boxBorderRadiusVariants.xs} [--card-radius:var(--radius-sm)]`,
        sm: `${boxBorderRadiusVariants.sm} [--card-radius:var(--radius-md)]`,
        base: `${boxBorderRadiusVariants.base} [--card-radius:var(--radius-lg)]`,
        lg: `${boxBorderRadiusVariants.lg} [--card-radius:var(--radius-xl)]`,
        xl: `${boxBorderRadiusVariants.xl} [--card-radius:var(--radius-2xl)]`,
      } satisfies Record<CardBorderRadius, string>,
      overflow: {
        hidden: "overflow-hidden",
        visible: "overflow-visible",
      } satisfies Record<CardOverflow, string>,
      disabled: {
        true: "pointer-events-none opacity-50 select-none",
        false: "",
      },
    },
    compoundVariants: [{ appearance: "soft", className: "border-border" }],
    defaultVariants: {
      appearance: "solid",
      size: "base",
      borderRadius: "base",
      overflow: "hidden",
      disabled: false,
    },
  },
);

export const cardHeaderClasses =
  "group/card-header @container/card-header grid grid-cols-[minmax(0,1fr)] auto-rows-min items-start gap-1 has-data-[part=card-action]:grid-cols-[minmax(0,1fr)_auto] has-data-[part=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)";

export const cardTitleClasses = `flex items-center heading-base group-data-[size=sm]/card:heading-sm group-data-[size=lg]/card:heading-lg ${glyphRow}`;

export const cardLabelTitleClasses = `flex items-center label-base gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 group-data-[size=sm]/card:label-sm group-data-[size=sm]/card:gap-1 group-data-[size=sm]/card:[&_svg:not([class*='size-'])]:size-4 group-data-[size=sm]/card:[&_svg:not([stroke-width='0'])_*]:[stroke-width:1.9] group-data-[size=lg]/card:label-lg group-data-[size=lg]/card:gap-3 group-data-[size=lg]/card:[&_svg:not([class*='size-'])]:size-6`;

export const cardBodyTitleClasses = `flex items-center body-sm group-data-[size=lg]/card:body-base ${glyphRow}`;

export const cardDescriptionTitleClasses = `flex items-center description-sm group-data-[size=lg]/card:description-base ${glyphRow}`;

export const cardDescriptionClasses =
  "description-sm group-data-[size=sm]/card:description-xs group-data-[size=lg]/card:description-base";

export const cardTextTruncateClasses = "min-w-0 truncate";

export const cardMediaClasses =
  "-mx-(--card-spacing) overflow-hidden first:-mt-(--card-spacing) first:rounded-t-[calc(var(--card-radius)-1px)] last:-mb-(--card-spacing) last:rounded-b-[calc(var(--card-radius)-1px)]";

export const cardActionClasses =
  "col-start-2 row-start-1 flex items-center gap-2 self-start justify-self-end group-has-data-[part=card-description]/card-header:row-end-3";

export const cardFooterClasses =
  "flex items-center gap-2 [.border-t]:pt-(--card-spacing)";
