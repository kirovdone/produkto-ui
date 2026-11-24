import { cva } from "class-variance-authority";
import type { SectionAlign } from "../../components/Section";
import type { FooterSocialPlacement } from "./Footer.types";

export const footerCallClasses =
  "mb-12 flex flex-col gap-6 border-b border-border pb-12 sm:flex-row sm:items-center sm:justify-between";

export const footerCallTitleClasses = "heading-3xl text-balance";

export const footerMainClasses = cva("", {
  variants: {
    align: {
      start: "grid gap-12 lg:grid-cols-3 lg:gap-16",
      center: "flex flex-col items-center gap-8 text-center",
      end: "flex flex-col items-end gap-8 text-end",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    align: "start",
  },
});

export const footerLeadClasses = cva("flex max-w-sm min-w-0 flex-col gap-4", {
  variants: {
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    align: "start",
  },
});

export const footerBrandClasses = "heading-lg";

export const footerDescriptionClasses = "description-sm text-pretty";

export const footerSocialClasses = cva("flex flex-wrap gap-1", {
  variants: {
    align: {
      start: "",
      center: "justify-center",
      end: "justify-end",
    } satisfies Record<SectionAlign, string>,
    placement: {
      lead: "",
      fine: "",
    } satisfies Record<FooterSocialPlacement, string>,
  },
  compoundVariants: [
    { align: "start", placement: "lead", className: "-ms-2" },
    { align: "start", placement: "fine", className: "-me-2" },
    { align: "end", className: "-me-2 justify-end" },
  ],
  defaultVariants: {
    align: "start",
    placement: "lead",
  },
});

export const footerExtraClasses = "mt-2 w-full";

export const footerColumnsClasses = cva(
  "grid min-w-0 grid-cols-2 gap-x-8 gap-y-10",
  {
    variants: {
      columns: {
        1: "sm:grid-cols-1",
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-3",
        4: "sm:grid-cols-4",
        5: "sm:grid-cols-3 lg:grid-cols-5",
        6: "sm:grid-cols-3 lg:grid-cols-6",
      },
      lead: {
        true: "lg:col-span-2",
        false: "lg:col-span-3",
      },
    },
    defaultVariants: {
      columns: 4,
      lead: true,
    },
  },
);

export const footerColumnClasses = "min-w-0";

export const footerColumnTitleClasses = "body-sm font-semibold";

export const footerColumnLinksClasses = "mt-4 flex flex-col gap-3";

export const footerLinksClasses = cva("flex flex-wrap gap-x-8 gap-y-3", {
  variants: {
    lead: {
      true: "lg:col-span-2 lg:justify-end",
      false: "lg:col-span-3",
    },
    align: {
      start: "",
      center: "justify-center lg:justify-center",
      end: "justify-end lg:justify-end",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    lead: true,
    align: "start",
  },
});

export const footerWordmarkClasses =
  "mt-12 border-t border-border pt-10 display-6xl leading-none sm:display-8xl lg:display-9xl";

export const footerLinkClasses = "body-sm";

export const footerFineClasses = cva("flex flex-col gap-4", {
  variants: {
    divided: {
      true: "mt-12 border-t border-border pt-8",
      false: "",
    },
    align: {
      start: "sm:flex-row sm:items-center sm:justify-between",
      center: "items-center text-center",
      end: "items-end text-end",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    divided: true,
    align: "start",
  },
});

export const footerCopyrightClasses = "description-sm";

export const footerLegalClasses = cva("flex flex-wrap gap-x-6 gap-y-2", {
  variants: {
    align: {
      start: "sm:ms-auto",
      center: "justify-center",
      end: "justify-end",
    } satisfies Record<SectionAlign, string>,
  },
  defaultVariants: {
    align: "start",
  },
});
