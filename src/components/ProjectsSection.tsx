import React from 'react';
import { FolderGit2, ExternalLink, Github, FileCode2 } from 'lucide-react';
import { Language, ProjectItem } from '../types.ts';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  lang: Language;
  onOpenMarkdownFile: (fileId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  lang,
  onOpenMarkdownFile,
}) => {
  const isEs = lang === 'es';

  return (
    <section id="projects" className="py-16 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <FolderGit2 className="h-4 w-4" />
              <span>{isEs ? 'Innovación & Software' : 'Featured Work'}</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
              {isEs ? 'Proyectos Destacados' : 'Featured Projects'}
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              {isEs
                ? 'Soluciones de arquitectura de software, herramientas para desarrolladores y sistemas distribuidos'
                : 'Software architecture solutions, developer tools, and distributed applications'}
            </p>
          </div>

          <button
            onClick={() => onOpenMarkdownFile(isEs ? 'proyectos' : 'projects')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-mono text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
            title={isEs ? 'Ver archivo de proyectos' : 'View projects markdown'}
          >
            <FileCode2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>content/{lang}/{isEs ? 'proyectos' : 'projects'}.md</span>
          </button>
        </div>

        {/* Projects Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((prj, idx) => (
            <div
              key={idx}
              id={`project-card-${idx}`}
              className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition hover:border-stone-300"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-stone-950">
                    {prj.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-stone-500">
                    {prj.github && (
                      <a
                        href={prj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md p-1 hover:bg-stone-100 hover:text-stone-900"
                        title="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {prj.demo && (
                      <a
                        href={prj.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md p-1 hover:bg-stone-100 hover:text-stone-900"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-1 text-xs font-semibold text-emerald-700">
                  {prj.role}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {prj.description}
                </p>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {prj.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs font-mono text-stone-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
