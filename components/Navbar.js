'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { m, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'
import projects from '@/lib/projects'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const isActive = href => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  useEffect(() => {
    return scrollY.on('change', v => setSolid(v > 40))
  }, [scrollY])


  return (
        <m.nav aria-label="Main"
          className="fixed top-0 left-0 right-0 z-50"
          animate={{
            backgroundColor: solid ? 'rgba(8,12,24,0.9)' : 'rgba(8,12,24,0.15)',
            borderBottomColor: solid ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
          style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-17.5 flex items-center justify-between">
            {/* Logo */}
          <Link href="/" aria-label="Naxatech home" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Naxatech Logo" width={254} height={63} priority className="h-auto w-[150px]" />
          </Link>

            {/* Desktop links           */}
            <ul className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}
                   className={`text-[14px] font-medium tracking-wide transition-colors ${isActive(l.href) ? 'text-yellow-400 border-b-[1.5px] border-yellow-400' : 'text-slate-200 hover:text-white'}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

            {/* CTA */}
            <m.a href="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-acid text-ink font-display font-bold text-[13px] tracking-wider rounded"
              whileHover={{ scale: 1.04, backgroundColor: '#fdc700', color: '#080C18' }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              // transition={{ delay: 0.125 }}
            >
              Get a Quote
            </m.a>

            {/* Mobile toggle */}
            <m.button className="md:hidden text-white p-1"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}>
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={open ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.15 }}>
                  {open ? <X size={22} /> : <Menu size={22} />}
                </m.div>
              </AnimatePresence>
            </m.button>
          </div>
    
          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <m.div
                id="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden border-t border-white/[0.07] bg-[rgba(8,12,24,0.92)] backdrop-blur-xl"
              >
                <div className="px-6 py-6 flex flex-col gap-5">
                  {links.map((l, i) => (
                    <m.a key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                      className={`text-[15px] font-medium max-w-max ${isActive(l.href) ? 'text-yellow-400 border-b-[1.5px] border-yellow-400' : 'text-slate-200'}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 6, color: '#ffffff' }}
                    >{l.label}</m.a>
                  ))}
                  <m.a href="/contact" onClick={() => setOpen(false)}
                    className="mt-2 w-full text-center py-3 bg-acid text-ink font-display font-bold text-[14px] rounded"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}>
                    Get a Quote
                  </m.a>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.nav>
  )
}
