import React from 'react';
import { GraduationCap, Calendar, MapPin, FileCode2 } from 'lucide-react';
import { EducationItem, Language } from '../types.ts';

interface EducationSectionProps {
  education: EducationItem[];
  lang: Language;
  onOpenMarkdownFile: (fileId: string) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  lang,
  onOpenMarkdownFile,
}) => {
  const isEs = lang === 'es';

  return (
    <section id="education" className="border-t border-stone-200 bg-stone-50/40 py-16 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <GraduationCap className="h-4 w-4" />
              <span>{isEs ? 'Formación Académica' : 'Academic Education'}</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
              {isEs ? 'Educación Universitaria' : 'Education'}
            </h2>
          </div>

          <button
            onClick={() => onOpenMarkdownFile(isEs ? 'educacion' : 'education')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-mono text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
            title={isEs ? 'Ver educación' : 'View education'}
          >
            <FileCode2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>content/{lang}/{isEs ? 'educacion' : 'education'}.md</span>
          </button>
        </div>

        {/* Education List */}
        <div className="mt-8 space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-950">
                    {edu.degree}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-emerald-800">
                    <span>{edu.institution}</span>
                    {edu.location && (
                      <span className="flex items-center gap-1 text-xs font-normal text-stone-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {edu.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600">
                  <Calendar className="h-3.5 w-3.5 text-stone-400" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {edu.honors && (
                <div className="mt-3 border-t border-stone-100 pt-3 text-sm text-stone-600">
                  <p>{edu.honors}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
