import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { ArrowDown, Download, ChevronRight } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import NetworkDiagram from "./NetworkDiagram";
import { translations } from "../data/translations";

const STATS = translations.hero.stats;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const { lang } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollToProjects = (e: MouseEvent) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0C10] overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 z-0 opacity-30 dark:opacity-100 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #1E2330 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%), linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%), linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Accent glow top-right */}
      <div
        className="absolute top-0 right-0 z-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,0,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-20 left-0 z-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Main hero content */}
      <div className="relative z-10 flex-1 max-w-[1280px] mx-auto w-full px-6 lg:px-12 pt-32 pb-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* LEFT — 55% */}
        <div className="flex-1 lg:w-[55%] max-w-xl lg:max-w-none">
          {/* Pre-heading badge */}
          <motion.div {...fadeUp(0.05)}>
            <span className="inline-flex items-center gap-2 font-code text-[11px] text-[#FF4500] border border-[#FF4500]/30 bg-[#FF4500]/5 px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
              {translations.hero.badge}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            {...fadeUp(0.12)}
            className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-4xl md:text-5xl lg:text-[56px] leading-[1.12] tracking-tight mb-6 whitespace-pre-line"
          >
            {translations.hero.title[lang]}
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            {...fadeUp(0.2)}
            className="font-body text-[#64748B] dark:text-[#6B7A99] text-base md:text-lg leading-relaxed mb-10 max-w-[520px]"
          >
            {translations.hero.description[lang]}
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="inline-flex items-center gap-2 font-body bg-[#FF4500] hover:bg-[#E03E00] text-white px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,69,0,0.35)] active:scale-95"
            >
              {translations.hero.cta.primary[lang]}
              <ChevronRight size={16} />
            </a>
            <a
              href={translations.hero.cvFilename[lang]}
              download={translations.hero.cvFilename[lang].substring(1)}
              className="inline-flex items-center gap-2 font-body border border-[#E2E8F0] dark:border-[#1E2330] text-[#0D1117] dark:text-[#F0F4FF] hover:border-[#FF4500]/50 dark:hover:border-[#FF4500]/50 px-6 py-3 rounded-lg transition-all duration-200 active:scale-95"
            >
              <Download size={16} />
              {translations.hero.cta.secondary[lang]}
            </a>
          </motion.div>
        </div>

        {/* RIGHT — 45% — Network Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[45%] flex items-center justify-center"
          style={{ height: "520px" }}
        >
          <NetworkDiagram />
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 max-w-[1280px] mx-auto w-full px-6 lg:px-12 pb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E2E8F0] dark:border-[#1E2330] rounded-xl overflow-hidden bg-white/60 dark:bg-[#111318]/60 backdrop-blur-sm">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`px-6 py-6 flex flex-col gap-1 ${
                i < STATS.length - 1
                  ? "border-r border-b md:border-b-0 border-[#E2E8F0] dark:border-[#1E2330]"
                  : ""
              }`}
            >
              <span className="font-display text-[#FF4500] text-3xl tracking-tight">
                {stat.value}
              </span>
              <span className="font-body text-[#0D1117] dark:text-[#F0F4FF] text-sm">
                {stat.label[lang]}
              </span>
              <span className="font-code text-[#64748B] dark:text-[#6B7A99] text-[11px]">
                {stat.desc[lang]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-40">
        <ArrowDown
          size={16}
          className="text-[#64748B] dark:text-[#6B7A99] animate-bounce"
        />
      </div>
    </section>
  );
}
