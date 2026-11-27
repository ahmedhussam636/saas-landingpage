import * as React from "react"
import { motion, useScroll, useSpring, useTransform, type HTMLMotionProps } from "framer-motion"

export const OVS_EASE = [0.22, 1, 0.36, 1] as const

export const OVS_VIEWPORT = {
  once: true,
  amount: 0.15,
} as const

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  delay?: number
  y?: number
  x?: number
  scale?: number
  duration?: number
}

export function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  duration = 0.75,
  className,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={OVS_VIEWPORT}
      transition={{ duration, delay, ease: OVS_EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface ScrollParallaxProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export function ScrollParallax({ children, offset = 28, className }: ScrollParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 80,
        pointerEvents: "none",
        background: "linear-gradient(90deg, var(--ovs-accent), var(--ovs-soft))",
      }}
    />
  )
}
