import { create } from "zustand";

type ThemeMode = "light" | "dark";

interface UiState {
  isMobileNavOpen: boolean;
  theme: ThemeMode;
  hasIntroStarted: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  startIntro: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isMobileNavOpen: false,
  theme: "light",
  hasIntroStarted: false,
  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  setTheme: (theme) => set({ theme }),
  startIntro: () => set({ hasIntroStarted: true }),
}));
