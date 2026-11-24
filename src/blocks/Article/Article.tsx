"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Section, sectionEyebrowClasses } from "../../components/Section";
import {
  articleBodyClasses,
  articleClasses,
  articleContentsClasses,
  articleContentsLabelClasses,
  articleContentsLinkClasses,
  articleContentsListClasses,
  articleHeadingClasses,
  articleIntroClasses,
  articlePageClasses,
  articlePageDateClasses,
  articlePageHeaderClasses,
  articlePageTitleClasses,
  articlePartClasses,
  articleProseClasses,
  articleTextClasses,
} from "./Article.classes";
import type { ArticleProps, ArticleSection } from "./Article.types";

const useCurrent = (sections: ArticleSection[], watching: boolean) => {
  const [current, setCurrent] = useState(sections[0]?.id ?? "");
  useEffect(() => {
    if (!watching || typeof IntersectionObserver === "undefined") return;
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((heading): heading is HTMLElement => heading !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setCurrent(seen[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [sections, watching]);
  return current;
};

export const Article = ({
  sections,
  layout = "column",
  opening = "band",
  intro,
  contentsLabel,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: ArticleProps) => {
  const list = sections ?? [];
  const contents = layout === "contents" && Boolean(contentsLabel);
  const current = useCurrent(list, contents);
  if (!list.length) return null;
  const parts = list.map((section) => (
    <div
      key={section.id}
      data-part="article-section"
      className={articlePartClasses({ layout })}
    >
      <h2 id={section.id} className={articleHeadingClasses}>
        {section.title}
      </h2>
      <div className={articleProseClasses}>{section.children}</div>
    </div>
  ));
  const lead = intro ? (
    <div data-part="article-intro" className={articleIntroClasses}>
      {intro}
    </div>
  ) : null;
  const text = (
    <>
      {contents && (
        <nav
          aria-label={contentsLabel}
          data-part="article-contents"
          className={articleContentsClasses}
        >
          <p className={articleContentsLabelClasses}>{contentsLabel}</p>
          <ol role="list" className={articleContentsListClasses}>
            {list.map((section) => (
              <li key={section.id}>
                <Button
                  href={`#${section.id}`}
                  aria-current={current === section.id ? "true" : undefined}
                  appearance="transparent"
                  muted={current !== section.id}
                  align="start"
                  size="sm"
                  block
                  wrap
                  className={articleContentsLinkClasses}
                >
                  {section.title}
                </Button>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {layout === "contents" ? (
        <div className={articleTextClasses}>
          {lead}
          {parts}
        </div>
      ) : (
        <>
          {lead}
          {parts}
        </>
      )}
    </>
  );
  if (opening === "page")
    return (
      <Section
        id={id}
        data-part="article"
        data-layout={layout}
        data-opening={opening}
        width="narrow"
        muted={muted}
        className={className}
      >
        <article className={articlePageClasses}>
          <header
            data-part="article-header"
            className={articlePageHeaderClasses}
          >
            {eyebrow ? (
              <span
                data-part="section-eyebrow"
                className={sectionEyebrowClasses}
              >
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h1 data-part="article-title" className={articlePageTitleClasses}>
                {title}
              </h1>
            ) : null}
            {description ? (
              <p data-part="article-date" className={articlePageDateClasses}>
                {description}
              </p>
            ) : null}
          </header>
          <div className={articleClasses({ layout })}>{text}</div>
        </article>
      </Section>
    );
  return (
    <Section
      id={id}
      data-part="article"
      data-layout={layout}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      <div className={articleBodyClasses}>
        <article className={articleClasses({ layout })}>{text}</article>
      </div>
    </Section>
  );
};
