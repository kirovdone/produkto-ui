"use client";

import { ArrowDown01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { cn } from "../../cn";
import { ScrollArea } from "../ScrollArea";
import {
  createContext,
  useContext,
  useEffectEvent,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
} from "react";
import { useTranslate } from "../../host";
import { clearButtonSize } from "../../hooks/useClearableText";
import {
  InputFrame,
  InputFrameAddon,
  InputFrameChip,
  InputFrameChips,
  InputFrameChipsInput,
  InputFrameInput,
} from "../Input/InputFrame";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../Popover";
import {
  comboboxContentClasses,
  comboboxEmptyClasses,
  comboboxGroupClasses,
  comboboxInputClasses,
  comboboxItemClasses,
  comboboxLabelClasses,
  comboboxListClasses,
  comboboxListInnerClasses,
  comboboxSeparatorClasses,
  comboboxTriggerClasses,
  comboboxTriggerIconClasses,
} from "./Combobox.classes";
import type {
  ComboboxChipProps,
  ComboboxChipsInputProps,
  ComboboxChipsProps,
  ComboboxCollectionProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxListProps,
  ComboboxProps,
  ComboboxSeparatorProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
} from "./Combobox.types";
import { setRef } from "../../helpers/setRef";

type Intent = "picked" | "first" | "last" | "keep" | null;

interface ComboboxContextValue {
  multiple: boolean;
  disabled: boolean;
  required: boolean;
  autoHighlight: boolean;
  open: boolean;
  setOpen: (open: boolean, intent?: Intent) => void;
  value: unknown;
  values: unknown[];
  isPicked: (item: unknown) => boolean;
  pick: (item: unknown) => void;
  remove: (item: unknown) => void;
  removeAt: (index: number) => void;
  clear: () => void;
  inputValue: string;
  type: (text: string) => void;
  query: string;
  items: readonly unknown[] | undefined;
  filtered: readonly unknown[];
  keeps: (item: unknown, text: string) => boolean;
  labelOf: (item: unknown) => string;
  customLabel: boolean;
  highlighted: string | null;
  setHighlighted: (id: string | null) => void;
  intent: RefObject<Intent>;
  inputId: string;
  listId: string;
  inputRef: RefObject<HTMLInputElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  anchorRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

const ComboboxContentContext = createContext(false);

interface ComboboxGroupContextValue {
  items: readonly unknown[];
  labelId: string;
  setLabelled: (labelled: boolean) => void;
}

const ComboboxGroupContext = createContext<ComboboxGroupContextValue | null>(
  null,
);

const useCombobox = (part: string): ComboboxContextValue => {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error(`${part} must be used within a Combobox.`);
  return context;
};

const HIDDEN: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  border: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
};

const fold = (text: string) =>
  text.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase();

const matches = (text: string, query: string) =>
  !query || fold(text).includes(fold(query));

const isGroup = (entry: unknown): entry is { items: readonly unknown[] } =>
  typeof entry === "object" &&
  entry !== null &&
  "items" in entry &&
  Array.isArray(entry.items);

const optionsIn = (list: HTMLElement | null) =>
  Array.from(
    list?.querySelectorAll('[role="option"]:not([aria-disabled="true"])') ?? [],
  ).filter((option) => option instanceof HTMLElement);

const scrollIntoList = (option: Element) => {
  const list =
    option.closest('[data-part="scroll-area-viewport"]') ??
    option.closest('[role="listbox"]');
  if (!list) return;
  const box = option.getBoundingClientRect();
  const frame = list.getBoundingClientRect();
  if (box.top < frame.top) list.scrollTop -= frame.top - box.top;
  else if (box.bottom > frame.bottom)
    list.scrollTop += box.bottom - frame.bottom;
};

const labelsOf = (element: HTMLElement | null) => {
  if (!element) return "";
  const labels =
    element instanceof HTMLInputElement || element instanceof HTMLButtonElement
      ? Array.from(element.labels ?? [])
      : [];
  return (
    labels.map((label) => label.textContent?.trim()).join(" ") ||
    element.getAttribute("aria-label") ||
    ""
  );
};

const takeIntent = (intent: RefObject<Intent>) => {
  const how = intent.current;
  intent.current = null;
  return how;
};

const useInputProps = (
  part: string,
  props: ComboboxChipsInputProps,
  disabled: boolean | undefined,
) => {
  const {
    open,
    setOpen,
    highlighted,
    setHighlighted,
    multiple,
    values,
    removeAt,
    type,
    inputValue,
    required,
    disabled: locked,
    inputId,
    listId,
    inputRef,
    listRef,
  } = useCombobox(part);
  const { id, ref, onChange, onKeyDown, onClick, ...rest } = props;
  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const down = event.key === "ArrowDown";
      if (!open) {
        setOpen(true, event.altKey ? null : down ? "first" : "last");
        return;
      }
      if (event.altKey) {
        if (!down) setOpen(false);
        return;
      }
      const options = optionsIn(listRef.current);
      const index = options.findIndex((option) => option.id === highlighted);
      const next =
        index === -1
          ? down
            ? options[0]
            : options[options.length - 1]
          : options[index + (down ? 1 : -1)];
      setHighlighted(next?.id ?? null);
      if (next) scrollIntoList(next);
    } else if (event.key === "Enter") {
      if (!open || !highlighted) return;
      event.preventDefault();
      document.getElementById(highlighted)?.click();
    } else if (
      event.key === "Backspace" &&
      multiple &&
      !event.currentTarget.value &&
      values.length
    ) {
      event.preventDefault();
      removeAt(values.length - 1);
    }
  };
  return {
    ...rest,
    id: id ?? inputId,
    ref: (node: HTMLInputElement | null) => {
      setRef(inputRef, node);
      setRef(ref, node);
    },
    role: "combobox",
    autoComplete: "off",
    "aria-autocomplete": "list" as const,
    "aria-expanded": open,
    "aria-controls": open ? listId : undefined,
    "aria-activedescendant": open && highlighted ? highlighted : undefined,
    "aria-required": required || undefined,
    disabled: locked || disabled,
    value: inputValue,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      type(event.target.value);
    },
    onKeyDown: keyDown,
    onClick: (event: MouseEvent<HTMLInputElement>) => {
      onClick?.(event);
      if (!open) setOpen(true, "picked");
    },
  };
};

