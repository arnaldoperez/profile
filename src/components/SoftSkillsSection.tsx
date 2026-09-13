import React from 'react';
import { Users, FileCode2, Sparkles } from 'lucide-react';
import { Language, SoftSkillItem } from '../types.ts';

interface SoftSkillsSectionProps {
  softSkills: SoftSkillItem[];
  lang: Language;
  onOpenMarkdownFile: (fileId: string) => void;
}

export const SoftSkillsSection: React.FC<SoftSkillsSectionProps> = ({
  softSkills,
  lang,
  onOpenMarkdownFile,
}) => {
  const isEs = lang === 'es';

  return (
    <section id="soft-skills" className="py-16 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <Users className="h-4 w-4" />
              <span>{isEs ? 'Competencias Interpersonales' : 'Interpersonal & Leadership'}</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
              {isEs ? 'Habilidades Blandas & Liderazgo' : 'Soft Skills & Leadership'}
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              {isEs
                ? 'Valores de comunicación, mentoría, resolución de bloqueos y cultura de equipo'
                : 'Team culture, clear communication, engineering mentorship, and problem solving'}
            </p>
          </div>

          <button
            onClick={() => onOpenMarkdownFile('soft-skills')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-mono text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
            title={isEs ? 'Ver soft skills' : 'View soft skills'}
          >
            <FileCode2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>content/{lang}/soft-skills.md</span>
          </button>
        </div>

        {/* Soft skills grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {softSkills.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition hover:border-stone-300"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  {item.name}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
