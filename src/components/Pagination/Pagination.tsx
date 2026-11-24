"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";
import { cn } from "../../cn";
import { useTranslate } from "../../host";
import { Button } from "../Button";
import { Ellipsis } from "../Breadcrumb/Ellipsis";
import { Icon } from "../Icon";
import {
  paginationClasses,
  paginationContentClasses,
  paginationEllipsisClasses,
  paginationLinkClasses,
  paginationSlotClasses,
} from "./Pagination.classes";
import type { PaginationProps } from "./Pagination.types";

interface Slot {
  key: string;
  page?: number;
  shown: keyof typeof paginationSlotClasses;
}

const pagesAround = (page: number, pages: number, reach: number): number[] => {
  const kept = (n: number) =>
    n === 1 || n === pages || Math.abs(n - page) <= reach;
  return Array.from({ length: pages }, (_, i) => i + 1).filter(
    (n) => kept(n) || (kept(n - 1) && kept(n + 1)),
  );
};

const gapAfter = (page: number): number => page + 0.5;

const withGaps = (numbers: number[]): number[] =>
  numbers.flatMap((n, i) =>
    i > 0 && n - numbers[i - 1] > 1 ? [gapAfter(numbers[i - 1]), n] : [n],
  );

const slotsOf = (page: number, pages: number): Slot[] => {
  const wide = new Set(withGaps(pagesAround(page, pages, 1)));
  const narrow = new Set(withGaps(pagesAround(page, pages, 0)));
  return [...new Set([...wide, ...narrow])]
    .sort((a, b) => a - b)
    .map((slot) => ({
      key: String(slot),
      ...(Number.isInteger(slot) ? { page: slot } : {}),
      shown:
        wide.has(slot) && narrow.has(slot)
          ? "always"
          : wide.has(slot)
            ? "wide"
            : "narrow",
    }));
};

const pageHref = (href: string, param: string, page: number): string =>
  page === 1
    ? href
    : `${href}${href.includes("?") ? "&" : "?"}${param}=${page}`;

export const Pagination = ({
  page,
  pages,
  href,
  param = "page",
  onPageChange,
  size = "base",
  borderRadius = "base",
  disabled = false,
  className,
  ...props
}: PaginationProps) => {
  const t = useTranslate();
  const total = Math.max(1, Math.floor(pages));
  const current = Math.min(Math.max(1, Math.floor(page)), total);

  const control = (
    target: number,
    content: ReactNode,
    look: {
      label?: string;
      appearance: "outline" | "transparent";
      unavailable?: boolean;
    },
  ) => {
    const isCurrent = !look.label && target === current;
    const to =
      href !== undefined && !look.unavailable && !disabled && !isCurrent
        ? pageHref(href, param, target)
        : undefined;
    return (
      <Button
        aria-label={look.label}
        aria-current={isCurrent ? "page" : undefined}
        data-part="pagination-link"
        data-active={isCurrent || undefined}
        appearance={look.appearance}
        size={size}
        borderRadius={borderRadius}
        className={paginationLinkClasses({ size })}
        href={to}
        disabled={
          to === undefined && (look.unavailable || disabled || isCurrent)
        }
        onClick={
          to === undefined
            ? () => {
                if (target !== current) onPageChange?.(target);
              }
            : undefined
        }
      >
        {content}
      </Button>
    );
  };

  return (
    <nav
      role="navigation"
      aria-label={t("Pagination")}
      data-part="pagination"
      data-size={size}
      data-radius={borderRadius}
      className={cn(paginationClasses, className)}
      {...props}
    >
      <ul
        data-part="pagination-content"
        className={paginationContentClasses({ size })}
      >
        <li data-part="pagination-item">
          {control(current - 1, <Icon icon={ArrowLeft01Icon} />, {
            label: t("Go to previous page"),
            appearance: "outline",
            unavailable: current <= 1,
          })}
        </li>
        {slotsOf(current, total).map((slot) => (
          <li
            key={slot.key}
            data-part="pagination-item"
            className={paginationSlotClasses[slot.shown] || undefined}
          >
            {slot.page ? (
              control(slot.page, slot.page, {
                appearance: slot.page === current ? "outline" : "transparent",
              })
            ) : (
              <>
                <Ellipsis
                  data-part="pagination-ellipsis"
                  className={paginationEllipsisClasses({ size })}
                />
                <span className="sr-only">{t("More pages")}</span>
              </>
            )}
          </li>
        ))}
        <li data-part="pagination-item">
          {control(current + 1, <Icon icon={ArrowRight01Icon} />, {
            label: t("Go to next page"),
            appearance: "outline",
            unavailable: current >= total,
          })}
        </li>
      </ul>
    </nav>
  );
};
