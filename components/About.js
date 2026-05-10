'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Users, Award, TrendingUp } from 'lucide-react'

function AnimatedCounter({ to, suffix = '', color }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = null
    const dur = 1800
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      setVal(Math.floor(p * to))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to])

  return (
    <motion.p ref={ref}
      className="font-display font-black text-[42px] leading-none mb-1"
      style={{ color }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {val}{suffix}
    </motion.p>
  )
}

const stats = [
  { icon: TrendingUp,   to: 150, suffix: '+', label: 'Projects Delivered', color: '#C8FF3E'  },
  { icon: Users,        to: 80,  suffix: '+', label: 'Happy Clients',       color: '#7AE0FF' },
  { icon: Award,        to: 8,   suffix: '+', label: 'Years in Business',   color: '#FF8A3E' },
  { icon: CheckCircle2, to: 98,  suffix: '%', label: 'Client Satisfaction', color: '#C8FF3E' },
]

const perks = [
  // 'Nigeria-based team with global standards',
  'ISO-aligned delivery processes',
  'Dedicated project manager on every engagement',
  'Post-launch support & maintenance included',
  'Transparent pricing — no hidden fees',
  'Fast turnaround with agile methodology',
]

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute top-0 right-0 w-100 h-full pointer-events-none"
        style={{ background: 'linear-gradient(to bottom left, rgba(200,255,62,0.04) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-4">
              <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
              <span className="text-acid text-[11px] font-display font-bold tracking-[0.2em] uppercase">About Naxatech</span>
            </div>
            <h2 className="font-display font-extrabold text-[40px] lg:text-[52px] leading-[1.05] tracking-tight mb-6">
              <span className="text-white">Powering Nigeria's</span><br />
              <span className="text-gradient">Digital Future</span>
            </h2>
            <p className="text-slate-body text-[15px] leading-loose mb-5">
              Naxatech is a Nigerian technology company on a mission to make world-class IT services
              accessible to every business — from startups to enterprises across the world.
            </p>
            <p className="text-slate-body text-[15px] leading-loose mb-8">
              We combine deep technical expertise with an intimate understanding of business needs and the local
              landscape to deliver solutions that actually work — on time, on budget, and built to last.
            </p>

            <motion.ul className="space-y-3 mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
              {perks.map(p => (
                <motion.li key={p}
                  className="flex items-center gap-3 text-[14px] text-slate-body"
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } }}>
                  <motion.div whileHover={{ scale: 1.2, color: '#fdc700' }}>
                    <CheckCircle2 size={15} className="text-acid shrink-0" />
                  </motion.div>
                  {p}
                </motion.li>
              ))}
            </motion.ul>

            <motion.a href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded"
              whileHover={{ scale: 1.04, backgroundColor: '#fdc700', color: '#080C18' }}
              whileTap={{ scale: 0.96 }}>
              Start a Project
            </motion.a>
          </motion.div>

          {/* Right — stats + testimonial */}
          <motion.div className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, to, suffix, label, color }) => (
                <motion.div key={label}
                  className="card-border bg-ink-3 rounded-xl p-6 text-center"
                  whileHover={{ scale: 1.03, borderColor: `${color}40` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <AnimatedCounter to={to} suffix={suffix} color={color} />
                  <p className="text-slate-muted text-[12px] tracking-wide">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Testimonial snippet */}
            <motion.div className="card-border-acid bg-ink-3 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.01 }}>
              <p className="text-slate-body text-[14px] leading-relaxed italic mb-4">
                "Naxatech completely transformed our online presence. Our platform now handles
                10x the traffic with zero downtime. They're genuine technology partners."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-acid/20 flex items-center justify-center font-display font-bold text-acid text-[14px]">A</div>
                <div>
                  <p className="text-white text-[13px] font-semibold">Adaeze Okonkwo</p>
                  <p className="text-slate-muted text-[11px]">CEO, Trendify NG</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array(5).fill(null).map((_, i) => (
                    <motion.span key={i} className="text-acid text-[13px]"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.07 }}>★</motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
