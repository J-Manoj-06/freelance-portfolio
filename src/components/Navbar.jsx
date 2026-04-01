import { Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '../data/siteData'

function Navbar({ activeSection, mobileOpen, setMobileOpen, theme, setTheme }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/40 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="text-lg font-bold tracking-[0.16em] text-white">
            NOVA<span className="text-accent">FREELANCE</span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:bg-white/15"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#contact"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(255,255,255,.45)]"
            >
              Let&apos;s Talk
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 z-[60] w-72 border-l border-white/15 bg-slate-950/95 p-6 backdrop-blur-2xl lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Menu</p>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-white/15 p-2 text-white"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full border border-white/15 bg-white/5 p-2 text-white"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a href="#contact" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950">
                Hire Me
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
