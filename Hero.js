'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, Zap } from 'lucide-react'

const words = ['Transform', 'Accelerate', 'Innovate', 'Elevate']

const services = [
  'Web Development','Cloud Services','Cybersecurity','Software Engineering',
  'IT Consulting','Data Analytics','Network Infrastructure','Digital Transformation','Managed IT Services'
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}
const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY   = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const fade  = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[70px]">
      {/* Parallax BG layers */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-ink-3" />
      <motion.div style={{ y: bgY }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-acid/[0.07] blur-[120px] pointer-events-none" />
      <motion.div style={{ y: bgY }}
        className="absolute bottom-[-10%] left-[15%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[120px] pointer-events-none" />

      <motion.div style={{ y: textY, opacity: fade }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: copy ── */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Badge */}
            <motion.div variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-acid/[0.08] border border-acid/20 rounded-full">
              <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Zap size={12} className="text-acid fill-acid" />
              </motion.div>
              <span className="text-acid text-[11px] font-display font-semibold tracking-widest uppercase">
                Nigeria's Leading IT Partner
              </span>
            </motion.div>

            {/* Animated headline */}
            <motion.h1 variants={itemVariants}
              className="font-display font-extrabold text-[52px] lg:text-[72px] leading-[1.0] tracking-tight mb-6">
              <span className="block h-[1.0em] overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.span key={wordIdx}
                    className="block text-acid"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%',   opacity: 1 }}
                    exit={{   y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                    {words[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="block text-white">Your Business</span>
              <span className="block text-white">
                With <span className="text-gradient">Technology</span>
              </span>
            </motion.h1>

            <motion.p variants={itemVariants}
              className="text-slate-body text-[16px] leading-relaxed max-w-[480px] mb-10">
              We deliver end-to-end IT solutions — from custom software and cloud
              infrastructure to cybersecurity and managed services — helping Nigerian
              businesses compete globally.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.a href="#services"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded glow-acid"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}>
                Explore Services
                <motion.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <ArrowRight size={16} />
                </motion.span>
              </motion.a>
              <motion.a href="#about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 card-border text-white font-display font-semibold text-[14px] tracking-wide rounded"
                whileHover={{ scale: 1.03, borderColor: 'rgba(200,255,62,0.3)', backgroundColor: 'rgba(255,255,255,0.03)' }}
                whileTap={{ scale: 0.97 }}>
                <Play size={14} className="text-acid fill-acid" />
                See Our Work
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants}
              className="flex gap-8 mt-14 pt-10 border-t border-white/[0.07]">
              {[['150+','Projects Delivered'],['8+','Years Experience'],['98%','Client Satisfaction']].map(([n, l], i) => (
                <motion.div key={l}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}>
                  <p className="font-display font-black text-[32px] text-acid leading-none">{n}</p>
                  <p className="text-slate-muted text-[12px] mt-1 tracking-wide">{l}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: image ── */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>

            {/* Main image frame */}
            <div className="relative rounded-2xl overflow-hidden card-border group">
              {/* Subtle acid colour-grade overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-transparent to-acid/[0.08] z-10 pointer-events-none" />
              {/* Bottom fade for label legibility */}
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-ink/90 to-transparent z-10 pointer-events-none" />

              {/* Parallax image */}
              <div className="overflow-hidden rounded-2xl">
                <motion.img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=85"
                  alt="Naxatech team collaborating on IT solutions"
                  className="w-full aspect-[4/3] object-cover"
                  style={{ scale: imgScale }}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex items-end justify-between">
                <div>
                  <p className="text-white font-display font-bold text-[17px] leading-tight">
                    End-to-End IT Solutions
                  </p>
                  <p className="text-slate-body text-[12px] mt-1">
                    Trusted by 80+ Nigerian businesses
                  </p>
                </div>
                <motion.div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/70 border border-acid/30 backdrop-blur-sm"
                  animate={{ opacity: [1, 0.55, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                  <span className="text-acid text-[11px] font-display font-semibold tracking-wider">Available</span>
                </motion.div>
              </div>
            </div>

            {/* Floating chip — efficiency */}
            <motion.div
              className="absolute -top-4 -right-4 card-border-acid bg-ink-2 rounded-xl px-4 py-3 shadow-xl z-20 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.7, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
              transition={{
                opacity: { delay: 1.1, duration: 0.4 },
                scale:   { delay: 1.1, duration: 0.5, type: 'spring', stiffness: 220, damping: 16 },
                y:       { delay: 1.6, duration: 5,   repeat: Infinity, ease: 'easeInOut' },
              }}>
              <p className="font-display font-black text-[24px] text-acid leading-none">↑ 24%</p>
              <p className="text-slate-muted text-[11px] mt-0.5">Avg. Efficiency Gain</p>
            </motion.div>

            {/* Floating chip — uptime */}
            <motion.div
              className="absolute -bottom-4 -left-4 card-border bg-ink-2 rounded-xl px-4 py-3 shadow-xl z-20 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.7, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: [0, 7, 0] }}
              transition={{
                opacity: { delay: 1.3, duration: 0.4 },
                scale:   { delay: 1.3, duration: 0.5, type: 'spring', stiffness: 220, damping: 16 },
                y:       { delay: 1.8, duration: 5,   repeat: Infinity, ease: 'easeInOut' },
              }}>
              <div className="flex items-center gap-2 mb-1">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[11px] text-slate-body font-medium">Systems Online</span>
              </div>
              <p className="font-display font-bold text-[18px] text-white">99.9% Uptime</p>
            </motion.div>

            {/* Ambient glow behind card */}
            <div className="absolute inset-0 bg-acid/[0.06] rounded-2xl blur-2xl -z-10 scale-110 pointer-events-none" />
          </motion.div>

        </div>
      </motion.div>

      {/* Marquee strip */}
      <div className="relative z-10 mt-16 lg:mt-24 border-t border-b border-white/[0.06] py-3 overflow-hidden bg-ink-2/50">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          {[0, 1].map(copy => (
            <div key={copy} className="flex shrink-0">
              {services.map(s => (
                <span key={s + copy}
                  className="inline-flex items-center gap-5 mx-6 text-[12px] font-display font-semibold tracking-[0.18em] uppercase text-slate-muted">
                  <span className="text-acid text-[8px]">◆</span>{s}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
