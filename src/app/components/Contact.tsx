import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { translations } from "../data/translations";

export default function Contact() {
  const { lang } = useAppContext();

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#0A0C10]">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-60 dark:opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, #64748B 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            maskImage: "linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 80px, black calc(100% - 80px), transparent)",
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
            // {translations.contact.tag[lang]}
          </p>
          <h2 className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            {translations.contact.title[lang]}
          </h2>
          <p className="font-body text-[#64748B] dark:text-[#94A3B8] text-lg mb-12 max-w-lg mx-auto">
            {translations.contact.description[lang]}
          </p>
        </motion.div>

        {/* Social Link Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            href="https://linkedin.com/in/carlos-gardea"
            target="_blank"
            rel="noopener noreferrer me"
            className="flex flex-col items-center gap-4 group p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318] hover:border-[#FF4500]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#FF4500]/5"
          >
            <div className="w-14 h-14 rounded-full bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-300">
              <Linkedin size={24} />
            </div>
            <div className="text-center">
              <div className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-base mb-1">LinkedIn</div>
              <div className="font-code text-[#64748B] dark:text-[#6B7A99] text-xs">/in/carlos-gardea</div>
            </div>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="https://github.com/Carlos-Gardea-Hdz"
            target="_blank"
            rel="noopener noreferrer me"
            className="flex flex-col items-center gap-4 group p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318] hover:border-[#FF4500]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#FF4500]/5"
          >
            <div className="w-14 h-14 rounded-full bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-300">
              <Github size={24} />
            </div>
            <div className="text-center">
              <div className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-base mb-1">GitHub</div>
              <div className="font-code text-[#64748B] dark:text-[#6B7A99] text-xs">/Carlos-Gardea-Hdz</div>
            </div>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="mailto:carlos.gardea.hdz@outlook.com"
            className="flex flex-col items-center gap-4 group p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318] hover:border-[#FF4500]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#FF4500]/5"
          >
            <div className="w-14 h-14 rounded-full bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-300">
              <Mail size={24} />
            </div>
            <div className="text-center">
              <div className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-base mb-1">Email</div>
              <div className="font-code text-[#64748B] dark:text-[#6B7A99] text-xs">carlos.gardea.hdz@outlook.com</div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
