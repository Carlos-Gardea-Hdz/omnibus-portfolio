import { MotionConfig } from 'motion/react';
import { AppContext } from './contexts/AppContext';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { translations } from './data/translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import ProjectsGrid from './components/ProjectsGrid';
import Infrastructure from './components/Infrastructure';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLanguage();

  return (
    <MotionConfig reducedMotion="user">
      <AppContext.Provider value={{ lang, toggleLang, isDark, toggleTheme }}>
        <div className="font-body bg-[#F5F6FA] dark:bg-[#0A0C10] min-h-screen">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0A0C10] focus:text-white dark:focus:bg-white dark:focus:text-[#0A0C10]"
          >
            {translations.common.skipToContent[lang]}
          </a>
          <Navbar />
          <main id="main" tabIndex={-1}>
            <Hero />
            <ProjectsGrid />
            <Infrastructure />
            <TechStack />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      </AppContext.Provider>
    </MotionConfig>
  );
}
