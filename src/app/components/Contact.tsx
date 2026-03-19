import { motion } from "motion/react";
import { Send, Github, Linkedin, Globe, Mail, Loader2 } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { translations } from "../data/translations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const { lang } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(2, translations.contact.form.validation.nameMin[lang]),
    email: z.string().email(translations.contact.form.validation.emailInvalid[lang]),
    message: z.string().min(10, translations.contact.form.validation.messageMin[lang]),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simular envío o implementar tu lógica de backend aquí
    try {
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(translations.contact.form.success[lang]);
      reset();
    } catch (error) {
      toast.error(translations.contact.form.error[lang]);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            // {translations.contact.tag[lang]}
          </p>
          <h2 className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            {translations.contact.title[lang]}
          </h2>
          <p className="font-body text-[#64748B] dark:text-[#94A3B8] text-lg mb-12 max-w-lg mx-auto">
            {translations.contact.description[lang]}
          </p>
        </motion.div>

        {/* Contact Form & Socials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto mb-14">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-left bg-white dark:bg-[#111318] p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#1E2330] shadow-xl shadow-black/5"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="font-display text-sm text-[#0D1117] dark:text-[#F0F4FF]">
                  {translations.contact.form.name[lang]}
                </label>
                <Input
                  {...register("name")}
                  placeholder="Carlos Gardea"
                  className={errors.name ? "border-destructive focus-visible:ring-destructive/20" : ""}
                />
                {errors.name && (
                  <p className="font-code text-[11px] text-destructive mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-display text-sm text-[#0D1117] dark:text-[#F0F4FF]">
                  {translations.contact.form.email[lang]}
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="carlos@example.com"
                  className={errors.email ? "border-destructive focus-visible:ring-destructive/20" : ""}
                />
                {errors.email && (
                  <p className="font-code text-[11px] text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-display text-sm text-[#0D1117] dark:text-[#F0F4FF]">
                  {translations.contact.form.message[lang]}
                </label>
                <Textarea
                  {...register("message")}
                  placeholder="..."
                  rows={4}
                  className={errors.message ? "border-destructive focus-visible:ring-destructive/20" : ""}
                />
                {errors.message && (
                  <p className="font-code text-[11px] text-destructive mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#FF4500] hover:bg-[#E03E00] text-white font-display text-sm rounded-lg transition-all duration-200 shadow-lg shadow-[#FF4500]/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    {translations.contact.form.sending[lang]}
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    {translations.contact.form.send[lang]}
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Social Links & Info */}
          <div className="flex flex-col gap-8 text-left">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <a
                href="https://linkedin.com/in/carlos-gardea"
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex items-center gap-4 group p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318] hover:border-[#FF4500]/40 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-300">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-sm">LinkedIn</div>
                  <div className="font-code text-[#64748B] dark:text-[#6B7A99] text-xs">/in/carlos-gardea</div>
                </div>
              </a>

              <a
                href="https://github.com/Carlos-Gardea-Hdz"
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex items-center gap-4 group p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318] hover:border-[#FF4500]/40 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-300">
                  <Github size={20} />
                </div>
                <div>
                  <div className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-sm">GitHub</div>
                  <div className="font-code text-[#64748B] dark:text-[#6B7A99] text-xs">/Carlos-Gardea-Hdz</div>
                </div>
              </a>

              <a
                href="mailto:carlos.gardea.hdz@outlook.com"
                className="inline-flex items-center gap-4 group p-4 rounded-xl border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318] hover:border-[#FF4500]/40 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-sm">Email</div>
                  <div className="font-code text-[#64748B] dark:text-[#6B7A99] text-xs">carlos.gardea.hdz@outlook.com</div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>

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
