"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { ScrollArea } from "../../components/ScrollArea";
import { useTranslate } from "../../host";
import { FeatureTabs } from "../FeatureTabs";
import { BlockActions, Section } from "../../components/Section";
import {
  timelineBodyClasses,
  timelineClasses,
  timelineContentClasses,
  timelineDateClasses,
  timelineDescriptionClasses,
  timelineDotClasses,
  timelineItemClasses,
  timelineLineClasses,
  timelineMarkerClasses,
  timelineRailClasses,
  timelineScrollClasses,
  timelineScrollerClasses,
  timelineStageClasses,
  timelineStageControlsClasses,
  timelineStageDateClasses,
  timelineStageDescriptionClasses,
  timelineStageEmptyClasses,
  timelineStageFrameClasses,
  timelineStageMediaClasses,
  timelineStageNoteClasses,
  timelineStagePanelClasses,
  timelineStageStatClasses,
  timelineStageStatLabelClasses,
  timelineStageStatValueClasses,
  timelineStageTitleClasses,
  timelineStageWordsClasses,
  timelineTitleClasses,
} from "./Timeline.classes";
import type {
  TimelineItem,
  TimelineLayout,
  TimelineMarker,
  TimelineProps,
  TimelineSide,
} from "./Timeline.types";

const TimelineStage = ({
  items,
  interval,
}: {
  items: TimelineItem[];
  interval?: number;
}) => {
  const t = useTranslate();
  const [open, setOpen] = useState(0);
  const [taken, setTaken] = useState(false);
  const last = items.length - 1;
  const takeOver = () => setTaken(true);
  return (
    <div
      data-part="timeline-stage"
      onPointerDownCapture={takeOver}
      onKeyDownCapture={takeOver}
    >
      <FeatureTabs
        items={items.map((item) => ({
          title: item.date,
          body: item.summary,
        }))}
        value={open}
        onValueChange={setOpen}
        interval={taken ? undefined : interval}
        loop={false}
        trail
        line={false}
      >
        <div className={timelineStageClasses}>
          {items.map((item, i) => (
            <div
              key={`${item.date}-${i}`}
              data-part="timeline-panel"
              data-open={i === open}
              className={timelineStagePanelClasses}
            >
              <div className={timelineStageWordsClasses}>
                <p className={timelineStageDateClasses}>{item.date}</p>
                <h3 className={timelineStageTitleClasses}>{item.title}</h3>
                {item.description && (
                  <p className={timelineStageDescriptionClasses}>
                    {item.description}
                  </p>
                )}
                {item.stat && (
                  <p
                    data-part="timeline-stat"
                    className={timelineStageStatClasses}
                  >
                    <span className={timelineStageStatValueClasses}>
                      {item.stat.value}
                    </span>
                    <span className={timelineStageStatLabelClasses}>
                      {item.stat.label}
                    </span>
                  </p>
                )}
                {item.note && (
                  <p className={timelineStageNoteClasses}>{item.note}</p>
                )}
                <div className={timelineStageControlsClasses}>
                  <Button
                    appearance="outline"
                    size="sm"
                    aria-label={t("Previous")}
                    disabled={i === 0}
                    onClick={() => setOpen(i - 1)}
                  >
                    <Icon icon={ArrowLeft01Icon} />
                  </Button>
                  <Button
                    appearance="outline"
                    size="sm"
                    aria-label={t("Next")}
                    disabled={i === last}
                    onClick={() => setOpen(i + 1)}
                  >
                    <Icon icon={ArrowRight01Icon} />
                  </Button>
                </div>
              </div>
              <div className={timelineStageFrameClasses}>
                <div
                  data-part="timeline-media"
                  className={timelineStageMediaClasses}
                >
                  {item.media ?? (
                    <div aria-hidden className={timelineStageEmptyClasses} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FeatureTabs>
    </div>
  );
};

export const Timeline = ({
  items,
  view = "list",
  interval,
  orientation = "vertical",
  alternate = false,
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: TimelineProps) => {
  if (!items?.length) return null;
  if (view === "stage")
    return (
      <Section
        id={id}
        data-part="timeline"
        data-view="stage"
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={align}
        muted={muted}
        className={className}
      >
        <div className={timelineBodyClasses}>
          <TimelineStage items={items} interval={interval} />
          <BlockActions actions={actions} align={align} />
        </div>
      </Section>
    );
  const across = orientation === "horizontal";
  const layout: TimelineLayout = across
    ? "horizontal"
    : alternate
      ? "alternate"
      : "vertical";
  const marker: TimelineMarker = items.some((item) => item.icon)
    ? "icon"
    : "dot";

  const list = (
    <ol
      role="list"
      data-part="timeline-list"
      data-orientation={orientation}
      tabIndex={across ? 0 : undefined}
      className={timelineClasses({ layout, align })}
    >
      {items.map((item, i) => {
        const side: TimelineSide = i % 2 === 0 ? "start" : "end";
        return (
          <li
            key={`${item.title}-${i}`}
            data-part="timeline-item"
            data-side={layout === "alternate" ? side : undefined}
            className={timelineItemClasses({ layout })}
          >
            <span
              aria-hidden
              data-part="timeline-rail"
              className={timelineRailClasses({ layout })}
            >
              <span
                data-part="timeline-marker"
                className={timelineMarkerClasses({ marker })}
              >
                {item.icon ?? (
                  <span className={timelineDotClasses({ marker })} />
                )}
              </span>
              {i < items.length - 1 && (
                <span
                  data-part="timeline-line"
                  className={timelineLineClasses({ layout })}
                />
              )}
            </span>
            <p
              data-part="timeline-date"
              className={timelineDateClasses({ layout, marker, side, align })}
            >
              {item.date}
            </p>
            <div
              data-part="timeline-content"
              className={timelineContentClasses({ layout, marker, side })}
            >
              <h3 className={timelineTitleClasses}>{item.title}</h3>
              {item.description && (
                <p className={timelineDescriptionClasses}>{item.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );

  return (
    <Section
      id={id}
      data-part="timeline"
      data-orientation={orientation}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      <div className={timelineBodyClasses}>
        {across ? (
          <div
            data-part="timeline-scroller"
            className={timelineScrollerClasses}
          >
            <ScrollArea
              orientation="horizontal"
              className={timelineScrollClasses}
            >
              {list}
            </ScrollArea>
          </div>
        ) : (
          list
        )}
        <BlockActions actions={actions} align={align} />
      </div>
    </Section>
  );
};
