import type useEmblaCarousel from "embla-carousel-react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import type { ComponentProps } from "react";
import type { ButtonProps } from "../Button";

export type CarouselApi = UseEmblaCarouselType[1];

export type CarouselOptions = NonNullable<
  Parameters<typeof useEmblaCarousel>[0]
>;

export type CarouselPlugin = NonNullable<
  Parameters<typeof useEmblaCarousel>[1]
>[number];

export type CarouselOrientation = "horizontal" | "vertical";

export interface CarouselProps extends Omit<ComponentProps<"div">, "ref"> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin[];
  orientation?: CarouselOrientation;
  setApi?: (api: CarouselApi) => void;
  interval?: number;
  fade?: boolean;
}

export type CarouselContentProps = ComponentProps<"div">;

export type CarouselItemProps = ComponentProps<"div">;

export type CarouselPreviousProps = ButtonProps;

export type CarouselNextProps = ButtonProps;

export interface CarouselDotsProps extends ComponentProps<"div"> {
  max?: number;
}

export type CarouselStepDirection = "back" | "forward";

export interface CarouselStepProps extends ButtonProps {
  toward: CarouselStepDirection;
}
