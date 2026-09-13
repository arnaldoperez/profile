import React from 'react';
import {
  Download,
  FileCode2,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Globe,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Language, PortfolioData } from '../types.ts';

interface HeroSectionProps {
  data: PortfolioData;
  lang: Language;
  onOpenAts: () => void;
  onOpenMarkdownFile: (fileId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  lang,
  onOpenAts,
  onOpenMarkdownFile,
}) => {
  const isEs = lang === 'es';
  const p = data.profile;

  const keyMetrics = [
    {
      value: '12+',
      label: isEs ? 'Años de Trayectoria' : 'Years Experience',
      sub: isEs ? 'Docencia & Fullstack' : 'Faculty & Fullstack',
    },
    {
      value: '7+',
      label: isEs ? 'Años JavaScript' : 'Years JavaScript',
      sub: isEs ? 'Vue, Nuxt, React & APIs' : 'Vue, Nuxt, React & APIs',
    },
    {
      value: 'C2',
      label: isEs ? 'Inglés Proficient' : 'English Proficient',
      sub: isEs ? 'Certificado EF SET' : 'EF SET Certified',
    },
    {
      value: '100%',
      label: isEs ? 'Compatibilidad ATS' : 'ATS Compatibility',
      sub: isEs ? 'Formato optimizado' : 'Parser-friendly structure',
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-stone-200/80 bg-stone-50/60 py-12 sm:py-16 lg:py-20">
      {/* Subtle architectural grid background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Main Info */}
          <div className="max-w-3xl">
            {/* Status & Nuxt Content Badge */}
            <div className="flex flex-wrap items-center gap-2 pb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isEs ? 'Disponible para proyectos' : 'Open for senior engineering roles'}
              </span>

              <button
                onClick={() => onOpenMarkdownFile(isEs ? 'perfil' : 'profile')}
                className="group inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-mono text-stone-600 transition hover:border-emerald-500 hover:text-emerald-700"
                title={isEs ? 'Ver archivo markdown' : 'View markdown source'}
              >
                <FileCode2 className="h-3.5 w-3.5 text-stone-400 group-hover:text-emerald-600" />
                <span>content/{lang}/{isEs ? 'perfil' : 'profile'}.md</span>
              </button>
            </div>

            {/* Name and Headline */}
            <h1 className="text-3xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              {p.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-emerald-700 sm:text-xl">
              {p.role}
            </p>
            {p.headline && (
              <p className="mt-1 text-sm font-normal text-stone-600 sm:text-base">
                {p.headline}
              </p>
            )}

            {/* Summary */}
            <p className="mt-5 text-sm leading-relaxed text-stone-600 sm:text-base">
              {p.summary}
            </p>

            {/* Contact details row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-600 sm:text-sm">
              <a
                href={`mailto:${p.email}`}
                className="flex items-center gap-1.5 transition hover:text-emerald-700"
              >
                <Mail className="h-4 w-4 text-stone-400" />
                <span>{p.email}</span>
              </a>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-stone-400" />
                <span>{p.phone}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-stone-400" />
                <span>{p.location}</span>
              </span>
            </div>

            {/* Social Links and Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Primary: ATS CV Download & View */}
              <button
                id="btn-download-ats-hero"
                onClick={onOpenAts}
                className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700 active:scale-98"
              >
                <FileText className="h-4 w-4 text-emerald-400" />
                <span>{isEs ? 'Descargar CV ATS Friendly' : 'Download ATS-Friendly CV'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              {/* View Markdown Architecture */}
              <button
                onClick={() => onOpenMarkdownFile(isEs ? 'experiencia' : 'experience')}
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-xs transition hover:bg-stone-50 active:scale-98"
              >
                <FileCode2 className="h-4 w-4 text-stone-500" />
                <span>{isEs ? 'Explorar Markdown (.md)' : 'Explore Markdown (.md)'}</span>
              </button>

              {/* Social links */}
              <div className="flex items-center gap-1.5 pl-2">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-stone-200 bg-white p-2 text-stone-600 transition hover:border-stone-400 hover:text-stone-900"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-stone-200 bg-white p-2 text-stone-600 transition hover:border-stone-400 hover:text-stone-900"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-stone-200 bg-white p-2 text-stone-600 transition hover:border-stone-400 hover:text-stone-900"
                    aria-label="Website"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Key ATS & Architecture Highlight Card */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                  <Layers className="h-4 w-4 text-emerald-600" />
                  <span>{isEs ? 'Métricas Clave' : 'Key Metrics'}</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  ATS 100%
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {keyMetrics.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-mono text-2xl font-bold tracking-tight text-stone-950">
                      {item.value}
                    </span>
                    <span className="text-xs font-semibold text-stone-800">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-stone-100 bg-stone-50/80 p-3 text-xs text-stone-600">
                <div className="flex items-center justify-between font-medium text-stone-800">
                  <span>{isEs ? 'Estructura de Contenido' : 'Content Structure'}</span>
                  <span className="font-mono text-[10px] text-emerald-600 font-semibold">/content/{lang}/</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-stone-500">
                  {isEs
                    ? 'Organizado en archivos markdown independientes para cada sección, compatible con Nuxt Content y renderizado dinámico.'
                    : 'Organized into independent markdown files for each section, adhering to Nuxt Content file-based CMS structure.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
