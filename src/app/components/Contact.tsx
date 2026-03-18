import { motion } from "motion/react";
import { Send, Github, Linkedin, Globe, Mail } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

export default function Contact() {
  const { lang } = useAppContext();

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#E8EAEF] dark:bg-[#0A0C10]">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, #1E2330 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* Orange glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,69,0,0.10) 0%, transparent 70%)",
          }}
        />
        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4500] to-transparent" />
        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-code text-[#FF4500] text-xs tracking-[0.25em] uppercase mb-4">
            // {lang === "es" ? "Contacto" : "Contact"}
          </p>
          <h2 className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            {lang === "es"
              ? "¿Construimos algo juntos?"
              : "Shall we build something together?"}
          </h2>
          <p className="font-body text-[#64748B] dark:text-[#6B7A99] text-lg mb-12 max-w-lg mx-auto">
            {lang === "es"
              ? "Disponible para proyectos freelance, posiciones remotas y colaboraciones."
              : "Available for freelance projects, remote positions, and collaborations."}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="https://linkedin.com/in/carlos-gardea"
            target="_blank"
            rel="noopener noreferrer me"
            className="inline-flex items-center gap-2 font-body bg-[#FF4500] hover:bg-[#E03E00] text-white px-8 py-3.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_32px_rgba(255,69,0,0.4)] active:scale-95"
          >
            <Linkedin size={16} />
            {lang === "es" ? "Conectar en LinkedIn" : "Connect on LinkedIn"}
          </a>
          <a
            href="mailto:carlos.gardea.hdz@outlook.com"
            className="inline-flex items-center gap-2 font-body border border-[#E2E8F0] dark:border-[#1E2330] hover:border-[#FF4500]/50 text-[#0D1117] dark:text-[#F0F4FF] px-8 py-3.5 rounded-lg transition-all duration-200 active:scale-95"
          >
            <Send size={16} />
            {lang === "es" ? "Enviar email" : "Send email"}
          </a>
          <a
            href="https://github.com/Carlos-Gardea-Hdz"
            target="_blank"
            rel="noopener noreferrer me"
            className="inline-flex items-center gap-2 font-body border border-[#E2E8F0] dark:border-[#1E2330] hover:border-[#FF4500]/50 text-[#0D1117] dark:text-[#F0F4FF] px-8 py-3.5 rounded-lg transition-all duration-200 active:scale-95"
          >
            <Github size={16} />
            {lang === "es" ? "Ver GitHub" : "View GitHub"}
          </a>
        </motion.div>

        {/* Contact pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap"
        >
          {[
            {
              icon: <Mail size={13} />,
              label: "carlos.gardea.hdz@outlook.com",
              href: "mailto:carlos.gardea.hdz@outlook.com",
            },
            {
              icon: <Linkedin size={13} />,
              label: "linkedin.com/in/carlos-gardea",
              href: "https://linkedin.com/in/carlos-gardea",
            },
            {
              icon: <Globe size={13} />,
              label: "carlosgardea.com",
              href: "https://carlosgardea.com",
            },
          ].map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              target={pill.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                pill.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="inline-flex items-center gap-2 font-code text-xs text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF] border border-[#E2E8F0] dark:border-[#1E2330] hover:border-[#FF4500]/40 px-4 py-2 rounded-full transition-all duration-200"
            >
              <span className="text-[#FF4500]">{pill.icon}</span>
              {pill.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
