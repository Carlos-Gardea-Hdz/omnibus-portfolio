import { useState, useEffect, type MouseEvent } from "react";
import { Menu, X, Github, Sun, Moon, Linkedin } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { translations } from "../data/translations";

const NAV_LINKS = translations.navbar.links;

export default function Navbar() {
  const { lang, toggleLang, isDark, toggleTheme } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b border-white/10 bg-[#0A0C10]/90"
          : "bg-white/90 dark:bg-transparent backdrop-blur-sm dark:backdrop-blur-none border-b border-black/5 dark:border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#"
          className="flex flex-col group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className={`font-display text-xl tracking-tight leading-none transition-colors ${
            scrolled ? "text-white group-hover:text-[#FF4500]" : "text-[#1a1a1a] dark:text-[#F0F4FF] group-hover:text-[#FF4500]"
          }`}>
            OMNIBUS
          </span>
          <span className={`font-code text-[10px] leading-none mt-0.5 ${
            scrolled ? "text-white/60" : "text-[#64748B] dark:text-[#6B7A99]"
          }`}>
            by Carlos Gardea
          </span>
        </a>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-body transition-colors text-sm ${
                scrolled 
                  ? "text-white/70 hover:text-white" 
                  : "text-[#475569] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF]"
              }`}
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Availability status */}
          {(() => {
            const statusKey = translations.navbar.currentStatus as keyof typeof translations.navbar.status;
            const status = translations.navbar.status[statusKey];
            return (
              <span 
                className={`hidden lg:inline-flex items-center gap-1.5 font-code text-[10px] border px-2.5 py-1 rounded-full transition-colors ${
                  !scrolled && !isDark ? "bg-white shadow-sm" : ""
                }`}
                style={{ 
                  color: status.color, 
                  borderColor: `${status.color}40`,
                  backgroundColor: scrolled || isDark ? `${status.color}05` : undefined
                }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full animate-pulse" 
                  style={{ backgroundColor: status.dot }}
                />
                {status.label[lang]}
              </span>
            );
          })()}
          {/* Language toggle — always visible */}
          <button
            onClick={toggleLang}
            className={`font-code flex items-center h-7 rounded-full border overflow-hidden text-[11px] cursor-pointer ${
              scrolled 
                ? "border-white/10 bg-white/5" 
                : "border-black/10 dark:border-white/10 bg-[#FAFAFA] dark:bg-[#111318]"
            }`}
          >
            <span
              className={`px-2.5 h-full flex items-center transition-colors ${
                lang === "es"
                  ? "bg-[#FF4500] text-white"
                  : scrolled
                    ? "text-white/60 hover:text-white"
                    : "text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF]"
              }`}
            >
              ES
            </span>
            <span
              className={`px-2.5 h-full flex items-center transition-colors ${
                lang === "en"
                  ? "bg-[#FF4500] text-white"
                  : scrolled
                    ? "text-white/60 hover:text-white"
                    : "text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF]"
              }`}
            >
              EN
            </span>
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/Carlos-Gardea-Hdz"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${
              scrolled 
                ? "text-white/60 hover:text-white" 
                : "text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF]"
            }`}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/carlos-gardea"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${
              scrolled 
                ? "text-white/60 hover:text-white" 
                : "text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF]"
            }`}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`transition-colors cursor-pointer ${
              scrolled 
                ? "text-white/60 hover:text-white" 
                : "text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF]"
            }`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden transition-colors cursor-pointer ${
              scrolled 
                ? "text-white/60 hover:text-white" 
                : "text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF]"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden border-t px-6 py-4 flex flex-col gap-4 ${
          scrolled 
            ? "border-white/10 bg-[#0A0C10]" 
            : "border-black/10 dark:border-[#1E2330] bg-[#FAFAFA] dark:bg-[#0A0C10]"
        }`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-body text-base py-1 border-b ${
                scrolled
                  ? "text-white/80 border-white/5"
                  : "text-[#0D1117] dark:text-[#F0F4FF] border-black/5 dark:border-[#1E2330]"
              }`}
            >
              {link.label[lang]}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
