"use client";

import { BlockActions, Section } from "../../components/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/Carousel";
import { Image } from "../../components/Image";
import { Marquee } from "../../components/Marquee";
import { useTranslate } from "../../host";
import { useState } from "react";
import {
  galleryCaptionClasses,
  galleryClasses,
  galleryControlClasses,
  galleryControlsClasses,
  galleryFigureClasses,
  galleryImageClasses,
  galleryItemClasses,
  galleryMarqueeClasses,
  gallerySlideClasses,
  galleryTriggerClasses,
} from "./Gallery.classes";
import { GalleryLightbox } from "./GalleryLightbox";
import type { GalleryItem, GalleryLayout, GalleryProps } from "./Gallery.types";

const ratioOf = ({ width, height }: GalleryItem) =>
  width && height ? `${width} / ${height}` : undefined;

const Figure = ({
  item,
  layout,
  onOpen,
}: {
  item: GalleryItem;
  layout: GalleryLayout;
  onOpen: () => void;
}) => (
  <figure data-part="gallery-figure" className={galleryFigureClasses}>
    <button
      type="button"
      aria-haspopup="dialog"
      data-part="gallery-trigger"
      onClick={onOpen}
      className={galleryTriggerClasses({ layout })}
    >
      <Image
        alt={item.alt}
        src={item.src}
        loading="lazy"
        decoding="async"
        className={galleryImageClasses({ layout })}
        style={
          layout === "masonry" ? { aspectRatio: ratioOf(item) } : undefined
        }
      />
    </button>
    {item.caption && (
      <figcaption data-part="gallery-caption" className={galleryCaptionClasses}>
        {item.caption}
      </figcaption>
    )}
  </figure>
);

export const Gallery = ({
  items,
  layout = "grid",
  columns = 3,
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: GalleryProps) => {
  const t = useTranslate();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  if (!items?.length) return null;

  const show = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const figures = items.map((item, i) => ({
    key: `${item.src}-${i}`,
    figure: <Figure item={item} layout={layout} onOpen={() => show(i)} />,
  }));

  return (
    <Section
      id={id}
      data-part="gallery"
      data-layout={layout}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      <div className="flex flex-col gap-10 sm:gap-14">
        {layout === "carousel" ? (
          <Carousel
            aria-label={t("Gallery")}
            opts={{ align: "start" }}
            className={galleryClasses({ layout, columns })}
          >
            <CarouselContent>
              {figures.map(({ key, figure }) => (
                <CarouselItem
                  key={key}
                  className={gallerySlideClasses({ columns })}
                >
                  {figure}
                </CarouselItem>
              ))}
            </CarouselContent>
            <div
              data-part="gallery-controls"
              className={galleryControlsClasses}
            >
              <CarouselPrevious className={galleryControlClasses} />
              <CarouselNext className={galleryControlClasses} />
            </div>
          </Carousel>
        ) : layout === "marquee" ? (
          <Marquee
            data-part="gallery-marquee"
            className={galleryMarqueeClasses}
          >
            <ul role="list" className={galleryClasses({ layout, columns })}>
              {figures.map(({ key, figure }) => (
                <li key={key} className={galleryItemClasses}>
                  {figure}
                </li>
              ))}
            </ul>
          </Marquee>
        ) : (
          <ul role="list" className={galleryClasses({ layout, columns })}>
            {figures.map(({ key, figure }) => (
              <li key={key} className={galleryItemClasses}>
                {figure}
              </li>
            ))}
          </ul>
        )}
        <BlockActions actions={actions} align={align} />
      </div>
      <GalleryLightbox
        items={items}
        index={index}
        open={open}
        onOpenChange={setOpen}
        onIndexChange={setIndex}
      />
    </Section>
  );
};
