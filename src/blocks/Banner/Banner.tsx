"use client";

import { sectionContentClasses } from "../../components/Section";
import { Button } from "../../components/Button";
import { cn } from "../../cn";
import { HostLink, useTranslate } from "../../host";
import { ArrowRight02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import { Marquee } from "../../components/Marquee";
import { useState } from "react";
import {
  bannerActionClasses,
  bannerBodyClasses,
  bannerClasses,
  bannerCloseClasses,
  bannerContentClasses,
  bannerIconClasses,
  bannerLinkClasses,
  bannerMessageClasses,
  bannerMarqueeClasses,
  bannerMovingItemClasses,
  bannerTextClasses,
} from "./Banner.classes";
import type { BannerProps } from "./Banner.types";

const MOVING_COPIES = 6;

export const Banner = ({
  message,
  icon,
  link,
  action,
  appearance = "outline",
  align = "center",
  width = "base",
  sticky = false,
  marquee = false,
  dismissible = false,
  open,
  defaultOpen = true,
  onDismiss,
  className,
  "aria-label": label,
  ...props
}: BannerProps) => {
  const t = useTranslate();
  const [shown, setShown] = useState(defaultOpen);
  if (!(open ?? shown) || (!message && !link && !action)) return null;

  const dismiss = () => {
    setShown(false);
    onDismiss?.();
  };

  const content = action && (
    <>
      {action.icon}
      {action.label}
    </>
  );

  return (
    <div
      role="region"
      aria-label={label ?? t("Announcement")}
      data-part="banner"
      data-appearance={appearance}
      data-sticky={sticky || undefined}
      className={cn(bannerClasses({ appearance, sticky }), className)}
      {...props}
    >
      <div
        data-part="banner-content"
        className={cn(sectionContentClasses({ width }), bannerContentClasses)}
      >
        <div
          data-part="banner-body"
          className={bannerBodyClasses({ align, dismissible })}
        >
          {marquee && message ? (
            <Marquee
              data-part="banner-marquee"
              className={bannerMarqueeClasses}
            >
              {Array.from({ length: MOVING_COPIES }, (_, at) => (
                <span
                  aria-hidden={at > 0 || undefined}
                  className={bannerMovingItemClasses}
                  key={at}
                >
                  {icon ? <span aria-hidden>{icon}</span> : null}
                  {message}
                </span>
              ))}
            </Marquee>
          ) : null}
          {(marquee ? link : message || link) && (
            <div className={bannerTextClasses}>
              {icon && !marquee && (
                <span
                  aria-hidden
                  data-part="banner-icon"
                  className={bannerIconClasses}
                >
                  {icon}
                </span>
              )}
              <p data-part="banner-message" className={bannerMessageClasses}>
                {marquee ? null : message}
                {link && (
                  <HostLink
                    data-part="banner-link"
                    href={link.link}
                    className={bannerLinkClasses({
                      spaced: Boolean(message) && !marquee,
                    })}
                  >
                    {link.label}
                    <Icon icon={ArrowRight02Icon} />
                  </HostLink>
                )}
              </p>
            </div>
          )}
          {action && (
            <Button
              href={action.link}
              size="sm"
              appearance={action.appearance ?? "solid"}
              className={bannerActionClasses({
                appearance: action.appearance ? "outline" : appearance,
              })}
            >
              {content}
            </Button>
          )}
        </div>
        {dismissible && (
          <Button
            appearance="transparent"
            size="sm"
            aria-label={t("Close")}
            onClick={dismiss}
            className={bannerCloseClasses({ appearance })}
          >
            <Icon icon={Cancel01Icon} />
          </Button>
        )}
      </div>
    </div>
  );
};
