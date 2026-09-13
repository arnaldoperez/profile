import React from 'react';
import { Briefcase, Calendar, MapPin, Tag, FileCode2 } from 'lucide-react';
import { ExperienceItem, Language } from '../types.ts';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  lang: Language;
  onOpenMarkdownFile: (fileId: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  lang,
  onOpenMarkdownFile,
}) => {
  const isEs = lang === 'es';

  return (
    <section id="experience" className="py-16 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <Briefcase className="h-4 w-4" />
              <span>{isEs ? 'Trayectoria Profesional' : 'Career History'}</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
              {isEs ? 'Experiencia Laboral' : 'Work Experience'}
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              {isEs
                ? 'Historial de impacto medible, liderazgo técnico y despliegue de sistemas a escala'
                : 'Track record of measurable impact, technical leadership, and scalable systems'}
            </p>
          </div>

          <button
            onClick={() => onOpenMarkdownFile(isEs ? 'experiencia' : 'experience')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-mono text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
            title={isEs ? 'Ver archivo de experiencia' : 'View experience markdown'}
          >
            <FileCode2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>content/{lang}/{isEs ? 'experiencia' : 'experience'}.md</span>
          </button>
        </div>

        {/* Experience List */}
        <div className="mt-8 space-y-8">
          {experience.map((item, idx) => (
            <article
              key={idx}
              id={`experience-item-${idx}`}
              className="relative rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition hover:border-stone-300 sm:p-8"
            >
              {/* Role and Company */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-950">
                    {item.role}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-emerald-800">
                    <span>{item.company}</span>
                    {item.location && (
                      <span className="flex items-center gap-1 text-xs font-normal text-stone-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600">
                  <Calendar className="h-3.5 w-3.5 text-stone-400" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Technologies Badges */}
              {item.technologies && item.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-medium text-stone-400 mr-1 flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    Stack:
                  </span>
                  {item.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-md border border-stone-200/80 bg-stone-100/70 px-2.5 py-0.5 text-xs font-mono font-medium text-stone-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Measurable Achievements */}
              <div className="mt-5 border-t border-stone-100 pt-4">
                <ul className="space-y-2.5 text-sm text-stone-600">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
