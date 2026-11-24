"use client";

import { Button } from "../../components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/Dialog";
import { Icon } from "../../components/Icon";
import { Image } from "../../components/Image";
import { useTranslate } from "../../host";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { KeyboardEvent } from "react";
import {
  galleryLightboxClasses,
  galleryLightboxHeaderClasses,
  galleryLightboxImageClasses,
  galleryStageClasses,
  galleryStepClasses,
} from "./Gallery.classes";
import type { GalleryLightboxProps } from "./Gallery.types";

export const GalleryLightbox = ({
  items,
  index,
  open,
  onOpenChange,
  onIndexChange,
}: GalleryLightboxProps) => {
  const t = useTranslate();
  if (!items.length) return null;

  const total = items.length;
  const at = Math.min(Math.max(index, 0), total - 1);
  const current = items[at];
  const step = (by: number) => onIndexChange((at + by + total) % total);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, () => void> = {
      ArrowLeft: () => step(-1),
      ArrowRight: () => step(1),
      Home: () => onIndexChange(0),
      End: () => onIndexChange(total - 1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    move();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        scrollable={false}
        onKeyDown={onKeyDown}
        className={galleryLightboxClasses}
      >
        <DialogHeader
          aria-atomic
          aria-live="polite"
          className={galleryLightboxHeaderClasses}
        >
          <DialogTitle>{current.caption ?? current.alt}</DialogTitle>
          <DialogDescription>
            {at + 1} {t("of")} {total}
          </DialogDescription>
        </DialogHeader>
        <div data-part="gallery-stage" className={galleryStageClasses}>
          <Image
            key={current.src}
            alt={current.alt}
            src={current.src}
            className={galleryLightboxImageClasses}
          />
          {total > 1 && (
            <>
              <Button
                aria-label={t("Previous image")}
                appearance="outline"
                size="sm"
                borderRadius="full"
                onClick={() => step(-1)}
                className={galleryStepClasses({ side: "previous" })}
              >
                <Icon icon={ArrowLeft01Icon} />
              </Button>
              <Button
                aria-label={t("Next image")}
                appearance="outline"
                size="sm"
                borderRadius="full"
                onClick={() => step(1)}
                className={galleryStepClasses({ side: "next" })}
              >
                <Icon icon={ArrowRight01Icon} />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
