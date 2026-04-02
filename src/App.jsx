import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Star,
} from 'lucide-react'
import GlowButton from './components/GlowButton'
import Navbar from './components/Navbar'
import ProjectModal from './components/ProjectModal'
import SectionTitle from './components/SectionTitle'
import TiltCard from './components/TiltCard'
import { filters, processSteps, projects, services, stats, testimonials } from './data/siteData'

const SpaceBackground = lazy(() => import('./components/SpaceBackground'))

function Counter({ value, suffix = '' }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const step = Math.max(1, Math.floor(value / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCurrent(value)
        clearInterval(timer)
      } else {
        setCurrent(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-3xl font-bold text-white md:text-4xl">
      {current}
      {suffix}
    </span>
  )
}

function App() {
  const heroHeadline = 'I Build Futuristic Experiences That Win Premium Clients.'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [hoveredProjectId, setHoveredProjectId] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [typedHeadline, setTypedHeadline] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isDesktop) return undefined

    const move = (event) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      document.documentElement.style.setProperty('--cursor-x', `${x}%`)
      document.documentElement.style.setProperty('--cursor-y', `${y}%`)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isDesktop])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      index += 1
      setTypedHeadline(heroHeadline.slice(0, index))
      if (index >= heroHeadline.length) {
        clearInterval(timer)
      }
    }, 45)

    return () => clearInterval(timer)
  }, [heroHeadline])

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') return projects
    return projects.filter((project) => project.filters.includes(selectedFilter))
  }, [selectedFilter])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-main)]">
      <Suspense fallback={<div className="space-fallback pointer-events-none fixed inset-0 z-0" aria-hidden="true" />}>
        <SpaceBackground activeSection={activeSection} />
      </Suspense>
      <div className="ambient-grid pointer-events-none fixed inset-0 z-[1]" />
      <div className="cursor-aura pointer-events-none fixed inset-0 z-[2] hidden lg:block" />

      <Navbar
        activeSection={activeSection}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="relative z-10">
        <section id="home" className="relative isolate min-h-screen pt-28">
          <div className="floating-blob left-[8%] top-36 h-48 w-48" />
          <div className="floating-blob right-[10%] top-64 h-64 w-64 animation-delay-2" />
          <div className="hero-orb pointer-events-none absolute left-1/2 top-[22%] z-0 h-72 w-72 -translate-x-1/2 rounded-full" />
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-5 pb-24 pt-20 text-center md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="hero-content relative z-10 space-y-8"
            >
              <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                Premium Freelance Digital Studio
              </p>

              <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.1] text-white md:text-6xl lg:text-7xl">
                <span className="text-gradient">{typedHeadline}</span>
                <span className="ml-1 inline-block h-[0.95em] w-[2px] -translate-y-1 align-middle bg-accent animate-pulse" />
              </h1>

              <p className="mx-auto max-w-2xl text-base text-slate-300 md:text-lg">
                I design and develop high-impact websites with immersive motion, elegant UX, and conversion-focused strategy for founders, agencies, and modern brands.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton href="#contact">Hire Me</GlowButton>
                <GlowButton href="#work" variant="ghost">
                  Explore Work
                </GlowButton>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
                {['Trusted by 50+ clients', 'Fast execution', 'Design-led strategy'].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-accent/45">
                    <CheckCircle2 size={14} className="text-accent" />
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.a
            href="#about"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="scroll-indicator absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-slate-300 backdrop-blur-md md:inline-flex"
          >
            Scroll
            <ChevronDown size={14} className="text-accent" />
          </motion.a>
        </section>

        <section id="about" className="relative isolate mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
          <div className="section-blur pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full" />
          <SectionTitle
            eyebrow="About"
            title="Strategic Design Partner For Ambitious Brands"
            description="I combine visual direction, business logic, and front-end engineering to build digital products that feel luxurious and perform reliably under real client goals."
          />

          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch min-h-[500px]">
            <div className="flex flex-col gap-6 h-full">
              <TiltCard className="premium-panel flex-1 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">My Story</h3>
                  <p className="mt-4 text-slate-300">
                    Over the past 8 years, I have helped startups, agencies, and enterprise teams launch polished websites and products that look exceptional and drive measurable growth.
                  </p>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Experience</p>
                    <p className="mt-2 text-2xl font-semibold text-white">8+ Years</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Core Stack</p>
                    <p className="mt-2 text-2xl font-semibold text-white">React / Motion</p>
                  </div>
                </div>
              </TiltCard>

              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="premium-panel flex-1 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-white">Capabilities</h3>
                  <div className="mt-6 space-y-5">
                    {[
                      ['UI/UX Strategy', 95],
                      ['Front-end Engineering', 92],
                      ['Motion Design', 89],
                      ['Conversion Optimization', 90],
                    ].map(([label, level]) => (
                      <div key={label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-200">{label}</span>
                          <span className="text-accent">{level}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, ease: 'easeOut' }}
                            className="h-2 rounded-full bg-gradient-to-r from-accent to-cyan-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="premium-panel h-full rounded-3xl border border-white/10 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        <section id="services" className="relative px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Services"
              title="Premium Services Built For Growth"
              description="Every engagement blends strategic thinking with visual craft and interaction quality to create memorable digital experiences."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: index * 0.08, duration: 0.55 }}
                  >
                    <TiltCard className="premium-panel light-sweep h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-6 backdrop-blur-xl md:p-8">
                      <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-accent">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                      <p className="mt-3 text-slate-300">{service.description}</p>
                    </TiltCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
          <SectionTitle
            eyebrow="Showcase"
            title="Featured Projects"
            description="Real-world applications designed for performance, usability, and scale."
          />

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm transition duration-300 ${
                  selectedFilter === filter
                    ? 'scale-[1.03] border-accent bg-accent/20 text-white shadow-[0_0_30px_rgba(67,255,224,.2)]'
                    : 'border-white/15 bg-white/5 text-slate-300 hover:-translate-y-0.5 hover:border-white/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.52, delay: index * 0.08, ease: 'easeOut' }}
                  animate={{ y: [0, -4, 0] }}
                  onHoverStart={() => setHoveredProjectId(project.id)}
                  onHoverEnd={() => setHoveredProjectId(null)}
                >
                  <TiltCard className="project-showcase-card premium-panel project-panel overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                    <div className="project-ambient-glow" aria-hidden="true" />
                    <div
                      onClick={() => setSelectedProject(project)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setSelectedProject(project)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className="group w-full cursor-pointer text-left"
                      aria-label={`Open details for ${project.title}`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" />
                        <div className="project-edge-light absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" />

                        {isDesktop && hoveredProjectId === project.id && (
                          <div className="absolute inset-3 overflow-hidden rounded-xl border border-white/20 bg-slate-950/80 backdrop-blur-sm">
                            <iframe
                              src={project.previewUrl}
                              title={`${project.title} live preview`}
                              loading="lazy"
                              className="h-full w-full scale-[1.08] origin-top-left"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                            <p className="absolute left-3 top-3 rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-accent">
                              Live Preview
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-accent/85">{project.category}</p>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <ArrowUpRight size={18} className="text-accent" />
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3 pt-1">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-accent/45 bg-accent/15 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-accent/25"
                        >
                          Live Demo
                          <ArrowUpRight size={16} className="text-accent" />
                        </a>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/35"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section id="stats" className="px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.55 }}
                  className="group premium-panel rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl"
                >
                  <div className="mx-auto mb-3 inline-flex rounded-xl border border-white/10 bg-white/5 p-2.5 text-accent shadow-[0_0_25px_rgba(67,255,224,.14)] transition duration-300 group-hover:scale-105">
                    <Icon size={20} />
                  </div>
                  <Counter value={item.value} suffix={item.suffix} />
                  <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section id="testimonials" className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
          <SectionTitle
            eyebrow="Testimonials"
            title="Trusted By Visionary Founders"
            description="Client feedback reflects clarity, craft, and measurable outcomes delivered across every engagement."
          />

          <div className="relative mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.article
                key={testimonialIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="premium-panel rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center shadow-[0_20px_60px_rgba(2,8,23,.45)] backdrop-blur-xl"
              >
                <motion.img
                  key={testimonials[testimonialIndex].avatar}
                  initial={{ scale: 0.88, opacity: 0.65 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  src={testimonials[testimonialIndex].avatar}
                  alt={testimonials[testimonialIndex].name}
                  loading="lazy"
                  className="mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-accent/30"
                />
                <div className="mt-4 flex justify-center gap-1 text-yellow-300">
                  {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-relaxed text-slate-200">&quot;{testimonials[testimonialIndex].feedback}&quot;</p>
                <p className="mt-6 text-base font-semibold text-white">{testimonials[testimonialIndex].name}</p>
                <p className="text-sm text-slate-400">{testimonials[testimonialIndex].role}</p>
              </motion.article>
            </AnimatePresence>

            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() =>
                  setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                }
                className="rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:bg-white/15"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                className="rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:bg-white/15"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
          <SectionTitle
            eyebrow="Process"
            title="How I Build Premium Results"
            description="A clean end-to-end workflow that keeps quality high, communication smooth, and outcomes aligned with your goals."
          />

          <div className="relative mx-auto max-w-4xl space-y-8">
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-accent/70 to-transparent md:block" />
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="premium-panel relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:ml-16"
              >
                <div className="absolute -left-[4.1rem] top-6 hidden h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-slate-900 text-sm font-semibold text-accent md:flex">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-slate-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-layer relative isolate mx-auto w-full max-w-7xl px-5 pb-24 pt-20 md:px-8">
          <SectionTitle
            eyebrow="Contact"
            title="Let&apos;s Build Something Exceptional"
            description="Share your project goals and timeline. I will reply with a strategic plan and clear next steps."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="premium-panel space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              {['Name', 'Email', 'Subject'].map((label) => (
                <label key={label} className="block">
                  <span className="mb-2 block text-sm text-slate-300">{label}</span>
                  <input
                    type={label === 'Email' ? 'email' : 'text'}
                    placeholder={`Your ${label.toLowerCase()}`}
                    className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition duration-300 focus:-translate-y-0.5 focus:border-accent focus:shadow-[0_0_0_3px_rgba(67,255,224,.2)]"
                  />
                </label>
              ))}
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Message</span>
                <textarea
                  rows="5"
                  placeholder="Tell me about your project"
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition duration-300 focus:-translate-y-0.5 focus:border-accent focus:shadow-[0_0_0_3px_rgba(67,255,224,.2)]"
                />
              </label>
              <GlowButton href="#">Send Message</GlowButton>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="premium-panel space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-semibold text-white">Direct Contact</h3>
              <p className="text-slate-300">For project inquiries, partnerships, or premium retainers, contact me directly:</p>
              <div className="space-y-3 pt-3">
                <p className="flex items-center gap-3 text-slate-200">
                  <Mail size={16} className="text-accent" /> hello@novafreelance.studio
                </p>
                <p className="flex items-center gap-3 text-slate-200">
                  <Phone size={16} className="text-accent" /> +91 98765 43210
                </p>
                <p className="flex items-center gap-3 text-slate-200">
                  <MapPin size={16} className="text-accent" /> Bangalore, India
                </p>
              </div>
              <div className="pt-3">
                <p className="mb-3 text-sm uppercase tracking-[0.24em] text-slate-400">Social</p>
                <div className="flex gap-3">
                  {['LinkedIn', 'Dribbble', 'Behance', 'X'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_8px_20px_rgba(67,255,224,.15)]"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer-glow relative z-10 border-t border-white/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} NovaFreelance Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {['Home', 'Services', 'Work', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition duration-300 hover:-translate-y-0.5 hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

export default App
