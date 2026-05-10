'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react'

const inputCls = `w-full bg-ink-3 border border-white/[0.07] rounded-lg px-4 py-3
  text-white text-[14px] placeholder-slate-dim outline-none
  focus:border-acid/40 focus:bg-ink-4 transition-all`

const labelCls = `block text-[11px] font-display font-semibold tracking-[0.15em] uppercase text-acid/60 mb-2`

const contactInfo = [
  { icon: MapPin, label: 'Office',  val: 'Lagos, Nigeria' },
  { icon: Mail,   label: 'Email',   val: 'hello@naxatech.org' },
  { icon: Phone,  label: 'Phone',   val: '+234 800 000 0000' },
]

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', company:'', service:'', message:'' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-4">
            <motion.div className="h-px bg-acid" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
            <span className="text-acid text-[11px] font-display font-bold tracking-[0.2em] uppercase">Get In Touch</span>
          </div>
          <h2 className="font-display font-extrabold text-[44px] lg:text-[56px] leading-[1.05] tracking-tight">
            <span className="text-white">Start Your Project</span><br />
            <span className="text-gradient">Today</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left info */}
          <motion.div className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}>
            <p className="text-slate-body text-[15px] leading-loose">
              Tell us about your project and we'll get back to you within 24 hours
              with a tailored proposal. First consultation is always free.
            </p>
            {contactInfo.map(({ icon: Icon, label, val }, i) => (
              <motion.div key={label} className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}>
                <motion.div
                  className="w-10 h-10 rounded-lg bg-acid/[0.08] border border-acid/15 flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(200,255,62,0.14)' }}>
                  <Icon size={16} className="text-acid" />
                </motion.div>
                <div>
                  <p className="text-[10px] font-display font-bold tracking-widest uppercase text-acid/50 mb-1">{label}</p>
                  <p className="text-white text-[14px] font-medium">{val}</p>
                </div>
              </motion.div>
            ))}
            <div className="pt-4 border-t border-white/[0.06]">
              <p className="text-[11px] font-display font-semibold tracking-widest uppercase text-slate-muted mb-4">Follow Us</p>
              <div className="flex gap-3">
                {['LI','TW','FB','IG'].map((s, i) => (
                  <motion.a key={s} href="#"
                    className="w-9 h-9 rounded-lg card-border flex items-center justify-center text-slate-muted text-[11px] font-display font-bold"
                    whileHover={{ borderColor: 'rgba(200,255,62,0.35)', color: '#C8FF3E', y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.07 }}>
                    {s}
                  </motion.a>
                ))}
              </div>
            </div>
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
                  className="card-border-acid bg-ink-3 rounded-2xl p-12 text-center">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-acid/10 border border-acid/20 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}>
                    <CheckCircle2 size={28} className="text-acid" />
                  </motion.div>
                  <h3 className="font-display font-bold text-[24px] text-white mb-3">Message Sent!</h3>
                  <p className="text-slate-body text-[15px]">Thanks for reaching out. We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit}
                  className="card-border bg-ink-2 rounded-2xl p-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange}
                        placeholder="Emeka Obi" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange}
                        placeholder="emeka@company.ng" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Company</label>
                      <input name="company" value={form.company} onChange={handleChange}
                        placeholder="Your Company" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Service Needed</label>
                      <select name="service" value={form.service} onChange={handleChange} className={inputCls}>
                        <option value="">Select a service</option>
                        {['Custom Software','Web Development','Cloud Solutions','Cybersecurity','Data Analytics','Managed IT Support','Other'].map(o => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Tell us about your project *</label>
                    <textarea name="message" required value={form.message} onChange={handleChange}
                      rows={5} placeholder="Describe your project, goals, and timeline..."
                      className={inputCls + ' resize-none'} />
                  </div>
                  <motion.button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2.5 py-4 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded-lg disabled:opacity-60"
                    whileHover={{ backgroundColor: '#fdc700', color: '#080C18', scale: 1.01, boxShadow: '0 0 30px rgba(200,255,62,0.2)' }}
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
