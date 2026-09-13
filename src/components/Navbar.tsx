import React from 'react';
import { Download, FileCode2, FileText, Globe, Menu, X, Sparkles } from 'lucide-react';
import { Language } from '../types.ts';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAts: () => void;
  onOpenMarkdown: () => void;
  developerName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenAts,
  onOpenMarkdown,
  developerName,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isEs = lang === 'es';

  const navLinks = [
    { href: '#experience', label: isEs ? 'Experiencia' : 'Experience' },
    { href: '#skills', label: isEs ? 'Habilidades' : 'Skills' },
    { href: '#projects', label: isEs ? 'Proyectos' : 'Projects' },
    { href: '#certifications', label: isEs ? 'Certificados' : 'Certifications' },
    { href: '#soft-skills', label: isEs ? 'Soft Skills' : 'Soft Skills' },
    { href: '#education', label: isEs ? 'Educación' : 'Education' },
  ];

  const initials = developerName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AP';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-stone-900 transition hover:text-emerald-700"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 font-mono text-sm font-bold text-white transition group-hover:bg-emerald-600">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-stone-900">
              {developerName}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {isEs ? 'Disponible' : 'Available'} · Nuxt Content Engine
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-stone-950 hover:underline hover:underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Language Switcher */}
          <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-0.5 text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('es')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition ${
                isEs
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Español"
            >
              ES
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition ${
                !isEs
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Markdown Files Explorer Button */}
          <button
            onClick={onOpenMarkdown}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-50 hover:border-stone-300 active:scale-98"
            title={isEs ? 'Explorar archivos Markdown' : 'Explore Markdown source files'}
          >
            <FileCode2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>.md Content</span>
          </button>

          {/* ATS CV Button */}
          <button
            onClick={onOpenAts}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-700 active:scale-98"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>{isEs ? 'CV ATS-Friendly' : 'ATS Resume'}</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Language Switcher */}
          <button
            onClick={() => onLanguageChange(isEs ? 'en' : 'es')}
            className="flex items-center gap-1 rounded-lg border border-stone-200 px-2 py-1 text-xs font-semibold text-stone-700"
          >
            <Globe className="h-3 w-3" />
            <span>{isEs ? 'ES' : 'EN'}</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-100"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="border-b border-stone-200 bg-white px-4 py-4 sm:px-6 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 text-sm font-medium text-stone-700 hover:text-emerald-700"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-stone-100 pt-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAts();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <FileText className="h-4 w-4" />
                <span>{isEs ? 'Descargar CV ATS' : 'Download ATS CV'}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenMarkdown();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-200 bg-stone-50 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                <FileCode2 className="h-4 w-4 text-emerald-600" />
                <span>{isEs ? 'Archivos Markdown (/content/)' : 'Markdown Files (/content/)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
