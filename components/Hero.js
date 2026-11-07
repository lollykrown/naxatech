'use client'
import { useEffect, useState, useRef } from 'react'
import { m, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Play, Zap } from 'lucide-react'
import Image from 'next/image'

const MotionImage = m.create(Image)

const services = [
  'Software Development','Cyber Security','ICT Support','Penetration Testing & Audits',
  'IT Consulting','Product Services','ERP Consulting','E-Invoicing Integration',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}
const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const bars = [
  { name: 'E-Commerce Platform', val: 87, color: '#fdc700' },
  { name: 'Cloud Migration',     val: 64, color: '#7AE0FF' },
  { name: 'ERP Integration',     val: 42, color: '#FF8A3E' },
  { name: 'Cybersecurity Audit', val: 95, color: '#fdc700' },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%',   '25%'])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%',   '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section id='home' ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden md:pt-[70px]">
      {/* Parallax background layers */}
      <m.div style={{ y: bgY }} className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-br from-ink via-ink to-ink-3" />
      <m.div style={{ y: bgY }}
        className="absolute top-[-10%] right-[-5%] w-150 h-150 rounded-full bg-acid/[0.07] blur-[120px] pointer-events-none" />
      <m.div style={{ y: bgY }}
        className="absolute bottom-[-10%] left-[15%] w-125 h-125 rounded-full bg-blue-600/[0.07] blur-[120px] pointer-events-none" />

      <m.div style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — copy */}
          <m.div variants={containerVariants} initial={false} animate="visible">
            {/* Badge */}
            <m.div variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-acid/[0.08] border border-acid/20 rounded-full">
              <m.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Zap size={12} className="text-acid fill-acid" />
              </m.div>
              <span className="text-acid text-[11px] font-display font-semibold tracking-widest uppercase">
                Flexible Digital Service
              </span>
            </m.div>

            {/* Headline */}
            <m.h1 variants={itemVariants}
              className="font-display font-extrabold text-[44px] lg:text-[64px] leading-[1.05] tracking-tight mb-6">
              <span className="block text-white">Get Technology Services</span>
              <span className="block text-white">From The</span>
              <span className="block text-gradient">Best Provider</span>
            </m.h1>

            <m.p variants={itemVariants}
              className="text-slate-body text-[16px] leading-relaxed max-w-[500px] mb-10">
              Flexible digital services. We offer flexible solutions to advance your path in tech.
              Trust our team to deliver and guide you through this journey.
            </m.p>

            {/* CTAs */}
            <m.div variants={itemVariants} className="flex flex-wrap gap-4">
              <m.a href="/services"
                className="group hover:bg-yellow-300 hover:text-black inline-flex items-center gap-2 px-7 py-3.5 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded glow-acid"
                whileHover={{ scale: 1.04, gap: '12px' }}
                whileTap={{ scale: 0.96 }}>
                Explore Services
                <m.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <ArrowRight size={16} />
                </m.span>
              </m.a>
              <m.a href="/projects"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 card-border text-white font-display font-semibold text-[14px] tracking-wide rounded"
                whileHover={{ scale: 1.03, borderColor: 'rgba(253,199,0,0.3)', backgroundColor: 'rgba(255,255,255,0.03)' }}
                whileTap={{ scale: 0.97 }}>
                <Play size={14} className="text-acid fill-acid" />
                See Our Work
              </m.a>
            </m.div>

          </m.div> 

          {/* ── Right: image ── */}
          <m.div
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
                <MotionImage
                  src="/hero.jpg"
                  alt="Four Naxatech team members in branded polo shirts smiling at a laptop in the office"
                  width={1568}
                  height={1003}
                  priority
                  sizes="(min-width: 1280px) 600px, 50vw"
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
                    Naxatech Team
                  </p>
                  <p className="text-slate-body text-[12px] mt-1">
                    Technology services you can trust
                  </p>
                </div>
              </div>
            </div>

            {/* Ambient glow behind card */}
            <div className="absolute inset-0 bg-acid/[0.06] rounded-2xl blur-2xl -z-10 scale-110 pointer-events-none" />
          </m.div>
        </div>
      </m.div>

      {/* Marquee */}
      <div className="relative z-10 mt-16 lg:mt-24 border-t border-b border-white/6 py-3 overflow-hidden bg-ink-2/50">
        <m.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          {[0, 1].map(copy => (
            <div key={copy} className="flex shrink-0">
              {services.map(s => (
                <span key={s}
                  className="inline-flex items-center gap-5 mx-6 text-[12px] font-display font-semibold tracking-[0.18em] uppercase text-slate-muted">
                  <span className="text-acid text-[8px]">◆</span>{s}
                </span>
              ))}
            </div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
