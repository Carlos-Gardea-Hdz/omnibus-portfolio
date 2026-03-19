import { Github, Linkedin } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { translations } from "../data/translations";

export default function Footer() {
  const { lang } = useAppContext();

  return (
    <footer className="bg-[#F5F6FA] dark:bg-[#0A0C10] border-t border-[#E2E8F0] dark:border-[#1E2330]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left */}
          <div className="flex flex-col gap-1">
            <span className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-base">
              OMNIBUS · Carlos Gardea · 2026
            </span>
            <span className="font-code text-[#64748B] dark:text-[#6B7A99] text-[11px]">
              Built with {translations.footer.built}
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
              href="https://www.linkedin.com/in/carlos-gardea"
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
            {translations.footer.tagline[lang]}
          </span>
        </div>
      </div>
    </footer>
  );
}
