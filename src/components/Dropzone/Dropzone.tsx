"use client";

import {
  Add01Icon,
  Delete01Icon,
  Download01Icon,
  File01Icon,
  PlayIcon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { cn } from "../../cn";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { ErrorCode, useDropzone, type DropzoneRootProps } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { MAX_UPLOAD_BYTES } from "../../consts/file";
import { useTranslate, useUiHost } from "../../host";
import { Image } from "../Image";
import { Spinner } from "../Spinner";
import { SvgImage } from "../SvgImage";
import {
  dropzoneClasses,
  dropzoneFormInputClasses,
  dropzoneItemLoadingClasses,
  dropzoneItemPlayClasses,
  dropzoneItemClasses,
  dropzoneItemDownloadClasses,
  dropzoneItemGlyphClasses,
  dropzoneItemLabelClasses,
  dropzoneItemIconClasses,
  dropzoneItemImageClasses,
  dropzoneItemRemoveClasses,
  dropzoneItemsClasses,
  dropzoneTriggerClasses,
} from "./Dropzone.classes";
import type {
  DropzoneFile,
  DropzoneItemLinkProps,
  DropzoneItemProps,
  DropzoneProps,
} from "./Dropzone.types";

const NO_FILES: DropzoneFile[] = [];

const REMOVE_KEYS = ["Delete", "Backspace"];

const DropzoneTile = ({
  media,
  size,
  src,
  alt,
  icon,
  label,
}: Pick<
  DropzoneItemProps,
  "media" | "size" | "src" | "alt" | "icon" | "label"
>) =>
  media === "file" ? (
    <>
      <span className={cn(dropzoneItemGlyphClasses({ size }))}>
        <Icon icon={icon ?? File01Icon} />
      </span>
      {label ? (
        <span className={dropzoneItemLabelClasses({ size })}>{label}</span>
      ) : null}
    </>
  ) : icon ? (
    <span className={cn(dropzoneItemGlyphClasses({ size }))}>
      <Icon icon={icon} />
    </span>
  ) : media === "icon" ? (
    <SvgImage src={src ?? ""} className={dropzoneItemIconClasses({ size })} />
  ) : media === "video" ? (
    <>
      <video
        aria-label={alt}
        src={src ? `${src}#t=0.1` : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        className={dropzoneItemImageClasses}
      />
      <span className={cn(dropzoneItemPlayClasses({ size }))}>
        <Icon icon={PlayIcon} />
      </span>
    </>
  ) : (
    <Image src={src} alt={alt ?? ""} className={dropzoneItemImageClasses} />
  );

export const DropzoneItem = ({
  media = "image",
  size = "base",
  borderRadius = "base",
  src,
  alt,
  icon,
  label,
  loading = false,
  invalid = false,
  onRemove,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  className,
  ...props
}: DropzoneItemProps) => (
  <button
    data-part="dropzone-item"
    data-size={size}
    data-radius={borderRadius}
    type="button"
    aria-busy={loading || undefined}
    data-invalid={invalid || undefined}
    className={cn(
      dropzoneItemClasses({ media, size, borderRadius }),
      className,
    )}
    onClick={onRemove}
    onKeyDown={(event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || !REMOVE_KEYS.includes(event.key)) return;
      event.preventDefault();
      onRemove(event);
    }}
    onPointerEnter={(event) => {
      onPointerEnter?.(event);
      const video = event.currentTarget.querySelector("video");
      if (video) void video.play().catch(() => {});
    }}
    onPointerLeave={(event) => {
      onPointerLeave?.(event);
      event.currentTarget.querySelector("video")?.pause();
    }}
    {...props}
  >
    <DropzoneTile
      media={media}
      size={size}
      src={src}
      alt={alt}
      icon={icon}
      label={label}
    />
    {loading ? (
      <span className={cn(dropzoneItemLoadingClasses({ size }))}>
        <Spinner />
      </span>
    ) : null}
    <span className={cn(dropzoneItemRemoveClasses({ size }))}>
      <Icon icon={Delete01Icon} />
    </span>
  </button>
);

export const DropzoneItemLink = ({
  media = "image",
  size = "base",
  borderRadius = "base",
  src,
  alt,
  icon,
  actionIcon = Download01Icon,
  className,
  ...props
}: DropzoneItemLinkProps) => (
  <a
    data-part="dropzone-item"
    data-size={size}
    data-radius={borderRadius}
    className={cn(
      dropzoneItemClasses({ media, size, borderRadius }),
      className,
    )}
    {...props}
  >
    <DropzoneTile media={media} size={size} src={src} alt={alt} icon={icon} />
    <span className={cn(dropzoneItemDownloadClasses({ size }))}>
      <Icon icon={actionIcon} />
    </span>
  </a>
);

export const Dropzone = ({
  source = "device",
  media = "image",
  size = "base",
  borderRadius = "base",
  value: valueProp,
  defaultValue,
  onValueChange,
  accept,
  maxFiles = 1,
  maxSize = MAX_UPLOAD_BYTES,
  disabled = false,
  required = false,
  name,
  form,
  open: openProp,
  defaultOpen,
  onOpenChange,
  id,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  error,
  className,
  block = false,
  picker,
  ...props
}: DropzoneProps) => {
  const t = useTranslate();
  const { notify, FilesPicker } = useUiHost();
  const hintId = useId();
  const failed = useFieldError(error, describedBy);
  const marked = failed.shown || invalid;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? NO_FILES,
    onChange: onValueChange,
    caller: "Dropzone",
  });
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: "Dropzone",
  });
  const previews = useRef(new Set<string>());
  const formInput = useRef<HTMLInputElement>(null);
  const refocus = useRef<{ grid: Element; index: number } | null>(null);
  const accepted = accept ? [accept].flat() : undefined;
  const Library = source === "library" ? (picker ?? FilesPicker) : undefined;
  const full = value.length >= maxFiles;

  const { getRootProps, getInputProps, inputRef, isDragActive } = useDropzone({
    accept: accepted
      ? Object.fromEntries(accepted.map((mime) => [mime, []]))
      : undefined,
    multiple: maxFiles > 1,
    maxSize,
    disabled: disabled || full,
    noKeyboard: true,
    onDrop: (files, rejections) => {
      const added: DropzoneFile[] = files
        .slice(0, Math.max(maxFiles - value.length, 0))
        .map((file) => {
          if (media === "file") return { key: uuidv4(), name: file.name, file };
          const preview = URL.createObjectURL(file);
          previews.current.add(preview);
          return { key: uuidv4(), name: file.name, preview, file };
        });
      if (added.length) setValue([...value, ...added]);
      if (!rejections.length) return;
      const tooLarge = rejections.some((rejection) =>
        rejection.errors.some((error) => error.code === ErrorCode.FileTooLarge),
      );
      notify?.(
        "error",
        t(tooLarge ? "File is too large" : "Submitted wrong file format"),
      );
    },
  });

  useEffect(() => {
    const made = previews.current;
    return () => {
      for (const url of made) URL.revokeObjectURL(url);
      made.clear();
    };
  }, []);

  useEffect(() => {
    const input = formInput.current;
    if (!input || typeof DataTransfer === "undefined") return;
    const transfer = new DataTransfer();
    for (const item of value) if (item.file) transfer.items.add(item.file);
    input.files = transfer.files;
  }, [value]);

  useEffect(() => {
    const next = refocus.current;
    if (!next) return;
    refocus.current = null;
    const items = next.grid.querySelectorAll('[data-part="dropzone-item"]');
    const trigger = next.grid.querySelector(
      'button[data-part="dropzone-trigger"], [data-part="dropzone-trigger"] input',
    );
    const target = items[next.index] ?? trigger ?? items[next.index - 1];
    if (target instanceof HTMLElement) target.focus();
  });

  const remove = (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const item = value[index];
    const grid = event.currentTarget.closest('[data-part="dropzone"]');
    if (grid) refocus.current = { grid, index };
    if (item.preview && previews.current.delete(item.preview))
      URL.revokeObjectURL(item.preview);
    setValue(value.filter((_, at) => at !== index));
  };

  const descriptions = (own?: string) =>
    [own, failed.describedBy].filter(Boolean).join(" ") || undefined;

  const root: DropzoneRootProps = getRootProps({
    className: dropzoneTriggerClasses({ block, size, borderRadius }),
  });

  const items = value.map((item, index) => (
    <DropzoneItem
      key={item.key}
      media={item.media ?? media}
      size={size}
      borderRadius={borderRadius}
      src={
        (item.media ?? media) === "icon"
          ? (item.data ?? item.preview ?? item.src)
          : (item.preview ?? item.src)
      }
      alt={item.alt}
      {...(media === "file" && item.name ? { label: item.name } : {})}
      disabled={disabled}
      aria-label={item.name ? `${t("Remove")} ${item.name}` : t("Remove image")}
      onRemove={(event) => remove(event, index)}
    />
  ));

  const blocked = disabled || full;
  const trigger = Library ? (
    <button
      data-part="dropzone-trigger"
      data-radius={borderRadius}
      type="button"
      id={id}
      disabled={blocked}
      aria-describedby={descriptions()}
      data-invalid={marked || undefined}
      className={dropzoneTriggerClasses({ block, size, borderRadius })}
      onClick={() => setOpen(true)}
    >
      <Icon icon={Add01Icon} />
      <span className="sr-only">
        {t(
          media === "icon"
            ? "Select icon"
            : media === "file"
              ? "Select file"
              : "Select image",
        )}
      </span>
    </button>
  ) : (
    <div
      {...root}
      onClick={(event) => {
        inputRef.current?.focus();
        root.onClick?.(event);
      }}
      data-part="dropzone-trigger"
      data-radius={borderRadius}
      data-disabled={blocked ? "" : undefined}
      data-drag-active={isDragActive ? "" : undefined}
    >
      <input
        {...getInputProps({
          id,
          disabled: blocked,
          tabIndex: blocked ? -1 : 0,
          "aria-describedby": descriptions(hintId),
          "aria-invalid": marked,
        })}
      />
      <Icon icon={Upload01Icon} />
      <span id={hintId} className="sr-only">
        {t("Drag & drop files")}
      </span>
    </div>
  );

  return (
    <>
      <div
        data-part="dropzone"
        data-media={media}
        data-size={size}
        data-radius={borderRadius}
        className={cn(dropzoneClasses({ block, size }), className)}
        {...props}
      >
        {block ? (
          <>
            {trigger}
            {value.length ? (
              <div className={dropzoneItemsClasses({ size })}>{items}</div>
            ) : null}
          </>
        ) : (
          <>
            {items}
            {full ? null : trigger}
          </>
        )}
        {name || required ? (
          <input
            ref={formInput}
            type="file"
            name={name}
            form={form}
            multiple={maxFiles > 1}
            required={required && !value.length}
            disabled={disabled}
            tabIndex={-1}
            aria-hidden
            className={dropzoneFormInputClasses}
          />
        ) : null}
      </div>
      <FieldErrorMessage id={failed.id} part="dropzone-error">
        {error}
      </FieldErrorMessage>
      {Library ? (
        <Library
          open={open}
          onOpenChange={setOpen}
          value={value}
          onValueChange={(next) => setValue(next.slice(0, maxFiles))}
          maxFiles={maxFiles}
          accept={accepted}
        />
      ) : null}
    </>
  );
};
