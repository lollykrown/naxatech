'use client'
import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const sx = useSpring(mx, { stiffness: 500, damping: 30 })
  const sy = useSpring(my, { stiffness: 500, damping: 30 })

  const rx = useSpring(mx, { stiffness: 120, damping: 20 })
  const ry = useSpring(my, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2.5 h-2.5 rounded-full bg-acid"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-9 h-9 rounded-full border border-acid/40"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