export const Combobox = <Item, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Item, Multiple>,
) => {
  const {
    items,
    itemToStringValue,
    autoHighlight = false,
    disabled = false,
    required = false,
    name,
    form,
    children,
  } = props;
  const multiple = Boolean(props.multiple);

  const labelOf = (item: unknown): string => {
    if (item === null || item === undefined) return "";
    if (itemToStringValue) return itemToStringValue(item as Item);
    if (typeof item === "object" && "label" in item) return String(item.label);
    return String(item);
  };
  const formValueOf = (item: unknown): string => {
    if (itemToStringValue) return itemToStringValue(item as Item);
    if (typeof item === "object" && item !== null && "value" in item)
      return String(item.value);
    return labelOf(item);
  };

  const [value, setValue] = useControllableState<unknown>({
    prop: props.value,
    defaultProp: props.defaultValue ?? (multiple ? [] : null),
    onChange: props.onValueChange as ((value: unknown) => void) | undefined,
    caller: "Combobox",
  });
  const values: unknown[] = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value === null || value === undefined
      ? []
      : [value];
  const pickedLabel = multiple ? "" : labelOf(values[0]);

  const [inputValue, setInputValue] = useControllableState<string>({
    prop: props.inputValue,
    defaultProp: props.defaultInputValue ?? pickedLabel,
    onChange: props.onInputValueChange,
    caller: "Combobox",
  });
  const [open, setOpenState] = useControllableState<boolean>({
    prop: props.open,
    defaultProp: props.defaultOpen ?? false,
    onChange: props.onOpenChange,
    caller: "Combobox",
  });
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const intent = useRef<Intent>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputId = useId();
  const listId = useId();

  const query =
    !multiple && inputValue === pickedLabel ? "" : inputValue.trim();
  const keeps = (item: unknown, text: string) =>
    !query ||
    props.filter === null ||
    (props.filter ? props.filter(item as Item, query) : matches(text, query));
  const filtered: readonly unknown[] =
    !items || !query
      ? (items ?? [])
      : items.flatMap((entry): unknown[] => {
          if (!isGroup(entry))
            return keeps(entry, labelOf(entry)) ? [entry] : [];
          const kept = entry.items.filter((item) => keeps(item, labelOf(item)));
          return kept.length ? [{ ...entry, items: kept }] : [];
        });

  const settle = useEffectEvent(() => {
    setHighlighted(null);
    setInputValue(pickedLabel);
  });
  const settled = useRef({ open, pickedLabel });
  useLayoutEffect(() => {
    const before = settled.current;
    settled.current = { open, pickedLabel };
    if (open || (!before.open && before.pickedLabel === pickedLabel)) return;
    settle();
  }, [open, pickedLabel]);

  const setOpen = (next: boolean, how: Intent = null) => {
    if (next && disabled) return;
    if (next) intent.current = how;
    setOpenState(next);
  };

  const isPicked = (item: unknown) =>
    values.some((entry) => Object.is(entry, item));

  const context: ComboboxContextValue = {
    multiple,
    disabled,
    required,
    autoHighlight,
    open,
    setOpen,
    value,
    values,
    isPicked,
    pick: (item) => {
      if (!multiple) {
        setValue(item);
        setInputValue(labelOf(item));
        setOpen(false);
        return;
      }
      setValue(
        isPicked(item)
          ? values.filter((entry) => !Object.is(entry, item))
          : [...values, item],
      );
      if (!inputValue) return;
      intent.current = "keep";
      setInputValue("");
    },
    remove: (item) =>
      setValue(values.filter((entry) => !Object.is(entry, item))),
    removeAt: (index) =>
      setValue(values.filter((_, position) => position !== index)),
    clear: () => {
      setValue(multiple ? [] : null);
      setInputValue("");
    },
    inputValue,
    type: (text) => {
      setInputValue(text);
      if (!multiple && !text && values.length) setValue(null);
      if (!open) setOpen(true);
    },
    query,
    items,
    filtered,
    keeps,
    labelOf,
    customLabel: Boolean(itemToStringValue),
    highlighted,
    setHighlighted,
    intent,
    inputId,
    listId,
    inputRef,
    triggerRef,
    anchorRef,
    listRef,
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <ComboboxContext.Provider value={context}>
      <Popover
        onOpenChange={(next) => setOpen(next, next ? "picked" : null)}
        open={open}
      >
        {children}
      </Popover>
      {name && !multiple ? (
        <input
          disabled={disabled}
          form={form}
          name={name}
          type="hidden"
          value={values.length ? formValueOf(values[0]) : ""}
        />
      ) : null}
      {name && multiple
        ? values.map((item, index) => (
            <input
              disabled={disabled}
              form={form}
              key={index}
              name={name}
              type="hidden"
              value={formValueOf(item)}
            />
          ))
        : null}
      {required ? (
        <input
          aria-hidden
          disabled={disabled}
          form={form}
          onChange={() => {}}
          onFocus={focusInput}
          required
          style={HIDDEN}
          tabIndex={-1}
          value={values.length ? "picked" : ""}
        />
      ) : null}
    </ComboboxContext.Provider>
  );
};

