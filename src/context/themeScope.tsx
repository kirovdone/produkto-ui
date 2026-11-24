"use client";

import { createContext, useContext } from "react";
import type { ThemeMode } from "../host";

const ThemeScopeContext = createContext<ThemeMode | undefined>(undefined);

export const ThemeScopeProvider = ThemeScopeContext.Provider;

export const useThemeScope = (): ThemeMode | undefined =>
  useContext(ThemeScopeContext);
