import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 40, scale: 0.93, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 150, damping: 19 }}
            onClick={(event) => event.stopPropagation()}
            className="premium-panel relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-slate-900/95 shadow-[0_25px_80px_rgba(0,0,0,.55)]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-slate-900/70 p-2 text-white"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="relative">
              <img src={project.image} alt={project.title} loading="lazy" className="h-64 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>

            <div className="space-y-4 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-accent">{project.category}</p>
              <h3 className="text-2xl font-semibold text-white md:text-3xl">{project.title}</h3>
              <p className="text-sm text-slate-300 md:text-base">{project.detail}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
