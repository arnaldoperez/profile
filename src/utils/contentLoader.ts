import { load as yamlLoad } from 'js-yaml';
import {
  CertificationItem,
  CourseItem,
  EducationItem,
  ExperienceItem,
  Language,
  PortfolioData,
  ProjectItem,
  SectionFile,
  SkillCategory,
  SoftSkillItem,
} from '../types.ts';

// Load all markdown files eagerly using Vite's glob import
const markdownModules = import.meta.glob('/src/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface ParsedMarkdown {
  frontmatter: Record<string, unknown>;
  body: string;
}

export function parseFrontmatter(raw: string): ParsedMarkdown {
  const normalized = raw.trimStart();
  if (!normalized.startsWith('---')) {
    return { frontmatter: {}, body: raw };
  }

  const endIndex = normalized.indexOf('\n---', 3);
  if (endIndex === -1) {
    return { frontmatter: {}, body: raw };
  }

  const yamlBlock = normalized.substring(3, endIndex).trim();
  const body = normalized.substring(endIndex + 4).trim();

  try {
    const frontmatter = (yamlLoad(yamlBlock) as Record<string, unknown>) || {};
    return { frontmatter, body };
  } catch (err) {
    console.warn('Failed to parse YAML frontmatter:', err);
    return { frontmatter: {}, body };
  }
}

export function getSectionFiles(lang: Language): SectionFile[] {
  const prefix = `/src/content/${lang}/`;
  const files: SectionFile[] = [];

  for (const [path, content] of Object.entries(markdownModules)) {
    if (path.startsWith(prefix)) {
      const filename = path.replace(prefix, '');
      const { frontmatter, body } = parseFrontmatter(content);
      const title =
        (frontmatter.title as string) ||
        (frontmatter.name as string) ||
        filename.replace(/\.md$/, '');
      const id = filename.replace(/\.md$/, '');

      files.push({
        id,
        filename,
        title,
        language: lang,
        rawContent: content,
        frontmatter,
        content: body,
      });
    }
  }

  return files;
}

export function parseExperience(body: string): ExperienceItem[] {
  const items: ExperienceItem[] = [];
  const blocks = body.split(/\n(?=###\s+)/);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
    const roleMatch = lines[0]?.match(/^###\s+(.*)/);
    if (!roleMatch) continue;

    const role = roleMatch[1].trim();
    let company = '';
    let location = '';
    let period = '';
    const technologies: string[] = [];
    const achievements: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('**') && line.includes('**')) {
        const parts = line.split('|').map((p) => p.replace(/\*\*/g, '').trim());
        company = parts[0] || '';
        location = parts[1] || '';
      } else if (line.startsWith('*') && line.endsWith('*')) {
        period = line.replace(/\*/g, '').trim();
      } else if (line.startsWith('- Tecnologías:') || line.startsWith('- Technologies:')) {
        const techs = line.replace(/^- (Tecnologías|Technologies):/, '').trim();
        technologies.push(...techs.split(',').map((t) => t.trim()));
      } else if (line.startsWith('- ')) {
        achievements.push(line.substring(2).trim());
      }
    }

    items.push({
      role,
      company,
      period,
      location,
      technologies,
      achievements,
    });
  }

  return items;
}

export function parseSkills(body: string): SkillCategory[] {
  const categories: SkillCategory[] = [];
  const sections = body.split(/\n(?=###\s+)/);

  for (const section of sections) {
    const lines = section.trim().split('\n').map((l) => l.trim()).filter(Boolean);
    const titleMatch = lines[0]?.match(/^###\s+(.*)/);
    if (!titleMatch) continue;

    const category = titleMatch[1].trim();
    const skills: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('- ')) {
        skills.push(line.substring(2).trim());
      }
    }

    if (skills.length > 0) {
      categories.push({ category, skills });
    }
  }

  return categories;
}

export function parseCertifications(body: string): CertificationItem[] {
  const items: CertificationItem[] = [];
  const lines = body.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('- '));

  for (const line of lines) {
    const content = line.substring(2).trim();
    // Pattern: **Name** | Issuer (Date) · Credential: ID
    const match = content.match(/\*\*(.*?)\*\*\s*\|\s*([^·(]+)\s*\((.*?)\)(?:\s*·\s*(?:Credencial|Credential ID):\s*(.*))?/i);
    if (match) {
      items.push({
        name: match[1].trim(),
        issuer: match[2].trim(),
        date: match[3].trim(),
        credentialId: match[4]?.trim(),
      });
    } else {
      items.push({
        name: content.replace(/\*\*/g, ''),
        issuer: '',
        date: '',
      });
    }
  }

  return items;
}

export function parseCourses(body: string): CourseItem[] {
  const items: CourseItem[] = [];
  const lines = body.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('- '));

  for (const line of lines) {
    const content = line.substring(2).trim();
    // Pattern: **Title** | Institution (Year) · Details
    const match = content.match(/\*\*(.*?)\*\*\s*\|\s*([^(]+)\s*\((.*?)\)(?:\s*·\s*(.*))?/);
    if (match) {
      items.push({
        title: match[1].trim(),
        institution: match[2].trim(),
        year: match[3].trim(),
        hours: match[4]?.trim(),
      });
    } else {
      items.push({
        title: content.replace(/\*\*/g, ''),
        institution: '',
        year: '',
      });
    }
  }

  return items;
}

export function parseSoftSkills(body: string): SoftSkillItem[] {
  const items: SoftSkillItem[] = [];
  const lines = body.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('- '));

  for (const line of lines) {
    const content = line.substring(2).trim();
    const parts = content.split(':');
    if (parts.length >= 2) {
      const name = parts[0].replace(/\*\*/g, '').trim();
      const description = parts.slice(1).join(':').trim();
      items.push({ name, description });
    } else {
      items.push({ name: content.replace(/\*\*/g, ''), description: '' });
    }
  }

  return items;
}

