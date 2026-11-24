import { Section } from "../../components/Section";
import { cn } from "../../cn";
import { Marquee } from "../../components/Marquee";
import { isValidElement, type ReactNode } from "react";
import {
  logoClasses,
  logoMediaClasses,
  logoWordmarkClasses,
  logosBesideClasses,
  logosBesideTitleClasses,
  logosClasses,
  logosMarqueeClasses,
  logosSectionClasses,
  logosTitleClasses,
} from "./Logos.classes";
import type { LogoItem, LogosProps } from "./Logos.types";

const isItem = (logo: LogoItem | ReactNode): logo is LogoItem =>
  typeof logo === "object" &&
  logo !== null &&
  !isValidElement(logo) &&
  "name" in logo;

const Mark = ({ logo }: { logo: LogoItem | ReactNode }) => {
  if (!isItem(logo)) return <>{logo}</>;
  if (logo.media === undefined || logo.media === null)
    return (
      <span data-part="logo-wordmark" className={logoWordmarkClasses}>
        {logo.name}
      </span>
    );
  return (
    <span
      aria-label={logo.name}
      data-part="logo-media"
      className={logoMediaClasses}
      role="img"
    >
      {logo.media}
    </span>
  );
};

export const Logos = ({
  id,
  title,
  logos,
  layout = "row",
  muted = false,
  className,
}: LogosProps) => {
  if (!logos?.length) return null;
  const columns = layout === "grid" ? (logos.length % 4 ? 3 : 4) : undefined;
  const marks = logos.map((logo, i) => (
    <li key={i} data-part="logo" className={logoClasses({ layout })}>
      <Mark logo={logo} />
    </li>
  ));
  if (layout === "marquee")
    return (
      <Section
        id={id}
        data-part="logos"
        muted={muted}
        className={cn(logosSectionClasses, className)}
      >
        {title && (
          <h2 data-part="logos-title" className={logosTitleClasses}>
            {title}
          </h2>
        )}
        <Marquee data-part="logos-marquee" className={logosMarqueeClasses}>
          <ul
            data-part="logos-list"
            className={logosClasses({ layout })}
            role="list"
          >
            {marks}
          </ul>
        </Marquee>
      </Section>
    );
  if (layout === "split")
    return (
      <Section
        id={id}
        data-part="logos"
        muted={muted}
        className={cn(logosSectionClasses, className)}
      >
        <div data-part="logos-beside" className={logosBesideClasses}>
          {title && (
            <h2 data-part="logos-title" className={logosBesideTitleClasses}>
              {title}
            </h2>
          )}
          <ul
            data-part="logos-list"
            className={logosClasses({ layout })}
            role="list"
          >
            {marks}
          </ul>
        </div>
      </Section>
    );
  return (
    <Section
      id={id}
      data-part="logos"
      muted={muted}
      className={cn(logosSectionClasses, className)}
    >
      {title && (
        <h2 data-part="logos-title" className={logosTitleClasses}>
          {title}
        </h2>
      )}
      <ul
        data-part="logos-list"
        className={logosClasses({ layout, columns })}
        role="list"
      >
        {logos.map((logo, i) => (
          <li key={i} data-part="logo" className={logoClasses({ layout })}>
            <Mark logo={logo} />
          </li>
        ))}
      </ul>
    </Section>
  );
};
