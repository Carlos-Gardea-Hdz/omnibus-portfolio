import { useState, useCallback } from 'react';
import { Lang } from '../types';

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('omnibus-lang') as Lang) || 'es';
    } catch {
      return 'es';
    }
  });

  const toggle = useCallback(() => {
     setLang((prev) => {
       const next: Lang = prev === 'es' ? 'en' : 'es';
       try {
         localStorage.setItem('omnibus-lang', next);
       } catch {
         // ignore
       }
       return next;
     });
   }, []); // dependencias vacías — nunca se recrea

  return { lang, toggle };
}
