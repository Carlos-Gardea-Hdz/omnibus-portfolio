export type Lang = "es" | "en";

export interface BilingualText {
  es: string;
  en: string;
}

export type ProjectVersionType = "legacy" | "whitelabel" | "laravel";

export interface ProjectVersion {
  type: ProjectVersionType;
  label: BilingualText;
  url: string;
  available: boolean;
}

export interface Project {
  id: string;
  letter: string;
  codename: string;
  domain: string;
  color: string;
  status: "production" | "development";
  description: BilingualText;
  stackBadges: string[];
  architecturePattern: string;
  link?: string;
  github?: string;
  /** Optional: projects that have multiple versions (legacy → whitelabel → laravel) */
  versions?: ProjectVersion[];
}

export interface TechBadge {
  name: string;
}

export interface TechCategory {
  id: string;
  label: string;
  color: string;
  badges: TechBadge[];
}
