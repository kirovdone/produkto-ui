"use client";

import {
  Cancel01Icon,
  ColorPickerIcon,
  DropperIcon,
  PaintBoardIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "../Icon";
import {
  Root as SliderRoot,
  Thumb as SliderThumb,
  Track as SliderTrack,
} from "@radix-ui/react-slider";
import {
  Item as ToggleGroupItem,
  Root as ToggleGroupRoot,
} from "@radix-ui/react-toggle-group";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { cn } from "../../cn";
import { colord, extend, type Colord, type HsvaColor } from "colord";
import hwbPlugin from "colord/plugins/hwb";
import lchPlugin from "colord/plugins/lch";
import namesPlugin from "colord/plugins/names";
import {
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { COLORS } from "../../consts/colors";
import { clamp } from "../../helpers/clamp";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import { formatCssColor } from "../../helpers/formatCssColor";
import { setRef } from "../../helpers/setRef";
import { useTranslate } from "../../host";
import { clearButtonSize } from "../../hooks/useClearableText";
import { Button } from "../Button";
import { Input, inputClearClasses, inputClearedRoomClasses } from "../Input";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "../Popover";
import { ScrollArea } from "../ScrollArea";
import { Separator } from "../Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import {
  colorPickerAreaClasses,
  colorPickerAreaThumbClasses,
  colorPickerClasses,
  colorPickerContentClasses,
  colorPickerEyedropperClasses,
  colorPickerFieldsClasses,
  colorPickerHeaderClasses,
  colorPickerInputClasses,
  colorPickerOpacityClasses,
  colorPickerOpacityLabelClasses,
  colorPickerPaletteClasses,
  colorPickerPaletteInnerClasses,
  colorPickerPaletteScrollClasses,
  colorPickerPanelClasses,
  colorPickerPlaceholderClasses,
  colorPickerRootClasses,
  colorPickerSeparatorClasses,
  colorPickerSliderClasses,
  colorPickerSlidersClasses,
  colorPickerOptionCheckClasses,
  colorPickerOptionClasses,
  colorPickerOptionsClasses,
  colorPickerOptionSwatchClasses,
  colorPickerSwatchClasses,
  colorPickerSwatchFillClasses,
  colorPickerTabsClasses,
  colorPickerThumbClasses,
  colorPickerTrackClasses,
} from "./ColorPicker.classes";
import type { ColorPickerProps } from "./ColorPicker.types";

extend([namesPlugin, hwbPlugin, lchPlugin]);

interface EyeDropper {
  open: () => Promise<{ sRGBHex: string }>;
}

declare global {
  interface Window {
    EyeDropper?: new () => EyeDropper;
  }
}

const WHITE: HsvaColor = { h: 0, s: 0, v: 100, a: 1 };

const HUE = "linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)";

const SHADE =
  "linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,transparent)";

const CHECKER = {
  backgroundImage:
    "linear-gradient(45deg,#00000022 25%,transparent 25%),linear-gradient(-45deg,#00000022 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#00000022 75%),linear-gradient(-45deg,transparent 75%,#00000022 75%)",
  backgroundSize: "8px 8px",
  backgroundPosition: "0 0,0 4px,4px -4px,-4px 0",
  backgroundColor: "#ffffff",
};

const cssOf = (value?: string) => formatCssColor(value) ?? value ?? "";

const toCss = (hsva: HsvaColor) => {
  const parsed = colord(hsva);
  return cssOf(parsed.alpha() < 1 ? parsed.toRgbString() : parsed.toHex());
};

const toHsva = (parsed: Colord): HsvaColor => {
  const { r, g, b, a } = parsed.toRgb();
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  let h = 0;
  if (delta) {
    if (max === r) h = 60 * ((((g - b) / delta) % 6) + 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }
  return {
    h: h % 360,
    s: max ? (delta / max) * 100 : 0,
    v: (max / 255) * 100,
    a,
  };
};

const parseCss = (value?: string): HsvaColor | null => {
  const css = cssOf(value);
  if (!css) return null;
  const parsed = colord(css);
  return parsed.isValid() ? toHsva(parsed) : null;
};

const hexOf = (hsva: HsvaColor) => colord({ ...hsva, a: 1 }).toHex();

const listOf = (swatches: readonly string[]) => swatches.map(cssOf);

const PALETTE = listOf(COLORS);

const showCurrent = (list: HTMLDivElement | null) => {
  const current = list?.querySelector<HTMLElement>('[data-state="on"]');
  const viewport = list?.closest<HTMLElement>(
    '[data-part="scroll-area-viewport"]',
  );
  if (!current || !viewport) return;
  viewport.scrollTop +=
    current.getBoundingClientRect().top -
    viewport.getBoundingClientRect().top -
    (viewport.clientHeight - current.offsetHeight) / 2;
};

const subscribe = () => () => {};

const canPickFromScreen = () => "EyeDropper" in window;

const onServer = () => false;

const Swatch = ({ color }: { color: string }) => (
  <span
    data-part="color-picker-swatch"
    style={CHECKER}
    className={colorPickerSwatchClasses}
  >
    <span
      style={{ background: color }}
      className={colorPickerSwatchFillClasses}
    />
  </span>
);

const OptionCheck = () => (
  <Icon
    data-part="color-picker-palette-check"
    icon={Tick02Icon}
    className={colorPickerOptionCheckClasses}
  />
);

const ColorList = ({
  colors,
  value,
  onPick,
}: {
  colors: string[];
  value: string;
  onPick: (color: string) => void;
}) => (
  <ToggleGroupRoot
    data-part="color-picker-palette"
    type="single"
    orientation="vertical"
    value={value}
    onValueChange={(next) => {
      if (next) onPick(next);
    }}
    className={colorPickerOptionsClasses}
  >
    {colors.map((color) => (
      <ToggleGroupItem
        data-part="color-picker-palette-item"
        key={color}
        value={color}
        aria-disabled={color === value || undefined}
        className={colorPickerOptionClasses}
      >
        <span
          style={{ background: color }}
          className={colorPickerOptionSwatchClasses}
        />
        {colord(color).toHex()}
        {color === value ? <OptionCheck /> : null}
      </ToggleGroupItem>
    ))}
  </ToggleGroupRoot>
);

export const ColorPicker = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  swatches,
  clearable = false,
  placeholder,
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  error,
  open,
  defaultOpen,
  onOpenChange,
  name,
  form,
  disabled,
  id,
  className,
  ref,
  ...props
}: ColorPickerProps) => {
  const t = useTranslate();
  const failed = useFieldError(error, props["aria-describedby"]);
  const ownId = useId();
  const triggerId = id ?? ownId;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? "",
    onChange: onValueChange,
    caller: "ColorPicker",
  });
  const [hsva, setHsva] = useState<HsvaColor>(() => parseCss(value) ?? WHITE);
  const [seen, setSeen] = useState(value);
  const [hexDraft, setHexDraft] = useState<string | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dragging = useRef(false);
  const eyeDropper = useSyncExternalStore(
    subscribe,
    canPickFromScreen,
    onServer,
  );
  const ownColors = useMemo(() => listOf(swatches ?? []), [swatches]);

  if (value !== seen) {
    setSeen(value);
    const incoming = cssOf(value);
    if (incoming && incoming !== toCss(hsva)) {
      const next = parseCss(incoming);
      if (next) setHsva(next);
    }
  }

  const emit = (next: HsvaColor) => {
    setHsva(next);
    setValue(toCss(next));
  };

  const empty = !cssOf(value);
  const cleared = clearable && !empty && !disabled;
  const hex = hexOf(hsva);
  const css = toCss(hsva);
  const alphaPercent = Math.round(hsva.a * 100);
  const dropperName = t("Pick color from screen");

  const pointToColor = (event: PointerEvent<HTMLDivElement>) => {
    const box = areaRef.current?.getBoundingClientRect();
    if (!box || !box.width || !box.height) return;
    const x = clamp((event.clientX - box.left) / box.width, 0, 1);
    const y = clamp((event.clientY - box.top) / box.height, 0, 1);
    emit({ ...hsva, s: x * 100, v: (1 - y) * 100 });
  };

  const onAreaKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;
    const moves: Record<string, Partial<HsvaColor>> = {
      ArrowLeft: { s: hsva.s - step },
      ArrowRight: { s: hsva.s + step },
      ArrowUp: { v: hsva.v + step },
      ArrowDown: { v: hsva.v - step },
      PageUp: { v: hsva.v + 10 },
      PageDown: { v: hsva.v - 10 },
      Home: { s: 0 },
      End: { s: 100 },
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const next = { ...hsva, ...move };
    emit({ ...next, s: clamp(next.s, 0, 100), v: clamp(next.v, 0, 100) });
  };

  const applyHexDraft = () => {
    const draft = (hexDraft ?? "").trim();
    setHexDraft(null);
    if (!draft) return;
    const candidate = /^[0-9a-f]{3,8}$/i.test(draft) ? `#${draft}` : draft;
    const parsed = colord(candidate);
    if (!parsed.isValid()) return;
    const next = toHsva(parsed);
    emit({ ...next, a: next.a < 1 ? next.a : hsva.a });
  };

  const pickFromScreen = async () => {
    const Dropper = window.EyeDropper;
    if (!Dropper) return;
    try {
      const picked = await new Dropper().open();
      const parsed = colord(picked.sRGBHex);
      if (parsed.isValid()) emit({ ...toHsva(parsed), a: hsva.a });
    } catch {
      return;
    }
  };

  const isCurrent = (color: string) =>
    toCss(toHsva(colord(color))).toLowerCase() === css;

  const pick = (color: string) => emit(toHsva(colord(color)));

  const trigger = (
    <PopoverTrigger asChild>
      <button
        data-part="color-picker"
        data-appearance={appearance}
        data-size={size}
        data-radius={borderRadius}
        type="button"
        id={triggerId}
        disabled={disabled}
        className={cn(
          colorPickerClasses({ appearance, size, borderRadius }),
          cleared && inputClearedRoomClasses({ size }),
          className,
        )}
        {...props}
        ref={(node) => {
          triggerRef.current = node;
          setRef(ref, node);
        }}
        data-invalid={failed.shown || undefined}
        aria-describedby={failed.describedBy}
      >
        <Swatch color={empty ? "transparent" : css} />
        {empty ? (
          <span className={colorPickerPlaceholderClasses}>
            {placeholder ?? t("No color")}
          </span>
        ) : (
          <span className="truncate">{hex}</span>
        )}
        {!empty && hsva.a < 1 && (
          <span className={colorPickerOpacityLabelClasses}>
            {alphaPercent}%
          </span>
        )}
      </button>
    </PopoverTrigger>
  );

  return (
    <>
      <Popover
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        {clearable ? (
          <span
            data-part="color-picker-root"
            className={colorPickerRootClasses}
          >
            {trigger}
            {cleared ? (
              <Button
                data-part="color-picker-clear"
                aria-label={t("Clear")}
                appearance="transparent"
                tone="destructive"
                size={clearButtonSize(size)}
                className={inputClearClasses({ size })}
                onClick={() => {
                  setValue("");
                  triggerRef.current?.focus();
                }}
              >
                <Icon icon={Cancel01Icon} />
              </Button>
            ) : null}
          </span>
        ) : (
          trigger
        )}
        <PopoverContent
          data-part="color-picker-content"
          align="start"
          aria-labelledby={triggerId}
          scrollable={false}
          className={colorPickerContentClasses}
        >
          <Tabs defaultValue="colors" className={colorPickerTabsClasses}>
            <PopoverHeader className={colorPickerHeaderClasses}>
              <TabsList className="w-full">
                <TabsTrigger value="colors">
                  <Icon icon={PaintBoardIcon} data-icon="inline-start" />
                  {t("Colors")}
                </TabsTrigger>
                <TabsTrigger value="picker">
                  <Icon icon={ColorPickerIcon} data-icon="inline-start" />
                  {t("Picker")}
                </TabsTrigger>
              </TabsList>
            </PopoverHeader>
            <TabsContent value="colors" className={colorPickerPaletteClasses}>
              <ScrollArea className={colorPickerPaletteScrollClasses}>
                <div
                  ref={showCurrent}
                  className={colorPickerPaletteInnerClasses}
                >
                  {ownColors.length ? (
                    <>
                      <ColorList
                        colors={ownColors}
                        value={ownColors.find(isCurrent) ?? ""}
                        onPick={pick}
                      />
                      <Separator className={colorPickerSeparatorClasses} />
                    </>
                  ) : null}
                  <ColorList
                    colors={PALETTE}
                    value={PALETTE.find(isCurrent) ?? ""}
                    onPick={pick}
                  />
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="picker" className={colorPickerPanelClasses}>
              <div
                data-part="color-picker-area"
                ref={areaRef}
                role="slider"
                tabIndex={0}
                aria-label={t("Saturation and brightness")}
                aria-valuetext={`${Math.round(hsva.s)}% / ${Math.round(hsva.v)}%`}
                aria-valuenow={Math.round(hsva.v)}
                aria-valuemin={0}
                aria-valuemax={100}
                className={colorPickerAreaClasses}
                style={{
                  backgroundColor: `hsl(${hsva.h},100%,50%)`,
                  backgroundImage: SHADE,
                }}
                onKeyDown={onAreaKeyDown}
                onPointerDown={(event) => {
                  dragging.current = true;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  pointToColor(event);
                }}
                onPointerMove={(event) => {
                  if (dragging.current) pointToColor(event);
                }}
                onPointerUp={() => {
                  dragging.current = false;
                }}
                onLostPointerCapture={() => {
                  dragging.current = false;
                }}
              >
                <span
                  className={colorPickerAreaThumbClasses}
                  style={{
                    left: `${hsva.s}%`,
                    top: `${100 - hsva.v}%`,
                    background: hex,
                  }}
                />
              </div>
              <div className={colorPickerSlidersClasses}>
                <SliderRoot
                  data-part="color-picker-hue"
                  dir="ltr"
                  value={[Math.round(hsva.h)]}
                  max={360}
                  className={colorPickerSliderClasses}
                  onValueChange={([h]) => emit({ ...hsva, h })}
                >
                  <SliderTrack
                    className={colorPickerTrackClasses}
                    style={{ backgroundImage: HUE }}
                  />
                  <SliderThumb
                    aria-label={t("Hue")}
                    className={colorPickerThumbClasses}
                  />
                </SliderRoot>
                <SliderRoot
                  data-part="color-picker-alpha"
                  dir="ltr"
                  value={[alphaPercent]}
                  className={colorPickerSliderClasses}
                  onValueChange={([a]) => emit({ ...hsva, a: a / 100 })}
                >
                  <SliderTrack
                    className={colorPickerTrackClasses}
                    style={{
                      ...CHECKER,
                      backgroundImage: `linear-gradient(to right,${colord({ ...hsva, a: 0 }).toRgbString()},${hex}),${CHECKER.backgroundImage}`,
                      backgroundSize: `auto,${CHECKER.backgroundSize}`,
                      backgroundPosition: `0 0,${CHECKER.backgroundPosition}`,
                    }}
                  />
                  <SliderThumb
                    aria-label={t("Opacity")}
                    className={colorPickerThumbClasses}
                  />
                </SliderRoot>
              </div>
              <div className={colorPickerFieldsClasses}>
                <Input
                  size="sm"
                  data-part="color-picker-input"
                  aria-label={t("Enter color")}
                  className={colorPickerInputClasses}
                  value={hexDraft ?? hex}
                  spellCheck={false}
                  onChange={(event) => setHexDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      applyHexDraft();
                    }
                    if (event.key === "Escape") setHexDraft(null);
                  }}
                  onBlur={applyHexDraft}
                />
                <Input
                  size="sm"
                  data-part="color-picker-opacity"
                  type="number"
                  min={0}
                  max={100}
                  aria-label={t("Opacity")}
                  className={colorPickerOpacityClasses}
                  value={String(alphaPercent)}
                  onChange={(event) =>
                    emit({
                      ...hsva,
                      a: clamp(Number(event.target.value) || 0, 0, 100) / 100,
                    })
                  }
                />
                {eyeDropper && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        data-part="color-picker-eyedropper"
                        aria-label={dropperName}
                        onClick={pickFromScreen}
                        appearance="outline"
                        muted
                        size="sm"
                        className={colorPickerEyedropperClasses}
                      >
                        <Icon icon={DropperIcon} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{dropperName}</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
      <FieldErrorMessage id={failed.id} part="color-picker-error">
        {error}
      </FieldErrorMessage>
      {name ? (
        <input
          type="hidden"
          name={name}
          form={form}
          value={css}
          disabled={disabled}
        />
      ) : null}
    </>
  );
};
