import React from 'react';
import { AppContext } from './contexts/AppContext';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
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
    <AppContext.Provider value={{ lang, toggleLang, isDark, toggleTheme }}>
      <div className="font-body bg-[#F5F6FA] dark:bg-[#0A0C10] min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <TechStack />
          <ProjectsGrid />
          <Infrastructure />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}