export function parseProjects(body: string): ProjectItem[] {
  const items: ProjectItem[] = [];
  const blocks = body.split(/\n(?=###\s+)/);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
    const titleMatch = lines[0]?.match(/^###\s+(.*)/);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    let role = '';
    let description = '';
    const technologies: string[] = [];
    let github: string | undefined;
    let demo: string | undefined;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('- **Rol**') || line.startsWith('- **Role**')) {
        role = line.split(':')[1]?.replace(/\*\*/g, '').trim() || '';
      } else if (line.startsWith('- **Stack**')) {
        const stackStr = line.split(':')[1]?.trim() || '';
        technologies.push(...stackStr.split(',').map((s) => s.trim()));
      } else if (line.startsWith('- Enlaces:') || line.startsWith('- Links:')) {
        const linkMatches = [...line.matchAll(/\[(.*?)\]\((.*?)\)/g)];
        for (const m of linkMatches) {
          const label = m[1].toLowerCase();
          if (label.includes('github')) github = m[2];
          if (label.includes('demo') || label.includes('en vivo') || label.includes('live')) demo = m[2];
        }
      } else if (!line.startsWith('---') && !line.startsWith('-')) {
        description += (description ? ' ' : '') + line;
      }
    }

    items.push({
      title,
      role,
      description,
      technologies,
      github,
      demo,
    });
  }

  return items;
}

export function parseEducation(body: string): EducationItem[] {
  const items: EducationItem[] = [];
  const blocks = body.split(/\n(?=###\s+)/);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
    const degreeMatch = lines[0]?.match(/^###\s+(.*)/);
    if (!degreeMatch) continue;

    const degree = degreeMatch[1].trim();
    let institution = '';
    let period = '';
    let location = '';
    let honors = '';

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('**') && line.includes('**')) {
        const parts = line.split('|').map((p) => p.replace(/\*\*/g, '').trim());
        institution = parts[0] || '';
        location = parts[1] || '';
      } else if (line.startsWith('*') && line.endsWith('*')) {
        period = line.replace(/\*/g, '').trim();
      } else if (line.startsWith('- ')) {
        honors += (honors ? ' ' : '') + line.substring(2).trim();
      }
    }

    items.push({
      degree,
      institution,
      period,
      location,
      honors,
    });
  }

  return items;
}

export function loadPortfolioData(lang: Language): PortfolioData {
  const sections = getSectionFiles(lang);

  const profileFile = sections.find((s) => s.id === 'perfil' || s.id === 'profile');
  const expFile = sections.find((s) => s.id === 'experiencia' || s.id === 'experience');
  const skillsFile = sections.find((s) => s.id === 'habilidades' || s.id === 'skills');
  const certsFile = sections.find((s) => s.id === 'certificados' || s.id === 'certifications');
  const coursesFile = sections.find((s) => s.id === 'cursos' || s.id === 'courses');
  const softFile = sections.find((s) => s.id === 'soft-skills');
  const projectsFile = sections.find((s) => s.id === 'proyectos' || s.id === 'projects');
  const eduFile = sections.find((s) => s.id === 'educacion' || s.id === 'education');

  const pf = profileFile?.frontmatter || {};

  return {
    profile: {
      name: (pf.name as string) || 'Arnaldo Pérez',
      role: (pf.role as string) || (lang === 'es' ? 'Ingeniero de Sistemas · Desarrollador de Software' : 'Systems Engineer · Software Developer'),
      email: (pf.email as string) || 'arnaldo.perez.dev@gmail.com',
      phone: (pf.phone as string) || '+58 412 773 8138',
      location: (pf.location as string) || (lang === 'es' ? 'Venezuela / Remoto' : 'Venezuela / Remote'),
      linkedin: (pf.linkedin as string) || 'https://linkedin.com/in/arnaldoperez',
      github: (pf.github as string) || 'https://github.com/arnaldoperez',
      website: (pf.website as string) || 'https://github.com/arnaldoperez',
      headline: (pf.headline as string) || '',
      summary: profileFile?.content?.replace(/^#\s+.*\n+/, '') || '',
    },
    experience: expFile ? parseExperience(expFile.content) : [],
    skills: skillsFile ? parseSkills(skillsFile.content) : [],
    certifications: certsFile ? parseCertifications(certsFile.content) : [],
    courses: coursesFile ? parseCourses(coursesFile.content) : [],
    softSkills: softFile ? parseSoftSkills(softFile.content) : [],
    projects: projectsFile ? parseProjects(projectsFile.content) : [],
    education: eduFile ? parseEducation(eduFile.content) : [],
    sections,
  };
}
