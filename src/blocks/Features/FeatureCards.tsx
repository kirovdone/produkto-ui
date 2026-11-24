import { HostLink } from "../../host";
import type { BlockLink } from "../../components/Section";
import { Card } from "../../components/Card";
import { cn } from "../../cn";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import type { ReactNode } from "react";
import {
  featureCardArrowClasses,
  featureCardBodyClasses,
  featureCardClasses,
  featureCardDescriptionClasses,
  featureCardEndClasses,
  featureCardFrameClasses,
  featureCardIconClasses,
  featureCardInlineIconClasses,
  featureCardInlineTitleClasses,
  featureCardItemClasses,
  featureCardLinkClasses,
  featureCardLinkItemClasses,
  featureCardLinksClasses,
  featureCardMediaClasses,
  featureCardOutlineLinkClasses,
  featureCardOutlineLinksClasses,
  featureCardOutlineTitleClasses,
  featureCardRowBodyClasses,
  featureCardRowEndClasses,
  featureCardRowMediaClasses,
  featureCardSmallTitleClasses,
  featureCardTextClasses,
  featureCardTitleClasses,
  featureCardTitleLineClasses,
  featureCardsClasses,
} from "./FeatureCards.classes";
import type {
  FeatureCardsAppearance,
  FeatureCardsHeadingLevel,
  FeatureCardsMediaPlacement,
  FeatureCardsOrientation,
  FeatureCardsProps,
  FeatureCardsSize,
  FeatureItem,
} from "./FeatureCards.types";

const Title = ({
  item,
  inline,
  level,
  outline = false,
}: {
  item: FeatureItem;
  inline: boolean;
  level: FeatureCardsHeadingLevel;
  outline?: boolean;
}) => {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <Heading
      className={cn(
        featureCardTitleClasses,
        outline && featureCardOutlineTitleClasses,
        inline && featureCardSmallTitleClasses,
        inline && item.icon && featureCardInlineTitleClasses,
      )}
    >
      {item.icon && inline && (
        <span
          aria-hidden
          data-part="feature-card-icon"
          className={featureCardInlineIconClasses}
        >
          {item.icon}
        </span>
      )}
      {item.link ? (
        <HostLink href={item.link} className={featureCardLinkClasses}>
          {item.title}
        </HostLink>
      ) : (
        item.title
      )}
    </Heading>
  );
};

const Links = ({
  links,
  outline = false,
}: {
  links: BlockLink[];
  outline?: boolean;
}) => (
  <ul
    data-part="feature-card-links"
    className={
      outline ? featureCardOutlineLinksClasses : featureCardLinksClasses
    }
  >
    {links.map((link) => (
      <li key={`${link.label}-${link.link}`}>
        <HostLink
          href={link.link}
          className={
            outline ? featureCardOutlineLinkClasses : featureCardLinkItemClasses
          }
        >
          {link.label}
          {outline ? <Icon icon={ArrowRight01Icon} /> : null}
        </HostLink>
      </li>
    ))}
  </ul>
);

const Arrow = () => (
  <span
    aria-hidden
    data-part="feature-card-arrow"
    className={featureCardArrowClasses}
  >
    <Icon icon={ArrowUpRight01Icon} />
  </span>
);

const Surface = ({
  item,
  appearance,
  orientation,
  children,
}: {
  item: FeatureItem;
  appearance: FeatureCardsAppearance;
  orientation: FeatureCardsOrientation;
  children: ReactNode;
}) =>
  appearance === "solid" ? (
    <Card className={featureCardClasses({ appearance, orientation })}>
      {children}
    </Card>
  ) : (
    <div
      data-part="feature-card"
      data-appearance={appearance}
      className={featureCardClasses({
        appearance,
        orientation,
        interactive: Boolean(item.link),
      })}
    >
      {children}
    </div>
  );

