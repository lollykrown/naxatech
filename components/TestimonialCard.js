import { Quote, Star } from 'lucide-react'

export default function TestimonialCard({ t }) {
  return (
    <figure className="group break-inside-avoid mb-6 border border-slate-200 bg-white hover:bg-brand transition-colors duration-300 rounded-2xl p-7">
      <div className="flex items-start justify-between gap-4 mb-5">
        {t.rating ? (
          <div className="flex gap-0.5" role="img" aria-label={`Rated ${t.rating} out of 5`}>
            {[1, 2, 3, 4, 5].map(n => (
              <Star key={n} size={16} aria-hidden="true"
                className={n <= t.rating ? 'text-amber-500 fill-amber-500 group-hover:text-white group-hover:fill-white' : 'text-slate-300 group-hover:text-white/40'} />
            ))}
          </div>
        ) : <span />}
        <Quote size={28} className="opacity-20 text-slate-900 group-hover:text-white group-hover:opacity-40 shrink-0" aria-hidden="true" />
      </div>

      <blockquote className="text-slate-700 group-hover:text-white transition-colors text-[15px] leading-relaxed mb-6">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-black text-[14px] shrink-0"
          style={{ background: `${t.color}20`, color: '#0f172a', border: `1px solid ${t.color}60` }} aria-hidden="true">
          {t.initials}
        </div>
        <div>
          <p className="font-display font-semibold text-[14px] text-slate-900 group-hover:text-white transition-colors">{t.name}</p>
          {t.role && <p className="text-[12px] text-slate-500 group-hover:text-white/90 transition-colors">{t.role}</p>}
        </div>
      </figcaption>
    </figure>
  )
}
