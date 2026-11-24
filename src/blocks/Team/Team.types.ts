import type {
  BlockAction,
  BlockLink,
  SectionAlign,
} from "../../components/Section";
import type { ReactNode } from "react";

export interface TeamLink extends BlockLink {
  icon?: ReactNode;
}

export interface TeamMember {
  name: string;
  role?: string;
  avatar?: string;
  photo?: string;
  bio?: ReactNode;
  links?: TeamLink[];
}

export type TeamLayout =
  "grid" | "compact" | "portraits" | "rows" | "founder" | "cards";

export type TeamListLayout = Extract<TeamLayout, "grid" | "compact">;

export type TeamColumns = 2 | 3 | 4;

export interface TeamProps {
  members?: TeamMember[];
  layout?: TeamLayout;
  columns?: TeamColumns;
  actions?: BlockAction[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
