"use client";

import { BlockActions, BlockAvatar, Section } from "../../components/Section";
import { Card } from "../../components/Card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/Carousel";
import { Marquee } from "../../components/Marquee";
import { Rating } from "../../components/Rating";
import {
  testimonialAuthorClasses,
  testimonialAuthorTextClasses,
  testimonialCardClasses,
  testimonialFilmCardClasses,
  testimonialFilmClasses,
  testimonialClasses,
  testimonialItemClasses,
  testimonialNameClasses,
  testimonialQuoteClasses,
  testimonialRoleClasses,
  testimonialsArrowClasses,
  testimonialsArrowsClasses,
  testimonialsCarouselClasses,
  testimonialsClasses,
  testimonialsContentClasses,
  testimonialsControlsClasses,
  testimonialsMediaClasses,
  testimonialsMarqueeClasses,
  testimonialsMovingItemClasses,
  testimonialsMovingRowClasses,
  testimonialsPhotoClasses,
  testimonialsWallClasses,
} from "./Testimonials.classes";
import type {
  TestimonialItem,
  TestimonialLook,
  TestimonialsProps,
} from "./Testimonials.types";

const Testimonial = ({
  item,
  look,
}: {
  item: TestimonialItem;
  look: TestimonialLook;
}) => (
  <figure data-part="testimonial" className={testimonialClasses({ look })}>
    {item.rating ? <Rating readOnly size="sm" value={item.rating} /> : null}
    <blockquote
      data-part="testimonial-quote"
      className={testimonialQuoteClasses({ look })}
    >
      <p>&ldquo;{item.quote}&rdquo;</p>
    </blockquote>
    <figcaption
      data-part="testimonial-author"
      className={testimonialAuthorClasses}
    >
      <BlockAvatar
        name={item.author.name}
        size={look === "center" ? "lg" : "base"}
        src={item.author.avatar}
      />
      <div
        data-part="testimonial-author-text"
        className={testimonialAuthorTextClasses}
      >
        <div
          data-part="testimonial-name"
          className={testimonialNameClasses({ look })}
        >
          {item.author.name}
        </div>
        {item.author.role && (
          <div
            data-part="testimonial-role"
            className={testimonialRoleClasses({ look })}
          >
            {item.author.role}
          </div>
        )}
      </div>
    </figcaption>
  </figure>
);

const Quoted = ({ item }: { item: TestimonialItem }) => (
  <Card className={testimonialCardClasses}>
    <Testimonial item={item} look="card" />
  </Card>
);

export const Testimonials = ({
  items,
  layout = "grid",
  columns = 3,
  media,
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: TestimonialsProps) => {
  const [first] = items ?? [];
  if (!items?.length || !first) return null;
  const aligned = layout === "single" ? "center" : align;
  const half = Math.ceil(items.length / 2);
  const body =
    layout === "single" ? (
      <Testimonial item={first} look="center" />
    ) : layout === "photo" ? (
      <div data-part="testimonials-photo" className={testimonialsPhotoClasses}>
        {media ? (
          <div
            data-part="testimonials-media"
            className={testimonialsMediaClasses}
          >
            {media}
          </div>
        ) : null}
        <Testimonial item={first} look="start" />
      </div>
    ) : layout === "films" ? (
      <ul
        role="list"
        data-part="testimonials-films"
        className={testimonialsClasses({ columns })}
      >
        {items.map((item, i) => (
          <li
            key={`${item.author.name}-${i}`}
            data-part="testimonials-item"
            className={testimonialItemClasses}
          >
            <Card className={testimonialFilmCardClasses}>
              {item.media ? (
                <div
                  data-part="testimonial-film"
                  className={testimonialFilmClasses}
                >
                  {item.media}
                </div>
              ) : null}
              <Testimonial item={item} look="card" />
            </Card>
          </li>
        ))}
      </ul>
    ) : layout === "carousel" ? (
      <Carousel className={testimonialsCarouselClasses}>
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem key={`${item.author.name}-${i}`}>
              <Testimonial item={item} look="start" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div
          data-part="testimonials-controls"
          className={testimonialsControlsClasses}
        >
          <CarouselDots />
          <div className={testimonialsArrowsClasses}>
            <CarouselPrevious className={testimonialsArrowClasses} />
            <CarouselNext className={testimonialsArrowClasses} />
          </div>
        </div>
      </Carousel>
    ) : layout === "marquee" ? (
      <div
        data-part="testimonials-marquee"
        className={testimonialsMarqueeClasses}
      >
        {[items.slice(0, half), items.slice(half)].map((row, r) =>
          row.length ? (
            <Marquee key={r} reverse={r > 0}>
              <ul role="list" className={testimonialsMovingRowClasses}>
                {row.map((item, i) => (
                  <li
                    key={`${item.author.name}-${i}`}
                    className={testimonialsMovingItemClasses}
                  >
                    <Quoted item={item} />
                  </li>
                ))}
              </ul>
            </Marquee>
          ) : null,
        )}
      </div>
    ) : (
      <ul
        role="list"
        data-part="testimonials-list"
        className={
          layout === "wall"
            ? testimonialsWallClasses({ columns })
            : testimonialsClasses({ columns })
        }
      >
        {items.map((item, i) => (
          <li
            key={`${item.author.name}-${i}`}
            data-part="testimonials-item"
            className={testimonialItemClasses}
          >
            <Quoted item={item} />
          </li>
        ))}
      </ul>
    );
  return (
    <Section
      id={id}
      data-part="testimonials"
      data-layout={layout}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={aligned}
      muted={muted}
      className={className}
    >
      <div
        data-part="testimonials-content"
        className={testimonialsContentClasses}
      >
        {body}
        <BlockActions actions={actions} align={aligned} />
      </div>
    </Section>
  );
};
