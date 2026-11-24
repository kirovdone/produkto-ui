import type { ReactNode } from "react";

export type CookieConsentLayout = "card" | "bar";

export type CookieConsentAlign = "start" | "center" | "end";

export interface CookieCategory {
  id: string;
  label: string;
  description: string;
  required?: boolean;
}

export type CookiePreferences = Record<string, boolean>;

export interface CookieConsentProps {
  title?: string;
  message?: ReactNode;
  categories?: CookieCategory[];
  defaultPreferences?: CookiePreferences;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAccept?: (preferences: CookiePreferences) => void;
  onReject?: (preferences: CookiePreferences) => void;
  onSave?: (preferences: CookiePreferences) => void;
  layout?: CookieConsentLayout;
  align?: CookieConsentAlign;
  className?: string;
}
