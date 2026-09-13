/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Language } from './types.ts';
import { loadPortfolioData } from './utils/contentLoader.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ExperienceSection } from './components/ExperienceSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { CertificationsAndCourses } from './components/CertificationsAndCourses.tsx';
import { SoftSkillsSection } from './components/SoftSkillsSection.tsx';
import { EducationSection } from './components/EducationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AtsCvModal } from './components/AtsCvModal.tsx';
import { MarkdownViewerModal } from './components/MarkdownViewerModal.tsx';
import { FileText, FileCode2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [isAtsOpen, setIsAtsOpen] = useState(false);
  const [isMarkdownOpen, setIsMarkdownOpen] = useState(false);
  const [activeMarkdownFileId, setActiveMarkdownFileId] = useState<string>('perfil');

  // Load content dynamically based on chosen language from the markdown files
  const data = useMemo(() => {
    return loadPortfolioData(lang);
  }, [lang]);

  const handleOpenMarkdownFile = (fileId: string) => {
    setActiveMarkdownFileId(fileId);
    setIsMarkdownOpen(true);
  };

  const isEs = lang === 'es';

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sticky Top Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        onOpenAts={() => setIsAtsOpen(true)}
        onOpenMarkdown={() => {
          setActiveMarkdownFileId(isEs ? 'perfil' : 'profile');
          setIsMarkdownOpen(true);
        }}
        developerName={data.profile.name}
      />

      {/* Main Single-Page Content */}
      <main>
        <HeroSection
          data={data}
          lang={lang}
          onOpenAts={() => setIsAtsOpen(true)}
          onOpenMarkdownFile={handleOpenMarkdownFile}
        />

        <ExperienceSection
          experience={data.experience}
          lang={lang}
          onOpenMarkdownFile={handleOpenMarkdownFile}
        />

        <SkillsSection
          skills={data.skills}
          lang={lang}
          onOpenMarkdownFile={handleOpenMarkdownFile}
        />

        <ProjectsSection
          projects={data.projects}
          lang={lang}
          onOpenMarkdownFile={handleOpenMarkdownFile}
        />

        <CertificationsAndCourses
          certifications={data.certifications}
          courses={data.courses}
          lang={lang}
          onOpenMarkdownFile={handleOpenMarkdownFile}
        />

        <SoftSkillsSection
          softSkills={data.softSkills}
          lang={lang}
          onOpenMarkdownFile={handleOpenMarkdownFile}
        />

        <EducationSection
          education={data.education}
          lang={lang}
          onOpenMarkdownFile={handleOpenMarkdownFile}
        />
      </main>

      {/* Footer */}
      <Footer
        data={data}
        lang={lang}
        onLanguageChange={setLang}
        onOpenAts={() => setIsAtsOpen(true)}
        onOpenMarkdown={() => {
          setActiveMarkdownFileId(isEs ? 'perfil' : 'profile');
          setIsMarkdownOpen(true);
        }}
      />

      {/* Floating Action Bar for Quick ATS Download on Mobile / Scroll */}
      <div className="no-print fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-2xl border border-stone-300 bg-stone-900 p-1.5 shadow-xl sm:hidden">
        <button
          onClick={() => setIsAtsOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs"
        >
          <FileText className="h-4 w-4" />
          <span>CV ATS</span>
        </button>
        <button
          onClick={() => {
            setActiveMarkdownFileId(isEs ? 'perfil' : 'profile');
            setIsMarkdownOpen(true);
          }}
          className="flex items-center gap-1.5 rounded-xl bg-stone-800 px-3 py-2 text-xs font-medium text-stone-200"
          title="Markdown"
        >
          <FileCode2 className="h-4 w-4 text-emerald-400" />
        </button>
      </div>

      {/* ATS CV Modal */}
      <AtsCvModal
        isOpen={isAtsOpen}
        onClose={() => setIsAtsOpen(false)}
        data={data}
        lang={lang}
        onLanguageChange={setLang}
      />

      {/* Markdown Content Explorer Modal */}
      <MarkdownViewerModal
        isOpen={isMarkdownOpen}
        onClose={() => setIsMarkdownOpen(false)}
        sections={data.sections}
        activeFileId={activeMarkdownFileId}
        onSelectFile={setActiveMarkdownFileId}
        lang={lang}
        onLanguageChange={setLang}
      />
    </div>
  );
}
