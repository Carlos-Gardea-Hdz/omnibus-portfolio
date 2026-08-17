import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("omnibus-theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("omnibus-theme", isDark ? "dark" : "light");
    } catch {
      // ignore
    }
  }, [isDark]);

  const toggle = () => setIsDark((v) => !v);

  return { isDark, toggle };
}
