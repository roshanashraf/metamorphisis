// Register bespoke case studies here. Steps: src/projects/README.md
import AirportCaseStudy from '../components/projects/airport-pickups/AirportCaseStudy.astro';
import ClarityCaseStudy from '../components/projects/clarity/ClarityCaseStudy.astro';

export interface ProjectViewProps {
  year: number;
  role: string;
  next: { href: string; title: string } | null;
}

export const projectViews = {
  'airport-pickups': AirportCaseStudy,
  clarity: ClarityCaseStudy,
} as const;

export type ProjectViewSlug = keyof typeof projectViews;

export function getProjectView(slug: string) {
  if (slug in projectViews) {
    return projectViews[slug as ProjectViewSlug];
  }
  return null;
}
