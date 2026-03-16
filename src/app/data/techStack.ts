import { TechCategory } from '../types';

export const techCategories: TechCategory[] = [
  {
    id: 'backend',
    label: 'Backend',
    color: '#FF4500',
    badges: [
      { name: 'Laravel 12' },
      { name: 'PHP 8.5' },
      { name: 'PostgreSQL 18' },
      { name: 'Valkey 8.0' },
      { name: 'Meilisearch 1.12' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#00D4FF',
    badges: [
      { name: 'React 19' },
      { name: 'TypeScript 5.9' },
      { name: 'Inertia.js 2.0' },
      { name: 'Tailwind CSS v4' },
      { name: 'Filament 4' },
      { name: 'Livewire 4' },
    ],
  },
  {
    id: 'infra',
    label: 'Infra / DevOps',
    color: '#22D3A5',
    badges: [
      { name: 'Docker 29' },
      { name: 'Traefik v3' },
      { name: 'Ubuntu 24.04' },
      { name: 'GitHub Actions' },
      { name: 'K3s/Kubernetes' },
      { name: 'UFW + Fail2Ban' },
      { name: "Let's Encrypt" },
    ],
  },
  {
    id: 'polyglot',
    label: 'Polyglot',
    color: '#F59E0B',
    badges: [
      { name: 'Go 1.25 (gRPC)' },
      { name: 'Rust 1.90+ (FFI)' },
      { name: 'Python 3.14 (ML)' },
    ],
  },
  {
    id: 'quality',
    label: 'Quality',
    color: '#8B5CF6',
    badges: [
      { name: 'Pest PHP' },
      { name: 'PHPStan/Larastan' },
      { name: 'Mutation Testing' },
      { name: 'Vitest' },
      { name: 'Playwright' },
      { name: 'Laravel Pint' },
    ],
  },
  {
    id: 'ai-tools',
    label: 'AI / Dev Tools',
    color: '#F43F5E',
    badges: [
      { name: 'Cursor' },
      { name: 'Claude Code' },
      { name: 'GitHub Copilot' },
      { name: 'Ollama' },
      { name: 'LM Studio' },
    ],
  },
];
