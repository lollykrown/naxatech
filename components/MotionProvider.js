'use client'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'

// Respect the visitor's "reduce motion" OS setting across all animations.
export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
