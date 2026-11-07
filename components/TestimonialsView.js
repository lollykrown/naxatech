import Shell from '@/components/Shell'
import PageHeader from '@/components/PageHeader'
import TestimonialCard from '@/components/TestimonialCard'
import Pagination from '@/components/Pagination'
import ReviewForm from '@/components/ReviewForm'
import CTA from '@/components/CTA'
import { testimonials, TESTIMONIALS_PER_PAGE, testimonialPageCount } from '@/lib/content'

export default function TestimonialsView({ page }) {
  const total = testimonials.length
  const totalPages = testimonialPageCount()
  const start = (page - 1) * TESTIMONIALS_PER_PAGE
  const items = testimonials.slice(start, start + TESTIMONIALS_PER_PAGE)

  return (
    <Shell>
      <PageHeader eyebrow="Testimonials" title="What People" highlight="Say About Us">
        We offer professional and premium services, but we are not limited!
      </PageHeader>

      <section className="pt-16 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[13px] text-slate-500 mb-8" aria-live="polite">
            Showing {start + 1}&ndash;{start + items.length} of {total} {total === 1 ? 'testimonial' : 'testimonials'}
          </p>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {items.map((t, i) => <TestimonialCard key={`${t.name}-${start + i}`} t={t} />)}
          </div>

          <Pagination page={page} totalPages={totalPages} basePath="/testimonials" label="Testimonials pagination" />
          <ReviewForm />
        </div>
      </section>
      <CTA />
    </Shell>
  )
}
