'use client'
import { m } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { services } from '@/lib/content'
import { serviceIcons } from './Services'

export default function ServicesList() {
  return (
    <section className="pt-16 pb-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-100" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {services.map((svc, i) => {
          const Icon = serviceIcons[svc.key]
          return (
            <m.article key={svc.key}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group h-full border border-slate-200 bg-white hover:bg-brand transition-colors duration-300 rounded-xl p-8">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 bg-slate-100 group-hover:bg-white/20 transition-colors border border-slate-200 group-hover:border-white/30">
                <Icon size={20} className="text-slate-500 group-hover:text-white transition-colors" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-[20px] text-slate-900 group-hover:text-white transition-colors mb-4 leading-tight">{svc.title}</h2>
              <ul className="space-y-2.5">
                {svc.items.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] text-slate-600 group-hover:text-white transition-colors">
                    <CheckCircle2 size={15} className="text-amber-700 group-hover:text-white shrink-0 mt-0.5 transition-colors" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </m.article>
          )
        })}
      </div>
    </section>
  )
}
