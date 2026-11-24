import { cva } from "class-variance-authority";
import type { TeamColumns, TeamListLayout } from "./Team.types";
import { blockBody } from "../../recipes/block";

export const teamBodyClasses = `${blockBody}`;

export const teamClasses = cva("gap-x-8", {
  variants: {
    sparse: {
      true: "flex flex-wrap justify-center *:w-full sm:*:w-72",
      false: "grid",
    },
    layout: {
      grid: "gap-y-12",
      compact: "gap-y-6",
    } satisfies Record<TeamListLayout, string>,
    columns: {
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    } satisfies Record<TeamColumns, string>,
  },
  defaultVariants: {
    sparse: false,
    layout: "grid",
    columns: 4,
  },
});

export const teamMemberClasses = cva("flex gap-4", {
  variants: {
    layout: {
      grid: "flex-col",
      compact: "min-w-0 items-center has-data-[part=team-links]:items-start",
    } satisfies Record<TeamListLayout, string>,
    centered: {
      true: "items-center text-center",
      false: "",
    },
  },
  defaultVariants: {
    layout: "grid",
    centered: false,
  },
});

export const teamMemberTextClasses = cva("", {
  variants: {
    layout: {
      grid: "flex flex-col gap-1",
      compact: "min-w-0 flex-1",
    } satisfies Record<TeamListLayout, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const teamNameClasses = cva("heading-base", {
  variants: {
    layout: {
      grid: "",
      compact: "truncate",
    } satisfies Record<TeamListLayout, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const teamRoleClasses = cva("", {
  variants: {
    layout: {
      grid: "description-base",
      compact: "truncate description-sm",
    } satisfies Record<TeamListLayout, string>,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const teamLinksClasses = cva("flex flex-wrap items-center", {
  variants: {
    layout: {
      grid: "",
      compact: "mt-1",
    } satisfies Record<TeamListLayout, string>,
    centered: {
      true: "justify-center",
      false: "-ms-2",
    },
  },
  defaultVariants: {
    layout: "grid",
    centered: false,
  },
});

export const teamGridClasses = cva("grid gap-x-6 gap-y-10", {
  variants: {
    columns: {
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    } satisfies Record<TeamColumns, string>,
  },
  defaultVariants: {
    columns: 4,
  },
});

export const teamPortraitClasses = "flex flex-col gap-3";

export const teamPortraitPhotoClasses =
  "aspect-[3/4] w-full rounded-2xl object-cover";

export const teamSplitClasses =
  "grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16";

export const teamRowsClasses = "flex flex-col border-t border-border";

export const teamRowClasses = "flex gap-4 border-b border-border py-6";

export const teamRowTextClasses = "flex min-w-0 flex-1 flex-col gap-1";

export const teamBioClasses = "description-base text-pretty";

export const teamFounderClasses =
  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16";

export const teamFounderPhotoClasses =
  "aspect-[4/5] w-full rounded-2xl object-cover";

export const teamFounderTextClasses = "flex min-w-0 flex-col gap-6";

export const teamFounderBioClasses =
  "flex flex-col gap-4 body-base text-pretty [&_p]:text-pretty";

export const teamFounderNameClasses = "flex flex-col gap-1";

export const teamCardClasses = "flex flex-col p-0";

export const teamCardPhotoClasses = "aspect-[4/3] w-full object-cover";

export const teamCardBodyClasses = "flex flex-1 flex-col gap-3 p-4";
