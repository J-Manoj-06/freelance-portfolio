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
    title: 'Aurora Finance Platform',
    category: 'Web Design',
    description: 'A fintech dashboard with cinematic motion and strong conversion architecture.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    stack: ['React', 'Framer Motion', 'Tailwind', 'Node'],
    detail:
      'Redesigned onboarding and analytics experience for a B2B fintech product. The new UI improved demo signups by 41% and shortened onboarding completion time by 27%.',
  },
  {
    id: 2,
    title: 'Pulse Commerce Suite',
    category: 'UI/UX',
    description: 'Premium shopping experience with rich product storytelling and adaptive layouts.',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
    stack: ['Figma', 'React', 'GSAP', 'Shopify'],
    detail:
      'Led UI/UX for a direct-to-consumer commerce suite with advanced personalization. The project raised average order value by 19% through better product discovery.',
  },
  {
    id: 3,
    title: 'Vertex Studio Identity',
    category: 'Branding',
    description: 'A visual system and website for a modern creative production agency.',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    stack: ['Brand Strategy', 'Webflow', 'Motion', '3D'],
    detail:
      'Built a complete digital brand language with immersive visuals and storytelling sections to position the studio as a top-tier partner in competitive pitches.',
  },
  {
    id: 4,
    title: 'Helio Mobile Banking',
    category: 'Mobile Apps',
    description: 'A clean and secure mobile banking interface focused on confidence and speed.',
    image:
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80',
    stack: ['React Native', 'UX Research', 'Design System'],
    detail:
      'Designed end-to-end flows for transfers, cards, and spending insights. The final product reached a 4.8 average app store rating within the first quarter.',
  },
  {
    id: 5,
    title: 'Nova SaaS Launch Site',
    category: 'Web Design',
    description: 'A launch website blending narrative, social proof, and conversion-focused CTA sections.',
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
    stack: ['Next.js', 'Tailwind', 'SEO', 'Analytics'],
    detail:
      'Created a high-performing marketing site with interactive demos and trust blocks. Resulted in 2.4x more qualified trial requests over 6 weeks.',
  },
  {
    id: 6,
    title: 'Orbit Experimental Lab',
    category: 'Others',
    description: 'An experimental concept lab with bold motion direction and interactive visual prototypes.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    stack: ['Three.js', 'Shaders', 'React', 'Creative Code'],
    detail:
      'Designed concept experiences used for investor demos and innovation showcases, helping the team secure two strategic product partnerships.',
  },
]

export const filters = ['All', 'Web Design', 'Mobile Apps', 'UI/UX', 'Branding', 'Others']

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
