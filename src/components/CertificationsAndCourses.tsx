import React from 'react';
import { Award, BookOpen, CheckCircle, FileCode2 } from 'lucide-react';
import { CertificationItem, CourseItem, Language } from '../types.ts';

interface CertificationsAndCoursesProps {
  certifications: CertificationItem[];
  courses: CourseItem[];
  lang: Language;
  onOpenMarkdownFile: (fileId: string) => void;
}

export const CertificationsAndCourses: React.FC<CertificationsAndCoursesProps> = ({
  certifications,
  courses,
  lang,
  onOpenMarkdownFile,
}) => {
  const isEs = lang === 'es';

  return (
    <section id="certifications" className="border-t border-stone-200 bg-stone-50/40 py-16 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Certifications Column */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  <Award className="h-4 w-4" />
                  <span>{isEs ? 'Acreditación Oficial' : 'Official Credentials'}</span>
                </div>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950">
                  {isEs ? 'Certificaciones' : 'Certifications'}
                </h2>
              </div>

              <button
                onClick={() => onOpenMarkdownFile(isEs ? 'certificados' : 'certifications')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs font-mono text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
                title={isEs ? 'Ver certificados' : 'View certifications'}
              >
                <FileCode2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{isEs ? 'certificados.md' : 'certifications.md'}</span>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs transition hover:border-stone-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">
                        {cert.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-emerald-800">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-[11px] font-mono text-stone-600">
                      {cert.date}
                    </span>
                  </div>

                  {cert.credentialId && (
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] text-stone-500 font-mono">
                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                      <span>ID: {cert.credentialId}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Courses Column */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  <BookOpen className="h-4 w-4" />
                  <span>{isEs ? 'Formación Continua' : 'Continuous Education'}</span>
                </div>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950">
                  {isEs ? 'Cursos Especializados' : 'Specialized Courses'}
                </h2>
              </div>

              <button
                onClick={() => onOpenMarkdownFile(isEs ? 'cursos' : 'courses')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs font-mono text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
                title={isEs ? 'Ver cursos' : 'View courses'}
              >
                <FileCode2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{isEs ? 'cursos.md' : 'courses.md'}</span>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs transition hover:border-stone-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">
                        {course.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-stone-600">
                        {course.institution}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-[11px] font-mono text-stone-600">
                      {course.year}
                    </span>
                  </div>

                  {course.hours && (
                    <p className="mt-2 text-xs text-stone-500">
                      {course.hours}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
