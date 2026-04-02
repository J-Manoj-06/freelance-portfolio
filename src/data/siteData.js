import {
  BriefcaseBusiness,
  Layers,
  Rocket,
  Sparkles,
  Smartphone,
  Workflow,
} from 'lucide-react'

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

export const services = [
  {
    icon: Layers,
    title: 'High-Conversion Web Design',
    description:
      'Brand-led websites crafted to impress, explain value clearly, and convert premium clients.',
  },
  {
    icon: Smartphone,
    title: 'Product & App Experience',
    description:
      'Intuitive product interfaces with smooth interactions and thoughtful UX decisions across devices.',
  },
  {
    icon: Rocket,
    title: 'Launch & Growth Systems',
    description:
      'Landing architecture, analytics setup, and optimization loops designed for measurable business growth.',
  },
  {
    icon: Workflow,
    title: 'Creative Direction',
    description:
      'Unified visual language, motion style, and messaging systems that elevate your digital presence.',
  },
]

export const projects = [
  {
    id: 1,
    title: 'TARAS 2K25',
    category: 'Web / Event Platform',
    filters: ['Web', 'Platform'],
    liveUrl: 'https://taras2k25.netlify.app/',
    previewUrl: 'https://taras2k25.netlify.app/',
    image:
      'https://images.unsplash.com/photo-1511578194003-00c80e42dc9b?auto=format&fit=crop&w=1400&q=80',
    description:
      'An interactive event platform designed with modern UI/UX principles, smooth animations, and responsive layouts to enhance user engagement and digital presence for large-scale events.',
    stack: ['React', 'Tailwind CSS', 'Animations'],
    detail:
      'A polished, responsive event platform built for scale, with immersive transitions and structured content flows that keep visitors engaged from landing to registration.',
  },
  {
    id: 2,
    title: 'Lenv - Education Platform',
    category: 'Full Stack / Product',
    filters: ['Product', 'Platform'],
    liveUrl: 'https://lenv1.app/',
    previewUrl: 'https://lenv1.app/',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80',
    description:
      'A scalable multi-role education platform connecting students, teachers, and institutions with structured dashboards, real-time interactions, and user-centric design.',
    stack: ['Flutter / Web', 'Backend Integration', 'UI System Design'],
    detail:
      'Engineered for complex user journeys across academic roles, this product balances usability with robust backend connectivity and structured operational dashboards.',
  },
  {
    id: 3,
    title: 'Lenv Tech',
    category: 'Product / SaaS / Landing System',
    filters: ['Web', 'Product', 'Platform'],
    liveUrl: 'https://lenv1.tech/',
    previewUrl: 'https://lenv1.tech/',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
    description:
      'A refined product-level platform showcasing structured workflows, clean architecture, and modern interface design built for scalability and real-world deployment.',
    stack: ['Modern Web Stack', 'UI/UX Systems', 'Scalable Architecture'],
    detail:
      'Designed as a product-grade platform with modular structure and deployment-first thinking, enabling cleaner growth paths for feature expansion and user acquisition.',
  },
]

export const filters = ['All', 'Web', 'Product', 'Platform']

export const stats = [
  { label: 'Projects Delivered', value: 128, icon: BriefcaseBusiness },
  { label: 'Global Clients', value: 54, icon: Sparkles },
  { label: 'Years Experience', value: 8, icon: Rocket },
  { label: 'Satisfaction Rate', value: 98, suffix: '%', icon: Workflow },
]

export const testimonials = [
  {
    name: 'Arianna Vale',
    role: 'Founder, Nova Labs',
    feedback:
      'The site feels premium in every interaction. We closed enterprise leads within weeks because the brand experience finally matched our product quality.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    name: 'Daniel Brooks',
    role: 'CEO, HelioBank',
    feedback:
      'From strategy to execution, every decision was intentional. Performance, polish, and trust signals were all handled beautifully.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    name: 'Mina Chen',
    role: 'Head of Growth, Pulse Commerce',
    feedback:
      'The interaction design gave us a true competitive edge. The portfolio quality is obvious, and collaboration felt seamless throughout.',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
]

export const processSteps = [
  {
    title: 'Discovery & Positioning',
    description:
      'We define your offer, audience, and edge so every visual choice supports your business goals.',
  },
  {
    title: 'Concept & Direction',
    description:
      'I craft premium concepts and interaction references to set a bold yet professional creative direction.',
  },
  {
    title: 'Build & Motion',
    description:
      'Your website is built with responsive precision, rich animations, and conversion-ready structure.',
  },
  {
    title: 'Launch & Iterate',
    description:
      'After launch, we track behavior and refine key touchpoints to keep improving outcomes over time.',
  },
]
