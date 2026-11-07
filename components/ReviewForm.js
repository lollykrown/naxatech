'use client'
import { useId, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { CheckCircle2, Loader2, MessageSquarePlus, Send, Star, X } from 'lucide-react'

const field = `w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-[14px]
  placeholder-slate-400 outline-none focus:border-acid focus:ring-2 focus:ring-acid/30 transition-all`
const label = 'block text-[11px] font-display font-semibold tracking-[0.15em] uppercase text-amber-700 mb-2'

export default function ReviewForm() {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: '', review: '', website: '' })
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (!rating) { setError('Please choose a star rating.'); return }
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
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
    <div className="mt-14 text-center">
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls={`${id}-panel`}
        className="inline-flex items-center gap-2 px-7 py-3.5 bg-acid text-ink font-display font-bold text-[14px] tracking-wide rounded hover:bg-yellow-300 transition-colors">
        {open ? <X size={16} aria-hidden="true" /> : <MessageSquarePlus size={16} aria-hidden="true" />}
        {open ? 'Close' : 'Add a review'}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div id={`${id}-panel`}
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden">
            <div className="max-w-2xl mx-auto mt-8 text-left border border-slate-200 bg-slate-50 rounded-2xl p-6 sm:p-8">
              {sent ? (
                <div role="status" className="text-center py-6">
                  <CheckCircle2 size={36} className="text-amber-700 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-display font-bold text-[22px] text-slate-900 mb-2">Thank you for your review!</h3>
                  <p className="text-slate-600 text-[14px]">We read every one. Approved reviews are published on this page.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <fieldset>
                    <legend className={label}>Your rating *</legend>
                    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} type="button" onClick={() => setRating(n)} onMouseEnter={() => setHover(n)}
                          aria-label={`${n} star${n > 1 ? 's' : ''}`} aria-pressed={rating === n}
                          className="p-1 rounded focus-visible:outline-2 focus-visible:outline-acid">
                          <Star size={28} className={(hover || rating) >= n ? 'text-amber-500 fill-amber-500' : 'text-slate-300'} aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor={`${id}-name`} className={label}>Your name *</label>
                      <input id={`${id}-name`} name="name" required autoComplete="name" value={form.name} onChange={change} maxLength={120} className={field} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor={`${id}-role`} className={label}>Role / company</label>
                      <input id={`${id}-role`} name="role" autoComplete="organization-title" value={form.role} onChange={change} maxLength={160} className={field} placeholder="CTO, Acme Ltd" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${id}-email`} className={label}>Email * <span className="normal-case tracking-normal text-slate-500 font-normal">(not published)</span></label>
                    <input id={`${id}-email`} name="email" type="email" required autoComplete="email" value={form.email} onChange={change} maxLength={254} className={field} placeholder="jane@company.com" />
                  </div>

                  <div>
                    <label htmlFor={`${id}-review`} className={label}>Your review *</label>
                    <textarea id={`${id}-review`} name="review" required minLength={10} maxLength={1500} rows={5} value={form.review} onChange={change}
                      className={`${field} resize-none`} placeholder="Tell us about your experience working with Naxatech..." />
                  </div>

                  {/* Honeypot: hidden from people, bots fill it in */}
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={change}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                  {error && <p role="alert" className="text-red-600 text-[13px]">{error}</p>}

                  <button type="submit" disabled={sending}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 bg-ink text-white hover:bg-brand font-display font-bold text-[14px] tracking-wide rounded-lg transition-colors disabled:opacity-60">
                    {sending ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending...</> : <><Send size={15} aria-hidden="true" /> Submit review</>}
                  </button>
                  <p className="text-[12px] text-slate-500 text-center">Reviews are checked by our team before they appear on the site.</p>
                </form>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
