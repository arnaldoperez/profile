import React from 'react';
import { FileCode2, FileText, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Language, PortfolioData } from '../types.ts';

interface FooterProps {
  data: PortfolioData;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAts: () => void;
  onOpenMarkdown: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  data,
  lang,
  onLanguageChange,
  onOpenAts,
  onOpenMarkdown,
}) => {
  const isEs = lang === 'es';
  const p = data.profile;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 bg-white py-12 text-stone-600 text-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-stone-900">
                {p.name}
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-500">{p.role}</span>
            </div>
            <p className="mt-1 text-stone-500 max-w-md">
              {isEs
                ? 'Portfolio profesional con arquitectura de contenido basada en archivos Markdown (/content/), optimizado para sistemas ATS y con soporte multilingüe.'
                : 'Professional software engineer portfolio built with Nuxt-Content markdown architecture (/content/), ATS resume export, and bilingual support.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenAts}
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <FileText className="h-4 w-4" />
              <span>{isEs ? 'Descargar CV ATS' : 'Download ATS CV'}</span>
            </button>

            <button
              onClick={onOpenMarkdown}
              className="inline-flex items-center gap-1.5 font-medium text-stone-700 hover:text-stone-950"
            >
              <FileCode2 className="h-4 w-4 text-emerald-600" />
              <span>{isEs ? 'Archivos Markdown' : 'Markdown Files'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 rounded-lg border border-stone-200 p-2 text-stone-500 hover:bg-stone-50 hover:text-stone-900"
              title={isEs ? 'Volver arriba' : 'Back to top'}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-stone-100 pt-6 gap-3 text-stone-400">
          <div>
            © {new Date().getFullYear()} {p.name}. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-2">
            <span>{isEs ? 'Idioma' : 'Language'}:</span>
            <button
              onClick={() => onLanguageChange('es')}
              className={`font-semibold ${lang === 'es' ? 'text-emerald-600 underline' : 'hover:text-stone-700'}`}
            >
              Español
            </button>
            <span>·</span>
            <button
              onClick={() => onLanguageChange('en')}
              className={`font-semibold ${lang === 'en' ? 'text-emerald-600 underline' : 'hover:text-stone-700'}`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
