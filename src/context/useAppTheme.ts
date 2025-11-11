import { useContext } from "react";
import AppThemeContext from "./AppThemeContext.tsx";
import type { AppThemeType } from "../types/themeContextType.ts";

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if(context === undefined) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }
  return context as AppThemeType;
};