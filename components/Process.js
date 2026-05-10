'use client'
import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Discovery & Strategy',  desc: 'Deep dive into your business goals, challenges, and existing infrastructure. Every solution starts with your "why".', duration: '1–2 days' },
  { num: '02', title: 'Proposal & Planning',    desc: 'A detailed roadmap with clear milestones, resource allocation, and transparent pricing. No surprises.',             duration: '2–3 days' },
  { num: '03', title: 'Design & Architecture',  desc: 'UI/UX wireframes and system architecture reviewed and approved before a single line of code is written.',            duration: '1–2 weeks' },
  { num: '04', title: 'Agile Development',      desc: 'Two-week sprints with regular demos. You see real progress and stay in control throughout the build.',               duration: 'Ongoing' },
  { num: '05', title: 'Testing & QA',           desc: 'Rigorous quality assurance — functional, performance, and security testing before anything goes live.',              duration: '1 week' },
  { num: '06', title: 'Launch & Support',       desc: 'Smooth deployment followed by dedicated post-launch monitoring, training, and ongoing support.',                     duration: 'Ongoing' },
]

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
const cardV = {
  hidden:  { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

export default function Process() {
  return (
    <section id="process" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-ink-2" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-acid/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
            <span className="text-acid text-[11px] font-display font-bold tracking-[0.2em] uppercase">How We Work</span>
            <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
          </div>
          <h2 className="font-display font-extrabold text-[44px] lg:text-[56px] leading-[1.05] tracking-tight">
            <span className="text-white">A Process Built for</span><br />
            <span className="text-gradient">Certainty & Speed</span>
          </h2>
          <p className="text-slate-body mt-4 text-[15px] max-w-120 mx-auto leading-relaxed">
            From your first call to go-live — here's exactly what working with Naxatech looks like.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05] rounded-xl overflow-hidden"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}>
          {steps.map((step) => (
            <motion.div key={step.num} variants={cardV}
              className="group relative bg-ink-2 p-8 overflow-hidden"
              whileHover={{ backgroundColor: '#141B2E' }}>

              {/* Number */}
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-ink-4"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                whileHover={{ borderColor: 'rgba(200,255,62,0.35)', backgroundColor: 'rgba(200,255,62,0.08)', scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <motion.span className="font-display font-black text-[14px] text-slate-muted"
                  whileHover={{ color: '#C8FF3E' }}>
                  {step.num}
                </motion.span>
              </motion.div>

              <h3 className="font-display font-bold text-[18px] text-white mb-3 leading-tight">{step.title}</h3>
              <p className="text-slate-muted text-[13px] leading-relaxed mb-5">{step.desc}</p>

              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-acid/[0.08] border border-acid/15"
                whileHover={{ borderColor: 'rgba(200,255,62,0.3)', backgroundColor: 'rgba(200,255,62,0.12)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-acid" />
                <span className="text-acid text-[11px] font-display font-semibold tracking-wide">{step.duration}</span>
              </motion.div>

              {/* Corner glow on hover */}
              <motion.div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-acid/0 blur-2xl pointer-events-none"
                whileHover={{ backgroundColor: 'rgba(200,255,62,0.12)' }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
