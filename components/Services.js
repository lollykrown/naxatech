'use client'
import Link from 'next/link'
import { m } from 'framer-motion'
import { Code2, Shield, Headphones, ShieldCheck, Briefcase, Package, ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionTitle from './SectionTitle'
import { services } from '@/lib/content'

export const serviceIcons = {
  'cyber-security': Shield,
  'web-development': Code2,
  'ict-support': Headphones,
  'pen-testing': ShieldCheck,
  'it-consulting': Briefcase,
  'product-services': Package,
  'erp-consulting': Briefcase,
  'e-invoicing': Package,
}

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const cardV = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  const list = services.filter(s => s.home)
  return (
    <section id="services" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle eyebrow="Our Services" title="Get Technology Services" highlight="From The Best Provider">
          We offer professional and premium services listed below, but we are not limited!
        </SectionTitle>

        <m.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden"
          variants={containerV} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {list.map(svc => {
            const Icon = serviceIcons[svc.key]
            return (
              <m.div key={svc.key} variants={cardV}
                className="group relative bg-white hover:bg-brand transition-colors duration-300 p-8 overflow-hidden">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 bg-slate-100 group-hover:bg-white/20 transition-colors border border-slate-200 group-hover:border-white/30">
                  <Icon size={20} className="text-slate-500 group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-[18px] text-slate-900 group-hover:text-white transition-colors mb-3 leading-tight">{svc.title}</h3>
                <p className="text-slate-500 group-hover:text-white/90 transition-colors text-[13px] leading-relaxed mb-5">{svc.desc}</p>
                <Link href="/services" className="inline-flex items-center gap-1.5 text-[12px] font-display font-semibold text-slate-500 group-hover:text-white transition-colors">
                  Read more<span className="sr-only"> about {svc.title}</span> <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </m.div>
            )
          })}
        </m.div>

        <div className="mt-12 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded hover:bg-yellow-300 transition-colors">
            See all services <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
