'use client'
import { motion } from 'framer-motion'

const cols = [
  { title: 'Services', links: ['Custom Software','Web Development','Cloud Solutions','Cybersecurity','Data Analytics','Managed IT Support'] },
  { title: 'Company',  links: ['About Us','Our Process','Case Studies','Blog','Careers','Contact'] },
  { title: 'Legal',    links: ['Privacy Policy','Terms of Service','Cookie Policy','Data Processing'] },
]

export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div className="flex items-center gap-3 mb-5"
              whileHover={{ scale: 1.02 }} style={{ width: 'fit-content' }}>
              <div className="w-8 h-8 bg-acid flex items-center justify-center font-display font-black text-ink text-sm"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>N</div>
              <span className="font-display font-bold text-[18px] tracking-wide text-white">
                NAXA<span className="text-acid">TECH</span>
              </span>
            </motion.div>
            <p className="text-slate-muted text-[13px] leading-loose max-w-[280px] mb-6">
              Nigeria-based technology company delivering world-class IT services
              to businesses across Africa and beyond.
            </p>
            <div className="flex gap-2">
              {['LI','TW','FB','IG'].map(s => (
                <motion.a key={s} href="#"
                  className="w-8 h-8 rounded-md card-border flex items-center justify-center text-slate-dim text-[10px] font-display font-bold"
                  whileHover={{ borderColor: 'rgba(200,255,62,0.3)', color: '#C8FF3E', y: -2 }}
                  whileTap={{ scale: 0.9 }}>
                  {s}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col, ci) => (
            <div key={col.title}>
              <h5 className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-slate-muted mb-5">{col.title}</h5>
              <ul className="space-y-3">
                {col.links.map((l, li) => (
                  <motion.li key={l}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.05 + li * 0.04 }}>
                    <motion.a href="#" className="text-[13px] text-slate-dim"
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
          <p className="text-slate-dim text-[12px]">
            © {new Date().getFullYear()} Naxatech Ltd. All rights reserved. Registered in Nigeria.
          </p>
          <div className="flex items-center gap-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-slate-dim text-[12px]">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
