"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  type CarouselOptions,
} from "../../components/Carousel";
import {
  Card,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from "../../components/Card";
import { Image } from "../../components/Image";
import { HostLink, useTranslate } from "../../host";
import { cn } from "../../cn";
import {
  SectionHeader,
  sectionClasses,
  sectionContentClasses,
  sectionHeaderSpacingClasses,
  type SectionAlign,
} from "../../components/Section";
import {
  showcaseCardClasses,
  showcaseClasses,
  showcaseControlsClasses,
  showcaseImageClasses,
  showcaseLinkClasses,
  showcaseMediaClasses,
  showcasePageClasses,
  showcasePageMarkClasses,
  showcasePagerClasses,
  showcaseSlideClasses,
  showcaseTrackClasses,
} from "./Showcase.classes";
import type { ShowcaseItem, ShowcaseProps } from "./Showcase.types";

const OPTIONS: CarouselOptions = {
  loop: true,
  align: "center",
  containScroll: false,
};

const Slide = ({ item }: { item: ShowcaseItem }) => (
  <Card size="sm" className={showcaseCardClasses}>
    <CardMedia className={showcaseMediaClasses}>
      <Image
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className={showcaseImageClasses}
      />
    </CardMedia>
    <CardHeader>
      <CardTitle truncate>
        {item.link ? (
          <HostLink href={item.link} className={showcaseLinkClasses}>
            {item.title}
          </HostLink>
        ) : (
          item.title
        )}
      </CardTitle>
      {item.description && (
        <CardDescription truncate>{item.description}</CardDescription>
      )}
    </CardHeader>
  </Card>
);

const Slides = ({
  items,
  interval,
  align,
  label,
}: {
  items: ShowcaseItem[];
  interval?: number;
  align: SectionAlign;
  label?: string;
}) => {
  const t = useTranslate();
  const [api, setApi] = useState<CarouselApi>();

  const subscribe = useCallback(
    (notify: () => void) => {
      if (!api) return () => {};
      api.on("select", notify);
      api.on("reInit", notify);
      return () => {
        api.off("select", notify);
        api.off("reInit", notify);
      };
    },
    [api],
  );
  const selected = useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  );

  return (
    <div data-part="showcase-slides">
      <Carousel
        aria-label={label}
        opts={OPTIONS}
        interval={interval}
        setApi={setApi}
        className={showcaseClasses}
      >
        <CarouselContent className={showcaseTrackClasses}>
          {items.map((item, index) => (
            <CarouselItem
              key={`${item.src}-${index}`}
              className={showcaseSlideClasses}
            >
              <Slide item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div
          data-part="showcase-controls"
          className={cn(
            sectionContentClasses(),
            showcaseControlsClasses({ align }),
          )}
        >
          <div data-part="showcase-pager" className={showcasePagerClasses}>
            {items.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                aria-label={`${index + 1} ${t("of")} ${items.length}`}
                aria-current={index === selected ? "true" : undefined}
                onClick={() => api?.scrollTo(index)}
                className={showcasePageClasses}
              >
                <span
                  className={showcasePageMarkClasses({
                    current: index === selected,
                  })}
                />
              </button>
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export const Showcase = ({
  items,
  interval,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted,
  className,
}: ShowcaseProps) => {
  if (!items?.length) return null;
  return (
    <section
      id={id}
      data-part="showcase"
      className={cn(sectionClasses({ muted }), className)}
    >
      <div className={sectionContentClasses()}>
        <SectionHeader
          align={align}
          eyebrow={eyebrow}
          title={title}
          description={description}
          className={sectionHeaderSpacingClasses}
        />
      </div>
      <Slides
        items={items}
        interval={interval}
        align={align}
        label={typeof title === "string" ? title : undefined}
      />
    </section>
  );
};
