import { motion } from 'framer-motion'

function SectionTitle({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent/80">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-sm text-slate-300 md:text-base">{description}</p>
    </motion.div>
  )
}

export default SectionTitle
