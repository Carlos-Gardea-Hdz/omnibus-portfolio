import { motion } from 'motion/react';
import { useAppContext } from '../contexts/AppContext';
import { techCategories } from '../data/techStack';

export default function TechStack() {
  const { lang } = useAppContext();

  return (
    <section id="stack" className="bg-[#f9fafb] dark:bg-[#0A0C10] py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e5e7eb] dark:via-[#1E2330] to-transparent mb-12" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-code text-[#FF4500] text-xs tracking-[0.2em] uppercase mb-3">
              // {lang === 'es' ? 'Tecnologías' : 'Technologies'}
            </p>
            <h2 className="font-display text-[#2D2D2D] dark:text-[#F0F4FF] text-4xl md:text-5xl mb-4">
              {lang === 'es' ? 'El Stack' : 'The Stack'}
            </h2>
            <p className="font-body text-[#4B5563] dark:text-[#6B7A99] text-lg max-w-lg">
              {lang === 'es'
                ? 'Cada tecnología fue elegida deliberadamente. Sin defaults. Sin excusas.'
                : 'Every technology was chosen deliberately. No defaults. No excuses.'}
            </p>
          </motion.div>
        </div>

        {/* Tech categories */}
        <div className="flex flex-col gap-10">
          {techCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.07 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-1 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-code text-[11px] tracking-[0.15em] uppercase text-[#4B5563] dark:text-[#6B7A99]">
                  {category.label}
                </span>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap gap-2">
                {category.badges.map((badge, badgeIdx) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIdx * 0.05 + badgeIdx * 0.04 }}
                    whileHover={{
                      y: -3,
                      boxShadow: `0 6px 20px ${category.color}30`,
                      transition: { duration: 0.15 },
                    }}
                    className="inline-flex items-center gap-2 h-8 px-3 rounded border border-[#404040] dark:border-[#1E2330] bg-[#333333] dark:bg-[#0A0C10] cursor-default shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none"
                    style={{
                      borderLeft: `3px solid ${category.color}`,
                    }}
                  >
                    <span className="font-code text-[12px] text-[#ffffff] dark:text-[#F0F4FF]">
                      {badge.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
