import {
  BlockActions,
  Section,
  sectionEyebrowClasses,
  sectionTaglineClasses,
} from "../../components/Section";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { cn } from "../../cn";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import { BreadcrumbTrail } from "../../components/Breadcrumb";
import { ThemeScopeProvider } from "../../context/themeScope";
import {
  heroActionsClasses,
  heroAnnouncementBadgeClasses,
  heroAnnouncementClasses,
  heroAnnouncementLabelClasses,
  heroBackdropClasses,
  heroClasses,
  heroContentClasses,
  heroCoverBackdropClasses,
  heroFrameClasses,
  heroScrimClasses,
  heroDescriptionClasses,
  heroMediaClasses,
  heroNoteClasses,
  heroTextClasses,
  heroTitleClasses,
} from "./Hero.classes";
import type { HeroProps } from "./Hero.types";

export const Hero = ({
  id,
  eyebrow,
  breadcrumbs,
  announcement,
  title,
  tagline,
  description,
  actions,
  note,
  media,
  backdrop,
  cover = false,
  framed = false,
  place = "middle",
  mediaFirst = false,
  layout = "center",
  size = "base",
  titleSize = size,
  height = "auto",
  muted = false,
  className,
  children,
}: HeroProps) => {
  if (
    !eyebrow &&
    !announcement &&
    !title &&
    !description &&
    !actions?.length &&
    !media &&
    !children
  )
    return null;
  const covered = cover && Boolean(backdrop);
  const behind = backdrop ? (
    <>
      <div
        aria-hidden
        data-part="hero-backdrop"
        className={covered ? heroCoverBackdropClasses : heroBackdropClasses}
      >
        {backdrop}
      </div>
      {covered ? (
        <div
          aria-hidden
          data-part="hero-scrim"
          className={heroScrimClasses({ place })}
        />
      ) : null}
    </>
  ) : null;
  const content = (
    <div
      data-part="hero-content"
      data-layout={layout}
      className={heroContentClasses({ layout, mediaFirst })}
    >
      <div data-part="hero-text" className={heroTextClasses({ layout })}>
        {breadcrumbs?.length ? (
          <BreadcrumbTrail
            data-part="hero-breadcrumbs"
            items={breadcrumbs}
            align={layout === "center" ? "center" : "start"}
          />
        ) : null}
        {announcement ? (
          <Button
            className={heroAnnouncementClasses({ badge: Boolean(eyebrow) })}
            size="sm"
            appearance="outline"
            borderRadius="full"
            muted
            href={announcement.link}
          >
            {eyebrow && (
              <Badge className={heroAnnouncementBadgeClasses}>{eyebrow}</Badge>
            )}
            <span
              data-part="hero-announcement-label"
              className={heroAnnouncementLabelClasses}
            >
              {announcement.label}
            </span>
            <Icon icon={ArrowRight01Icon} />
          </Button>
        ) : (
          eyebrow && (
            <span data-part="hero-eyebrow" className={sectionEyebrowClasses}>
              {eyebrow}
            </span>
          )
        )}
        {title && (
          <h1
            data-part="hero-title"
            className={heroTitleClasses({ layout, size: titleSize })}
          >
            {title}
            {tagline ? (
              <>
                {" "}
                <span
                  data-part="hero-tagline"
                  className={sectionTaglineClasses}
                >
                  {tagline}
                </span>
              </>
            ) : null}
          </h1>
        )}
        {description && (
          <p
            data-part="hero-description"
            className={heroDescriptionClasses({ layout })}
          >
            {description}
          </p>
        )}
        <BlockActions
          actions={actions}
          align={layout === "center" ? "center" : "start"}
          className={heroActionsClasses({ layout })}
        />
        {children}
        {note && (
          <p data-part="hero-note" className={heroNoteClasses}>
            {note}
          </p>
        )}
      </div>
      {media && (
        <div data-part="hero-media" className={heroMediaClasses}>
          {media}
        </div>
      )}
    </div>
  );
  if (covered && framed)
    return (
      <Section
        id={id}
        data-part="hero"
        data-height={height}
        muted={muted}
        className={className}
      >
        <ThemeScopeProvider value="dark">
          <div
            data-part="hero-frame"
            data-theme="dark"
            className={heroFrameClasses({ place })}
          >
            {behind}
            {content}
          </div>
        </ThemeScopeProvider>
      </Section>
    );
  return (
    <Section
      id={id}
      data-part="hero"
      data-height={height}
      muted={muted}
      theme={covered ? "dark" : undefined}
      className={cn(heroClasses({ height, cover: covered, place }), className)}
    >
      {behind}
      {content}
    </Section>
  );
};
