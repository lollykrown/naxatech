import { notFound, redirect } from 'next/navigation'
import TestimonialsView from '@/components/TestimonialsView'
import { getTestimonials, pageCountFor } from '@/lib/testimonials'

// Pages are rendered on first request and cached; approving a review revalidates them.
export function generateStaticParams() {
  return []
}

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
  if (!Number.isInteger(page) || page < 1 || page > pageCountFor((await getTestimonials()).length)) notFound()
  if (page === 1) redirect('/testimonials')
  return <TestimonialsView page={page} />
}