const Tile = ({
  item,
  appearance,
  size,
  level,
  arrow,
  placement,
}: {
  item: FeatureItem;
  appearance: FeatureCardsAppearance;
  size: FeatureCardsSize;
  level: FeatureCardsHeadingLevel;
  arrow: boolean;
  placement: FeatureCardsMediaPlacement;
}) => {
  const inline = size === "sm";
  const media = Boolean(item.media);
  const fill = appearance === "transparent" ? undefined : !item.title;
  const marked = Boolean(item.link && arrow);
  const outline = appearance === "outline";
  const below = outline || placement === "below";
  const title = (
    <Title item={item} inline={inline} level={level} outline={outline} />
  );
  const mediaBox = media ? (
    <div
      data-part="feature-card-media"
      className={featureCardMediaClasses({
        appearance,
        fill,
        below: below && Boolean(item.title),
      })}
    >
      {item.media}
    </div>
  ) : null;
  return (
    <Surface item={item} appearance={appearance} orientation="vertical">
      {below ? null : mediaBox}
      {item.title ? (
        <div
          data-part="feature-card-body"
          className={featureCardBodyClasses({
            appearance,
            size,
            media,
            below: below && media,
          })}
        >
          {item.icon && !inline && (
            <span
              aria-hidden
              data-part="feature-card-icon"
              className={featureCardIconClasses}
            >
              {item.icon}
            </span>
          )}
          <div className={featureCardTextClasses}>
            {marked ? (
              <div className={featureCardTitleLineClasses}>
                {title}
                <div
                  data-part="feature-card-end"
                  className={featureCardEndClasses}
                >
                  <Arrow />
                </div>
              </div>
            ) : (
              title
            )}
            {item.description && (
              <p className={featureCardDescriptionClasses}>
                {item.description}
              </p>
            )}
          </div>
          {item.links?.length ? (
            <Links links={item.links} outline={outline} />
          ) : null}
        </div>
      ) : null}
      {below ? mediaBox : null}
    </Surface>
  );
};

const RowTile = ({
  item,
  appearance,
  level,
  arrow,
}: {
  item: FeatureItem;
  appearance: FeatureCardsAppearance;
  level: FeatureCardsHeadingLevel;
  arrow: boolean;
}) => {
  const media = Boolean(item.media);
  const described = Boolean(item.description);
  const ends = Boolean(item.link && arrow);
  return (
    <Surface item={item} appearance={appearance} orientation="horizontal">
      {media && (
        <div
          data-part="feature-card-media"
          className={featureCardRowMediaClasses({ appearance })}
        >
          {item.media}
        </div>
      )}
      {item.title ? (
        <div
          data-part="feature-card-body"
          className={featureCardRowBodyClasses({
            appearance,
            end: ends && !described,
            media,
            described,
          })}
        >
          {described && ends ? (
            <div className={featureCardTitleLineClasses}>
              <Title item={item} inline level={level} />
              <div
                data-part="feature-card-end"
                className={featureCardEndClasses}
              >
                <Arrow />
              </div>
            </div>
          ) : (
            <Title item={item} inline level={level} />
          )}
          {item.description && (
            <p className={featureCardDescriptionClasses}>{item.description}</p>
          )}
          {item.links?.length ? <Links links={item.links} /> : null}
        </div>
      ) : null}
      {ends && !described && (
        <div
          data-part="feature-card-end"
          className={featureCardRowEndClasses({ appearance })}
        >
          <Arrow />
        </div>
      )}
    </Surface>
  );
};

export const FeatureCards = ({
  items,
  appearance = "solid",
  size = "base",
  columns = 3,
  orientation = "vertical",
  rows = "content",
  mediaPlacement = "above",
  headingLevel = 3,
  arrows = true,
}: FeatureCardsProps) => {
  const widow = items.length % 2 ? items[items.length - 1] : undefined;
  const list = (
    <ul
      role="list"
      className={featureCardsClasses({
        appearance,
        columns,
        size,
        orientation,
        rows,
      })}
    >
      {items.map((item, i) => (
        <li
          key={`${item.title ?? "media"}-${i}`}
          data-part="feature-card-item"
          className={featureCardItemClasses({ widow: item === widow })}
        >
          {orientation === "horizontal" ? (
            <RowTile
              item={item}
              appearance={appearance}
              level={headingLevel}
              arrow={arrows}
            />
          ) : (
            <Tile
              item={item}
              appearance={appearance}
              size={size}
              level={headingLevel}
              arrow={arrows}
              placement={mediaPlacement}
            />
          )}
        </li>
      ))}
    </ul>
  );
  return appearance === "outline" ? (
    <div data-part="feature-card-frame" className={featureCardFrameClasses}>
      {list}
    </div>
  ) : (
    list
  );
};
