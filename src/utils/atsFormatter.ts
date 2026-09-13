import { PortfolioData, Language } from '../types.ts';

export function generateAtsPlainText(data: PortfolioData, lang: Language): string {
  const isEs = lang === 'es';
  const p = data.profile;

  const lines: string[] = [];

  // Header
  lines.push(p.name.toUpperCase());
  lines.push(p.role);
  lines.push(`${p.email} | ${p.phone} | ${p.location}`);
  lines.push(`LinkedIn: ${p.linkedin} | GitHub: ${p.github}${p.website ? ` | Portfolio: ${p.website}` : ''}`);
  lines.push('');
  lines.push('================================================================');

  // Professional Summary
  lines.push(isEs ? 'RESUMEN PROFESIONAL' : 'PROFESSIONAL SUMMARY');
  lines.push('----------------------------------------------------------------');
  lines.push(p.summary.replace(/\n+/g, ' '));
  lines.push('');

  // Technical Skills
  lines.push(isEs ? 'HABILIDADES TÉCNICAS' : 'TECHNICAL SKILLS');
  lines.push('----------------------------------------------------------------');
  for (const cat of data.skills) {
    lines.push(`${cat.category}: ${cat.skills.join(', ')}`);
  }
  lines.push('');

  // Work Experience
  lines.push(isEs ? 'EXPERIENCIA LABORAL' : 'WORK EXPERIENCE');
  lines.push('----------------------------------------------------------------');
  for (const exp of data.experience) {
    lines.push(`${exp.role.toUpperCase()} - ${exp.company}`);
    lines.push(`${exp.period}${exp.location ? ` | ${exp.location}` : ''}`);
    if (exp.technologies && exp.technologies.length > 0) {
      lines.push(`${isEs ? 'Tecnologías' : 'Technologies'}: ${exp.technologies.join(', ')}`);
    }
    for (const ach of exp.achievements) {
      lines.push(`* ${ach}`);
    }
    lines.push('');
  }

  // Featured Projects
  if (data.projects.length > 0) {
    lines.push(isEs ? 'PROYECTOS DESTACADOS' : 'FEATURED PROJECTS');
    lines.push('----------------------------------------------------------------');
    for (const prj of data.projects) {
      lines.push(`${prj.title} | ${prj.role}`);
      if (prj.technologies.length > 0) {
        lines.push(`${isEs ? 'Stack' : 'Stack'}: ${prj.technologies.join(', ')}`);
      }
      lines.push(prj.description);
      const links: string[] = [];
      if (prj.github) links.push(`GitHub: ${prj.github}`);
      if (prj.demo) links.push(`Demo: ${prj.demo}`);
      if (links.length > 0) lines.push(links.join(' | '));
      lines.push('');
    }
  }

  // Certifications
  if (data.certifications.length > 0) {
    lines.push(isEs ? 'CERTIFICACIONES' : 'CERTIFICATIONS');
    lines.push('----------------------------------------------------------------');
    for (const cert of data.certifications) {
      let line = `* ${cert.name} - ${cert.issuer} (${cert.date})`;
      if (cert.credentialId) line += ` [ID: ${cert.credentialId}]`;
      lines.push(line);
    }
    lines.push('');
  }

  // Education
  if (data.education.length > 0) {
    lines.push(isEs ? 'EDUCACIÓN' : 'EDUCATION');
    lines.push('----------------------------------------------------------------');
    for (const edu of data.education) {
      lines.push(`${edu.degree}`);
      lines.push(`${edu.institution} | ${edu.period}${edu.location ? ` | ${edu.location}` : ''}`);
      if (edu.honors) lines.push(`* ${edu.honors}`);
      lines.push('');
    }
  }

  // Courses
  if (data.courses.length > 0) {
    lines.push(isEs ? 'CURSOS Y FORMACIÓN CONTINUA' : 'COURSES & CONTINUOUS LEARNING');
    lines.push('----------------------------------------------------------------');
    for (const c of data.courses) {
      let line = `* ${c.title} - ${c.institution} (${c.year})`;
      if (c.hours) line += ` - ${c.hours}`;
      lines.push(line);
    }
    lines.push('');
  }

  // Soft Skills
  if (data.softSkills.length > 0) {
    lines.push(isEs ? 'HABILIDADES BLANDAS Y LIDERAZGO' : 'SOFT SKILLS & LEADERSHIP');
    lines.push('----------------------------------------------------------------');
    for (const s of data.softSkills) {
      lines.push(`* ${s.name}: ${s.description}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export function downloadFile(content: string, filename: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
