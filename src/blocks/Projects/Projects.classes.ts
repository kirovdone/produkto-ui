import { cva } from "class-variance-authority";
import type { ProjectsColumns, ProjectsLayout } from "./Projects.types";
import { blockBody } from "../../recipes/block";

export const projectsBodyClasses = `${blockBody}`;

export const projectsClasses = cva("", {
  variants: {
    layout: {
      grid: "grid gap-x-6 gap-y-12",
      featured: "grid gap-x-6 gap-y-12",
      list: "divide-y divide-border border-y border-border",
      alternate: "flex flex-col gap-16 lg:gap-24",
    } satisfies Record<ProjectsLayout, string>,
    columns: {
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    } satisfies Record<ProjectsColumns, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const projectClasses = cva("group relative min-w-0", {
  variants: {
    layout: {
      grid: "flex flex-col gap-5",
      featured:
        "col-span-full grid items-center gap-6 lg:grid-cols-5 lg:gap-12",
      list: "flex items-start gap-4 py-5 sm:items-center sm:gap-6 sm:py-6",
      alternate:
        "grid items-center gap-6 lg:grid-cols-2 lg:gap-16 lg:even:[&>[data-part=project-image]]:order-last",
    } satisfies Record<ProjectsLayout, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const projectFrameClasses = cva(
  "relative overflow-hidden border border-border",
  {
    variants: {
      muted: {
        true: "bg-background",
        false: "bg-muted",
      },
      layout: {
        grid: "aspect-4/3 rounded-2xl",
        featured:
          "aspect-4/3 rounded-2xl sm:aspect-video lg:col-span-3 lg:aspect-4/3",
        list: "aspect-4/3 w-24 shrink-0 rounded-xl sm:w-40",
        alternate: "aspect-4/3 rounded-2xl",
      } satisfies Record<ProjectsLayout, string>,
    },
    defaultVariants: {
      muted: false,
      layout: "grid",
    },
  },
);

export const projectImageClasses =
  "size-full *:size-full *:object-cover *:transition-transform motion-safe:group-hover:*:scale-[1.03]";

export const projectContentClasses = cva("flex min-w-0 flex-col", {
  variants: {
    layout: {
      grid: "gap-2",
      featured: "gap-4 lg:col-span-2",
      list: "flex-1 gap-1",
      alternate: "gap-4",
    } satisfies Record<ProjectsLayout, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const projectHeadingClasses =
  "flex items-baseline justify-between gap-4";

export const projectTitleClasses = cva("min-w-0 text-balance", {
  variants: {
    layout: {
      grid: "heading-lg",
      featured: "heading-2xl sm:heading-3xl",
      list: "heading-base sm:heading-lg",
      alternate: "heading-2xl sm:heading-3xl",
    } satisfies Record<ProjectsLayout, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const projectLinkClasses = cva(
  "underline-offset-4 outline-none group-hover:underline after:absolute focus-visible:after:ring-2 focus-visible:after:ring-ring/60",
  {
    variants: {
      layout: {
        grid: "after:-inset-2 after:rounded-3xl",
        featured: "after:-inset-2 after:rounded-3xl",
        list: "after:-inset-x-2 after:inset-y-1 after:rounded-2xl",
        alternate: "after:-inset-2 after:rounded-3xl",
      } satisfies Record<ProjectsLayout, string>,
    },
    defaultVariants: {
      layout: "grid",
    },
  },
);

export const projectDescriptionClasses = cva("text-pretty", {
  variants: {
    layout: {
      grid: "description-base",
      featured: "description-lg",
      list: "line-clamp-2 description-sm sm:description-base",
      alternate: "description-lg",
    } satisfies Record<ProjectsLayout, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const projectYearClasses = cva("shrink-0 caption-sm tabular-nums", {
  variants: {
    layout: {
      grid: "",
      featured: "",
      list: "sm:w-14 sm:text-end",
      alternate: "",
    } satisfies Record<ProjectsLayout, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const projectTagsClasses = "flex flex-wrap gap-1 pt-1";

export const projectMetaClasses =
  "flex shrink-0 items-center gap-4 self-start pt-0.5 sm:self-center sm:pt-0";

export const projectArrowClasses = cva("pointer-events-none transition", {
  variants: {
    layout: {
      grid: "absolute end-3 top-3 flex size-9 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-sm group-focus-within:opacity-100 group-hover:opacity-100",
      featured:
        "absolute end-3 top-3 flex size-9 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-sm group-focus-within:opacity-100 group-hover:opacity-100",
      list: "hidden text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground sm:block",
      alternate:
        "absolute end-3 top-3 flex size-9 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-sm group-focus-within:opacity-100 group-hover:opacity-100",
    } satisfies Record<ProjectsLayout, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const projectsChipsClasses = "flex-wrap";

export const projectsChipClasses = "rounded-full";

export const projectFactsClasses =
  "grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-12";

export const projectFactClasses = "flex min-w-0 flex-col gap-1";

export const projectFactLabelClasses = "caption-sm";

export const projectFactValueClasses = "label-base";
