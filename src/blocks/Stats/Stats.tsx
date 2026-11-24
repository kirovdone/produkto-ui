import { BlockActions, Section, SectionHeader } from "../../components/Section";
import { Card } from "../../components/Card";
import {
  statClasses,
  statDescriptionClasses,
  statLabelClasses,
  statValueClasses,
  statsClasses,
  statsContentClasses,
  statsSplitClasses,
  statsSplitTextClasses,
} from "./Stats.classes";
import type { StatItem, StatsCount, StatsProps } from "./Stats.types";
import { pickCount } from "../../helpers/pickCount";

const countOf = (items: StatItem[]) =>
  pickCount<StatsCount>([1, 2, 3, 4, 5], items.length);

export const Stats = ({
  items,
  layout = "row",
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  theme,
  className,
}: StatsProps) => {
  if (!items?.length) return null;
  const split = layout === "split";
  const side = split ? "start" : align;
  const list = (
    <dl
      data-part="stats-list"
      className={statsClasses({
        layout,
        count: split ? 2 : countOf(items),
      })}
    >
      {items.map((item, i) => {
        const content = (
          <>
            <dt data-part="stat-label" className={statLabelClasses}>
              {item.label}
            </dt>
            <dd data-part="stat-value" className={statValueClasses({ layout })}>
              {item.value}
            </dd>
            {item.description && (
              <dd
                data-part="stat-description"
                className={statDescriptionClasses}
              >
                {item.description}
              </dd>
            )}
          </>
        );
        const key = `${item.label}-${i}`;
        const classes = statClasses({ layout, align: side });
        return layout === "cards" ? (
          <Card key={key} className={classes}>
            {content}
          </Card>
        ) : (
          <div key={key} data-part="stat" className={classes}>
            {content}
          </div>
        );
      })}
    </dl>
  );
  if (split)
    return (
      <Section
        id={id}
        data-part="stats"
        muted={muted}
        theme={theme}
        className={className}
      >
        <div data-part="stats-split" className={statsSplitClasses}>
          <div data-part="stats-text" className={statsSplitTextClasses}>
            <SectionHeader
              description={description}
              eyebrow={eyebrow}
              title={title}
            />
            <BlockActions actions={actions} />
          </div>
          {list}
        </div>
      </Section>
    );
  return (
    <Section
      id={id}
      data-part="stats"
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      theme={theme}
      className={className}
    >
      <div data-part="stats-content" className={statsContentClasses}>
        {list}
        <BlockActions actions={actions} align={align} />
      </div>
    </Section>
  );
};
