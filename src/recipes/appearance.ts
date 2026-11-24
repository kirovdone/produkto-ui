import { transparentControl } from "./control";

const APPEARANCES = ["solid", "soft", "outline", "transparent"] as const;

export type Appearance = (typeof APPEARANCES)[number];

const TONES = [
  "neutral",
  "accent",
  "destructive",
  "success",
  "warning",
  "info",
] as const;

export type Tone = (typeof TONES)[number];

export type StatusTone = Exclude<Tone, "neutral">;

type Paint = Record<Appearance, string>;

type TonedPaint = Record<Tone, Paint>;

const CONTROL: TonedPaint = {
  neutral: {
    solid:
      "bg-primary text-primary-foreground hover:bg-primary/65 focus-visible:bg-primary/65 shadow-sm",
    soft: "bg-muted text-foreground hover:bg-foreground/10 focus-visible:bg-foreground/10",
    outline:
      "inset-ring inset-ring-input text-foreground hover:bg-foreground/7 focus-visible:bg-foreground/7",
    transparent: transparentControl,
  },
  accent: {
    solid:
      "bg-primary text-primary-foreground hover:bg-primary/65 focus-visible:bg-primary/65 shadow-sm",
    soft: "bg-primary/10 text-primary hover:bg-primary/20 focus-visible:bg-primary/20",
    outline:
      "inset-ring inset-ring-primary/40 text-primary hover:bg-primary/10 focus-visible:bg-primary/10",
    transparent: "text-primary hover:bg-primary/10 focus-visible:bg-primary/10",
  },
  destructive: {
    solid:
      "bg-destructive text-background hover:bg-destructive/85 focus-visible:bg-destructive/85 shadow-sm",
    soft: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:bg-destructive/20",
    outline:
      "inset-ring inset-ring-destructive/40 text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10",
    transparent:
      "text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10",
  },
  success: {
    solid:
      "bg-success text-background hover:bg-success/85 focus-visible:bg-success/85 shadow-sm",
    soft: "bg-success/10 text-success hover:bg-success/20 focus-visible:bg-success/20",
    outline:
      "inset-ring inset-ring-success/40 text-success hover:bg-success/10 focus-visible:bg-success/10",
    transparent: "text-success hover:bg-success/10 focus-visible:bg-success/10",
  },
  warning: {
    solid:
      "bg-warning text-background hover:bg-warning/85 focus-visible:bg-warning/85 shadow-sm",
    soft: "bg-warning/10 text-warning hover:bg-warning/20 focus-visible:bg-warning/20",
    outline:
      "inset-ring inset-ring-warning/40 text-warning hover:bg-warning/10 focus-visible:bg-warning/10",
    transparent: "text-warning hover:bg-warning/10 focus-visible:bg-warning/10",
  },
  info: {
    solid:
      "bg-info text-background hover:bg-info/85 focus-visible:bg-info/85 shadow-sm",
    soft: "bg-info/10 text-info hover:bg-info/20 focus-visible:bg-info/20",
    outline:
      "inset-ring inset-ring-info/40 text-info hover:bg-info/10 focus-visible:bg-info/10",
    transparent: "text-info hover:bg-info/10 focus-visible:bg-info/10",
  },
};

const SURFACE: TonedPaint = {
  neutral: {
    solid: "border border-border bg-card text-foreground",
    soft: "border border-transparent bg-muted text-foreground",
    outline: "border border-input text-foreground",
    transparent: "border border-transparent text-foreground",
  },
  accent: {
    solid: "border border-primary/40 bg-card text-primary",
    soft: "border border-transparent bg-primary/10 text-primary",
    outline: "border border-primary/40 text-primary",
    transparent: "border border-transparent text-primary",
  },
  destructive: {
    solid: "border border-destructive/40 bg-card text-destructive",
    soft: "border border-transparent bg-destructive/10 text-destructive",
    outline: "border border-destructive/40 text-destructive",
    transparent: "border border-transparent text-destructive",
  },
  success: {
    solid: "border border-success/40 bg-card text-success",
    soft: "border border-transparent bg-success/10 text-success",
    outline: "border border-success/40 text-success",
    transparent: "border border-transparent text-success",
  },
  warning: {
    solid: "border border-warning/40 bg-card text-warning",
    soft: "border border-transparent bg-warning/10 text-warning",
    outline: "border border-warning/40 text-warning",
    transparent: "border border-transparent text-warning",
  },
  info: {
    solid: "border border-info/40 bg-card text-info",
    soft: "border border-transparent bg-info/10 text-info",
    outline: "border border-info/40 text-info",
    transparent: "border border-transparent text-info",
  },
};

const still = (paint: string) =>
  paint
    .split(" ")
    .filter((token) => !/^(hover|focus-visible):/.test(token))
    .join(" ");

const compound = (table: TonedPaint, shape: (paint: string) => string) =>
  TONES.flatMap((tone) =>
    APPEARANCES.map((appearance) => ({
      appearance,
      tone,
      className: shape(table[tone][appearance]),
    })),
  );

export const appearanceVariants: Paint = {
  solid: "",
  soft: "",
  outline: "",
  transparent: "",
};

export const toneVariants: Record<Tone, string> = {
  neutral: "",
  accent: "",
  destructive: "",
  success: "",
  warning: "",
  info: "",
};

export const controlPaint = compound(CONTROL, (paint) => paint);

export const controlLook = (tone: Tone, appearance: Appearance): string =>
  CONTROL[tone][appearance];

export const markLook = (tone: Tone, appearance: Appearance): string =>
  still(CONTROL[tone][appearance]);

export const markPaint = compound(CONTROL, still);

export const statusPaint: Record<StatusTone, string> = {
  accent: "border-primary/20 bg-primary/10 text-primary [&>svg]:text-current",
  destructive:
    "border-alert-destructive-line bg-alert-destructive-fill text-alert-destructive [&>svg]:text-alert-destructive-mark",
  success:
    "border-alert-success-line bg-alert-success-fill text-alert-success [&>svg]:text-alert-success-mark",
  warning:
    "border-alert-warning-line bg-alert-warning-fill text-alert-warning [&>svg]:text-alert-warning-mark",
  info: "border-alert-info-line bg-alert-info-fill text-alert-info [&>svg]:text-alert-info-mark",
};

export const surfaceFill: Paint = SURFACE.neutral;

export const framePaint: Paint = {
  solid: "border border-border bg-muted",
  soft: "border border-transparent bg-muted",
  outline: "border border-input bg-transparent",
  transparent: "border border-transparent bg-transparent",
};
