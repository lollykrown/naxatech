'use client'
import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Link from 'next/link'
import ReviewForm from './ReviewForm'


const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:  (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96, transition: { duration: 0.3 } }),
}

const HOME_LIMIT = 4

export default function Testimonials({ items, standalone = false }) {
  const testimonials = items.slice(0, HOME_LIMIT)
  const [[active, dir], setSlide] = useState([0, 0])

  const go = (d) => setSlide([((active + d) + testimonials.length) % testimonials.length, d])

  const t = testimonials[active]

  return (
    <section id="testimonials" className={`${standalone ? 'pt-16 pb-28' : 'py-28'} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-white" />
      <m.div className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${t.color}08 0%, transparent 70%)` }}
        transition={{ duration: 0.8 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {!standalone && (
        <m.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <m.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
            <span className="text-amber-700 text-[11px] font-display font-bold tracking-[0.2em] uppercase">Testimonials</span>
            <m.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
          </div>
          <h2 className="font-display font-extrabold text-[44px] lg:text-[56px] leading-[1.05] tracking-tight">
            <span className="text-slate-900">What People</span><br />
            <span className="text-gradient-light">Say About Us</span>
          </h2>
        </m.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Sidebar tabs */}
          <m.div className="hidden lg:flex flex-col gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            {testimonials.map((item, i) => (
              <m.button key={i} onClick={() => setSlide([i, i > active ? 1 : -1])}
                className={`group text-left p-4 rounded-xl border hover:bg-brand transition-colors duration-300 ${active === i ? 'bg-slate-100' : 'bg-white'}`}
                style={{ borderColor: active === i ? `${item.color}35` : 'rgba(15,23,42,0.1)' }}
                whileHover={{ x: 4, borderColor: `${item.color}25` }}
                whileTap={{ scale: 0.98 }}>
                
                <p className="text-slate-900 group-hover:text-white transition-colors text-[13px] font-medium">{item.name}</p>
                {item.role && <p className="text-slate-500 group-hover:text-white/90 transition-colors text-[11px]">{item.role}</p>}
                {active === i && (
                  <m.div className="h-0.5 mt-3 rounded-full" style={{ background: item.color, originX: 0 }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }} />
                )}
              </m.button>
            ))}
          </m.div>

          {/* Main card */}
          <m.div className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="relative rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${t.color}30` }}>
              <AnimatePresence custom={dir} mode="wait">
                <m.div key={active}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  className="group bg-white hover:bg-brand transition-colors duration-300 p-8 lg:p-12">
                  <Quote size={80} className="absolute top-6 right-8 opacity-[0.04]" style={{ color: t.color }} />

                  <div className="flex gap-0.5 mb-8">
                    {Array(5).fill(null).map((_, i) => (
                      <m.span key={i} className="text-[18px] group-hover:!text-white" style={{ color: t.color }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}>★</m.span>
                    ))}
                  </div>

                  <blockquote className="text-slate-900 group-hover:text-white transition-colors text-[18px] lg:text-[22px] leading-relaxed font-light mb-10">
                    "{t.quote}"
                  </blockquote>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <m.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-[16px]"
                        style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}30` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}>
                        {t.initials}
                      </m.div>
                      <div>
                        <p className="text-slate-900 group-hover:text-white transition-colors font-display font-semibold text-[15px]">{t.name}</p>
                        {t.role && <p className="text-slate-500 group-hover:text-white/90 transition-colors text-[12px]">{t.role}</p>}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {[['prev', -1, ChevronLeft], ['next', 1, ChevronRight]].map(([id, d, Icon]) => (
                        <m.button key={id} onClick={() => go(d)} aria-label={id === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
                          className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 transition-colors group-hover:text-white group-hover:border-white/50 hover:!bg-white/25 hover:!text-white hover:!border-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}>
                          <Icon size={18} />
                        </m.button>
                      ))}
                    </div>
                  </div>

                  {/* Dots */}
                  <div className="flex gap-1.5 mt-6">
                    {testimonials.map((item, i) => (
                      <m.button key={i} onClick={() => setSlide([i, i > active ? 1 : -1])}
                        aria-label={`Show testimonial ${i + 1}: ${item.name}`}
                        aria-current={active === i}
                        animate={{ width: active === i ? 32 : 16, backgroundColor: active === i ? item.color : '#2E3650' }}
                        transition={{ duration: 0.3 }}
                        className="h-1 rounded-full" />
                    ))}
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </m.div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/testimonials" className="inline-flex items-center gap-2 text-[14px] font-display font-semibold text-slate-700 hover:text-amber-700 underline underline-offset-4 transition-colors">
            Read all testimonials
          </Link>
        </div>
        <ReviewForm />
      </div>
    </section>
  )
}
