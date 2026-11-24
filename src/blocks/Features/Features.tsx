import { BlockActions, Section } from "../../components/Section";
import { FeatureCards } from "./FeatureCards";
import { featuresContentClasses } from "./Features.classes";
import type { FeaturesProps } from "./Features.types";

export const Features = ({
  items,
  columns,
  appearance,
  size,
  orientation,
  rows,
  arrows,
  mediaPlacement,
  headingLevel,
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: FeaturesProps) =>
  items.length ? (
    <Section
      id={id}
      data-part="features"
      data-appearance={appearance ?? "solid"}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      <div data-part="features-content" className={featuresContentClasses}>
        <FeatureCards
          appearance={appearance}
          arrows={arrows}
          columns={columns}
          headingLevel={headingLevel}
          items={items}
          mediaPlacement={mediaPlacement}
          orientation={orientation}
          rows={rows}
          size={size}
        />
        <BlockActions actions={actions} align={align} />
      </div>
    </Section>
  ) : null;
