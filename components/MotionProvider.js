'use client'
import { MotionConfig } from 'framer-motion'

// Respect the visitor's "reduce motion" OS setting across all animations.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
