"use client";

import { createContext, useContext } from "react";

const PortalContainerContext = createContext<HTMLElement | null>(null);

export const PortalContainerProvider = PortalContainerContext.Provider;

export const usePortalContainer = (): HTMLElement | null =>
  useContext(PortalContainerContext);
