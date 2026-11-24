import { BlockActions, Section, SectionHeader } from "../../components/Section";
import { Card } from "../../components/Card";
import type { ReactNode } from "react";
import {
  stepBigNumberClasses,
  stepBodyClasses,
  stepCardClasses,
  stepCardNumberClasses,
  stepDotClasses,
  stepDotMarkerClasses,
  stepNumberClasses,
  stepsBesideClasses,
  stepsBesideTextClasses,
  stepsDotsClasses,
  stepsDotsLineClasses,
  stepsGridClasses,
  stepsNumbersClasses,
  stepClasses,
  stepLineClasses,
  stepMarkerClasses,
  stepTextClasses,
  stepTitleClasses,
  stepsClasses,
  stepsColumnClasses,
  stepsContentClasses,
  stepsMediaClasses,
} from "./Steps.classes";
import type { StepsProps } from "./Steps.types";

export const Steps = ({
  items,
  orientation = "horizontal",
  layout = "line",
  beside = false,
  theme,
  media,
  actions,
  id,
  eyebrow,
  title,
  tagline,
  description,
  align = "start",
  muted = false,
  className,
}: StepsProps) => {
  if (!items?.length) return null;
  const numberOf = (i: number) => String(i + 1).padStart(2, "0");
  const text = (title: string, body?: ReactNode) => (
    <div data-part="step-text" className={stepTextClasses({ orientation })}>
      <h3 data-part="step-title" className={stepTitleClasses}>
        {title}
      </h3>
      {body && (
        <p data-part="step-body" className={stepBodyClasses}>
          {body}
        </p>
      )}
    </div>
  );
  if (layout !== "line") {
    const list =
      layout === "cards" ? (
        <ol role="list" data-part="steps-list" className={stepsGridClasses}>
          {items.map((item, i) => (
            <li key={`${item.title}-${i}`} data-part="step">
              <Card className={stepCardClasses}>
                <span aria-hidden className={stepCardNumberClasses}>
                  {numberOf(i)}
                </span>
                {text(item.title, item.body)}
              </Card>
            </li>
          ))}
        </ol>
      ) : layout === "numbers" ? (
        <ol role="list" data-part="steps-list" className={stepsNumbersClasses}>
          {items.map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              data-part="step"
              className={stepNumberClasses}
            >
              <span aria-hidden className={stepBigNumberClasses}>
                {i + 1}
              </span>
              {text(item.title, item.body)}
            </li>
          ))}
        </ol>
      ) : (
        <ol role="list" data-part="steps-list" className={stepsDotsClasses}>
          <span aria-hidden className={stepsDotsLineClasses} />
          {items.map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              data-part="step"
              className={stepDotClasses}
            >
              <span aria-hidden className={stepDotMarkerClasses}>
                {i + 1}
              </span>
              {text(item.title, item.body)}
            </li>
          ))}
        </ol>
      );
    return (
      <Section
        id={id}
        data-part="steps"
        data-layout={layout}
        eyebrow={eyebrow}
        title={title}
        tagline={tagline}
        description={description}
        align={align}
        muted={muted}
        theme={theme}
        className={className}
      >
        <div
          data-part="steps-content"
          className={stepsContentClasses({ split: false })}
        >
          {list}
          <BlockActions actions={actions} align={align} />
        </div>
      </Section>
    );
  }
  const split = Boolean(media) && orientation === "vertical";
  const aligned = split ? "start" : align;

  const steps = (
    <ol
      role="list"
      data-part="steps-list"
      className={stepsClasses({ orientation, align: aligned })}
    >
      {items.map((item, i) => (
        <li
          key={`${item.title}-${i}`}
          data-part="step"
          className={stepClasses({ orientation, align: aligned })}
        >
          {i < items.length - 1 && (
            <span
              aria-hidden
              data-part="step-line"
              className={stepLineClasses({ orientation, align: aligned })}
            />
          )}
          <span
            aria-hidden={item.icon ? true : undefined}
            data-part="step-marker"
            className={stepMarkerClasses}
          >
            {item.icon ?? String(i + 1).padStart(2, "0")}
          </span>
          <div
            data-part="step-text"
            className={stepTextClasses({ orientation })}
          >
            <h3 data-part="step-title" className={stepTitleClasses}>
              {item.title}
            </h3>
            {item.body && (
              <p data-part="step-body" className={stepBodyClasses}>
                {item.body}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );

  const picture = media ? (
    <div data-part="steps-media" className={stepsMediaClasses}>
      {media}
    </div>
  ) : null;

  if (beside)
    return (
      <Section
        id={id}
        data-part="steps"
        muted={muted}
        theme={theme}
        className={className}
      >
        <div data-part="steps-beside" className={stepsBesideClasses}>
          <div className={stepsBesideTextClasses}>
            <SectionHeader
              description={description}
              eyebrow={eyebrow}
              title={title}
              tagline={tagline}
            />
            <BlockActions actions={actions} />
          </div>
          {steps}
        </div>
      </Section>
    );

  return (
    <Section
      id={id}
      data-part="steps"
      eyebrow={eyebrow}
      title={title}
      tagline={tagline}
      description={description}
      align={align}
      muted={muted}
      theme={theme}
      className={className}
    >
      <div data-part="steps-content" className={stepsContentClasses({ split })}>
        {split ? (
          <>
            <div data-part="steps-column" className={stepsColumnClasses}>
              {steps}
              <BlockActions actions={actions} />
            </div>
            {picture}
          </>
        ) : (
          <>
            {steps}
            {picture}
            <BlockActions actions={actions} align={align} />
          </>
        )}
      </div>
    </Section>
  );
};
