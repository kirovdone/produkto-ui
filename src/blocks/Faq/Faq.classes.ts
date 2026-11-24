import { cva } from "class-variance-authority";
import type { SectionAlign } from "../../components/Section";
import type { FaqLayout } from "./Faq.types";

export const faqClasses = cva("", {
  variants: {
    layout: {
      stacked: "flex flex-col gap-10 sm:gap-12",
      split:
        "grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8",
      columns: "flex flex-col gap-10 sm:gap-12",
    } satisfies Record<FaqLayout, string>,
  },
  defaultVariants: {
    layout: "stacked",
  },
});

export const faqHeaderClasses = "lg:col-start-1 lg:row-start-1";

export const faqQuestionsClasses =
  "lg:col-start-2 lg:row-span-2 lg:row-start-1";

export const faqAccordionClasses =
  "flex w-full min-w-0 flex-col gap-3 md:gap-4";

export const faqItemClasses =
  "overflow-hidden rounded-2xl border border-border bg-muted last:border-b has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-ring/60";

export const faqQuestionClasses =
  "gap-4 p-5 label-base text-foreground focus-visible:bg-transparent focus-visible:ring-0 transition-colors enabled:hover:bg-hover border-border data-[state=open]:border-b";

export const faqAnswerClasses =
  "bg-transparent p-5 description-base text-pretty [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4";

export const faqAsideClasses = "lg:col-start-1 lg:row-start-2";

export const faqOpenClasses = "grid gap-x-16 md:grid-cols-2";

export const faqOpenItemClasses =
  "flex flex-col gap-2 border-t border-border py-6";

export const faqOpenQuestionClasses = "label-base text-foreground";

export const faqTopicsClasses = "flex w-full flex-col items-center gap-8";

export const faqTopicPanelClasses = "w-full max-w-3xl";

export const faqWithContactClasses =
  "grid w-full gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-10";

export const faqContactClasses = "flex flex-col items-start gap-3";

export const faqContactIconClasses =
  "flex size-10 items-center justify-center rounded-xl border border-border bg-background [&_svg]:size-5";

export const faqHelpClasses = cva("flex flex-col gap-4", {
  variants: {
    align: {
      start: "items-start",
      center: "items-center text-center",
      end: "items-end text-end",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    align: "center",
  },
});

export const faqNoteClasses =
  "description-base text-pretty text-muted-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4";
