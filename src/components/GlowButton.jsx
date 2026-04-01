import { motion, useMotionValue, useSpring } from 'framer-motion'

function GlowButton({ children, href, variant = 'solid' }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 20 })
  const springY = useSpring(y, { stiffness: 280, damping: 20 })

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = event.clientX - rect.left - rect.width / 2
    const py = event.clientY - rect.top - rect.height / 2
    x.set(px * 0.2)
    y.set(py * 0.2)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300'

  const styles =
    variant === 'solid'
      ? 'bg-gradient-to-r from-accent to-cyan-300 text-slate-950 shadow-[0_8px_40px_rgba(67,255,224,.35)]'
      : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${styles}`}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 hover:opacity-100">
        <span className="absolute -left-10 top-0 h-full w-10 rotate-12 bg-white/25 blur-md" />
      </span>
      <span className="relative z-10">{children}</span>
    </motion.a>
  )
}

export default GlowButton
