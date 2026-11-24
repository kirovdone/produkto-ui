type DateLike = Date | string | number;

interface Moment {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
}

const FALLBACK_LANG = "en";

const MOMENT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
};

const momentFormatters = new Map<string, Intl.DateTimeFormat>();
const monthNames = new Map<string, string>();

const toDate = (value: DateLike): Date | null => {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const momentFormatter = (timeZone?: string): Intl.DateTimeFormat => {
  const id = timeZone ?? "";
  const cached = momentFormatters.get(id);
  if (cached) return cached;
  let made: Intl.DateTimeFormat;
  try {
    made = new Intl.DateTimeFormat(
      "en-US",
      timeZone ? { ...MOMENT_OPTIONS, timeZone } : MOMENT_OPTIONS,
    );
  } catch {
    made = new Intl.DateTimeFormat("en-US", MOMENT_OPTIONS);
  }
  momentFormatters.set(id, made);
  return made;
};

const momentOf = (value: DateLike, timeZone?: string): Moment | null => {
  const date = toDate(value);
  if (!date) return null;
  const parts = momentFormatter(timeZone).formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  return {
    day: read("day"),
    month: read("month"),
    year: read("year"),
    hour: read("hour") % 24,
    minute: read("minute"),
  };
};

const monthName = (month: number, lang?: string): string => {
  const language = (lang || FALLBACK_LANG).split("-")[0];
  const id = `${language}:${month}`;
  const cached = monthNames.get(id);
  if (cached) return cached;
  const on = Date.UTC(2000, month - 1, 15);
  let name: string;
  try {
    name = new Intl.DateTimeFormat(language, {
      month: "short",
      timeZone: "UTC",
    }).format(on);
  } catch {
    name = new Intl.DateTimeFormat(FALLBACK_LANG, {
      month: "short",
      timeZone: "UTC",
    }).format(on);
  }
  monthNames.set(id, name);
  return name;
};

const two = (value: number) => String(value).padStart(2, "0");

const clockOf = (hour: number, minute: number): string =>
  `${two(hour % 12 || 12)}:${two(minute)} ${hour < 12 ? "AM" : "PM"}`;

const dayOf = (at: Moment, lang?: string): string =>
  `${at.day} ${monthName(at.month, lang)} ${at.year}`;

export const formatDayMonth = (
  value: DateLike,
  lang?: string,
  timeZone?: string,
): string => {
  const at = momentOf(value, timeZone);
  return at ? `${at.day} ${monthName(at.month, lang)}` : "";
};

export const formatDate = (
  value: DateLike,
  lang?: string,
  timeZone?: string,
): string => {
  const at = momentOf(value, timeZone);
  return at ? dayOf(at, lang) : "";
};

export const formatTime = (value: DateLike, timeZone?: string): string => {
  const at = momentOf(value, timeZone);
  return at ? clockOf(at.hour, at.minute) : "";
};

export const formatDateTime = (
  value: DateLike,
  lang?: string,
  timeZone?: string,
): string => {
  const at = momentOf(value, timeZone);
  return at ? `${dayOf(at, lang)} / ${clockOf(at.hour, at.minute)}` : "";
};

export const formatClock = (clock: string): string => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(clock.trim());
  return match ? clockOf(Number(match[1]) % 24, Number(match[2])) : clock;
};

export const DATE_PATTERN = "d LLL yyyy";
