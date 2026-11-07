'use client'
import Link from 'next/link'
import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionTitle from './SectionTitle'
import { about, values } from '@/lib/content'

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionTitle align="left" eyebrow="About Us" title="A World-Wide" highlight="IT Company" />
          <m.p className="text-slate-600 text-[15px] leading-loose mb-8 -mt-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {about.intro}
          </m.p>
          <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded hover:bg-yellow-300 transition-colors">
            Read more<span className="sr-only"> about Naxatech</span> <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((v, i) => (
            <m.div key={v.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group border border-slate-200 bg-white hover:bg-brand transition-colors duration-300 rounded-xl p-6">
              <h3 className="font-display font-bold text-[16px] text-slate-900 group-hover:text-white transition-colors mb-2">{v.title}</h3>
              <p className="text-[13px] leading-relaxed text-slate-500 group-hover:text-white/90 transition-colors">{v.text}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