export const ComboboxTrigger = ({
  asChild = false,
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  disabled,
  className,
  children,
  ref,
  ...props
}: ComboboxTriggerProps) => {
  const {
    values,
    disabled: locked,
    triggerRef,
  } = useCombobox("ComboboxTrigger");
  const Comp = asChild ? Slot : "button";
  return (
    <PopoverTrigger asChild>
      <Comp
        data-part="combobox-trigger"
        data-appearance={appearance}
        data-size={size}
        data-radius={borderRadius}
        data-placeholder={values.length ? undefined : ""}
        ref={(node: HTMLButtonElement | null) => {
          setRef(triggerRef, node);
          setRef(ref, node);
        }}
        role="combobox"
        type={asChild ? undefined : "button"}
        disabled={locked || disabled}
        className={cn(
          !asChild &&
            comboboxTriggerClasses({ appearance, size, borderRadius }),
          className,
        )}
        {...props}
      >
        <Slottable>{children}</Slottable>
        <Icon
          icon={ArrowDown01Icon}
          data-part="combobox-trigger-icon"
          className={comboboxTriggerIconClasses}
        />
      </Comp>
    </PopoverTrigger>
  );
};

const ComboboxChevron = ({ disabled }: { disabled?: boolean }) => {
  const { inputRef } = useCombobox("ComboboxChevron");
  return (
    <InputFrameAddon align="inline-end">
      <ComboboxTrigger
        aria-hidden
        asChild
        disabled={disabled}
        onMouseDown={(event) => {
          event.preventDefault();
          inputRef.current?.focus();
        }}
        tabIndex={-1}
      >
        <Button appearance="transparent" size="xs" />
      </ComboboxTrigger>
    </InputFrameAddon>
  );
};

