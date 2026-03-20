import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../contexts/AppContext";
import { projects } from "../data/projects";
import { translations } from "../data/translations";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectsGrid() {
  const { lang } = useAppContext();
  const [showAll, setShowAll] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [closingSpacers, setClosingSpacers] = useState<number>(0);

  const initialProjects = projects.slice(0, 6);
  const displayedProjects = showAll ? projects : initialProjects;

  // Handle animation sequence for show/hide extra projects
  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (showAll) {
      // Closing: add invisible spacers to preserve body height during card fade-out
      setClosingSpacers(projects.length - 6);
      setShowAll(false);

      // Wait for cards to finish exiting before removing spacers
      setTimeout(() => {
        setClosingSpacers(0);
        setIsAnimating(false);
      }, 400);
    } else {
      // Opening: show immediately, then unlock button
      setShowAll(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }
  };

  return (
    <section id="projects" className="relative py-24 bg-[#FAFAFA] dark:bg-[#0A0C10] overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--dot-color) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-code text-[#FF4500] text-xs tracking-[0.25em] uppercase mb-4"
            >
              // {translations.projects.tag[lang]}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[#0a0a0a] dark:text-[#F0F4FF] text-4xl md:text-5xl leading-tight"
            >
              {translations.projects.heading[lang]}
            </motion.h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout" initial={false}>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  y: -20,
                  transition: { 
                    duration: 0.2,
                    ease: "easeOut"
                  } 
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: showAll && index >= 6 ? (index - 6) * 0.05 : 0 
                }}
                className="h-full"
              >
                <ProjectCard project={project} lang={lang} />
              </motion.div>
            ))}

            {/* Temporary invisible spacers to preserve layout height while cards exit */}
            {closingSpacers > 0 && Array.from({ length: closingSpacers }).map((_, i) => (
              <div
                key={`spacer-${i}`}
                className="h-full w-full invisible opacity-0"
                style={{ minHeight: "350px" }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {projects.length > 6 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center mt-12"
            transition={{
              layout: { 
                duration: 0.4, 
                type: "spring", 
                bounce: 0, 
                delay: showAll ? 0 : 0.3 // wait for cards to finish before moving button
              }
            }}
          >
            <button
              onClick={handleToggle}
              disabled={isAnimating}
              className={`group inline-flex items-center gap-2 font-display text-sm transition-colors border bg-white dark:bg-[#111318] px-6 py-2.5 rounded-full shadow-sm hover:shadow-md active:scale-95 ${
                isAnimating ? 'opacity-70 cursor-wait' : 'hover:text-[#FF4500] hover:border-[#0a0a0a]/20 dark:hover:border-white/20'
              } text-[#52525b] dark:text-[#94A3B8] border-[#e4e4e7] dark:border-[#1E2330]`}
            >
              {showAll ? (
                <>
                  {translations.projects.showLess[lang]}
                  <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                </>
              ) : (
                <>
                  {translations.projects.showAll[lang]}
                  <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
