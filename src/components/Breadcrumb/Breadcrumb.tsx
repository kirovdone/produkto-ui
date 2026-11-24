"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Fragment } from "react";
import { HostLink, useTranslate } from "../../host";
import { cn } from "../../cn";
import { Icon } from "../Icon";
import { Ellipsis } from "./Ellipsis";
import {
  breadcrumbEllipsisClasses,
  breadcrumbItemClasses,
  breadcrumbLinkClasses,
  breadcrumbListClasses,
  breadcrumbPageClasses,
  breadcrumbSeparatorClasses,
  breadcrumbTrailClasses,
} from "./Breadcrumb.classes";
import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
  BreadcrumbTrailProps,
} from "./Breadcrumb.types";

export const Breadcrumb = (props: BreadcrumbProps) => {
  const t = useTranslate();
  return <nav aria-label={t("Breadcrumb")} data-part="breadcrumb" {...props} />;
};

export const BreadcrumbList = ({
  className,
  ...props
}: BreadcrumbListProps) => (
  <ol
    data-part="breadcrumb-list"
    className={cn(breadcrumbListClasses, className)}
    {...props}
  />
);

export const BreadcrumbItem = ({
  className,
  ...props
}: BreadcrumbItemProps) => (
  <li
    data-part="breadcrumb-item"
    className={cn(breadcrumbItemClasses, className)}
    {...props}
  />
);

export const BreadcrumbLink = ({
  size = "base",
  borderRadius = "base",
  className,
  ...props
}: BreadcrumbLinkProps) => (
  <HostLink
    data-part="breadcrumb-link"
    data-size={size}
    data-radius={borderRadius}
    className={cn(breadcrumbLinkClasses({ size, borderRadius }), className)}
    {...props}
  />
);

export const BreadcrumbPage = ({
  size = "base",
  className,
  ...props
}: BreadcrumbPageProps) => (
  <span
    data-part="breadcrumb-page"
    data-size={size}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(breadcrumbPageClasses({ size }), className)}
    {...props}
  />
);

export const BreadcrumbSeparator = ({
  size = "base",
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    data-part="breadcrumb-separator"
    data-size={size}
    role="presentation"
    aria-hidden="true"
    className={cn(breadcrumbSeparatorClasses({ size }), className)}
    {...props}
  >
    {children ?? <Icon icon={ArrowRight01Icon} />}
  </li>
);

export const BreadcrumbEllipsis = ({
  size = "base",
  className,
  ...props
}: BreadcrumbEllipsisProps) => (
  <Ellipsis
    data-part="breadcrumb-ellipsis"
    data-size={size}
    className={cn(breadcrumbEllipsisClasses({ size }), className)}
    {...props}
  />
);

export const BreadcrumbTrail = ({
  items,
  align = "start",
  size = "base",
  borderRadius = "base",
  ...props
}: BreadcrumbTrailProps) =>
  items.length ? (
    <Breadcrumb data-size={size} data-radius={borderRadius} {...props}>
      <BreadcrumbList className={breadcrumbTrailClasses({ align })}>
        {items.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && <BreadcrumbSeparator size={size} />}
            <BreadcrumbItem>
              {item.link ? (
                <BreadcrumbLink
                  href={item.link}
                  size={size}
                  borderRadius={borderRadius}
                >
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage size={size}>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  ) : null;