export const ComboboxValue = ({
  children,
  placeholder,
}: ComboboxValueProps) => {
  const combobox = useCombobox("ComboboxValue");
  if (typeof children === "function") return <>{children(combobox.value)}</>;
  if (children !== undefined && children !== null) return <>{children}</>;
  if (!combobox.values.length) return <>{placeholder}</>;
  return <>{combobox.values.map(combobox.labelOf).join(", ")}</>;
};

export const ComboboxInput = ({
  showTrigger,
  clearable: clearableProp,
  loading = false,
  appearance,
  borderRadius,
  size,
  disabled,
  className,
  start,
  end,
  error,
  ...props
}: ComboboxInputProps) => {
  const t = useTranslate();
  const {
    disabled: locked,
    values,
    clear,
    inputRef,
    anchorRef,
  } = useCombobox("ComboboxInput");
  const input = useInputProps("ComboboxInput", props, disabled);
  const inContent = useContext(ComboboxContentContext);
  const off = locked || disabled;
  const clearable =
    !loading && clearableProp === true && values.length > 0 && !off;
  const trigger = !loading && !clearable && (showTrigger ?? !inContent);
  const group = (
    <InputFrame
      data-part="combobox-input"
      appearance={appearance}
      borderRadius={borderRadius}
      size={size}
      error={error}
      className={cn(comboboxInputClasses, className)}
    >
      {start !== undefined && start !== null && start !== false ? (
        <InputFrameAddon>{start}</InputFrameAddon>
      ) : null}
      <InputFrameInput {...input} />
      {loading ? (
        <InputFrameAddon align="inline-end">
          <Button
            loading
            data-part="combobox-loading"

            appearance="transparent"
            size={clearButtonSize(size)}
          />
        </InputFrameAddon>
      ) : null}
      {clearable ? (
        <InputFrameAddon align="inline-end">
          <Button
            aria-label={t("Clear")}
            data-part="combobox-clear"
            appearance="transparent"
            tone="destructive"
            onClick={() => {
              clear();
              inputRef.current?.focus();
            }}
            size={clearButtonSize(size)}
          >
            <Icon icon={Cancel01Icon} />
          </Button>
        </InputFrameAddon>
      ) : null}
      {end !== undefined && end !== null && end !== false ? (
        <InputFrameAddon align="inline-end">{end}</InputFrameAddon>
      ) : null}
      {trigger ? <ComboboxChevron disabled={off} /> : null}
    </InputFrame>
  );
  if (inContent) return group;
  return (
    <PopoverAnchor asChild ref={anchorRef}>
      {group}
    </PopoverAnchor>
  );
};

export const ComboboxContent = ({
  align,
  sideOffset = 6,
  className,
  children,
  ref,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onInteractOutside,
  ...props
}: ComboboxContentProps) => {
  const combobox = useCombobox("ComboboxContent");
  const content = useRef<HTMLDivElement | null>(null);
  const searchInside = useRef(false);
  return (
    <PopoverContent
      data-part="combobox-content"
      align={align ?? "start"}
      scrollable={false}
      sideOffset={sideOffset}
      ref={(node: HTMLDivElement | null) => {
        content.current = node;
        setRef(ref, node);
      }}
      className={cn(comboboxContentClasses, className)}
      onOpenAutoFocus={(event) => {
        onOpenAutoFocus?.(event);
        const input = combobox.inputRef.current;
        searchInside.current = Boolean(
          input && content.current?.contains(input),
        );
        if (!searchInside.current) event.preventDefault();
      }}
      onCloseAutoFocus={(event) => {
        onCloseAutoFocus?.(event);
        if (!searchInside.current) event.preventDefault();
      }}
      onInteractOutside={(event) => {
        onInteractOutside?.(event);
        const { target } = event;
        if (
          target instanceof Node &&
          combobox.anchorRef.current?.contains(target)
        )
          event.preventDefault();
      }}
      {...props}
    >
      <ComboboxContentContext.Provider value>
        {children}
      </ComboboxContentContext.Provider>
    </PopoverContent>
  );
};

