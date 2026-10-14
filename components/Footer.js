'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SITE from '@/lib/site'

const cols = [
  { title: 'Services', links: [['Custom Software','#services'],['Web Development','#services'],['Cloud Solutions','#services'],['Cybersecurity','#services'],['Data Analytics','#services'],['Managed IT Support','#services']] },
  { title: 'Company',  links: [['About Us','#about'],['Our Process','#process'],['Testimonials','#testimonials'],['Contact','#contact']] },
]

export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" aria-label="Naxatech home" className="inline-block mb-5">
              <Image src="/logo.png" alt="Naxatech" width={180} height={45} className="h-auto w-[180px]" />
            </a>
            <p className="text-slate-muted text-[13px] leading-loose max-w-[280px] mb-6">
              Nigeria-based technology company delivering world-class IT services
              to businesses across Africa and beyond.
            </p>
            <div className="flex gap-4 text-[13px]">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-muted hover:text-white">Instagram</a>
              <a href={SITE.x} target="_blank" rel="noopener noreferrer" className="text-slate-muted hover:text-white">X</a>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col, ci) => (
            <div key={col.title}>
              <h2 className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-slate-muted mb-5">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map(([l, href], li) => (
                  <motion.li key={l}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.05 + li * 0.04 }}>
                    <motion.a href={href} className="text-[13px] text-slate-muted"
                      whileHover={{ color: '#ffffff', x: 4 }}>
                      {l}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-muted text-[12px]">
            © {new Date().getFullYear()} Naxatech Ltd. All rights reserved. Registered in Nigeria.
          </p>
        </div>
      </div>
    </footer>
  )
}
