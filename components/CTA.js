'use client'
import { motion } from 'framer-motion'
import { ArrowRight, PhoneCall } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-ink-2" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-acid/30 to-transparent" />
      <div className="absolute inset-x-0 top-[-50%] h-[200%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200,255,62,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
            <span className="text-acid text-[11px] font-display font-bold tracking-[0.2em] uppercase">Ready to Start?</span>
            <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
          </div>

          <h2 className="font-display font-extrabold text-[44px] lg:text-[64px] leading-[1.0] tracking-tight mb-6">
            <span className="text-white">Let's Build Something</span><br />
            <span className="text-gradient">Remarkable Together</span>
          </h2>
          <p className="text-slate-body text-[16px] leading-relaxed max-w-[520px] mx-auto mb-12">
            Whether you need a single feature or a complete digital transformation —
            our team is ready to make it happen. Get a free consultation today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <motion.a href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded glow-acid"
              whileHover={{ scale: 1.05, backgroundColor: '#fdc700', color: '#080C18', boxShadow: '0 0 60px rgba(200,255,62,0.3)' }}
              whileTap={{ scale: 0.97 }}>
              Get Free Consultation
              <motion.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                <ArrowRight size={16} />
              </motion.span>
            </motion.a>
            <motion.a href="tel:+234800000000"
              className="inline-flex items-center gap-2.5 px-8 py-4 card-border text-white font-display font-semibold text-[14px] tracking-wide rounded"
              whileHover={{ scale: 1.03, borderColor: 'rgba(200,255,62,0.3)', backgroundColor: 'rgba(255,255,255,0.03)' }}
              whileTap={{ scale: 0.97 }}>
              <PhoneCall size={15} className="text-acid" />
              Call Us Now
            </motion.a>
          </div>

          <motion.div className="flex flex-wrap justify-center gap-8 text-slate-muted"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            {['✓  Free Initial Consultation', '✓  48-Hour Response Guarantee', '✓  No Lock-in Contracts'].map(b => (
              <span key={b} className="text-[13px] font-medium">{b}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
