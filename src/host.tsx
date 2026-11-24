"use client";

import { useDismissableLayerSurface } from "@radix-ui/react-dismissable-layer";
import {
  createContext,
  useContext,
  useEffect,
  type ComponentProps,
  type ComponentType,
  type ReactNode,
} from "react";
import type { FilesPickerProps } from "./components/Dropzone";

export type ThemeMode = "light" | "dark";

export type HostLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

export interface UiHost {
  Link?: ComponentType<HostLinkProps>;
  theme?: ThemeMode;
  translate?: (key: string) => string;
  notify?: (status: "success" | "error", message?: string) => void;
  FilesPicker?: ComponentType<FilesPickerProps>;
  fonts?: readonly string[];
  fontsCss?: string;
  buttonTooltips?: boolean;
  solidLikeFields?: boolean;
}

const NO_HOST: UiHost = {};

const UiHostContext = createContext<UiHost>(NO_HOST);

interface SurfaceRegistry {
  register(surface: HTMLElement | null): void;
}

const ClicksOutsideDismiss = () => {
  const register = useDismissableLayerSurface();
  useEffect(() => {
    const registry: SurfaceRegistry = { register };
    registry.register(document.body);
  }, [register]);
  return null;
};

export const UiHostProvider = ({
  host,
  children,
}: {
  host: UiHost;
  children: ReactNode;
}) => {
  const outer = useContext(UiHostContext);
  return (
    <UiHostContext.Provider value={host}>
      {outer === NO_HOST ? <ClicksOutsideDismiss /> : null}
      {children}
    </UiHostContext.Provider>
  );
};

export const useUiHost = (): UiHost => useContext(UiHostContext);

const asWritten = (key: string) => key;

export const useTranslate = (): ((key: string) => string) =>
  useContext(UiHostContext).translate ?? asWritten;

const NO_FONTS: readonly string[] = [];

export const useFontNames = (): readonly string[] =>
  useContext(UiHostContext).fonts ?? NO_FONTS;

export const HostLink = (props: HostLinkProps) => {
  const { Link } = useContext(UiHostContext);
  return Link ? <Link {...props} /> : <a {...props} />;
};
