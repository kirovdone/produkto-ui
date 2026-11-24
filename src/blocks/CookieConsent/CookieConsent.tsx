"use client";

import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { ScrollArea } from "../../components/ScrollArea";
import { Switch } from "../../components/Switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/Tooltip";
import { cn } from "../../cn";
import { useTranslate } from "../../host";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import { useEffect, useId, useRef, useState } from "react";
import {
  cookieConsentActionsClasses,
  cookieConsentCategoriesClasses,
  cookieConsentCategoryClasses,
  cookieConsentCategoryDescriptionClasses,
  cookieConsentCategoryHeadClasses,
  cookieConsentCategoryLabelClasses,
  cookieConsentClasses,
  cookieConsentContentClasses,
  cookieConsentMessageClasses,
  cookieConsentScrollClasses,
  cookieConsentTextClasses,
  cookieConsentTitleClasses,
} from "./CookieConsent.classes";
import type {
  CookieCategory,
  CookieConsentProps,
  CookiePreferences,
} from "./CookieConsent.types";

const NONE: CookieCategory[] = [];

export const CookieConsent = ({
  title,
  message,
  categories = NONE,
  defaultPreferences,
  open,
  defaultOpen = true,
  onOpenChange,
  onAccept,
  onReject,
  onSave,
  layout = "card",
  align = "start",
  className,
}: CookieConsentProps) => {
  const t = useTranslate();
  const id = useId();
  const [shown, setShown] = useState(defaultOpen);
  const [customizing, setCustomizing] = useState(false);
  const [chosen, setChosen] = useState<CookiePreferences>(
    defaultPreferences ?? {},
  );
  const moved = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const customizeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    (customizing ? headingRef : customizeRef).current?.focus();
  }, [customizing]);

  if (!(open ?? shown) || (!title && !message)) return null;

  const preferencesOf = (allowed: (category: CookieCategory) => boolean) =>
    Object.fromEntries(
      categories.map((category) => [
        category.id,
        Boolean(category.required) || allowed(category),
      ]),
    );

  const customize = (next: boolean) => {
    moved.current = true;
    setCustomizing(next);
  };

  const close = () => {
    setCustomizing(false);
    if (open === undefined) setShown(false);
    onOpenChange?.(false);
  };

  const accept = () => {
    const preferences = preferencesOf(() => true);
    setChosen(preferences);
    onAccept?.(preferences);
    close();
  };

  const reject = () => {
    const preferences = preferencesOf(() => false);
    setChosen(preferences);
    onReject?.(preferences);
    close();
  };

  const save = () => {
    onSave?.(preferencesOf((category) => Boolean(chosen[category.id])));
    close();
  };

  const heading = customizing ? t("Cookie preferences") : title;

  return (
    <div
      role="region"
      aria-label={heading ? undefined : t("Cookie preferences")}
      aria-labelledby={heading ? `${id}-title` : undefined}
      data-part="cookie-consent"
      data-layout={layout}
      className={cn(cookieConsentClasses({ layout, align }), className)}
    >
      <div
        data-part="cookie-consent-content"
        className={cookieConsentContentClasses({ layout, customizing })}
      >
        <div className={cookieConsentTextClasses}>
          {heading && (
            <h2
              ref={headingRef}
              id={`${id}-title`}
              tabIndex={customizing ? -1 : undefined}
              className={cookieConsentTitleClasses}
            >
              {heading}
            </h2>
          )}
          {!customizing && message && (
            <p className={cookieConsentMessageClasses}>{message}</p>
          )}
        </div>
        {customizing && (
          <ScrollArea className={cookieConsentScrollClasses({ layout })}>
            <ul
              role="list"
              data-part="cookie-consent-categories"
              className={cookieConsentCategoriesClasses({ layout })}
            >
              {categories.map((category) => (
                <li key={category.id} className={cookieConsentCategoryClasses}>
                  <div className={cookieConsentCategoryHeadClasses}>
                    <Label
                      className={cookieConsentCategoryLabelClasses}
                      htmlFor={`${id}-${category.id}`}
                    >
                      {category.label}
                      {category.required && <Badge>{t("required")}</Badge>}
                    </Label>
                    <Switch
                      aria-describedby={`${id}-${category.id}-description`}
                      checked={
                        Boolean(category.required) ||
                        Boolean(chosen[category.id])
                      }
                      disabled={category.required}
                      id={`${id}-${category.id}`}
                      onCheckedChange={(checked) =>
                        setChosen((current) => ({
                          ...current,
                          [category.id]: checked,
                        }))
                      }
                      size="sm"
                    />
                  </div>
                  <p
                    id={`${id}-${category.id}-description`}
                    className={cookieConsentCategoryDescriptionClasses}
                  >
                    {category.description}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
        <div
          data-part="cookie-consent-actions"
          className={cookieConsentActionsClasses({ layout })}
        >
          {customizing ? (
            <>
              <Button tone="accent" size="sm" onClick={save}>
                {t("Update")}
              </Button>
              <Button
                appearance="transparent"
                size="sm"
                onClick={() => customize(false)}
              >
                {t("Back")}
              </Button>
            </>
          ) : (
            <>
              <Button tone="accent" size="sm" onClick={accept}>
                {t("Accept all")}
              </Button>
              <Button appearance="outline" size="sm" onClick={reject}>
                {t("Reject all")}
              </Button>
              {categories.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      ref={customizeRef}
                      appearance="transparent"
                      aria-label={t("Customize")}
                      size="sm"
                      onClick={() => customize(true)}
                    >
                      <Icon icon={Settings01Icon} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t("Customize")}</TooltipContent>
                </Tooltip>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
