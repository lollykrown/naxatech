import TestimonialsView from '@/components/TestimonialsView'

export const metadata = {
  title: 'Testimonials | Naxatech',
  description: 'What people say about working with Naxatech.',
  alternates: { canonical: '/testimonials' },
}

export default function TestimonialsPage() {
  return <TestimonialsView page={1} />
}
