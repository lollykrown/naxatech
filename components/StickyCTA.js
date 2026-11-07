'use client'
import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import SITE from '@/lib/site'

// Mobile-only action bar. Appears after scrolling and hides when the contact
// form is on screen so it never covers it.
const whatsapp = `https://wa.me/${SITE.phoneNigeria.split(',')[0].replace(/\D/g, '')}?text=${encodeURIComponent("Hello Naxatech, I'd like to discuss a project.")}`

export default function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let pastTop = false
    let atContact = false
    const update = () => setShow(pastTop && !atContact)
    const onScroll = () => { pastTop = window.scrollY > 500; update() }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const form = document.getElementById('contact')
    const obs = new IntersectionObserver(([e]) => { atContact = e.isIntersecting; update() })
    if (form) obs.observe(form)
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 flex gap-3 p-3 bg-ink/90 backdrop-blur-lg border-t border-white/10 transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}
      aria-hidden={!show}
      inert={!show}
    >
      <a href="/contact" className="flex-1 text-center py-3 bg-acid text-ink font-display font-bold text-[14px] rounded">
        Get a Quote
      </a>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-white/20 text-white font-display font-semibold text-[14px] rounded">
        <MessageCircle size={16} aria-hidden="true" /> WhatsApp
      </a>
    </div>
  )
}
