import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const base = 'inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-lg border text-[14px] font-display font-semibold transition-colors'

// Shows first, last, the current page and its neighbours, with ellipses in between,
// so it stays compact with hundreds of pages.
function visiblePages(page, total) {
  const set = new Set([1, total, page - 1, page, page + 1])
  const nums = [...set].filter(n => n >= 1 && n <= total).sort((a, b) => a - b)
  const out = []
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push('gap-' + n)
    out.push(n)
  })
  return out
}

export default function Pagination({ page, totalPages, basePath = '/projects', label = 'Projects pagination' }) {
  if (totalPages <= 1) return null
  const hrefFor = n => (n === 1 ? basePath : `${basePath}/page/${n}`)
  const pages = visiblePages(page, totalPages)

  return (
    <nav aria-label={label} className="mt-14 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={`${base} gap-1 border-slate-200 text-slate-700 hover:bg-brand hover:text-white hover:border-brand`}>
          <ChevronLeft size={16} aria-hidden="true" /> Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} gap-1 border-slate-100 text-slate-300 cursor-not-allowed`}>
          <ChevronLeft size={16} aria-hidden="true" /> Previous
        </span>
      )}

      <ul className="flex items-center gap-2">
        {pages.map(n => typeof n === 'string' ? (
          <li key={n} aria-hidden="true" className="px-1 text-slate-400">…</li>
        ) : (
          <li key={n}>
            {n === page ? (
              <span aria-current="page" className={`${base} bg-acid border-acid text-ink`}>{n}</span>
            ) : (
              <Link href={hrefFor(n)} aria-label={`Page ${n}`} className={`${base} border-slate-200 text-slate-700 hover:bg-brand hover:text-white hover:border-brand`}>{n}</Link>
            )}
          </li>
        ))}
      </ul>

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" className={`${base} gap-1 border-slate-200 text-slate-700 hover:bg-brand hover:text-white hover:border-brand`}>
          Next <ChevronRight size={16} aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} gap-1 border-slate-100 text-slate-300 cursor-not-allowed`}>
          Next <ChevronRight size={16} aria-hidden="true" />
        </span>
      )}
    </nav>
  )
}
