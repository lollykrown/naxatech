'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useScrollSpy } from "./useScrollSpy";

const links = ['Home','Services', 'About', 'Process', 'Testimonials', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { scrollY } = useScroll()
  const active = useScrollSpy(links.map(l => l.toLowerCase()));

  useEffect(() => {
    return scrollY.on('change', v => setSolid(v > 40))
  }, [scrollY])


  return (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50"
          animate={{
            backgroundColor: solid ? 'rgba(8,12,24,0.95)' : 'rgba(8,12,24,0)',
            borderBottomColor: solid ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0)',
            backdropFilter: solid ? 'blur(20px)' : 'blur(0px)',
          }}
          style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-17.5 flex items-center justify-between">
            {/* Logo */}
          <Link href="#" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Naxatech Logo" width={150} height={80} className="group-hover:animate-spin-slow transition-transform" />
          </Link>
    
            {/* Desktop links           */}
            <ul className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <li key={l}>
                <Link href={`#${l.toLowerCase()}`} 
                   className={`text-[14px] font-medium text-slate-body hover:text-white 
                   hover:text-[14px] transition-colors tracking-wide ${active === `#${l.toLowerCase()}` ? 'text-yellow-400 border-b-[1.5px] border-yellow-400' : ''}`}>
                  {l}
                </Link>
              </li>
            ))}
              {/* {links.map((l, i) => (
                <motion.li key={l}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}>
                  <motion.a
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setActive(`#${l.toLowerCase()}`)}
                    className="text-[13px] font-medium text-slate-body tracking-wide relative"
                    whileHover={{ color: '#ffffff' }}
                  >
                    {l}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-px bg-acid"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                </motion.li>
              ))} */}
          </ul>
    
            {/* CTA */}
            <motion.a href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-acid text-ink font-display font-bold text-[13px] tracking-wider rounded"
              whileHover={{ scale: 1.04, backgroundColor: '#fdc700', color: '#080C18' }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              // transition={{ delay: 0.125 }}
            >
              Get a Quote
            </motion.a>
    
            {/* Mobile toggle */}
            <motion.button className="md:hidden text-white p-1"
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={open ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.15 }}>
                  {open ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
    
          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden bg-ink-2 border-t border-white/[0.07] bg-[rgba(8,12,24,0.95)] backdrop-blur-xl"
              >
                <div className="px-6 py-6 flex flex-col gap-5">
                  {links.map((l, i) => (
                    <motion.a key={l} href={`#${l.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                      className={`text-[15px] text-slate-body font-medium max-w-max ${active === `#${l.toLowerCase()}` ? 'text-yellow-400 border-b-[1.5px] border-yellow-400' : ''}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 6, color: '#ffffff' }}
                    >{l}</motion.a>
                  ))}
                  <motion.a href="#contact" onClick={() => setOpen(false)}
                    className="mt-2 w-full text-center py-3 bg-acid text-ink font-display font-bold text-[14px] rounded"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}>
                    Get a Quote
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
  )
}
