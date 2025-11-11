import { createContext, useState, useEffect, type ReactNode } from "react";

import type { AppThemeType } from "../types/themeContextType.ts";

const AppThemeContext = createContext<AppThemeType | undefined>(undefined);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
    const getStoredTheme = () => {
        try {
            const saved = localStorage.getItem("appTheme");
            if (saved === "dark") return true;
            if (saved === "light") return false;
            return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        } catch {
            return false;
        }
    };

    const [darkActive, setDarkActive] = useState<boolean>(getStoredTheme);

    useEffect(() => {
        try {
            localStorage.setItem("appTheme", darkActive ? "dark" : "light");
        } catch {}
        
        if (document.documentElement) {
            document.documentElement.classList.toggle("theme-dark", darkActive);
            document.documentElement.classList.toggle("theme-light", !darkActive);
        }
    }, [darkActive]);

    const switchTheme = () => {
        setDarkActive((prev) => !prev);
    };

    return (
        <AppThemeContext.Provider value={{ darkActive, switchTheme }}>
            {children}
        </AppThemeContext.Provider>
    );
};

export default AppThemeContext;