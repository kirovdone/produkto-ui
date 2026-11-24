import {
  BlockActions,
  type BlockLink,
  type BlockSocialLink,
  Section,
  type SectionAlign,
} from "../../components/Section";
import { Button } from "../../components/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/Tooltip";
import { Link } from "../../components/Link";
import {
  footerBrandClasses,
  footerCallClasses,
  footerCallTitleClasses,
  footerColumnClasses,
  footerColumnLinksClasses,
  footerColumnTitleClasses,
  footerColumnsClasses,
  footerCopyrightClasses,
  footerDescriptionClasses,
  footerExtraClasses,
  footerFineClasses,
  footerLeadClasses,
  footerLegalClasses,
  footerLinkClasses,
  footerLinksClasses,
  footerMainClasses,
  footerSocialClasses,
  footerWordmarkClasses,
} from "./Footer.classes";
import type {
  FooterColumn,
  FooterProps,
  FooterSocialPlacement,
} from "./Footer.types";
import { pickCount } from "../../helpers/pickCount";

const countOf = (columns: FooterColumn[]) =>
  pickCount([1, 2, 3, 4, 5, 6] as const, columns.length);

const SocialLinks = ({
  social,
  align,
  placement,
}: {
  social: BlockSocialLink[];
  align: SectionAlign;
  placement: FooterSocialPlacement;
}) => (
  <ul
    data-part="footer-social"
    className={footerSocialClasses({ align, placement })}
  >
    {social.map((item) => (
      <li key={`${item.label}-${item.link}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              appearance="transparent"
              aria-label={item.label}
              href={item.link}
              muted
              size="sm"
            >
              {item.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{item.label}</TooltipContent>
        </Tooltip>
      </li>
    ))}
  </ul>
);

const TextLink = ({ link }: { link: BlockLink }) => (
  <Link href={link.link} muted className={footerLinkClasses}>
    {link.label}
  </Link>
);

export const Footer = ({
  id,
  brand,
  description,
  columns,
  links,
  social,
  socialPlacement = "lead",
  legal,
  copyright,
  call,
  wordmark,
  align = "start",
  muted = false,
  theme,
  width = "base",
  className,
  children,
}: FooterProps) => {
  const socialLead = socialPlacement === "lead" && Boolean(social?.length);
  const socialFine = socialPlacement === "fine" && Boolean(social?.length);
  const lead = Boolean(brand || description || socialLead || children);
  const nav = Boolean(columns?.length || links?.length);
  const fine = Boolean(copyright || legal?.length || socialFine);
  if (!lead && !nav && !fine && !call && !wordmark) return null;
  return (
    <footer data-part="footer">
      <Section
        id={id}
        muted={muted}
        theme={theme}
        width={width}
        className={className}
      >
        {call && (
          <div data-part="footer-call" className={footerCallClasses}>
            <p data-part="footer-call-title" className={footerCallTitleClasses}>
              {call.title}
            </p>
            <BlockActions actions={call.actions} />
          </div>
        )}
        {(lead || nav) && (
          <div data-part="footer-main" className={footerMainClasses({ align })}>
            {lead && (
              <div
                data-part="footer-lead"
                className={footerLeadClasses({ align })}
              >
                {brand && (
                  <div data-part="footer-brand" className={footerBrandClasses}>
                    {brand}
                  </div>
                )}
                {description && (
                  <p
                    data-part="footer-description"
                    className={footerDescriptionClasses}
                  >
                    {description}
                  </p>
                )}
                {social?.length && socialPlacement === "lead" ? (
                  <SocialLinks social={social} align={align} placement="lead" />
                ) : null}
                {children && (
                  <div data-part="footer-extra" className={footerExtraClasses}>
                    {children}
                  </div>
                )}
              </div>
            )}
            {columns?.length ? (
              <div
                data-part="footer-columns"
                className={footerColumnsClasses({
                  columns: countOf(columns),
                  lead,
                })}
              >
                {columns.map((column) => (
                  <div
                    key={column.title}
                    data-part="footer-column"
                    className={footerColumnClasses}
                  >
                    <h2
                      data-part="footer-column-title"
                      className={footerColumnTitleClasses}
                    >
                      {column.title}
                    </h2>
                    <ul
                      data-part="footer-column-links"
                      className={footerColumnLinksClasses}
                    >
                      {column.links.map((link) => (
                        <li key={`${link.label}-${link.link}`}>
                          <TextLink link={link} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : links?.length ? (
              <ul
                data-part="footer-links"
                className={footerLinksClasses({ lead, align })}
              >
                {links.map((link) => (
                  <li key={`${link.label}-${link.link}`}>
                    <TextLink link={link} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
        {wordmark && (
          <p
            aria-hidden
            data-part="footer-wordmark"
            className={footerWordmarkClasses}
          >
            {wordmark}
          </p>
        )}
        {fine && (
          <div
            data-part="footer-fine"
            className={footerFineClasses({
              divided: lead || nav || Boolean(wordmark),
              align,
            })}
          >
            {copyright && (
              <p
                data-part="footer-copyright"
                className={footerCopyrightClasses}
              >
                {copyright}
              </p>
            )}
            {legal?.length ? (
              <ul
                data-part="footer-legal"
                className={footerLegalClasses({ align })}
              >
                {legal.map((link) => (
                  <li key={`${link.label}-${link.link}`}>
                    <TextLink link={link} />
                  </li>
                ))}
              </ul>
            ) : null}
            {social?.length && socialFine ? (
              <SocialLinks social={social} align={align} placement="fine" />
            ) : null}
          </div>
        )}
      </Section>
    </footer>
  );
};
