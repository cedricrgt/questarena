"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ViewState = "home" | "login" | "register";

interface NavigationContextValue {
    viewState: ViewState;
    setViewState: (view: ViewState) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export function useNavigation() {
    const ctx = useContext(NavigationContext);
    if (!ctx) throw new Error("useNavigation must be used inside a NavigationProvider");
    return ctx;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [viewState, setViewState] = useState<ViewState>("home");

    return (
        <NavigationContext.Provider value={{ viewState, setViewState }}>
            {children}
        </NavigationContext.Provider>
    );
}
