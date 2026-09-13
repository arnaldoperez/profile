import React, { useState } from 'react';
import { X, FileCode2, Copy, Check, Download, Folder, FileText, ChevronRight } from 'lucide-react';
import { Language, SectionFile } from '../types.ts';
import { downloadFile } from '../utils/atsFormatter.ts';

interface MarkdownViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: SectionFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const MarkdownViewerModal: React.FC<MarkdownViewerModalProps> = ({
  isOpen,
  onClose,
  sections,
  activeFileId,
  onSelectFile,
  lang,
  onLanguageChange,
}) => {
  const [copied, setCopied] = useState(false);
  const isEs = lang === 'es';

  if (!isOpen) return null;

  const currentFile =
    sections.find((s) => s.id === activeFileId) || sections[0] || null;

  const handleCopy = () => {
    if (!currentFile) return;
    navigator.clipboard.writeText(currentFile.rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCurrent = () => {
    if (!currentFile) return;
    downloadFile(currentFile.rawContent, currentFile.filename, 'text/markdown');
  };

  const handleDownloadAll = () => {
    const combined = sections
      .map(
        (s) =>
          `<!-- FILE: content/${lang}/${s.filename} -->\n${s.rawContent}\n\n`
      )
      .join('\n');
    downloadFile(combined, `portfolio-markdown-content-${lang}.md`, 'text/markdown');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 sm:p-6 animate-fade-in">
      <div className="relative flex h-[90vh] max-h-[850px] w-full max-w-5xl flex-col rounded-2xl border border-stone-200 bg-white shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
              <FileCode2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                {isEs ? 'Explorador de Contenido Markdown (Nuxt Content)' : 'Markdown Content Explorer (Nuxt Content)'}
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                /content/{lang}/{currentFile?.filename || ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switcher in modal */}
            <div className="inline-flex rounded-lg border border-stone-200 bg-white p-0.5 text-xs font-semibold">
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-2.5 py-1 rounded-md transition ${
                  isEs ? 'bg-emerald-600 text-white' : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-md transition ${
                  !isEs ? 'bg-emerald-600 text-white' : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Sidebar + Editor */}
        <div className="flex flex-1 overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-56 shrink-0 border-r border-stone-200 bg-stone-50/70 p-3 sm:w-64 overflow-y-auto">
            <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-stone-400">
              <Folder className="h-3.5 w-3.5 text-stone-500" />
              <span>content/{lang}/</span>
            </div>

            <nav className="mt-2 space-y-1">
              {sections.map((file) => {
                const isActive = file.id === currentFile?.id;
                return (
                  <button
                    key={file.id}
                    onClick={() => onSelectFile(file.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                      isActive
                        ? 'bg-emerald-50 font-semibold text-emerald-900 border border-emerald-200/80 shadow-xs'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate font-mono">
                      <FileText className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-600' : 'text-stone-400'}`} />
                      <span className="truncate">{file.filename}</span>
                    </span>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-stone-200 pt-4 px-2">
              <p className="text-[11px] leading-relaxed text-stone-500">
                {isEs
                  ? 'Cada archivo contiene metadatos YAML frontmatter y cuerpo Markdown, respetando el estándar de Nuxt Content.'
                  : 'Each file includes YAML frontmatter and standard Markdown body matching Nuxt Content conventions.'}
              </p>

              <button
                onClick={handleDownloadAll}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-white py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                <Download className="h-3.5 w-3.5 text-stone-500" />
                <span>{isEs ? 'Descargar todo (.md)' : 'Download all (.md)'}</span>
              </button>
            </div>
          </div>

          {/* File Content Preview / Code Viewer */}
          <div className="flex flex-1 flex-col overflow-hidden bg-stone-950 text-stone-100">
            {/* Action Bar */}
            <div className="flex items-center justify-between border-b border-stone-800 bg-stone-900/90 px-4 py-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-400">
                  {currentFile?.filename}
                </span>
                <span className="text-stone-500">·</span>
                <span className="text-stone-400 text-[11px]">
                  {currentFile?.rawContent.length || 0} bytes
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-md bg-stone-800 px-2.5 py-1 text-xs text-stone-300 hover:bg-stone-700 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">{isEs ? 'Copiado' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>{isEs ? 'Copiar' : 'Copy'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadCurrent}
                  className="flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-500"
                >
                  <Download className="h-3 w-3" />
                  <span>{isEs ? 'Descargar' : 'Download'}</span>
                </button>
              </div>
            </div>

            {/* Markdown source display */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-stone-200">
              <pre className="whitespace-pre-wrap selection:bg-emerald-800 selection:text-white">
                {currentFile?.rawContent}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
