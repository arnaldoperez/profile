export type Language = 'es' | 'en';

export interface FrontmatterData {
  title?: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  status?: string;
  summary?: string;
  [key: string]: unknown;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  type?: string;
  technologies: string[];
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface CourseItem {
  title: string;
  institution: string;
  year: string;
  hours?: string;
  topics?: string[];
}

export interface SoftSkillItem {
  name: string;
  description: string;
  impact?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  role: string;
  technologies: string[];
  metrics?: string;
  github?: string;
  demo?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location?: string;
  honors?: string;
}

export interface SectionFile {
  id: string;
  filename: string;
  title: string;
  language: Language;
  rawContent: string;
  frontmatter: Record<string, unknown>;
  content: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    summary: string;
    headline: string;
  };
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  courses: CourseItem[];
  softSkills: SoftSkillItem[];
  education: EducationItem[];
  sections: SectionFile[];
}
