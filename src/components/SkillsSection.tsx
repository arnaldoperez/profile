import React, { useState } from 'react';
import { Cpu, Search, FileCode2, Check } from 'lucide-react';
import { Language, SkillCategory } from '../types.ts';

interface SkillsSectionProps {
  skills: SkillCategory[];
  lang: Language;
  onOpenMarkdownFile: (fileId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  lang,
  onOpenMarkdownFile,
}) => {
  const isEs = lang === 'es';
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = skills
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="border-t border-stone-200 bg-stone-50/40 py-16 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <Cpu className="h-4 w-4" />
              <span>{isEs ? 'Dominio Tecnológico' : 'Technical Proficiency'}</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
              {isEs ? 'Habilidades Técnicas' : 'Technical Skills'}
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              {isEs
                ? 'Stack tecnológico moderno categorizado para máxima compatibilidad con filtros ATS'
                : 'Modern technology stack structured for optimal ATS parser indexing'}
            </p>
          </div>

          <button
            onClick={() => onOpenMarkdownFile(isEs ? 'habilidades' : 'skills')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-mono text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
            title={isEs ? 'Ver archivo de habilidades' : 'View skills markdown'}
          >
            <FileCode2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>content/{lang}/{isEs ? 'habilidades' : 'skills'}.md</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="mt-6 flex max-w-md items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5 py-2 shadow-xs focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
          <Search className="h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder={isEs ? 'Filtrar tecnologías (ej. React, Docker, Go)...' : 'Filter technologies (e.g. React, Docker, Go)...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm text-stone-900 placeholder-stone-400 outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-stone-400 hover:text-stone-700"
            >
              {isEs ? 'Limpiar' : 'Clear'}
            </button>
          )}
        </div>

        {/* Skills Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition hover:border-stone-300"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2.5">
                {cat.category}
              </h3>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-mono text-stone-800 transition hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900"
                  >
                    <Check className="h-3 w-3 text-emerald-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
