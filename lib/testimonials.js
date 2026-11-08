// Merges approved database reviews with the hand-picked ones in lib/content.js.
import { testimonials as curated, TESTIMONIALS_PER_PAGE } from '@/lib/content'
import { listReviews } from '@/lib/db'

const COLORS = ['#fdc700', '#7AE0FF', '#FF8A3E', '#A0E7E5', '#0e7cb5', '#E08AFF']

const initialsOf = name =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || '?'

const fromRow = r => ({
  quote: r.review,
  name: r.name,
  initials: initialsOf(r.name),
  color: COLORS[r.id % COLORS.length],
  role: r.role || undefined,
  rating: r.rating,
})

// Never throws: if the database is unreachable the site falls back to curated testimonials.
export async function getTestimonials() {
  try {
    const rows = await listReviews('approved')
    return [...rows.map(fromRow), ...curated]
  } catch (e) {
    console.error('Testimonials: database unavailable, using curated list only:', e.message)
    return curated
  }
}

export const pageCountFor = total => Math.max(1, Math.ceil(total / TESTIMONIALS_PER_PAGE))
