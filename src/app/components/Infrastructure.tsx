import { motion } from 'motion/react';
import { useAppContext } from '../contexts/AppContext';

const FEATURES = [
  {
    icon: '🔒',
    es: 'SSH hardened · UFW · Fail2Ban (3 intentos / 1hr ban)',
    en: 'SSH hardened · UFW · Fail2Ban (3 attempts / 1hr ban)',
  },
  {
    icon: '🔄',
    es: 'Traefik v3 reverse proxy · SSL automático vía Let\'s Encrypt',
    en: 'Traefik v3 reverse proxy · Automatic SSL via Let\'s Encrypt',
  },
  {
    icon: '🗄️',
    es: 'PostgreSQL 18 · Valkey 8.0 · Meilisearch 1.12',
    en: 'PostgreSQL 18 · Valkey 8.0 · Meilisearch 1.12',
  },
  {
    icon: '🐳',
    es: 'Docker 29 · Redes aisladas por capa (app / data / monitoring)',
    en: 'Docker 29 · Isolated networks per layer (app / data / monitoring)',
  },
  {
    icon: '🔭',
    es: 'CI/CD via GitHub Actions · Trivy security scanning',
    en: 'CI/CD via GitHub Actions · Trivy security scanning',
  },
  {
    icon: '📸',
    es: 'VPS snapshots en milestones estables',
    en: 'VPS snapshots at stable milestones',
  },
];

const DIAGRAM_LINES = [
  { indent: 0, text: 'INTERNET', color: '#00D4FF' },
  { indent: 1, text: '│', color: '#1E2330' },
  { indent: 0, text: '┌─ Traefik v3 ──────────────────────┐', color: '#FF4500' },
  { indent: 1, text: '│  SSL/TLS · Load Balancer · Router  │', color: '#6B7A99' },
  { indent: 0, text: '└────────────┬──────────────────────┘', color: '#FF4500' },
  { indent: 1, text: '│', color: '#1E2330' },
  { indent: 0, text: '┌────────────┴──────────────────────┐', color: '#1E2330' },
  { indent: 1, text: '│       App Containers (A–I)         │', color: '#F0F4FF' },
  { indent: 1, text: '│  CMS · UNIGES · BRAIN · EVENTAPI   │', color: '#6B7A99' },
  { indent: 1, text: '│  PAYROLL · OPS · NEXUS · FLUX · ⬡  │', color: '#6B7A99' },
  { indent: 0, text: '└────────────┬──────────────────────┘', color: '#1E2330' },
  { indent: 1, text: '│', color: '#1E2330' },
  { indent: 0, text: '┌────────────┴──────────────────────┐', color: '#1E2330' },
  { indent: 1, text: '│         Data Layer                 │', color: '#F0F4FF' },
  { indent: 1, text: '│  PostgreSQL 18 · Valkey 8.0        │', color: '#22D3A5' },
  { indent: 1, text: '│  Meilisearch 1.12 · MinIO          │', color: '#22D3A5' },
  { indent: 0, text: '└───────────────────────────────────┘', color: '#1E2330' },
];

export default function Infrastructure() {
  const { lang } = useAppContext();

  return (
    <section className="bg-[#F5F6FA] dark:bg-[#0A0C10] py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1E2330] to-transparent mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-code text-[#FF4500] text-xs tracking-[0.2em] uppercase mb-3">
                // {lang === 'es' ? 'Infraestructura' : 'Infrastructure'}
              </p>
              <h2 className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-4xl md:text-5xl mb-4">
                {lang === 'es' ? 'La Fortaleza' : 'The Fortress'}
              </h2>
              <p className="font-body text-[#64748B] dark:text-[#6B7A99] text-lg mb-10">
                {lang === 'es'
                  ? 'Infraestructura propia. Sin plataformas PaaS. Sin magia negra.'
                  : 'Self-managed infrastructure. No PaaS magic. No black boxes.'}
              </p>
            </motion.div>

            {/* Feature list */}
            <div className="flex flex-col gap-4">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318] hover:border-[#FF4500]/30 transition-colors"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{feat.icon}</span>
                  <span className="font-body text-[#0D1117] dark:text-[#F0F4FF] text-sm leading-relaxed">
                    {feat[lang]}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Terminal diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sticky top-24"
          >
            <div className="rounded-xl border border-[#1E2330] bg-[#0A0C10] overflow-hidden shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1E2330] bg-[#111318]">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#22D3A5]" />
                <span className="ml-2 font-code text-[11px] text-[#6B7A99]">
                  omnibus@vps:~$ architecture --view
                </span>
              </div>

              {/* Diagram content */}
              <div className="terminal-box p-6">
                {DIAGRAM_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                    className="leading-6"
                  >
                    <span style={{ color: line.color }}>{line.text}</span>
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-[#FF4500]">$</span>
                  <span
                    className="w-2 h-4 bg-[#FF4500] inline-block"
                    style={{ animation: 'glow-pulse 1s step-end infinite' }}
                  />
                </div>
              </div>
            </div>

            {/* Stats overlay */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: 'Uptime', value: '99.9%', color: '#22D3A5' },
                { label: 'Containers', value: '12+', color: '#00D4FF' },
                { label: 'Networks', value: '3', color: '#FF4500' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-[#1E2330] bg-[#111318] p-3 text-center"
                >
                  <div className="font-display text-xl" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="font-code text-[10px] text-[#6B7A99] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
