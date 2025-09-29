import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemPrefersDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const effectiveDark = mode === "dark" || (mode === "system" && getSystemPrefersDark());
  root.classList.toggle("dark", effectiveDark);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";
    const saved = window.localStorage.getItem("nabhaedu.theme") as ThemeMode | null;
    return saved || "system";
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem("nabhaedu.theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme: setThemeState, isDark: document.documentElement.classList.contains("dark") }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
