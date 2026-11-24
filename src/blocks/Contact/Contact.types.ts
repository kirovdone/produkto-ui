import type { BlockLink, SectionAlign } from "../../components/Section";
import type { ReactNode } from "react";

export interface ContactDetail {
  label: string;
  value: string;
  link?: string;
  icon?: ReactNode;
  action?: BlockLink;
}

export interface ContactHour {
  days: string;
  time: string;
  today?: boolean;
}

export interface ContactHours {
  title?: ReactNode;
  rows: ContactHour[];
}

export interface ContactLocation {
  name: string;
  details?: ContactDetail[];
  map?: ReactNode;
}

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactProps {
  details?: ContactDetail[];
  map?: ReactNode;
  mapFirst?: boolean;
  hours?: ContactHours;
  status?: ReactNode;
  locations?: ContactLocation[];
  onSubmit?: (values: ContactValues) => void | Promise<void>;
  submitLabel?: string;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: SectionAlign;
  muted?: boolean;
  className?: string;
}
