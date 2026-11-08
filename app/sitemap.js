import { projectPageCount } from '@/lib/projects'
import { getTestimonials, pageCountFor } from '@/lib/testimonials'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://naxatech.org'

export default async function sitemap() {
  const pages = ['services', 'projects', 'about', 'testimonials', 'contact']
  const projectPages = Array.from({ length: projectPageCount() - 1 }, (_, i) => `projects/page/${i + 2}`)
  const testimonialCount = pageCountFor((await getTestimonials()).length)
  const testimonialPages = Array.from({ length: testimonialCount - 1 }, (_, i) => `testimonials/page/${i + 2}`)
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...[...pages, ...projectPages, ...testimonialPages].map(p => ({ url: `${SITE_URL}/${p}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 })),
  ]
}
