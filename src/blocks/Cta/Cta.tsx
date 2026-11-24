import { HostLink } from "../../host";
import { BlockActions, Section, SectionHeader } from "../../components/Section";
import { Card } from "../../components/Card";
import { cn } from "../../cn";
import { Icon } from "../../components/Icon";
import { ThemeScopeProvider } from "../../context/themeScope";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import {
  ctaActionsClasses,
  ctaBackdropClasses,
  ctaBackdropFrameClasses,
  ctaBigLinkClasses,
  ctaCallClasses,
  ctaCallsClasses,
  ctaPanelClasses,
  ctaCardClasses,
  ctaClasses,
  ctaCoverClasses,
  ctaHeaderClasses,
  ctaLinkListClasses,
  ctaLinksClasses,
  ctaMediaClasses,
  ctaMediaRowClasses,
  ctaScrimClasses,
  ctaTextClasses,
} from "./Cta.classes";
import type { CtaProps } from "./Cta.types";

export const Cta = ({
  id,
  eyebrow,
  title,
  tagline,
  description,
  actions,
  calls,
  links,
  media,
  backdrop,
  cover = false,
  appearance = "soft",
  align = "start",
  theme,
  className,
}: CtaProps) => {
  if (
    !title &&
    !description &&
    !actions?.length &&
    !media &&
    !calls?.length &&
    !links?.length
  )
    return null;
  if (calls?.length)
    return (
      <Section id={id} data-part="cta" theme={theme} className={className}>
        <div data-part="cta-calls" className={ctaCallsClasses}>
          {calls.map((call, i) => (
            <Card
              key={i}
              appearance={i === 0 ? "soft" : "outline"}
              className={ctaCallClasses}
              data-part="cta-call"
            >
              <SectionHeader
                className={ctaHeaderClasses}
                description={call.description}
                eyebrow={call.eyebrow}
                title={call.title}
              />
              <BlockActions
                actions={call.actions?.map((action, at) =>
                  i > 0 && at === 0 && !action.appearance
                    ? { ...action, appearance: "outline" }
                    : action,
                )}
              />
            </Card>
          ))}
        </div>
      </Section>
    );
  if (links?.length)
    return (
      <Section id={id} data-part="cta" theme={theme} className={className}>
        <div data-part="cta-links" className={ctaLinksClasses}>
          <div data-part="cta-text" className={ctaTextClasses}>
            <SectionHeader
              className={ctaHeaderClasses}
              description={description}
              eyebrow={eyebrow}
              title={title}
              tagline={tagline}
            />
            <BlockActions actions={actions} />
          </div>
          <ul data-part="cta-link-list" className={ctaLinkListClasses}>
            {links.map((link) => (
              <li key={`${link.label}-${link.link}`}>
                <HostLink className={ctaBigLinkClasses} href={link.link}>
                  {link.label}
                  <Icon icon={ArrowUpRight01Icon} />
                </HostLink>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  if (backdrop) {
    const open = appearance === "transparent";
    const panel = (
      <div
        data-part="cta-panel"
        data-theme={cover ? "dark" : undefined}
        className={cn(
          ctaPanelClasses({ open: open || cover }),
          cover && ctaCoverClasses,
        )}
      >
        <SectionHeader
          align="center"
          className={ctaHeaderClasses}
          description={description}
          eyebrow={eyebrow}
          title={title}
          tagline={tagline}
        />
        <BlockActions actions={actions} align="center" />
      </div>
    );
    return (
      <Section
        id={id}
        data-part="cta"
        data-appearance={appearance}
        theme={theme}
        className={className}
      >
        <div
          data-part="cta-frame"
          className={ctaBackdropFrameClasses({ open })}
        >
          <div
            aria-hidden
            data-part="cta-backdrop"
            className={ctaBackdropClasses({ open })}
          >
            {backdrop}
          </div>
          {cover ? (
            <div
              aria-hidden
              data-part="cta-scrim"
              className={ctaScrimClasses}
            />
          ) : null}
          {cover ? (
            <ThemeScopeProvider value="dark">{panel}</ThemeScopeProvider>
          ) : (
            panel
          )}
        </div>
      </Section>
    );
  }
  const centered = align === "center";
  const card = appearance === "solid";
  const layout = centered ? "stacked" : media ? "split" : "row";
  const text = (
    <SectionHeader
      align={align}
      className={ctaHeaderClasses}
      description={description}
      eyebrow={eyebrow}
      title={title}
      tagline={tagline}
    />
  );
  const picture = media ? (
    <div data-part="cta-media" className={ctaMediaClasses}>
      {media}
    </div>
  ) : null;
  const body = (
    <div data-part="cta-body" className={ctaClasses({ layout })}>
      {layout === "split" ? (
        <>
          <div data-part="cta-text" className={ctaTextClasses}>
            {text}
            <BlockActions actions={actions} />
          </div>
          {picture}
        </>
      ) : (
        <>
          {text}
          <BlockActions
            actions={actions}
            align={align}
            className={centered ? undefined : ctaActionsClasses}
          />
          {picture && (
            <div data-part="cta-media-row" className={ctaMediaRowClasses}>
              {picture}
            </div>
          )}
        </>
      )}
    </div>
  );
  return (
    <Section
      id={id}
      data-part="cta"
      data-appearance={appearance}
      muted={appearance === "soft"}
      theme={theme}
      className={className}
    >
      {card ? (
        <Card appearance="soft" className={ctaCardClasses}>
          {body}
        </Card>
      ) : (
        body
      )}
    </Section>
  );
};
