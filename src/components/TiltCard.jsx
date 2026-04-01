import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

function TiltCard({ children, className = '' }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const springX = useSpring(rotateX, { stiffness: 180, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 180, damping: 20 })

  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(67,255,224,0.2), transparent 45%)`

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    glowX.set(px * 100)
    glowY.set(py * 100)
    rotateX.set((0.5 - py) * 12)
    rotateY.set((px - 0.5) * 12)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -8 }}
      className={`group relative ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
      <div className="relative z-10 h-full [transform:translateZ(34px)]">{children}</div>
    </motion.div>
  )
}

export default TiltCard