export const ComboboxList = ({
  className,
  children,
  ref,
  onMouseDown,
  onScroll,
  ...props
}: ComboboxListProps) => {
  const {
    open,
    query,
    multiple,
    autoHighlight,
    highlighted,
    setHighlighted,
    filtered,
    listId,
    intent,
    listRef,
    inputRef,
    triggerRef,
  } = useCombobox("ComboboxList");
  const [label, setLabel] = useState("");

  const readLabel = useEffectEvent(() =>
    setLabel(labelsOf(inputRef.current) || labelsOf(triggerRef.current)),
  );
  useLayoutEffect(() => {
    readLabel();
  }, []);

  const highlightOnOpen = useEffectEvent(() => {
    const list = listRef.current;
    const how = takeIntent(intent);
    const options = optionsIn(list);
    const picked = multiple
      ? null
      : (list?.querySelector('[role="option"][aria-selected="true"]') ?? null);
    const near = (down: boolean) => {
      const end = down ? options[0] : options[options.length - 1];
      if (!picked) return end;
      const side = down
        ? Node.DOCUMENT_POSITION_FOLLOWING
        : Node.DOCUMENT_POSITION_PRECEDING;
      return (
        (down ? options : [...options].reverse()).find(
          (option) => picked.compareDocumentPosition(option) & side,
        ) ?? end
      );
    };
    const kept =
      how === "keep"
        ? options.find((option) => option.id === highlighted)
        : undefined;
    const target =
      how === "keep"
        ? kept
        : how === "first"
          ? near(true)
          : how === "last"
            ? near(false)
            : !autoHighlight
              ? undefined
              : how === "picked"
                ? near(true)
                : options[0];
    setHighlighted(target?.id ?? null);
    const shown = target ?? picked;
    if (shown) scrollIntoList(shown);
  });
  const seen = useRef<{ open: boolean; query: string } | null>(null);
  useLayoutEffect(() => {
    const before = seen.current;
    seen.current = { open, query };
    if (!open || (before?.open && before.query === query)) return;
    highlightOnOpen();
  }, [open, query]);

  return (
    <ScrollArea
      className={cn(comboboxListClasses, className)}
      onMouseDown={(event) => event.preventDefault()}
      onScroll={onScroll}
    >
      <div
        role="listbox"
        id={listId}
        aria-label={label || undefined}
        aria-multiselectable={multiple || undefined}
        data-part="combobox-list"
        ref={(node) => {
          setRef(listRef, node);
          setRef(ref, node);
        }}
        className={comboboxListInnerClasses}
        onMouseDown={onMouseDown}
        {...props}
      >
        {typeof children === "function"
          ? filtered.map((item, index) => children(item, index))
          : children}
      </div>
    </ScrollArea>
  );
};

