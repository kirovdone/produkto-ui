"use client";

import { BlockActions, Section } from "../../components/Section";
import { Badge } from "../../components/Badge";
import { Image } from "../../components/Image";
import { ToggleGroup, ToggleGroupItem } from "../../components/ToggleGroup";
import { HostLink, useTranslate } from "../../host";
import { useState } from "react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import {
  projectArrowClasses,
  projectClasses,
  projectContentClasses,
  projectDescriptionClasses,
  projectFactClasses,
  projectFactLabelClasses,
  projectFactValueClasses,
  projectFactsClasses,
  projectFrameClasses,
  projectHeadingClasses,
  projectImageClasses,
  projectLinkClasses,
  projectMetaClasses,
  projectTagsClasses,
  projectTitleClasses,
  projectYearClasses,
  projectsBodyClasses,
  projectsChipClasses,
  projectsChipsClasses,
  projectsClasses,
} from "./Projects.classes";
import type {
  ProjectFact,
  ProjectItem,
  ProjectsLayout,
  ProjectsProps,
} from "./Projects.types";

const EVERY = "*";

export const ProjectFacts = ({ facts }: { facts: ProjectFact[] }) =>
  facts.length ? (
    <dl data-part="project-facts" className={projectFactsClasses}>
      {facts.map((fact, i) => (
        <div key={`${fact.label}-${i}`} className={projectFactClasses}>
          <dt className={projectFactLabelClasses}>{fact.label}</dt>
          <dd className={projectFactValueClasses}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  ) : null;

const Arrow = ({ layout }: { layout: ProjectsLayout }) => (
  <span
    aria-hidden
    data-part="project-arrow"
    className={projectArrowClasses({ layout })}
  >
    <Icon icon={ArrowUpRight01Icon} />
  </span>
);

const Project = ({
  item,
  layout,
  muted,
}: {
  item: ProjectItem;
  layout: ProjectsLayout;
  muted: boolean;
}) => {
  const row = layout === "list";
  const year = item.year !== undefined && item.year !== "" && (
    <span data-part="project-year" className={projectYearClasses({ layout })}>
      {item.year}
    </span>
  );
  return (
    <li
      data-part="project"
      data-layout={layout}
      className={projectClasses({ layout })}
    >
      <div
        data-part="project-image"
        className={projectFrameClasses({ layout, muted })}
      >
        <div className={projectImageClasses}>
          {typeof item.image === "string" ? (
            <Image alt={item.alt ?? ""} loading="lazy" src={item.image} />
          ) : (
            item.image
          )}
        </div>
        {item.link && !row && <Arrow layout={layout} />}
      </div>
      <div className={projectContentClasses({ layout })}>
        <div className={projectHeadingClasses}>
          <h3 className={projectTitleClasses({ layout })}>
            {item.link ? (
              <HostLink
                className={projectLinkClasses({ layout })}
                href={item.link}
              >
                {item.title}
              </HostLink>
            ) : (
              item.title
            )}
          </h3>
          {!row && year}
        </div>
        {item.description && (
          <p className={projectDescriptionClasses({ layout })}>
            {item.description}
          </p>
        )}
        {Boolean(item.tags?.length) && (
          <ul
            role="list"
            data-part="project-tags"
            className={projectTagsClasses}
          >
            {item.tags?.map((tag, i) => (
              <li key={`${tag}-${i}`}>
                <Badge>{tag}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
      {row && (year || item.link) && (
        <div className={projectMetaClasses}>
          {year}
          {item.link && <Arrow layout={layout} />}
        </div>
      )}
    </li>
  );
};

export const Projects = ({
  items,
  layout = "grid",
  columns = 3,
  filter = false,
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: ProjectsProps) => {
  const t = useTranslate();
  const [tag, setTag] = useState(EVERY);
  if (!items?.length) return null;
  const tags = [...new Set(items.flatMap((item) => item.tags ?? []))];
  const shown =
    filter && tag !== EVERY
      ? items.filter((item) => item.tags?.includes(tag))
      : items;
  return (
    <Section
      id={id}
      data-part="projects"
      data-layout={layout}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      <div className={projectsBodyClasses}>
        {filter && tags.length ? (
          <ToggleGroup
            aria-label={t("Filter")}
            className={projectsChipsClasses}
            onValueChange={(next) => {
              if (next) setTag(next);
            }}
            size="sm"
            type="single"
            value={tag}
          >
            {[EVERY, ...tags].map((name) => (
              <ToggleGroupItem
                key={name}
                className={projectsChipClasses}
                value={name}
              >
                {name === EVERY ? t("All") : name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        ) : null}
        <ul
          role="list"
          data-part="projects-list"
          className={projectsClasses({
            layout,
            columns:
              layout === "list" || layout === "alternate" ? undefined : columns,
          })}
        >
          {shown.map((item, i) => (
            <Project
              key={`${item.title}-${i}`}
              item={item}
              layout={layout === "featured" && i > 0 ? "grid" : layout}
              muted={muted}
            />
          ))}
        </ul>
        <BlockActions actions={actions} align={align} />
      </div>
    </Section>
  );
};
