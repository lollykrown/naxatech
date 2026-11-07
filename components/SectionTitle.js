import { m } from 'framer-motion'

export default function SectionTitle({ eyebrow, title, highlight, children, align = 'center' }) {
  const center = align === 'center'
  return (
    <m.div className={`mb-16 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}>
      <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
        <m.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
        <span className="text-amber-700 text-[11px] font-display font-bold tracking-[0.2em] uppercase">{eyebrow}</span>
        {center && <m.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />}
      </div>
      <h2 className="font-display font-extrabold text-[40px] lg:text-[52px] leading-[1.05] tracking-tight">
        <span className="text-slate-900">{title}</span>
        {highlight && <><br /><span className="text-gradient-light">{highlight}</span></>}
      </h2>
      {children && <p className={`text-slate-600 mt-4 text-[15px] leading-relaxed ${center ? 'max-w-xl mx-auto' : 'max-w-xl'}`}>{children}</p>}
    </m.div>
  )
}
