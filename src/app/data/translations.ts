import { Lang } from '../types';

export const translations = {
  hero: {
    stats: [
      {
        value: "9",
        label: { es: "Proyectos", en: "Projects" },
        desc: { es: "Un patrón por sistema", en: "One pattern per system" },
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
      es: "9 sistemas Laravel.\nUn VPS propio.\n9 patrones de\narquitectura distintos.",
      en: "9 Laravel systems.\nOne self-managed VPS.\n9 distinct\narchitecture patterns.",
    },
    description: {
      es: "Nueve aplicaciones Laravel sobre un VPS que administro yo mismo: Ubuntu 24.04, Docker, Traefik v3, PostgreSQL 18 y Valkey. Dos reconstruyen sistemas reales que siguen operando en producción. Las demás atacan un patrón concreto cada una: Event Sourcing, microservicios gRPC en Go, FFI con Rust, multi-tenancy.",
      en: "Nine Laravel applications on a VPS I manage myself: Ubuntu 24.04, Docker, Traefik v3, PostgreSQL 18, and Valkey. Two rebuild real systems still running in production. The rest each take on one concrete pattern: Event Sourcing, gRPC microservices in Go, Rust FFI, multi-tenancy.",
    },
    cta: {
      primary: { es: "Ver Proyectos", en: "View Projects" },
      secondary: { es: "Descargar CV", en: "Download Resume" },
    },
    cvFilename: {
      es: "/CV_Carlos_Gardea_2026.pdf",
      en: "/Resume_Carlos_Gardea_2026.pdf"
    },
    diagramLabel: {
      es: "Diagrama de red: nueve aplicaciones desplegadas en un VPS central con Docker y Traefik v3",
      en: "Network diagram: nine applications deployed on a central VPS with Docker and Traefik v3",
    }
  },
  navbar: {
    links: [
      { href: "#projects", label: { es: "Proyectos", en: "Projects" } },
      { href: "#infra", label: { es: "Infra", en: "Infra" } },
      { href: "#stack", label: { es: "Stack", en: "Stack" } },
      { href: "#about", label: { es: "Sobre mí", en: "About" } },
      { href: "#contact", label: { es: "Contacto", en: "Contact" } },
    ],
    status: {
      available: {
        label: { es: "Disponible para trabajar", en: "Available for work" },
        color: "#22D3EE", // Cyan/Light Blue for "Open"
        colorLight: "#0E7490", // Darker cyan for light backgrounds (WCAG AA)
        dot: "#22D3EE"
      },
      busy: {
        label: { es: "En un proyecto", en: "Busy on a project" },
        color: "#F87171", // Red
        colorLight: "#B91C1C", // Darker red for light backgrounds (WCAG AA)
        dot: "#F87171"
      },
      away: {
        label: { es: "Fuera de línea", en: "Currently away" },
        color: "#FBBF24", // Amber
        colorLight: "#B45309", // Darker amber for light backgrounds (WCAG AA)
        dot: "#FBBF24"
      }
    },
    currentStatus: "available" // Cambiar aquí para actualizar en todo el sitio
  },
  contact: {
    tag: { es: "Contacto", en: "Contact" },
    title: { es: "¿Traes un proyecto? Hablemos.", en: "Working on something? Let's talk." },
    description: {
      es: "Abierto a freelance y posiciones remotas, desde Ciudad Juárez.",
      en: "Open to freelance work and remote roles, based in Ciudad Juárez."
    },
    cta: {
      linkedin: { es: "Conectar en LinkedIn", en: "Connect on LinkedIn" },
      email: { es: "Enviar email", en: "Send email" },
      github: { es: "Ver GitHub", en: "View GitHub" }
    },
    form: {
      name: { es: "Nombre", en: "Name" },
      email: { es: "Email", en: "Email" },
      message: { es: "Mensaje", en: "Message" },
      send: { es: "Enviar mensaje", en: "Send message" },
      sending: { es: "Enviando...", en: "Sending..." },
      validation: {
        nameMin: { es: "El nombre debe tener al menos 2 caracteres", en: "Name must be at least 2 characters" },
        emailInvalid: { es: "Email inválido", en: "Invalid email" },
        messageMin: { es: "El mensaje debe tener al menos 10 caracteres", en: "Message must be at least 10 characters" }
      },
      success: { es: "¡Mensaje enviado con éxito!", en: "Message sent successfully!" },
      error: { es: "Hubo un error al enviar el mensaje.", en: "There was an error sending the message." }
    }
  },
  projects: {
    tag: { es: "Los 9 sistemas", en: "The 9 systems" },
    heading: {
      es: "Cada uno resuelve un problema de arquitectura distinto.",
      en: "Each one solves a different architecture problem.",
    },
    showAll: { es: "Ver todos los sistemas", en: "View all systems" },
    showLess: { es: "Ver menos proyectos", en: "View fewer projects" },
    comingSoon: { es: "Próximamente", en: "Coming soon" },
  },
  infrastructure: {
    diagramSummary: {
      es: "Diagrama de arquitectura: el tráfico de internet entra por Traefik v3 (SSL/TLS, balanceo de carga y enrutamiento), pasa a los contenedores de aplicaciones (A–I) y llega a la capa de datos con PostgreSQL 18, Valkey 8.0, Meilisearch 1.12 y MinIO.",
      en: "Architecture diagram: internet traffic enters through Traefik v3 (SSL/TLS, load balancing, and routing), flows to the application containers (A–I), and reaches the data layer with PostgreSQL 18, Valkey 8.0, Meilisearch 1.12, and MinIO.",
    },
  },
  about: {
    tag: { es: "Perfil", en: "Profile" },
    heading: { es: "Sobre mí", en: "About" },
    experience: { es: "// Experiencia", en: "// Experience" },
  },
  footer: {
    built: "Vite + React 19 + Tailwind CSS v4",
    tagline: {
      es: "// Autohospedado en mi propio VPS · Ciudad Juárez, MX",
      en: "// Self-hosted on my own VPS · Ciudad Juárez, MX",
    },
  },
  common: {
    scrollDown: { es: "Desliza para explorar", en: "Scroll to explore" },
    skipToContent: { es: "Saltar al contenido", en: "Skip to content" }
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
