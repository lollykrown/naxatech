'use client'
import { m } from 'framer-motion'
import { ArrowRight, PhoneCall } from 'lucide-react'
import SITE from '@/lib/site'

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50" />
      <div className="absolute inset-0 grid-bg-light opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-acid/30 to-transparent" />
      <div className="absolute inset-x-0 top-[-50%] h-[200%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(253,199,0,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <m.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
            <span className="text-amber-700 text-[11px] font-display font-bold tracking-[0.2em] uppercase">Get Started</span>
            <m.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
          </div>

          <h2 className="font-display font-extrabold text-[44px] lg:text-[64px] leading-[1.0] tracking-tight mb-6">
            <span className="text-slate-900">Take a Professional</span><br />
            <span className="text-gradient-light">Approach Today!</span>
          </h2>
          <p className="text-slate-600 text-[16px] leading-relaxed max-w-[520px] mx-auto mb-12">
            With various professional IT services, NAXATECH is your one-stop go-to to learn and build your career.
            We aim to provide worldwide IT support.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <m.a href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded glow-acid"
              whileHover={{ scale: 1.05, backgroundColor: '#fdc700', color: '#080C18', boxShadow: '0 0 60px rgba(253,199,0,0.3)' }}
              whileTap={{ scale: 0.97 }}>
              Contact Us
              <m.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                <ArrowRight size={16} />
              </m.span>
            </m.a>
            <m.a href={`tel:${SITE.phoneNigeria.split(",")[0].replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-slate-200 text-slate-900 font-display font-semibold text-[14px] tracking-wide rounded"
              whileHover={{ scale: 1.03, borderColor: 'rgba(253,199,0,0.3)', backgroundColor: 'rgba(15,23,42,0.04)' }}
              whileTap={{ scale: 0.97 }}>
              <PhoneCall size={15} className="text-amber-700" />
              Call Us Now
            </m.a>
          </div>

        </m.div>
      </div>
    </section>
  )
}
