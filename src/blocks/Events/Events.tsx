"use client";

import { BlockActions, Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Image } from "../../components/Image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/Tabs";
import { formatDayMonth } from "../../helpers/formatDate";
import { HostLink, useTranslate } from "../../host";
import {
  eventActionClasses,
  eventCategoryClasses,
  eventClasses,
  eventContentClasses,
  eventDateClasses,
  eventDayClasses,
  eventDescriptionClasses,
  eventFooterClasses,
  eventFrameClasses,
  eventImageClasses,
  eventLinkClasses,
  eventMetaClasses,
  eventMonthClasses,
  eventPriceClasses,
  eventTimeClasses,
  eventTitleClasses,
  eventsBodyClasses,
  eventsClasses,
  eventsPanelClasses,
  eventsTabsClasses,
} from "./Events.classes";
import type { EventItem, EventsLayout, EventsProps } from "./Events.types";

type Shape = Extract<EventsLayout, "list" | "cards">;

interface Tab {
  key: string;
  label: string;
  items: EventItem[];
}

const dayOf = (date: string, locale: string) => {
  const written = formatDayMonth(`${date}T00:00:00Z`, locale, "UTC");
  if (!written) return { day: date, month: "" };
  const [day, ...month] = written.split(" ");
  return { day, month: month.join(" ") };
};

const weekdayOf = (date: string, locale: string) => {
  const moment = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(moment.getTime())) return date;
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(moment);
};

const tabsOf = (
  items: EventItem[],
  keyOf: (item: EventItem) => string,
  labelOf: (key: string) => string,
): Tab[] => {
  const tabs = new Map<string, EventItem[]>();
  for (const item of items) {
    const key = keyOf(item);
    tabs.set(key, [...(tabs.get(key) ?? []), item]);
  }
  return Array.from(tabs, ([key, list]) => ({
    key,
    label: labelOf(key),
    items: list,
  }));
};

const Event = ({
  item,
  layout,
  locale,
  muted,
  timed = false,
}: {
  item: EventItem;
  layout: Shape;
  locale: string;
  muted: boolean;
  timed?: boolean;
}) => {
  const { day, month } = dayOf(item.date, locale);
  const date = timed ? (
    <span data-part="event-time" className={eventTimeClasses}>
      {item.time}
    </span>
  ) : (
    <time
      data-part="event-date"
      dateTime={item.date}
      className={eventDateClasses({ layout })}
    >
      <span className={eventDayClasses}>{day}</span>
      <span className={eventMonthClasses}>{month}</span>
    </time>
  );
  const meta = (timed ? [item.place] : [item.time, item.place])
    .filter(Boolean)
    .join(" · ");
  const price = item.price ? (
    <span data-part="event-price" className={eventPriceClasses({ layout })}>
      {item.price}
    </span>
  ) : null;
  const action = item.action ? (
    <Button
      size="sm"
      appearance="outline"
      className={eventActionClasses({ layout })}
      href={item.action.link}
    >
      {item.action.label}
    </Button>
  ) : null;
  const content = (
    <div className={eventContentClasses({ layout })}>
      {item.category && (
        <span data-part="event-category" className={eventCategoryClasses}>
          {item.category}
        </span>
      )}
      <h3 data-part="event-title" className={eventTitleClasses}>
        {item.link ? (
          <HostLink className={eventLinkClasses} href={item.link}>
            {item.title}
          </HostLink>
        ) : (
          item.title
        )}
      </h3>
      {meta && (
        <p data-part="event-meta" className={eventMetaClasses}>
          {meta}
        </p>
      )}
      {item.description && (
        <p className={eventDescriptionClasses}>{item.description}</p>
      )}
    </div>
  );
  if (layout === "cards")
    return (
      <li
        data-part="event"
        data-layout={layout}
        className={eventClasses({ layout })}
      >
        <div data-part="event-image" className={eventFrameClasses({ muted })}>
          <div className={eventImageClasses}>
            {typeof item.image === "string" || item.image === undefined ? (
              <Image alt={item.alt ?? ""} loading="lazy" src={item.image} />
            ) : (
              item.image
            )}
          </div>
          {date}
        </div>
        {content}
        {(price || action) && (
          <div className={eventFooterClasses}>
            {price}
            {action}
          </div>
        )}
      </li>
    );
  return (
    <li
      data-part="event"
      data-layout={layout}
      className={eventClasses({ layout })}
    >
      {date}
      {content}
      {price}
      {action}
    </li>
  );
};

const List = ({
  items,
  layout,
  locale,
  muted,
  timed,
}: {
  items: EventItem[];
  layout: Shape;
  locale: string;
  muted: boolean;
  timed?: boolean;
}) => (
  <ol role="list" data-part="events-list" className={eventsClasses({ layout })}>
    {items.map((item, i) => (
      <Event
        key={`${item.date}-${item.title}-${i}`}
        item={item}
        layout={layout}
        locale={locale}
        muted={muted}
        timed={timed}
      />
    ))}
  </ol>
);

const Tabbed = ({
  tabs,
  locale,
  muted,
  timed,
}: {
  tabs: Tab[];
  locale: string;
  muted: boolean;
  timed: boolean;
}) => (
  <Tabs
    className={eventsTabsClasses}
    data-part="events-tabs"
    defaultValue={tabs[0]?.key}
  >
    <TabsList>
      {tabs.map((tab) => (
        <TabsTrigger key={tab.key} value={tab.key}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
    {tabs.map((tab) => (
      <TabsContent key={tab.key} className={eventsPanelClasses} value={tab.key}>
        <List
          items={tab.items}
          layout="list"
          locale={locale}
          muted={muted}
          timed={timed}
        />
      </TabsContent>
    ))}
  </Tabs>
);

export const Events = ({
  items,
  layout = "list",
  locale = "en",
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: EventsProps) => {
  const t = useTranslate();
  if (!items?.length) return null;
  const all = t("All");
  return (
    <Section
      id={id}
      data-part="events"
      data-layout={layout}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      <div className={eventsBodyClasses}>
        {layout === "tabs" ? (
          <Tabbed
            locale={locale}
            muted={muted}
            tabs={[
              { key: "*", label: all, items },
              ...tabsOf(
                items.filter((item) => item.category),
                (item) => item.category ?? "",
                (key) => key,
              ),
            ]}
            timed={false}
          />
        ) : layout === "schedule" ? (
          <Tabbed
            locale={locale}
            muted={muted}
            tabs={tabsOf(
              items,
              (item) => item.date,
              (key) => weekdayOf(key, locale),
            )}
            timed
          />
        ) : (
          <List items={items} layout={layout} locale={locale} muted={muted} />
        )}
        <BlockActions actions={actions} align={align} />
      </div>
    </Section>
  );
};
