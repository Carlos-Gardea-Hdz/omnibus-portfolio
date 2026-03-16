import { motion } from 'motion/react';
import { useAppContext } from '../contexts/AppContext';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid() {
  const { lang } = useAppContext();

  return (
    <section id="projects" className="bg-[#F5F6FA] dark:bg-[#0A0C10] py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-14">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1E2330] to-transparent mb-12" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-code text-[#FF4500] text-xs tracking-[0.2em] uppercase mb-3">
              // {lang === 'es' ? 'Trabajos' : 'Work'}
            </p>
            <h2 className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-4xl md:text-5xl mb-4">
              {lang === 'es' ? 'Los Proyectos' : 'The Projects'}
            </h2>
            <p className="font-body text-[#64748B] dark:text-[#6B7A99] text-lg max-w-xl">
              {lang === 'es'
                ? 'De arquitectura fundamental a patrones enterprise. Cada app resuelve un problema real.'
                : 'From foundational architecture to enterprise patterns. Each app solves a real problem.'}
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
            >
              <ProjectCard project={project} lang={lang} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
