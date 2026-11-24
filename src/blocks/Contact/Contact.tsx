"use client";

import {
  Section,
  type SectionAlign,
  SectionHeader,
} from "../../components/Section";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { Textarea } from "../../components/Textarea";
import { HostLink, useTranslate } from "../../host";
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  contactActionClasses,
  contactCardClasses,
  contactClasses,
  contactDetailClasses,
  contactDetailTextClasses,
  contactDetailsClasses,
  contactFieldClasses,
  contactFieldsClasses,
  contactFormCardClasses,
  contactFormClasses,
  contactHourClasses,
  contactHoursBlockClasses,
  contactHoursCardClasses,
  contactHoursClasses,
  contactHoursTitleClasses,
  contactIconClasses,
  contactIntroClasses,
  contactLabelClasses,
  contactLocationBodyClasses,
  contactLocationClasses,
  contactLocationItemClasses,
  contactLocationMapClasses,
  contactLocationNameClasses,
  contactLocationsClasses,
  contactMapClasses,
  contactMessageClasses,
  contactPanelClasses,
  contactStatusClasses,
  contactThanksClasses,
  contactThanksTextClasses,
  contactThanksTitleClasses,
  contactValueClasses,
  contactVisitClasses,
} from "./Contact.classes";
import type {
  ContactDetail,
  ContactHours,
  ContactProps,
  ContactValues,
} from "./Contact.types";
import { pickCount } from "../../helpers/pickCount";

const FIELDS: (keyof ContactValues)[] = ["name", "email", "message"];

const EMPTY: ContactValues = { name: "", email: "", message: "" };

const countOf = (details: ContactDetail[]) =>
  details.length > 4
    ? "more"
    : pickCount([1, 2, 3, 4] as const, details.length);

const IconTile = ({ icon }: { icon: ReactNode }) => (
  <span aria-hidden data-part="contact-icon" className={contactIconClasses}>
    {icon}
  </span>
);

const Detail = ({
  detail,
  layout,
}: {
  detail: ContactDetail;
  layout: "list" | "cards";
}) => (
  <>
    {detail.icon && <IconTile icon={detail.icon} />}
    <div
      data-part="contact-detail-text"
      className={contactDetailTextClasses({ layout })}
    >
      <p data-part="contact-label" className={contactLabelClasses}>
        {detail.label}
      </p>
      <p data-part="contact-value" className={contactValueClasses}>
        {detail.link ? (
          <Link href={detail.link}>{detail.value}</Link>
        ) : (
          detail.value
        )}
      </p>
      {detail.action ? (
        <HostLink className={contactActionClasses} href={detail.action.link}>
          {detail.action.label}
          <Icon icon={ArrowRight01Icon} />
        </HostLink>
      ) : null}
    </div>
  </>
);

const HoursList = ({ hours }: { hours: ContactHours }) => (
  <dl data-part="contact-hours" className={contactHoursClasses}>
    {hours.rows.map((row, i) => (
      <div
        key={`${row.days}-${i}`}
        data-today={row.today || undefined}
        className={contactHourClasses}
      >
        <dt>{row.days}</dt>
        <dd>{row.time}</dd>
      </div>
    ))}
  </dl>
);

const Details = ({
  details,
  layout,
  align,
}: {
  details: ContactDetail[];
  layout: "list" | "cards";
  align: SectionAlign;
}) => (
  <ul
    role="list"
    data-part="contact-details"
    className={
      layout === "cards"
        ? contactDetailsClasses({ layout, count: countOf(details), align })
        : contactDetailsClasses({ layout })
    }
  >
    {details.map((detail, i) => (
      <li
        key={`${detail.label}-${i}`}
        data-part="contact-detail"
        className={contactDetailClasses({ layout })}
      >
        {layout === "cards" ? (
          <Card className={contactCardClasses({ align })}>
            <Detail detail={detail} layout={layout} />
          </Card>
        ) : (
          <Detail detail={detail} layout={layout} />
        )}
      </li>
    ))}
  </ul>
);