export const ComboboxItem = ({
  value,
  disabled = false,
  id,
  className,
  children,
  onClick,
  onPointerMove,
  ...props
}: ComboboxItemProps) => {
  const combobox = useCombobox("ComboboxItem");
  const own = useId();
  const optionId = id ?? own;
  const picked = combobox.isPicked(value);
  const off = disabled || (picked && !combobox.multiple);
  const highlighted = combobox.highlighted === optionId;
  const text =
    !combobox.customLabel && typeof children === "string"
      ? children
      : combobox.labelOf(value);
  if (!combobox.items && !combobox.keeps(value, text)) return null;
  return (
    <div
      role="option"
      id={optionId}
      aria-selected={picked}
      aria-disabled={off || undefined}
      data-part="combobox-item"
      data-highlighted={highlighted || undefined}
      data-selected={picked || undefined}
      data-disabled={off || undefined}
      className={cn(comboboxItemClasses, className)}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!off && !highlighted) combobox.setHighlighted(optionId);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || off) return;
        combobox.pick(value);
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const ComboboxGroup = ({
  items,
  className,
  children,
  ...props
}: ComboboxGroupProps) => {
  const labelId = useId();
  const [labelled, setLabelled] = useState(false);
  return (
    <ComboboxGroupContext.Provider
      value={{ items: items ?? [], labelId, setLabelled }}
    >
      <div
        role="group"
        aria-labelledby={labelled ? labelId : undefined}
        data-part="combobox-group"
        className={cn(comboboxGroupClasses, className)}
        {...props}
      >
        {children}
      </div>
    </ComboboxGroupContext.Provider>
  );
};

export const ComboboxLabel = ({ className, ...props }: ComboboxLabelProps) => {
  const group = useContext(ComboboxGroupContext);
  const setLabelled = group?.setLabelled;
  useLayoutEffect(() => {
    if (!setLabelled) return;
    setLabelled(true);
    return () => setLabelled(false);
  }, [setLabelled]);
  return (
    <div
      id={group?.labelId}
      data-part="combobox-label"
      className={cn(comboboxLabelClasses, className)}
      {...props}
    />
  );
};

export const ComboboxCollection = ({ children }: ComboboxCollectionProps) => {
  const group = useContext(ComboboxGroupContext);
  return (
    <>{(group?.items ?? []).map((item, index) => children(item, index))}</>
  );
};

export const ComboboxEmpty = ({ className, ...props }: ComboboxEmptyProps) => {
  const t = useTranslate();
  return (
    <div
      data-part="combobox-empty"
      className={cn(comboboxEmptyClasses, className)}
      {...props}
    >
      {t("No items found")}
    </div>
  );
};

export const ComboboxSeparator = ({
  className,
  ...props
}: ComboboxSeparatorProps) => (
  <div
    role="separator"
    data-part="combobox-separator"
    className={cn(comboboxSeparatorClasses, className)}
    {...props}
  />
);

export const ComboboxChips = ({
  appearance,
  size,
  borderRadius,
  showTrigger = true,
  error,
  onClick,
  children,
  ...props
}: ComboboxChipsProps) => {
  const {
    disabled: locked,
    open,
    setOpen,
    inputRef,
    anchorRef,
  } = useCombobox("ComboboxChips");
  return (
    <PopoverAnchor asChild ref={anchorRef}>
      <InputFrame
        data-part="combobox-chips"
        appearance={appearance}
        size={size}
        borderRadius={borderRadius}
        error={error}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || locked) return;
          if (
            event.target instanceof Element &&
            event.target.closest("button, input")
          )
            return;
          inputRef.current?.focus();
          if (!open) setOpen(true, "picked");
        }}
        {...props}
      >
        <InputFrameChips>{children}</InputFrameChips>
        {showTrigger ? <ComboboxChevron /> : null}
      </InputFrame>
    </PopoverAnchor>
  );
};

export const ComboboxChip = ({
  value,
  showRemove = true,
  ...props
}: ComboboxChipProps) => {
  const combobox = useCombobox("ComboboxChip");
  return (
    <InputFrameChip
      holdFocus
      onRemove={
        showRemove && !combobox.disabled
          ? (event) => {
              event.stopPropagation();
              if (value !== undefined) {
                combobox.remove(value);
                return;
              }
              const chip = event.currentTarget.closest(
                '[data-part="input-frame-chip"]',
              );
              const chips = Array.from(
                chip?.parentElement?.querySelectorAll(
                  ':scope > [data-part="input-frame-chip"]',
                ) ?? [],
              );
              if (chip) combobox.removeAt(chips.indexOf(chip));
            }
          : undefined
      }
      {...props}
    />
  );
};

export const ComboboxChipsInput = ({
  disabled,
  ...props
}: ComboboxChipsInputProps) => {
  const input = useInputProps("ComboboxChipsInput", props, disabled);
  return <InputFrameChipsInput {...input} />;
};
