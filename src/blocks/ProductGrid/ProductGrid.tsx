"use client";

import { BlockActions, Section } from "../../components/Section";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/Carousel";
import { Image } from "../../components/Image";
import { Rating } from "../../components/Rating";
import { HostLink, useTranslate } from "../../host";
import { Image01Icon, ShoppingBagAddIcon } from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import {
  productAddClasses,
  productBadgeClasses,
  productBodyClasses,
  productCarouselClasses,
  productClasses,
  productCompareClasses,
  productControlClasses,
  productControlsClasses,
  productDescriptionClasses,
  productFootClasses,
  productFrameClasses,
  productGridClasses,
  productGridFooterClasses,
  productImageClasses,
  productLinkClasses,
  productMediaClasses,
  productMetaClasses,
  productNameClasses,
  productPriceClasses,
  productQuickAddClasses,
  productRatingClasses,
  productReviewsClasses,
  productSlideClasses,
} from "./ProductGrid.classes";
import type {
  ProductGridAppearance,
  ProductGridLayout,
  ProductGridProps,
  ProductItem,
} from "./ProductGrid.types";

const Product = ({
  item,
  layout,
  appearance,
  lead,
  quickAdd,
  onAdd,
}: {
  item: ProductItem;
  layout: ProductGridLayout;
  appearance: ProductGridAppearance;
  lead: boolean;
  quickAdd: boolean;
  onAdd?: (item: ProductItem) => void;
}) => {
  const t = useTranslate();
  const Frame = appearance === "solid" ? Card : "div";
  const add = item.onAdd ?? (onAdd && (() => onAdd(item)));
  const button = add && (
    <Button
      appearance={quickAdd ? "solid" : "outline"}
      aria-label={`${t("Add to cart")}: ${item.name}`}
      block={!quickAdd}
      className={quickAdd ? productQuickAddClasses : productAddClasses}
      onClick={add}
      size={quickAdd ? "sm" : "base"}
    >
      <Icon icon={ShoppingBagAddIcon} />
      {t("Add to cart")}
    </Button>
  );
  return (
    <Frame className={productFrameClasses({ appearance, layout })}>
      <div
        data-part="product-media"
        className={productMediaClasses({ appearance, layout, lead })}
      >
        <Image
          alt={item.alt ?? ""}
          className={productImageClasses}
          loading="lazy"
          src={item.image}
        >
          <Icon icon={Image01Icon} />
        </Image>
        {item.badge && (
          <Badge className={productBadgeClasses}>{item.badge}</Badge>
        )}
        {quickAdd && button}
      </div>
      <div
        data-part="product-body"
        className={productBodyClasses({ appearance, lead })}
      >
        <h3 data-part="product-name" className={productNameClasses({ lead })}>
          <HostLink
            className={productLinkClasses({ appearance })}
            href={item.link}
          >
            {item.name}
          </HostLink>
        </h3>
        {item.description && (
          <p
            data-part="product-description"
            className={productDescriptionClasses}
          >
            {item.description}
          </p>
        )}
        {item.rating !== undefined && (
          <div data-part="product-rating" className={productRatingClasses}>
            <Rating readOnly size="sm" value={item.rating} />
            {item.reviews !== undefined && (
              <span className={productReviewsClasses}>
                <span aria-hidden>({item.reviews})</span>
                <span className="sr-only">
                  {t(
                    item.reviews === 1
                      ? "{{count}} review"
                      : "{{count}} reviews",
                  ).replace("{{count}}", String(item.reviews))}
                </span>
              </span>
            )}
          </div>
        )}
        <div data-part="product-foot" className={productFootClasses}>
          <p data-part="product-price" className={productPriceClasses}>
            {item.compareAtPrice && (
              <span className="sr-only">{t("Price")} </span>
            )}
            <span>{item.price}</span>
            {item.compareAtPrice && (
              <s className={productCompareClasses}>
                <span className="sr-only">{t("Original price")} </span>
                {item.compareAtPrice}
              </s>
            )}
          </p>
          {item.meta && (
            <span data-part="product-meta" className={productMetaClasses}>
              {item.meta}
            </span>
          )}
        </div>
      </div>
      {!quickAdd && button}
    </Frame>
  );
};

export const ProductGrid = ({
  items,
  layout = "grid",
  columns = 4,
  appearance = "transparent",
  quickAdd = false,
  onAdd,
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  headerLayout = "stacked",
  muted = false,
  className,
}: ProductGridProps) => {
  if (!items?.length) return null;
  const product = (item: ProductItem, lead: boolean) => (
    <Product
      appearance={appearance}
      item={item}
      layout={layout}
      lead={lead}
      onAdd={onAdd}
      quickAdd={quickAdd}
    />
  );
  return (
    <Section
      id={id}
      data-part="product-grid"
      data-layout={layout}
      data-appearance={appearance}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      headerLayout={headerLayout}
      muted={muted}
      actions={headerLayout === "split" ? actions : undefined}
      className={className}
    >
      {layout === "carousel" ? (
        <Carousel
          aria-label={typeof title === "string" ? title : undefined}
          className={productCarouselClasses}
          opts={{ align: "start" }}
        >
          <CarouselContent>
            {items.map((item, i) => (
              <CarouselItem
                key={`${item.link}-${i}`}
                className={productSlideClasses}
              >
                {product(item, false)}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div
            data-part="product-grid-controls"
            className={productControlsClasses}
          >
            <CarouselPrevious className={productControlClasses} />
            <CarouselNext className={productControlClasses} />
          </div>
        </Carousel>
      ) : (
        <ul
          role="list"
          data-part="product-grid-list"
          className={productGridClasses({ layout, columns, appearance })}
        >
          {items.map((item, i) => (
            <li
              key={`${item.link}-${i}`}
              data-part="product"
              className={productClasses}
            >
              {product(item, layout === "featured" && i === 0)}
            </li>
          ))}
        </ul>
      )}
      {headerLayout === "split" ? null : (
        <BlockActions
          actions={actions}
          align={align}
          className={productGridFooterClasses}
        />
      )}
    </Section>
  );
};
