import { BlockActions, Section, SectionHeader } from "../../components/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/Tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/Accordion";
import {
  faqAccordionClasses,
  faqAnswerClasses,
  faqAsideClasses,
  faqClasses,
  faqContactClasses,
  faqContactIconClasses,
  faqHeaderClasses,
  faqHelpClasses,
  faqItemClasses,
  faqNoteClasses,
  faqOpenClasses,
  faqOpenItemClasses,
  faqOpenQuestionClasses,
  faqQuestionClasses,
  faqQuestionsClasses,
  faqTopicPanelClasses,
  faqTopicsClasses,
  faqWithContactClasses,
} from "./Faq.classes";
import type { FaqContact, FaqItem, FaqProps } from "./Faq.types";

const Questions = ({ items }: { items: readonly FaqItem[] }) => (
  <Accordion
    appearance="transparent"
    className={faqAccordionClasses}
    collapsible
    type="single"
  >
    {items.map((item, i) => (
      <AccordionItem key={i} className={faqItemClasses} value={`faq-${i}`}>
        <AccordionTrigger className={faqQuestionClasses}>
          {item.question}
        </AccordionTrigger>
        <AccordionContent className={faqAnswerClasses}>
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

const OpenQuestions = ({ items }: { items: readonly FaqItem[] }) => (
  <dl data-part="faq-open" className={faqOpenClasses}>
    {items.map((item, i) => (
      <div key={i} className={faqOpenItemClasses}>
        <dt className={faqOpenQuestionClasses}>{item.question}</dt>
        <dd className={faqAnswerClasses}>{item.answer}</dd>
      </div>
    ))}
  </dl>
);

const ContactCard = ({ contact }: { contact: FaqContact }) => (
  <Card appearance="soft" data-part="faq-contact">
    <CardHeader className={faqContactClasses}>
      {contact.icon ? (
        <span aria-hidden className={faqContactIconClasses}>
          {contact.icon}
        </span>
      ) : null}
      <CardTitle>{contact.title}</CardTitle>
      {contact.description ? (
        <CardDescription>{contact.description}</CardDescription>
      ) : null}
    </CardHeader>
    {contact.actions?.length ? (
      <CardContent>
        <BlockActions actions={contact.actions} />
      </CardContent>
    ) : null}
  </Card>
);

const structuredDataOf = (items: readonly FaqItem[]) => {
  const answered = items.flatMap((item) =>
    typeof item.answer === "string" &&
    item.question.trim() &&
    item.answer.trim()
      ? [{ question: item.question.trim(), answer: item.answer.trim() }]
      : [],
  );
  if (!answered.length) return null;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }).replace(/</g, "\\u003c");
};

export const Faq = ({
  items,
  topics,
  contact,
  layout = "stacked",
  note,
  actions,
  id,
  eyebrow,
  title,
  tagline,
  description,
  align = "center",
  muted = false,
  structuredData = false,
  className,
}: FaqProps) => {
  const all = [
    ...(items ?? []),
    ...(topics ?? []).flatMap((topic) => topic.items),
  ];
  if (!all.length) return null;
  const schema = structuredData ? structuredDataOf(all) : null;
  const schemaScript = schema ? (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  ) : null;
  const split = layout === "split";
  const side = split ? "start" : align;
  const listed = topics?.length ? (
    <Tabs className={faqTopicsClasses} defaultValue="topic-0">
      <TabsList>
        {topics.map((topic, i) => (
          <TabsTrigger key={topic.label} value={`topic-${i}`}>
            {topic.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {topics.map((topic, i) => (
        <TabsContent
          className={faqTopicPanelClasses}
          key={topic.label}
          value={`topic-${i}`}
        >
          <Questions items={topic.items} />
        </TabsContent>
      ))}
    </Tabs>
  ) : layout === "columns" ? (
    <OpenQuestions items={items ?? []} />
  ) : (
    <Questions items={items ?? []} />
  );
  const questions = contact ? (
    <div data-part="faq-with-contact" className={faqWithContactClasses}>
      {listed}
      <ContactCard contact={contact} />
    </div>
  ) : (
    listed
  );
  const help =
    note || actions?.length ? (
      <div data-part="faq-help" className={faqHelpClasses({ align: side })}>
        {note && (
          <p data-part="faq-note" className={faqNoteClasses}>
            {note}
          </p>
        )}
        <BlockActions actions={actions} align={side} size="base" />
      </div>
    ) : null;

  if (split)
    return (
      <Section id={id} data-part="faq" muted={muted} className={className}>
        {schemaScript}
        <div data-part="faq-body" className={faqClasses({ layout })}>
          <SectionHeader
            className={faqHeaderClasses}
            description={description}
            eyebrow={eyebrow}
            title={title}
            tagline={tagline}
          />
          <div data-part="faq-questions" className={faqQuestionsClasses}>
            {questions}
          </div>
          {help && (
            <div data-part="faq-aside" className={faqAsideClasses}>
              {help}
            </div>
          )}
        </div>
      </Section>
    );

  return (
    <Section
      id={id}
      data-part="faq"
      eyebrow={eyebrow}
      title={title}
      tagline={tagline}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      {schemaScript}
      <div data-part="faq-body" className={faqClasses({ layout })}>
        {questions}
        {help}
      </div>
    </Section>
  );
};
