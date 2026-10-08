import { useState, useEffect } from "react";

function detectDark(): boolean {
  try {
    const stored = localStorage.getItem("omnibus-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

// The first render must equal the prerendered markup (light) so hydration
// matches; the visitor's stored/system preference is applied right after.
export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIsDark(detectDark());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("omnibus-theme", isDark ? "dark" : "light");
    } catch {
      // ignore
    }
  }, [isDark, ready]);

  const toggle = () => setIsDark((v) => !v);

  return { isDark, toggle };
}
