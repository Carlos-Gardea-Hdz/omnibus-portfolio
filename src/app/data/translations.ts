import { Lang } from '../types';

export const translations = {
  hero: {
    stats: [
      {
        value: "9",
        label: { es: "Proyectos", en: "Projects" },
        desc: { es: "Arquitectura avanzada", en: "Advanced architecture" },
      },
      {
        value: "1",
        label: { es: "Infraestructura", en: "Infrastructure" },
        desc: { es: "VPS · Docker · Traefik v3", en: "VPS · Docker · Traefik v3" },
      },
      {
        value: "5",
        label: { es: "Lenguajes", en: "Languages" },
        desc: {
          es: "PHP · Go · Rust · Python · TS",
          en: "PHP · Go · Rust · Python · TS",
        },
      },
      {
        value: "+70%",
        label: { es: "Eficiencia", en: "Efficiency" },
        desc: { es: "Documentado en UNIGES", en: "Documented in UNIGES" },
      },
    ],
    badge: "Laravel 12 · React 19 · Docker · PostgreSQL 18 · VPS",
    title: {
      es: "9 sistemas de\narquitectura avanzada.\nUna infraestructura.\nUn estándar.",
      en: "9 advanced-architecture\nsystems.\nOne infrastructure.\nOne standard.",
    },
    description: {
      es: "Portafolio de arquitectura avanzada construido sobre VPS propio con Docker, Traefik v3, PostgreSQL 18 y Valkey. Cada proyecto demuestra un patrón de arquitectura diferente: desde Event Sourcing hasta microservicios con Go y Rust.",
      en: "Advanced-architecture portfolio built on a self-managed VPS with Docker, Traefik v3, PostgreSQL 18, and Valkey. Each project demonstrates a distinct architectural pattern: from Event Sourcing to Go and Rust microservices.",
    },
    cta: {
      primary: { es: "Ver Proyectos", en: "View Projects" },
      secondary: { es: "Descargar CV", en: "Download Resume" },
    },
    cvFilename: {
      es: "/CV_Carlos_Gardea_2026.pdf",
      en: "/Resume_Carlos_Gardea_2026.pdf"
    }
  },
  navbar: {
    links: [
      { href: "#projects", label: { es: "Proyectos", en: "Projects" } },
      { href: "#stack", label: { es: "Stack", en: "Stack" } },
      { href: "#about", label: { es: "Sobre mí", en: "About" } },
      { href: "#contact", label: { es: "Contacto", en: "Contact" } },
    ],
    availability: { es: "Disponible", en: "Available" }
  },
  contact: {
    tag: { es: "Contacto", en: "Contact" },
    title: { es: "¿Construimos algo juntos?", en: "Shall we build something together?" },
    description: {
      es: "Disponible para proyectos freelance, posiciones remotas y colaboraciones.",
      en: "Available for freelance projects, remote positions, and collaborations."
    },
    cta: {
      linkedin: { es: "Conectar en LinkedIn", en: "Connect on LinkedIn" },
      email: { es: "Enviar email", en: "Send email" },
      github: { es: "Ver GitHub", en: "View GitHub" }
    }
  },
  common: {
    scrollDown: { es: "Desliza para explorar", en: "Scroll to explore" }
  }
};

export const t = (section: keyof typeof translations, key: string, lang: Lang): string => {
  const sectionData = translations[section] as any;
  const value = sectionData[key];
  if (typeof value === 'object' && value !== null) {
    return value[lang] || value['en'] || '';
  }
  return value || '';
};
