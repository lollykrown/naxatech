import { notFound, redirect } from 'next/navigation'
import TestimonialsView from '@/components/TestimonialsView'
import { testimonialPageCount } from '@/lib/content'

export function generateStaticParams() {
  return Array.from({ length: testimonialPageCount() }, (_, i) => ({ page: String(i + 1) }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { page } = await params
  return {
    title: `Testimonials, Page ${page} | Naxatech`,
    description: 'What people say about working with Naxatech.',
    alternates: { canonical: `/testimonials/page/${page}` },
  }
}

export default async function TestimonialsPaged({ params }) {
  const { page: raw } = await params
  const page = Number(raw)
  if (!Number.isInteger(page) || page < 1 || page > testimonialPageCount()) notFound()
  if (page === 1) redirect('/testimonials')
  return <TestimonialsView page={page} />
}
