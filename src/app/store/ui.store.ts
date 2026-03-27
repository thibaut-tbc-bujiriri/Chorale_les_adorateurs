import { create } from "zustand";

type ThemeMode = "light" | "dark";

interface UiState {
  isMobileNavOpen: boolean;
  theme: ThemeMode;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isMobileNavOpen: false,
  theme: "light",
  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  setTheme: (theme) => set({ theme }),
}));
