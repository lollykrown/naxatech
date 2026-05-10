'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  { quote: "Naxatech built our entire logistics management platform from scratch in just 6 weeks. The quality, speed, and communication were outstanding. We've grown 3x since launch.", name: 'Emeka Nwosu',      role: 'CTO, SwiftHaul Logistics',   initials: 'EN', service: 'Custom Software', color: '#C8FF3E' },
  { quote: "After struggling with security incidents for months, Naxatech overhauled our infrastructure completely. We've had zero breaches in 18 months since.", name: 'Fatima Al-Hassan', role: 'IT Director, First Unity Bank', initials: 'FA', service: 'Cybersecurity',   color: '#7AE0FF' },
  { quote: "Our cloud migration was seamless. Naxatech handled planning, execution, staff training — and our infrastructure costs dropped by 40% in the first quarter.", name: 'Tunde Afolabi',  role: 'COO, NovaMed Healthcare',     initials: 'TA', service: 'Cloud Solutions', color: '#FF8A3E' },
  { quote: "The team delivered a stunning e-commerce site converting at nearly double our old one. They also trained our staff on managing it. Truly full-service.", name: 'Chioma Eze',      role: 'Founder, StyleHaus Nigeria',   initials: 'CE', service: 'Web Development', color: '#C8FF3E' },
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:  (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96, transition: { duration: 0.3 } }),
}

export default function Testimonials() {
  const [[active, dir], setSlide] = useState([0, 0])

  const go = (d) => setSlide([((active + d) + testimonials.length) % testimonials.length, d])

  const t = testimonials[active]

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-ink" />
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${t.color}08 0%, transparent 70%)` }}
        transition={{ duration: 0.8 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
            <span className="text-acid text-[11px] font-display font-bold tracking-[0.2em] uppercase">Client Stories</span>
            <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
          </div>
          <h2 className="font-display font-extrabold text-[44px] lg:text-[56px] leading-[1.05] tracking-tight">
            <span className="text-white">What Our Clients</span><br />
            <span className="text-gradient">Say About Us</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Sidebar tabs */}
          <motion.div className="hidden lg:flex flex-col gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            {testimonials.map((item, i) => (
              <motion.button key={i} onClick={() => setSlide([i, i > active ? 1 : -1])}
                className="text-left p-4 rounded-xl border transition-colors"
                style={{ borderColor: active === i ? `${item.color}35` : 'rgba(255,255,255,0.06)', backgroundColor: active === i ? '#141B2E' : '#0E1322' }}
                whileHover={{ x: 4, borderColor: `${item.color}25` }}
                whileTap={{ scale: 0.98 }}>
                <motion.p className="text-[12px] font-display font-semibold tracking-wide mb-1"
                  animate={{ color: active === i ? item.color : '#5C657E' }}>
                  {item.service}
                </motion.p>
                <p className="text-white text-[13px] font-medium">{item.name}</p>
                <p className="text-slate-dim text-[11px]">{item.role}</p>
                {active === i && (
                  <motion.div className="h-0.5 mt-3 rounded-full" style={{ background: item.color }}
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }} />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Main card */}
          <motion.div className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="relative rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${t.color}30` }}>
              <AnimatePresence custom={dir} mode="wait">
                <motion.div key={active}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  className="bg-ink-3 p-8 lg:p-12">
                  <Quote size={80} className="absolute top-6 right-8 opacity-[0.04]" style={{ color: t.color }} />

                  <div className="flex gap-0.5 mb-8">
                    {Array(5).fill(null).map((_, i) => (
                      <motion.span key={i} className="text-[18px]" style={{ color: t.color }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}>★</motion.span>
                    ))}
                  </div>

                  <blockquote className="text-white text-[18px] lg:text-[22px] leading-relaxed font-light mb-10">
                    "{t.quote}"
                  </blockquote>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-[16px]"
                        style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}30` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}>
                        {t.initials}
                      </motion.div>
                      <div>
                        <p className="text-white font-display font-semibold text-[15px]">{t.name}</p>
                        <p className="text-slate-muted text-[12px]">{t.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {[['prev', -1, ChevronLeft], ['next', 1, ChevronRight]].map(([id, d, Icon]) => (
                        <motion.button key={id} onClick={() => go(d)}
                          className="w-10 h-10 rounded-lg card-border flex items-center justify-center text-slate-muted"
                          whileHover={{ borderColor: `${t.color}50`, color: t.color, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}>
                          <Icon size={18} />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Dots */}
                  <div className="flex gap-1.5 mt-6">
                    {testimonials.map((item, i) => (
                      <motion.button key={i} onClick={() => setSlide([i, i > active ? 1 : -1])}
                        animate={{ width: active === i ? 32 : 16, backgroundColor: active === i ? item.color : '#2E3650' }}
                        transition={{ duration: 0.3 }}
                        className="h-1 rounded-full" />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
