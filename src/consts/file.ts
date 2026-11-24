export const MIME_TYPES = {
  PNG: "image/png",
  JPEG: "image/jpeg",
  GIF: "image/gif",
  WEBP: "image/webp",
  SVG: "image/svg+xml",
} as const;

export const IMAGE_FORMATS = [
  MIME_TYPES.JPEG,
  MIME_TYPES.PNG,
  MIME_TYPES.WEBP,
] as const;

export const ICON_FORMATS = [MIME_TYPES.SVG] as const;

export const MAX_UPLOAD_BYTES = 1_024_000;
