import { useRef, useState, type MouseEvent, type CSSProperties } from "react";
import { ExternalLink, Github, Zap, Clock, History } from "lucide-react";
import { Project, Lang, ProjectVersionType } from "../types";

interface ProjectCardProps {
  project: Project;
  lang: Lang;
  index: number;
}

export default function ProjectCard({
  project,
  lang,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(1000px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`,
    );
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
    );
    setIsHovered(false);
  };

  const isProduction = project.status === "production";

  const versionConfig: Record<
    ProjectVersionType,
    { label: { es: string; en: string }; color: string }
  > = {
    legacy: { label: { es: "Legacy", en: "Legacy" }, color: "#94A3B8" },
    whitelabel: {
      label: { es: "White Label", en: "White Label" },
      color: "#F59E0B",
    },
    laravel: { label: { es: "Laravel", en: "Laravel" }, color: "#FF6B35" },
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card relative flex flex-col h-full rounded-lg border border-[#E2E8F0] dark:border-[#1E2330] bg-white dark:bg-[#111318] overflow-hidden cursor-default group"
      style={{
        transform,
        borderLeft: `3px solid ${project.color}`,
        boxShadow: isHovered ? `0 12px 32px ${project.color}20` : undefined,
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
        }}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          {/* Letter badge */}
          <span
            className="font-display text-xs w-7 h-7 flex items-center justify-center rounded border flex-shrink-0"
            style={{
              color: project.color,
              borderColor: `${project.color}40`,
              backgroundColor: `${project.color}10`,
            }}
          >
            {project.letter}
          </span>

          {/* Status badge */}
          {isProduction ? (
            <span className="inline-flex items-center gap-1 font-code text-[10px] px-2 py-0.5 rounded-full bg-[#22D3A5]/10 text-[#22D3A5] border border-[#22D3A5]/20">
              <Zap size={9} />
              {lang === "es" ? "En Producción" : "In Production"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 font-code text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Clock size={9} />
              {lang === "es" ? "En Desarrollo" : "In Development"}
            </span>
          )}
        </div>

        {/* Codename */}
        <div>
          <h3
            className="font-display text-[#0D1117] dark:text-[#F0F4FF] text-xl leading-tight mb-1 group-hover:text-[var(--card-accent)] transition-colors"
            style={{ "--card-accent": project.color } as CSSProperties}
          >
            {project.codename}
          </h3>
          <span className="font-code text-[11px] text-[#64748B] dark:text-[#6B7A99] border border-[#E2E8F0] dark:border-[#1E2330] px-2 py-0.5 rounded">
            {project.domain}
          </span>
        </div>

        {/* Description */}
        <p className="font-body text-[#64748B] dark:text-[#6B7A99] text-sm leading-relaxed flex-1">
          {project.description[lang]}
        </p>

        {/* Architecture pattern */}
        <div className="flex items-center gap-1.5">
          <span
            className="w-1 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <span className="font-code text-[10px] text-[#64748B] dark:text-[#6B7A99] leading-tight">
            {project.architecturePattern}
          </span>
        </div>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.stackBadges.map((badge) => (
            <span
              key={badge}
              className="font-code text-[10px] px-2 py-0.5 rounded border border-[#E2E8F0] dark:border-[#1E2330] text-[#64748B] dark:text-[#6B7A99] bg-[#F5F6FA] dark:bg-[#0A0C10]"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Versions (only for projects with legacy/whitelabel/laravel history) */}
        {project.versions && project.versions.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[#E2E8F0] dark:border-[#1E2330]">
            <span className="inline-flex items-center gap-1 font-code text-[10px] text-[#64748B] dark:text-[#6B7A99]">
              <History size={10} />
              {lang === "es" ? "Versiones" : "Versions"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.versions.map((v) => {
                const cfg = versionConfig[v.type];
                return v.available ? (
                  <a
                    key={v.type}
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-code text-[10px] px-2 py-0.5 rounded border transition-opacity hover:opacity-100 opacity-80"
                    style={{
                      color: cfg.color,
                      borderColor: `${cfg.color}40`,
                      backgroundColor: `${cfg.color}10`,
                    }}
                  >
                    <ExternalLink size={9} />
                    {v.label[lang]}
                  </a>
                ) : (
                  <span
                    key={v.type}
                    className="inline-flex items-center gap-1 font-code text-[10px] px-2 py-0.5 rounded border opacity-40 cursor-not-allowed"
                    style={{ color: cfg.color, borderColor: `${cfg.color}40` }}
                    title={lang === "es" ? "Próximamente" : "Coming soon"}
                  >
                    <Clock size={9} />
                    {v.label[lang]}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA links */}
        <div className="flex items-center gap-4 pt-2 border-t border-[#E2E8F0] dark:border-[#1E2330]">
          {isProduction && (
            <a
              href={`https://${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-xs transition-colors hover:opacity-100 opacity-70"
              style={{ color: project.color }}
            >
              <ExternalLink size={12} />
              {lang === "es" ? "Ver Demo" : "View Demo"}
            </a>
          )}
          <a
            href="https://github.com/Carlos-Gardea-Hdz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-xs text-[#64748B] dark:text-[#6B7A99] hover:text-[#0D1117] dark:hover:text-[#F0F4FF] transition-colors"
          >
            <Github size={12} />
            {lang === "es" ? "Ver Código" : "View Code"}
          </a>
        </div>
      </div>
    </div>
  );
}
