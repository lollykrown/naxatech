'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SITE from '@/lib/site'
import { MapPin, Mail, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react'

const inputCls = `w-full bg-white border border-slate-200 rounded-lg px-4 py-3
  text-slate-900 text-[14px] placeholder-slate-400 outline-none
  focus:border-acid focus:ring-2 focus:ring-acid/30 focus:bg-slate-100 transition-all`

const labelCls = `block text-[11px] font-display font-semibold tracking-[0.15em] uppercase text-amber-700 mb-2`

const tel = n => `tel:${n.replace(/[^\d+]/g, '')}`
const contactInfo = [
  { icon: MapPin, label: 'Office', lines: SITE.addresses.map(text => ({ text })) },
  { icon: Mail,   label: 'Email',  lines: SITE.email.map(e => ({ text: e, href: `mailto:${e}` })) },
  { icon: Phone,  label: 'Phone',  lines: [
      ...SITE.phoneNigeria.split(',').map(n => ({ text: n.trim(), href: tel(n) })),
      { text: SITE.phoneUk, href: tel(SITE.phoneUk) },
  ] },
]

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', company:'', service:'', message:'', website:'' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setSent(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-4">
            <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
            <span className="text-amber-700 text-[11px] font-display font-bold tracking-[0.2em] uppercase">Get In Touch</span>
          </div>
          <h2 className="font-display font-extrabold text-[44px] lg:text-[56px] leading-[1.05] tracking-tight">
            <span className="text-slate-900">Start Your Project</span><br />
            <span className="text-gradient-light">Today</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left info */}
          <motion.div className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}>
            <p className="text-slate-600 text-[15px] leading-loose">
              Tell us about your project and we'll get back to you within 24 hours
              with a tailored proposal. First consultation is always free.
            </p>
            {contactInfo.map(({ icon: Icon, label, lines }, i) => (
              <motion.div key={label} className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}>
                <motion.div
                  className="w-10 h-10 rounded-lg bg-acid/[0.08] border border-acid/15 flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(253,199,0,0.14)' }}>
                  <Icon size={16} className="text-amber-700" />
                </motion.div>
                <div>
                  <p className="text-[10px] font-display font-bold tracking-widest uppercase text-amber-700 mb-1">{label}</p>
                  {lines.map(({ text, href }) => href
                    ? <a key={text} href={href} className="block text-slate-900 text-[14px] font-medium hover:text-amber-700">{text}</a>
                    : <p key={text} className="text-slate-900 text-[14px] font-medium">{text}</p>)}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right form */}
          <motion.div className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="card-border-acid bg-white rounded-2xl p-12 text-center">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-acid/10 border border-acid/20 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}>
                    <CheckCircle2 size={28} className="text-amber-700" />
                  </motion.div>
                  <h3 className="font-display font-bold text-[24px] text-slate-900 mb-3">Message Sent!</h3>
                  <p className="text-slate-600 text-[15px]">Thanks for reaching out. We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit}
                  className="border border-slate-200 bg-white rounded-2xl p-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelCls}>Full Name *</label>
                      <input id="name" name="name" autoComplete="name" required value={form.name} onChange={handleChange}
                        placeholder="Emeka Obi" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelCls}>Email Address *</label>
                      <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange}
                        placeholder="emeka@company.ng" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="company" className={labelCls}>Company</label>
                      <input id="company" name="company" autoComplete="organization" value={form.company} onChange={handleChange}
                        placeholder="Your Company" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="service" className={labelCls}>Service Needed</label>
                      <select id="service" name="service" value={form.service} onChange={handleChange} className={inputCls}>
                        <option value="">Select a service</option>
                        {['Custom Software','Web Development','Cloud Solutions','Cybersecurity','Data Analytics','Managed IT Support','Other'].map(o => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className={labelCls}>Tell us about your project *</label>
                    <textarea id="message" name="message" required maxLength={5000} value={form.message} onChange={handleChange}
                      rows={5} placeholder="Describe your project, goals, and timeline..."
                      className={inputCls + ' resize-none'} />
                  </div>
                  {/* Honeypot: hidden from people, bots fill it in */}
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    value={form.website} onChange={handleChange}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                  {error && <p role="alert" className="text-red-400 text-[13px]">{error}</p>}
                  <motion.button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2.5 py-4 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded-lg disabled:opacity-60"
                    whileHover={{ backgroundColor: '#fdc700', color: '#080C18', scale: 1.01, boxShadow: '0 0 30px rgba(253,199,0,0.2)' }}
                    whileTap={{ scale: 0.99 }}>
                    <AnimatePresence mode="wait">
                      {sending ? (
                        <motion.span key="loading" className="flex items-center gap-2"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Loader2 size={16} className="animate-spin" /> Sending...
                        </motion.span>
                      ) : (
                        <motion.span key="idle" className="flex items-center gap-2"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Send size={15} /> Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
