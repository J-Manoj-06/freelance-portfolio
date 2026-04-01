import { useEffect, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

function TiltCard({ children, className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const [enableTilt, setEnableTilt] = useState(false)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const springX = useSpring(rotateX, { stiffness: 170, damping: 18, mass: 0.45 })
  const springY = useSpring(rotateY, { stiffness: 170, damping: 18, mass: 0.45 })

  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(67,255,224,0.2), transparent 45%)`

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnableTilt(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const handleMove = (event) => {
    if (!enableTilt || prefersReducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    glowX.set(px * 100)
    glowY.set(py * 100)
    rotateX.set((0.5 - py) * 10)
    rotateY.set((px - 0.5) * 10)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: enableTilt && !prefersReducedMotion ? springX : 0,
        rotateY: enableTilt && !prefersReducedMotion ? springY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: prefersReducedMotion ? 0 : -8 }}
      className={`group relative ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full [transform:translateZ(34px)]">{children}</div>
    </motion.div>
  )
}

export default TiltCard