const ContactForm = ({
  onSubmit,
  submitLabel,
}: {
  onSubmit: (values: ContactValues) => void | Promise<void>;
  submitLabel?: string;
}) => {
  const t = useTranslate();
  const id = useId();
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);
  const thanks = useRef<HTMLDivElement>(null);
  const refs = { name, email, message };

  useEffect(() => {
    if (status === "sent") thanks.current?.focus();
  }, [status]);

  const set = (field: keyof ContactValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const sent: ContactValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };
    const missing = FIELDS.find((field) => !sent[field]);
    if (missing) {
      refs[missing].current?.focus();
      return;
    }
    setStatus("sending");
    try {
      await onSubmit(sent);
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  if (status === "sent")
    return (
      <div
        ref={thanks}
        role="status"
        tabIndex={-1}
        data-part="contact-thanks"
        className={contactThanksClasses}
      >
        <IconTile icon={<Icon icon={CheckmarkCircle02Icon} />} />
        <h3
          data-part="contact-thanks-title"
          className={contactThanksTitleClasses}
        >
          {t("Message sent")}
        </h3>
        <p data-part="contact-thanks-text" className={contactThanksTextClasses}>
          {t("Thanks for getting in touch. We'll get back to you soon.")}
        </p>
      </div>
    );

  return (
    <form
      data-part="contact-form"
      className={contactFormClasses}
      onSubmit={submit}
    >
      <div data-part="contact-fields" className={contactFieldsClasses}>
        <div className={contactFieldClasses}>
          <Label htmlFor={`${id}-name`}>{t("Name")}</Label>
          <Input
            autoComplete="name"
            id={`${id}-name`}
            name="name"
            onChange={(event) => set("name")(event.target.value)}
            ref={name}
            required
            value={values.name}
          />
        </div>
        <div className={contactFieldClasses}>
          <Label htmlFor={`${id}-email`}>{t("Email")}</Label>
          <Input
            autoComplete="email"
            id={`${id}-email`}
            name="email"
            onChange={(event) => set("email")(event.target.value)}
            ref={email}
            required
            type="email"
            value={values.email}
          />
        </div>
      </div>
      <div className={contactFieldClasses}>
        <Label htmlFor={`${id}-message`}>{t("Message")}</Label>
        <Textarea
          className={contactMessageClasses}
          id={`${id}-message`}
          name="message"
          onChange={(event) => set("message")(event.target.value)}
          ref={message}
          required
          rows={5}
          value={values.message}
        />
      </div>
      <Button
        loading={status === "sending"}
        tone="accent"
        type="submit"
        size="lg"
        block
      >
        {submitLabel ?? t("Send message")}
      </Button>
    </form>
  );
};

export const Contact = ({
  details,
  map,
  mapFirst = false,
  hours,
  status,
  locations,
  onSubmit,
  submitLabel,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: ContactProps) => {
  if (
    !details?.length &&
    !onSubmit &&
    !map &&
    !hours?.rows.length &&
    !locations?.length
  )
    return null;
  if (locations?.length)
    return (
      <Section
        id={id}
        data-part="contact"
        data-layout="locations"
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={align}
        muted={muted}
        className={className}
      >
        <ul
          role="list"
          data-part="contact-locations"
          className={contactLocationsClasses}
        >
          {locations.map((place, i) => (
            <li
              key={`${place.name}-${i}`}
              className={contactLocationItemClasses}
            >
              <Card className={contactLocationClasses}>
                {place.map ? (
                  <div
                    data-part="contact-map"
                    className={contactLocationMapClasses}
                  >
                    {place.map}
                  </div>
                ) : null}
                <div className={contactLocationBodyClasses}>
                  <h3 className={contactLocationNameClasses}>{place.name}</h3>
                  {place.details?.length ? (
                    <Details
                      details={place.details}
                      layout="list"
                      align="start"
                    />
                  ) : null}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  if (!onSubmit && (map || hours?.rows.length))
    return (
      <Section
        id={id}
        data-part="contact"
        data-layout="visit"
        muted={muted}
        className={className}
      >
        <div
          data-part="contact-body"
          className={contactVisitClasses({
            mapFirst: Boolean(map) && mapFirst,
          })}
        >
          <div data-part="contact-intro" className={contactIntroClasses}>
            <SectionHeader
              description={description}
              eyebrow={eyebrow}
              title={title}
            />
            {status ? (
              <Badge className={contactStatusClasses} tone="success">
                {status}
              </Badge>
            ) : null}
            {details?.length ? (
              <Details details={details} layout="list" align="start" />
            ) : null}
            {map && hours?.rows.length ? (
              <div className={contactHoursBlockClasses}>
                {hours.title ? (
                  <p className={contactLabelClasses}>{hours.title}</p>
                ) : null}
                <HoursList hours={hours} />
              </div>
            ) : null}
          </div>
          {map ? (
            <div data-part="contact-map" className={contactMapClasses}>
              {map}
            </div>
          ) : hours?.rows.length ? (
            <Card className={contactHoursCardClasses}>
              {hours.title ? (
                <p className={contactHoursTitleClasses}>{hours.title}</p>
              ) : null}
              <HoursList hours={hours} />
            </Card>
          ) : null}
        </div>
      </Section>
    );
  const split = Boolean(onSubmit) && align !== "center";
  const form = onSubmit ? (
    <Card className={contactFormCardClasses}>
      <ContactForm onSubmit={onSubmit} submitLabel={submitLabel} />
    </Card>
  ) : null;

  if (split)
    return (
      <Section id={id} data-part="contact" muted={muted} className={className}>
        <div
          data-part="contact-body"
          className={contactClasses({ layout: "split" })}
        >
          <div data-part="contact-intro" className={contactIntroClasses}>
            <SectionHeader
              description={description}
              eyebrow={eyebrow}
              title={title}
            />
            {details?.length ? (
              <Details details={details} layout="list" align="start" />
            ) : null}
          </div>
          {form}
        </div>
      </Section>
    );

  return (
    <Section
      id={id}
      data-part="contact"
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      <div
        data-part="contact-body"
        className={contactClasses({ layout: "stacked" })}
      >
        {details?.length ? (
          <Details details={details} layout="cards" align={align} />
        ) : null}
        {form && (
          <div
            data-part="contact-panel"
            className={contactPanelClasses({ align })}
          >
            {form}
          </div>
        )}
      </div>
    </Section>
  );
};
