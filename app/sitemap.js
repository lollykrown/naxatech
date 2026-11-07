import { projectPageCount } from '@/lib/projects'
import { testimonialPageCount } from '@/lib/content'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://naxatech.org'

export default function sitemap() {
  const pages = ['services', 'projects', 'about', 'testimonials', 'contact']
  const projectPages = Array.from({ length: projectPageCount() - 1 }, (_, i) => `projects/page/${i + 2}`)
  const testimonialPages = Array.from({ length: testimonialPageCount() - 1 }, (_, i) => `testimonials/page/${i + 2}`)
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...[...pages, ...projectPages, ...testimonialPages].map(p => ({ url: `${SITE_URL}/${p}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 })),
  ]
}
