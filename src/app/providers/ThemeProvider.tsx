import { type PropsWithChildren, useEffect } from "react";

import { useUiStore } from "@/app/store/ui.store";

const THEME_STORAGE_KEY = "chorale_theme";

export function ThemeProvider({ children }: PropsWithChildren) {
  const { theme, setTheme } = useUiStore();

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return children;
}
