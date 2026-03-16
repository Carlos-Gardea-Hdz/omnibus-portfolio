import { createContext, useContext } from 'react';
import { Lang } from '../types';

interface AppContextType {
  lang: Lang;
  toggleLang: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextType>({
  lang: 'es',
  toggleLang: () => {},
  isDark: true,
  toggleTheme: () => {},
});

export const useAppContext = () => useContext(AppContext);
