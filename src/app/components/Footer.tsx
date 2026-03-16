import { Github, Linkedin } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

export default function Footer() {
  const { lang, toggleLang } = useAppContext();

  return (
    <footer className="bg-[#F5F6FA] dark:bg-[#0A0C10] border-t border-[#E2E8F0] dark:border-[#1E2330]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left */}
          <div className="flex flex-col gap-1">
            <span className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-base">
              OMNIBUS · Carlos Gardea · 2025
            </span>
            <span className="font-code text-[#64748B] dark:text-[#6B7A99] text-[11px]">
              Built with Laravel 12 + React 19 + Inertia.js
            </span>
          </div>

          {/* Center */}
          <div className="text-center">
            <a
              href="https://carlosgardea.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-code text-[#64748B] dark:text-[#6B7A99] hover:text-[#FF4500] dark:hover:text-[#FF4500] text-sm transition-colors"
            >
              carlosgardea.com
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-4">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="font-code flex items-center h-7 rounded-full border border-[#E2E8F0] dark:border-[#1E2330] bg-[#F5F6FA] dark:bg-[#111318] overflow-hidden text-[11px] cursor-pointer"
            >
              <span className={`px-2.5 h-full flex items-center transition-colors ${lang === 'es' ? 'bg-[#FF4500] text-white' : 'text-[#64748B] dark:text-[#6B7A99]'}`}>ES</span>
              <span className={`px-2.5 h-full flex items-center transition-colors ${lang === 'en' ? 'bg-[#FF4500] text-white' : 'text-[#64748B] dark:text-[#6B7A99]'}`}>EN</span>
            </button>

            {/* Social icons */}
            <a
              href="https://github.com/Carlos-Gardea-Hdz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF] transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/carlos-gardea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-6 pt-6 border-t border-[#E2E8F0] dark:border-[#1E2330] flex items-center justify-center">
          <span className="font-code text-[#64748B] dark:text-[#6B7A99] text-[10px] tracking-widest">
            {lang === 'es'
              ? '// Arquitectura sin concesiones · Ciudad Juárez, MX'
              : '// Architecture without compromise · Ciudad Juárez, MX'}
          </span>
        </div>
      </div>
    </footer>
  );
}
