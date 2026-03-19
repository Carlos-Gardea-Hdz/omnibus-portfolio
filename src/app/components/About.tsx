import { motion } from "motion/react";
import { MapPin, Globe, Award } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

const TIMELINE = [
  {
    company: "Instituto Tecnológico de Ciudad Juárez",
    period: { es: "Ago 2022 – Ago 2024", en: "Aug 2022 – Aug 2024" },
    role: { es: "Líder de Proyecto de Tesis", en: "Thesis Project Lead" },
    color: "#EF4444", // Rojo
  },
  {
    company: "Bosch México",
    period: { es: "Sep 2023 – Ago 2024", en: "Sep 2023 – Aug 2024" },
    role: { es: "Analista de Sistemas", en: "Systems Analyst" },
    color: "#22C55E", // Verde
  },
  {
    company: "CROC Chihuahua",
    period: { es: "Oct 2024 – Nov 2025", en: "Oct 2024 – Nov 2025" },
    role: {
      es: "Desarrollador Full-Stack de CMS Sindical",
      en: "Union CMS Full-Stack Developer",
    },
    color: "#F97316", // Naranja
  },
  {
    company: "OMNIBUS",
    period: { es: "Nov 2025 – Presente", en: "Nov 2025 – Present" },
    role: {
      es: "Portafolio de Proyectos de Arquitectura Avanzada con Laravel",
      en: "Advanced Laravel Architecture Projects Portfolio",
    },
    color: "#FF4500",
    current: true,
  },
];

const EDUCATION = [
  {
    title: "Ing. en Sistemas Computacionales",
    subtitle: "TecNM Ciudad Juárez · 2018–2024",
    icon: "🎓",
  },
  {
    title: "LOGO! Cloud Challenge",
    subtitle: "Siemens México · 2022 (Nacional)",
    icon: "🏆",
  },
  {
    title: "B2 English Certified",
    subtitle: "Oxford University Press",
    icon: "🌐",
  },
];

export default function About() {
  const { lang } = useAppContext();

  return (
    <section id="about" className="bg-[#F5F6FA] dark:bg-[#0A0C10] py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1E2330] to-transparent mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — Avatar card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Avatar */}
            <div className="relative w-full max-w-xs">
              <div className="aspect-square rounded-2xl border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318] overflow-hidden">
                {/* 
                  PHOTO: Place your photo at public/avatar.jpg (square, min 400x400px).
                  The img tag below will render it automatically once the file exists.
                  Until then, the CG fallback is shown.
                */}
                <img
                  src="/avatar.jpg"
                  alt="Carlos Gardea"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Hide img on error, show fallback
                    (e.target as HTMLImageElement).style.display = "none";
                    const fallback = (e.target as HTMLImageElement)
                      .nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                {/* Fallback shown until avatar.jpg is uploaded */}
                <div
                  className="w-full h-full flex-col items-center justify-center"
                  style={{
                    display: "flex",
                    background:
                      "radial-gradient(ellipse at 50% 30%, rgba(255,69,0,0.08) 0%, transparent 60%)",
                  }}
                >
                  <div className="w-24 h-24 rounded-full border-2 border-[#FF4500]/40 bg-[#FF4500]/10 flex items-center justify-center mb-4">
                    <span className="font-display text-[#FF4500] text-3xl">
                      CG
                    </span>
                  </div>
                  <span className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-lg">
                    Carlos Gardea
                  </span>
                  <span className="font-code text-[#64748B] dark:text-[#6B7A99] text-xs mt-1">
                    Software Engineer
                  </span>
                  <div className="flex items-center gap-1.5 mt-3">
                    <MapPin size={11} className="text-[#6B7A99]" />
                    <span className="font-code text-[#6B7A99] text-[11px]">
                      Ciudad Juárez, MX
                    </span>
                  </div>
                </div>

                {/* Blueprint grid overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(#1E2330 1px, transparent 1px), linear-gradient(90deg, #1E2330 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Accent corners */}
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#FF4500] opacity-60 rounded-tr" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#00D4FF] opacity-60 rounded-bl" />
            </div>

            {/* Education badges */}
            <div className="flex flex-col gap-3">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-lg border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318]"
                >
                  <span className="text-lg">{edu.icon}</span>
                  <div>
                    <div className="font-body text-[#0D1117] dark:text-[#F0F4FF] text-sm">
                      {edu.title}
                    </div>
                    <div className="font-code text-[#64748B] dark:text-[#6B7A99] text-[11px]">
                      {edu.subtitle}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="font-code text-[#FF4500] text-xs tracking-[0.2em] uppercase mb-3">
              // {lang === "es" ? "Perfil" : "Profile"}
            </p>
            <h2 className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-4xl md:text-5xl mb-6">
              {lang === "es" ? "Sobre mí" : "About"}
            </h2>

            <p className="font-body text-[#64748B] dark:text-[#6B7A99] text-base leading-relaxed mb-8">
              {lang === "es"
                ? "Ingeniero de Software especializado en arquitecturas Laravel con visión full-stack. Experiencia demostrada en sistemas de producción: CMS sindical multi-organización y plataforma universitaria de titulación con +70% de incremento en eficiencia terminal. Background en entorno industrial Bosch · Inglés B2 certificado (Oxford University)."
                : "Software Engineer specialized in Laravel architectures with a full-stack mindset. Proven experience delivering production systems: multi-organization union CMS and a university graduation platform with +70% efficiency improvement. Background in industrial manufacturing environments at Bosch. B2 English certified (Oxford University)."}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                "Laravel",
                "PHP 8.5",
                "React 19",
                "TypeScript",
                "Docker",
                "PostgreSQL",
                "Go",
                "Rust",
                "DevOps",
                "DDD",
                "CQRS",
              ].map((skill) => (
                <span
                  key={skill}
                  className="font-code text-[11px] px-2.5 py-1 rounded border border-[#E2E8F0] dark:border-[#1E2330] bg-[#F5F6FA] dark:bg-[#0A0C10] text-[#64748B] dark:text-[#6B7A99]"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Timeline */}
            <div>
              <p className="font-code text-[#64748B] dark:text-[#6B7A99] text-xs uppercase tracking-widest mb-5">
                {lang === "es" ? "// Experiencia" : "// Experience"}
              </p>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-3.5 top-4 bottom-4 w-px bg-[#1E2330]" />

                <div className="flex flex-col gap-6">
                  {TIMELINE.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      {/* Node */}
                      <div
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${item.current ? "bg-[#FF4500]/10" : "bg-[#111318]"}`}
                        style={{ borderColor: item.color }}
                      >
                        {item.current && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF4500] animate-pulse" />
                        )}
                      </div>

                      <div className="pb-2">
                        <div
                          className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-base"
                          style={{
                            color: item.current ? item.color : undefined,
                          }}
                        >
                          {item.company}
                        </div>
                        <div className="font-body text-[#64748B] dark:text-[#6B7A99] text-sm">
                          {item.role[lang]}
                        </div>
                        <div className="font-code text-[#64748B] dark:text-[#6B7A99] text-[11px] mt-0.5">
                          {item.period[lang]}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
