"use client";

import {
  Content,
  Group,
  Icon as TriggerIcon,
  Item,
  ItemText,
  Label,
  Portal,
  Root,
  Separator,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import {
  Root as ScrollRoot,
  Viewport as ScrollViewport,
} from "@radix-ui/react-scroll-area";
import { ArrowDown01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { createContext, use, useRef, type ComponentProps } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { ScrollBar } from "../ScrollArea";
import {
  scrollAreaClasses,
  scrollAreaViewportClasses,
} from "../ScrollArea/ScrollArea.classes";
import { cn } from "../../cn";
import { FieldErrorMessage, useFieldError } from "../../context/fieldError";
import { useTranslate } from "../../host";
import { clearButtonSize } from "../../hooks/useClearableText";
import {
  inputClearClasses,
  inputClearedRoomClasses,
} from "../Input/Input.classes";
import { setRef } from "../../helpers/setRef";
import { usePortalContainer } from "../../context/portalContainer";
import { useThemeScope } from "../../context/themeScope";
import { SideAlignProvider, useMeasuredSide } from "../../context/sideAlign";
import {
  selectContentClasses,
  selectGroupClasses,
  selectItemClasses,
  selectItemTextClasses,
  selectLabelClasses,
  selectRootClasses,
  selectScrollClasses,
  selectSeparatorClasses,
  selectTriggerClasses,
  selectViewportClasses,
} from "./Select.classes";
import type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
} from "./Select.types";

interface SelectState {
  picked: string | undefined;
  resetTo: string;
  required: boolean;
  disabled: boolean;
  clear: () => void;
}

const State = createContext<SelectState>({
  picked: undefined,
  resetTo: "",
  required: false,
  disabled: false,
  clear: () => undefined,
});

export const Select = ({
  value,
  defaultValue,
  onValueChange,
  resetTo = "",
  ...props
}: SelectProps) => {
  const [picked, setPicked] = useControllableState({
    prop: value,
    defaultProp: defaultValue ?? "",
    onChange: onValueChange,
    caller: "Select",
  });
  const state: SelectState = {
    picked,
    resetTo,
    required: props.required === true,
    disabled: props.disabled === true,
    clear: () => setPicked(resetTo),
  };
  return (
    <State value={state}>
      <SideAlignProvider>
        <Root value={picked} onValueChange={setPicked} {...props} />
      </SideAlignProvider>
    </State>
  );
};

export const SelectGroup = ({ className, ...props }: SelectGroupProps) => (
  <Group
    data-part="select-group"
    className={cn(selectGroupClasses, className)}
    {...props}
  />
);

export const SelectValue = (props: SelectValueProps) => (
  <Value data-part="select-value" {...props} />
);

export const SelectTrigger = ({
  appearance = "solid",
  size = "base",
  borderRadius = "base",
  clearable,
  className,
  children,
  error,
  ref,
  ...props
}: SelectTriggerProps) => {
  const t = useTranslate();
  const failed = useFieldError(error, props["aria-describedby"]);
  const state = use(State);
  const measured = useMeasuredSide(props);
  const own = useRef<HTMLButtonElement | null>(null);
  const clearing = clearable === true && !state.required;
  const cleared =
    clearing &&
    !state.disabled &&
    !props.disabled &&
    state.picked !== undefined &&
    state.picked !== "" &&
    state.picked !== state.resetTo;
  const trigger = (
    <Trigger
      data-part="select-trigger"
      data-appearance={appearance}
      data-size={size}
      data-radius={borderRadius}
      className={cn(
        selectTriggerClasses({ appearance, size, borderRadius }),
        cleared && inputClearedRoomClasses({ size }),
        className,
      )}
      {...props}
      aria-invalid={failed.shown || props["aria-invalid"]}
      aria-describedby={failed.describedBy}
      {...measured}
      ref={(node) => {
        own.current = node;
        setRef(ref, node);
      }}
    >
      {children}
      {cleared ? null : (
        <TriggerIcon asChild>
          <Icon icon={ArrowDown01Icon} className="text-muted-foreground" />
        </TriggerIcon>
      )}
    </Trigger>
  );
  const message = (
    <FieldErrorMessage id={failed.id} part="select-error">
      {error}
    </FieldErrorMessage>
  );
  if (!clearing)
    return (
      <>
        {trigger}
        {message}
      </>
    );
  return (
    <>
      <span data-part="select-root" className={selectRootClasses}>
        {trigger}
        {cleared ? (
          <Button
            data-part="select-clear"
            aria-label={t("Clear")}
            appearance="transparent"
            tone="destructive"
            size={clearButtonSize(size)}
            className={inputClearClasses({ size })}
            onClick={() => {
              state.clear();
              own.current?.focus();
            }}
          >
            <Icon icon={Cancel01Icon} />
          </Button>
        ) : null}
      </span>
      {message}
    </>
  );
};

const ListViewport = ({
  style,
  ...props
}: ComponentProps<typeof ScrollViewport>) => {
  const { overflow: _shorthand, ...longhands } = style ?? {};
  return <ScrollViewport {...props} style={longhands} />;
};

export const SelectContent = ({
  position = "popper",
  align,
  sideOffset = 8,
  className,
  children,
  ...props
}: SelectContentProps) => {
  const container = usePortalContainer();
  const theme = useThemeScope();
  return (
    <Portal container={container ?? undefined}>
      <Content
        data-part="select-content"
        data-theme={theme}
        data-align-trigger={position === "item-aligned"}
        position={position}
        align={align ?? "start"}
        sideOffset={sideOffset}
        collisionBoundary={container ?? undefined}
        collisionPadding={container ? 8 : undefined}
        className={cn(selectContentClasses, className)}
        {...props}
      >
        <ScrollRoot
          data-part="scroll-area"
          data-orientation="vertical"
          className={cn(scrollAreaClasses, selectScrollClasses)}
        >
          <Viewport data-position={position} asChild>
            <ListViewport
              data-part="scroll-area-viewport"
              className={scrollAreaViewportClasses({ orientation: "vertical" })}
            >
              <div className={selectViewportClasses}>{children}</div>
            </ListViewport>
          </Viewport>
          <ScrollBar />
        </ScrollRoot>
      </Content>
    </Portal>
  );
};

export const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
  <Label
    data-part="select-label"
    className={cn(selectLabelClasses, className)}
    {...props}
  />
);

export const SelectItem = ({
  value,
  disabled,
  className,
  children,
  ...props
}: SelectItemProps) => {
  const { picked } = use(State);
  return (
    <Item
      data-part="select-item"
      value={value}
      disabled={disabled || value === picked}
      className={cn(selectItemClasses, className)}
      {...props}
    >
      <ItemText data-part="select-item-text">
        <span className={selectItemTextClasses}>{children}</span>
      </ItemText>
    </Item>
  );
};

export const SelectSeparator = ({
  className,
  ...props
}: SelectSeparatorProps) => (
  <Separator
    data-part="select-separator"
    className={cn(selectSeparatorClasses, className)}
    {...props}
  />
);
