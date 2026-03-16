export type Lang = 'es' | 'en';

export interface BilingualText {
  es: string;
  en: string;
}

export interface Project {
  id: string;
  letter: string;
  codename: string;
  domain: string;
  color: string;
  status: 'production' | 'development';
  description: BilingualText;
  stackBadges: string[];
  architecturePattern: string;
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
