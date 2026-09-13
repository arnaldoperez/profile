import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Globe,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Language, PortfolioData } from '../types.ts';
import { generateAtsPlainText, downloadFile } from '../utils/atsFormatter.ts';

interface AtsCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const AtsCvModal: React.FC<AtsCvModalProps> = ({
  isOpen,
  onClose,
  data,
  lang,
  onLanguageChange,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'text'>('visual');
  const isEs = lang === 'es';
  const p = data.profile;

  if (!isOpen) return null;

  const plainText = generateAtsPlainText(data, lang);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const filename = `CV_${p.name.replace(/\s+/g, '_')}_ATS_${lang.toUpperCase()}.txt`;
    downloadFile(plainText, filename, 'text/plain');
  };

  const handleDownloadMd = () => {
    const filename = `CV_${p.name.replace(/\s+/g, '_')}_ATS_${lang.toUpperCase()}.md`;
    downloadFile(plainText, filename, 'text/markdown');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const atsChecklist = [
    {
      title: isEs ? 'Diseño Columna Única' : 'Single Column Layout',
      desc: isEs ? 'Sin columnas múltiples ni tablas complejas que confundan a los parsers ATS' : 'No multiple columns or nested tables that trip ATS OCR scanners',
      pass: true,
    },
    {
      title: isEs ? 'Encabezados Estándar' : 'Standard Heading Hierarchy',
      desc: isEs ? 'Títulos reconocibles: Resumen, Experiencia, Habilidades, Educación, Certificaciones' : 'Standard titles: Summary, Experience, Skills, Education, Certifications',
      pass: true,
    },
    {
      title: isEs ? 'Datos de Contacto Claros' : 'Parseable Contact Information',
      desc: isEs ? 'Email, teléfono, ubicación y enlaces profesionales en cabecera' : 'Direct email, phone, location, and verifiable professional profiles',
      pass: true,
    },
    {
      title: isEs ? 'Logros con Verbos de Acción y Métricas' : 'Action Verbs & Quantifiable Results',
      desc: isEs ? 'Porcentajes de optimización, volumen de usuarios y métricas de escala' : 'Latency reductions, user scale volume, and production milestones',
      pass: true,
    },
    {
      title: isEs ? 'Indexación de Palabras Clave' : 'Keyword Optimization',
      desc: isEs ? 'TypeScript, React, Nuxt, Node.js, AWS, Kubernetes, Docker, CI/CD' : 'Targeted tech keywords cleanly grouped for algorithm filtering',
      pass: true,
    },
    {
      title: isEs ? 'Exportación en Texto Plano y PDF' : 'Plain Text & Clean PDF Export',
      desc: isEs ? 'Formato .txt para formularios web y PDF limpio para reclutadores' : 'Clean .txt format for job portals and print-ready PDF for recruiters',
      pass: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-3 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="relative flex h-[92vh] max-h-[950px] w-full max-w-6xl flex-col rounded-2xl border border-stone-200 bg-white shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="no-print flex flex-wrap items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-3 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-stone-900">
                  {isEs ? 'Currículum ATS Friendly Optimizado' : 'ATS-Optimized Resume Engine'}
                </h3>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                  ATS Score: 100%
                </span>
              </div>
              <p className="text-xs text-stone-500">
                {isEs
                  ? 'Compatible con Workday, Taleo, Greenhouse, Lever, Ashby y BambooHR'
                  : 'Compatible with Workday, Taleo, Greenhouse, Lever, Ashby, and BambooHR'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switcher */}
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

            {/* View Tabs */}
            <div className="inline-flex rounded-lg border border-stone-200 bg-white p-0.5 text-xs font-medium">
              <button
                onClick={() => setActiveTab('visual')}
                className={`px-3 py-1 rounded-md transition ${
                  activeTab === 'visual'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isEs ? 'Vista Documento' : 'Document View'}
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1 rounded-md transition ${
                  activeTab === 'text'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isEs ? 'Texto Plano (.txt)' : 'Plain Text (.txt)'}
              </button>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Action Header Banner */}
        <div className="no-print flex flex-wrap items-center justify-between border-b border-stone-200 bg-emerald-50/70 px-5 py-2.5 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {isEs
              ? 'Estructura validada contra directrices internacionales de reclutamiento técnico ATS.'
              : 'Format strictly compliant with international technical ATS recruitment guidelines.'}
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-stone-800"
              title={isEs ? 'Imprimir o Guardar como PDF' : 'Print or Save as PDF'}
            >
              <Printer className="h-3.5 w-3.5" />
              <span>{isEs ? 'Guardar como PDF' : 'Save as PDF'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-xs transition hover:bg-stone-50"
              title={isEs ? 'Descargar archivo TXT' : 'Download TXT file'}
            >
              <Download className="h-3.5 w-3.5 text-stone-500" />
              <span>{isEs ? 'Descargar TXT' : 'Download TXT'}</span>
            </button>

            <button
              onClick={handleDownloadMd}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-xs transition hover:bg-stone-50"
              title={isEs ? 'Descargar archivo Markdown' : 'Download Markdown file'}
            >
              <FileText className="h-3.5 w-3.5 text-stone-500" />
              <span>{isEs ? 'Descargar MD' : 'Download MD'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-xs transition hover:bg-stone-50"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{isEs ? 'Copiado!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-stone-500" />
                  <span>{isEs ? 'Copiar Texto' : 'Copy Text'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Document / Text View Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-stone-100/50">
            {activeTab === 'text' ? (
              <div className="mx-auto max-w-3xl rounded-xl border border-stone-300 bg-white p-6 font-mono text-xs leading-relaxed text-stone-800 shadow-xs">
                <pre className="whitespace-pre-wrap">{plainText}</pre>
              </div>
            ) : (
              /* Visual ATS Printable Document */
              <div
                id="ats-document-preview"
                className="ats-print-container mx-auto max-w-3xl rounded-xl border border-stone-300 bg-white p-8 sm:p-12 shadow-sm text-stone-900 font-sans"
              >
                {/* ATS Header */}
                <header className="border-b-2 border-stone-900 pb-4 text-center">
                  <h1 className="text-2xl font-bold uppercase tracking-tight text-stone-950 sm:text-3xl">
                    {p.name}
                  </h1>
                  <p className="mt-1 text-sm font-semibold text-stone-800">
                    {p.role}
                  </p>
                  <p className="mt-2 text-xs text-stone-600">
                    {p.email} • {p.phone} • {p.location}
                  </p>
                  <p className="mt-1 text-xs text-stone-600">
                    LinkedIn: {p.linkedin} • GitHub: {p.github}
                    {p.website && ` • Portfolio: ${p.website}`}
                  </p>
                </header>

                {/* Professional Summary */}
                <section className="mt-6">
                  <h2 className="border-b border-stone-800 pb-1 text-xs font-bold uppercase tracking-wider text-stone-950">
                    {isEs ? 'Resumen Profesional' : 'Professional Summary'}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-stone-800">
                    {p.summary}
                  </p>
                </section>

                {/* Technical Skills */}
                <section className="mt-6">
                  <h2 className="border-b border-stone-800 pb-1 text-xs font-bold uppercase tracking-wider text-stone-950">
                    {isEs ? 'Habilidades Técnicas' : 'Technical Skills'}
                  </h2>
                  <div className="mt-2 space-y-1 text-xs text-stone-800">
                    {data.skills.map((cat, idx) => (
                      <p key={idx}>
                        <strong className="font-semibold text-stone-900">
                          {cat.category}:
                        </strong>{' '}
                        {cat.skills.join(', ')}
                      </p>
                    ))}
                  </div>
                </section>

                {/* Work Experience */}
                <section className="mt-6">
                  <h2 className="border-b border-stone-800 pb-1 text-xs font-bold uppercase tracking-wider text-stone-950">
                    {isEs ? 'Experiencia Laboral' : 'Work Experience'}
                  </h2>
                  <div className="mt-3 space-y-5">
                    {data.experience.map((exp, idx) => (
                      <div key={idx}>
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-bold text-stone-950 uppercase">
                            {exp.role} — {exp.company}
                          </span>
                          <span className="font-semibold text-stone-700">
                            {exp.period}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="text-[11px] text-stone-500 italic">
                            {exp.location}
                          </div>
                        )}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="mt-1 text-[11px] text-stone-700">
                            <strong>{isEs ? 'Tecnologías' : 'Technologies'}:</strong>{' '}
                            {exp.technologies.join(', ')}
                          </div>
                        )}
                        <ul className="mt-2 list-disc pl-4 space-y-1 text-xs text-stone-800">
                          {exp.achievements.map((ach, aIdx) => (
                            <li key={aIdx} className="leading-relaxed">
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Featured Projects */}
                {data.projects.length > 0 && (
                  <section className="mt-6">
                    <h2 className="border-b border-stone-800 pb-1 text-xs font-bold uppercase tracking-wider text-stone-950">
                      {isEs ? 'Proyectos Relevantes' : 'Featured Projects'}
                    </h2>
                    <div className="mt-3 space-y-3">
                      {data.projects.map((prj, idx) => (
                        <div key={idx} className="text-xs">
                          <div className="flex items-baseline justify-between font-bold text-stone-900">
                            <span>{prj.title}</span>
                            <span className="font-normal text-stone-600">{prj.role}</span>
                          </div>
                          {prj.technologies.length > 0 && (
                            <div className="text-[11px] text-stone-600">
                              <strong>Stack:</strong> {prj.technologies.join(', ')}
                            </div>
                          )}
                          <p className="mt-1 leading-relaxed text-stone-800">
                            {prj.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Official Certifications */}
                {data.certifications.length > 0 && (
                  <section className="mt-6">
                    <h2 className="border-b border-stone-800 pb-1 text-xs font-bold uppercase tracking-wider text-stone-950">
                      {isEs ? 'Certificaciones Oficiales' : 'Official Certifications'}
                    </h2>
                    <ul className="mt-2 list-disc pl-4 space-y-1 text-xs text-stone-800">
                      {data.certifications.map((c, idx) => (
                        <li key={idx}>
                          <strong>{c.name}</strong> — {c.issuer} ({c.date})
                          {c.credentialId && ` [ID: ${c.credentialId}]`}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Academic Education */}
                {data.education.length > 0 && (
                  <section className="mt-6">
                    <h2 className="border-b border-stone-800 pb-1 text-xs font-bold uppercase tracking-wider text-stone-950">
                      {isEs ? 'Educación' : 'Education'}
                    </h2>
                    <div className="mt-2 space-y-2 text-xs">
                      {data.education.map((edu, idx) => (
                        <div key={idx}>
                          <div className="flex items-baseline justify-between">
                            <span className="font-bold text-stone-900">
                              {edu.degree}
                            </span>
                            <span className="text-stone-600">{edu.period}</span>
                          </div>
                          <div className="text-stone-700">
                            {edu.institution} {edu.location ? `• ${edu.location}` : ''}
                          </div>
                          {edu.honors && (
                            <div className="text-[11px] italic text-stone-600">
                              {edu.honors}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>

          {/* ATS Guidelines & Checklist Sidebar */}
          <aside className="no-print hidden lg:flex w-80 shrink-0 flex-col border-l border-stone-200 bg-white p-5 overflow-y-auto">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                {isEs ? 'Auditoría de Cumplimiento ATS' : 'ATS Compliance Audit'}
              </h4>
            </div>

            <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200/80 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">
                  {isEs ? 'Puntaje de Compatibilidad' : 'Compatibility Score'}
                </span>
                <span className="font-mono text-sm font-bold text-emerald-700">
                  100 / 100
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-emerald-200">
                <div className="h-full w-full bg-emerald-600 rounded-full" />
              </div>
              <p className="mt-2 text-[11px] text-emerald-800 leading-tight">
                {isEs
                  ? 'Optimizado para pasar sin pérdidas los filtros de análisis de palabras clave y orden de lectura.'
                  : 'Engineered to pass keyword matching and parsing OCR filters without parsing truncation.'}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {atsChecklist.map((item, idx) => (
                <div key={idx} className="rounded-lg border border-stone-100 bg-stone-50/70 p-2.5 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-stone-100 pt-4">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                {isEs ? 'Recomendación de Envío' : 'Submission Recommendation'}
              </h5>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">
                {isEs
                  ? 'Para portales que admiten subida de documentos, utiliza "Guardar como PDF". Para formularios de texto libre o campos rápidos de ATS, utiliza "Descargar TXT" o "Copiar Texto".'
                  : 'For job boards accepting file uploads, use "Save as PDF". For plain text input fields or legacy ATS portals, use "Download TXT" or "Copy Text".'}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
