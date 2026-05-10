'use client'
import { motion } from 'framer-motion'
import { Globe, Cloud, Shield, Code2, BarChart3, Network, Cpu, Headphones, ArrowUpRight } from 'lucide-react'

const services = [
  { icon: Code2,      num: '01', title: 'Custom Software Development', desc: 'Bespoke web and mobile apps built to solve your exact business challenges — scalable, secure, fast.', tags: ['React','Node.js','Python','Mobile'], accent: '#C8FF3E' },
  { icon: Globe,      num: '02', title: 'Web Design & Development',    desc: 'High-converting, visually stunning websites and e-commerce platforms that turn visitors into customers.', tags: ['Next.js','E-Commerce','CMS','SEO'],  accent: '#7AE0FF' },
  { icon: Cloud,      num: '03', title: 'Cloud Solutions',             desc: 'Migrate and manage cloud infrastructure on AWS, Azure, and GCP. Reduce costs, boost reliability.',       tags: ['AWS','Azure','DevOps','Migration'], accent: '#C8FF3E' },
  { icon: Shield,     num: '04', title: 'Cybersecurity',               desc: 'Comprehensive security audits, threat detection, compliance management, and 24/7 monitoring.',            tags: ['Pentesting','GDPR','Monitoring','Training'], accent: '#FF8A3E' },
  { icon: BarChart3,  num: '05', title: 'Data Analytics & BI',        desc: 'Turn raw data into strategic advantage. Custom dashboards, reporting systems, and predictive models.',   tags: ['Dashboards','ML','Power BI','SQL'],  accent: '#7AE0FF' },
  { icon: Network,    num: '06', title: 'Network Infrastructure',      desc: 'Design, install, and maintain reliable corporate networks, VPNs, and connectivity across Nigeria.',       tags: ['LAN/WAN','VPN','Fiber','VoIP'],     accent: '#C8FF3E' },
  { icon: Cpu,        num: '07', title: 'ERP & Enterprise Systems',    desc: 'Streamline operations with custom ERP, CRM, HRMS, and inventory management implementations.',          tags: ['SAP','Odoo','Zoho','Custom ERP'],   accent: '#FF8A3E' },
  { icon: Headphones, num: '08', title: 'Managed IT Support',          desc: '24/7 helpdesk, proactive monitoring, and dedicated IT management so you can focus on your business.',    tags: ['24/7 Help','Monitoring','SLA','On-site'], accent: '#7AE0FF' },
]

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}
const cardV = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Services() {
  return (
    <section id="services" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-ink-2" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-acid/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
              <span className="text-acid text-[11px] font-display font-bold tracking-[0.2em] uppercase">What We Do</span>
            </div>
            <h2 className="font-display font-extrabold text-[44px] lg:text-[56px] leading-[1.05] tracking-tight">
              <span className="text-white">Technology Services</span><br />
              <span className="text-gradient">Built for Growth</span>
            </h2>
          </div>
          <p className="text-slate-body text-[15px] leading-relaxed max-w-90 lg:text-right">
            From a single integration to a complete digital overhaul — we have the expertise to deliver.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6 border border-white/6"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}>
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <motion.div key={svc.num} variants={cardV}
                className="group relative bg-ink-2 p-7 cursor-pointer overflow-hidden"
                whileHover={{ backgroundColor: '#141B2E' }}>
                <span className="block font-display font-black text-[13px] tracking-widest text-slate-dim mb-5 group-hover:text-slate-muted transition-colors">
                  {svc.num}
                </span>

                <motion.div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 bg-ink-4"
                  whileHover={{ scale: 1.15, backgroundColor: `${svc.accent}18`, borderColor: `${svc.accent}40` }}
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Icon size={20} className="text-slate-muted transition-colors group-hover:text-(--a)"
                    style={{ '--a': svc.accent }} />
                </motion.div>

                <h3 className="font-display font-bold text-[16px] text-white mb-3 leading-tight">{svc.title}</h3>
                <p className="text-slate-muted text-[13px] leading-relaxed mb-5">{svc.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {svc.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-display font-semibold tracking-wide rounded bg-ink-4 text-slate-muted border border-white/5">{t}</span>
                  ))}
                </div>

                <motion.div className="inline-flex items-center gap-1.5 text-[12px] font-display font-semibold text-slate-dim"
                  whileHover={{ color: svc.accent, gap: '8px' }}>
                  Learn more <ArrowUpRight size={13} />
                </motion.div>

                {/* Sliding bottom accent */}
                <motion.div className="absolute bottom-0 left-0 h-0.5"
                  style={{ background: svc.accent }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
