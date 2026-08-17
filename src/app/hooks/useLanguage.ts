import { useState, useEffect, useCallback } from "react";
import { Lang } from "../types";

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem("omnibus-lang") as Lang | null;
    if (stored === "es" || stored === "en") return stored;
    return navigator.language.startsWith("es") ? "es" : "en";
  } catch {
    return "en";
  }
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "es" ? "en" : "es";
      try {
        localStorage.setItem("omnibus-lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { lang, toggle };
}
