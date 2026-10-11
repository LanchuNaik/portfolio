// Single source of truth for all portfolio content.
// Update this file to update the portfolio. Icon fields are string keys that
// components map to MUI icons, so this file stays free of JSX.

export const profile = {
  name: 'Lanchana Ganesh Naik',
  firstName: 'Lanchana',
  role: 'Junior Software Engineer',
  specialty: 'React.js & React Native',
  company: 'DigiTalentio IT Solutions',
  location: 'Bangalore, India',
  timeZone: 'Asia/Kolkata',
  email: 'lanchananaik@gmail.com',
  phone: '+91 80955 12810',
  resumeUrl: '/assets/Lanchana-Ganesh-Naik-Resume.pdf',
  photo: '/assets/lanchana-portrait.jpg',
  socials: {
    github: 'https://github.com/LanchuNaik',
    linkedin: 'https://linkedin.com/in/lanchananaik',
  },
  // Rotating word in the hero headline: "I build <word> web & mobile apps."
  heroWords: ['thoughtful', 'scalable', 'real-time', 'secure'],
  intro:
    'Junior Software Engineer at DigiTalentio IT Solutions. I turn product requirements into production-ready React.js and React Native apps — from Stripe-powered payments to real-time, multi-role platforms.',
  about:
    "I'm a Junior Software Engineer building web and mobile products with React.js, React Native and TypeScript. My day-to-day spans REST API integration, state management, real-time communication and payment workflows — and I've contributed to production apps in fintech, civic-tech, agriculture and event management.",
}

export const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Work', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export const stats = [
  { value: 1, suffix: '+', label: 'Years building production apps' },
  { value: 5, label: 'Featured projects' },
  { value: 4, label: 'Industry domains' },
  { value: 9.91, decimals: 2, label: 'MCA CGPA' },
]

export const domains = [
  { label: 'Fintech', icon: 'payments' },
  { label: 'Civic-tech', icon: 'vote' },
  { label: 'Agriculture', icon: 'agriculture' },
  { label: 'Events', icon: 'event' },
]

// Mirrors the "Technical Skills" block of the résumé.
export const skillGroups = [
  {
    title: 'Frontend',
    icon: 'devices',
    blurb: 'Web and cross-platform mobile interfaces.',
    skills: ['React.js', 'React Native', 'HTML5', 'CSS3'],
  },
  {
    title: 'Languages',
    icon: 'code',
    skills: ['JavaScript (ES6+)', 'TypeScript'],
  },
  {
    title: 'State Management',
    icon: 'layers',
    skills: ['Redux Toolkit', 'Zustand', 'React Query'],
  },
  {
    title: 'APIs & Real-Time',
    icon: 'bolt',
    skills: ['REST APIs', 'Axios', 'Stripe', 'Firebase', 'WebSockets', 'Socket.io'],
  },
  {
    title: 'Backend & Database',
    icon: 'storage',
    skills: ['Node.js', 'Express.js', 'MongoDB'],
  },
  {
    title: 'UI & Authentication',
    icon: 'palette',
    skills: ['Material UI', 'Tailwind CSS', 'JWT', 'OTP-based auth'],
  },
  {
    title: 'Tools',
    icon: 'build',
    skills: ['Git', 'GitHub', 'GitLab', 'Figma'],
  },
]

// Flat list for the animated tech ribbon.
export const techStack = [
  'React.js',
  'React Native',
  'TypeScript',
  'JavaScript',
  'Redux Toolkit',
  'Zustand',
  'React Query',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Stripe',
  'Firebase',
  'Socket.io',
  'Material UI',
  'Tailwind CSS',
  'JWT · OTP',
  'Figma',
]

export const experience = [
  {
    role: 'Junior Software Engineer',
    company: 'DigiTalentio IT Solutions',
    location: 'Bangalore, India',
    period: 'Oct 2025 — Present',
    current: true,
    points: [
      'Develop and maintain production web and mobile applications using React.js, React Native, and TypeScript across multiple client projects.',
      'Integrate Stripe payment workflows and QR-based tipping features for a multi-role fintech platform, including OTP-based user verification.',
      'Implement real-time chat and notifications using Socket.io and Firebase, supporting communication and updates across application workflows.',
      'Manage UI state and role-based navigation using Redux Toolkit and Zustand, while developing reusable components for consistent interfaces.',
    ],
    tech: ['React.js', 'React Native', 'TypeScript', 'Stripe', 'Socket.io', 'Firebase', 'Redux Toolkit', 'Zustand'],
  },
  {
    role: 'Software Development Intern',
    company: 'DigiTalentio IT Solutions',
    location: 'Bangalore, India',
    period: 'May 2025 — Oct 2025',
    current: false,
    points: [
      'Implemented application screens and UI features for web and mobile products, translating design requirements into functional components.',
      'Connected frontend components to REST APIs using Axios and handled API responses to support application workflows.',
      'Contributed to JWT authentication and OTP verification flows, gaining hands-on experience with application security and frontend integration patterns.',
    ],
    tech: ['React.js', 'React Native', 'Axios', 'REST APIs', 'JWT', 'OTP'],
  },
]

// `visual` picks the illustrated mock-up in ProjectVisual.jsx; `color` tints it.
export const projects = [
  {
    title: 'Tipsy',
    tagline: 'Multi-role tipping & payment platform',
    category: 'Professional',
    domain: 'Fintech · USA',
    year: '2026',
    color: '#635BFF',
    visual: 'tipsy',
    tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'Stripe', 'Firebase'],
    points: [
      'Developed role-based dashboards for customers, staff, and business owners, with protected routing and role-specific data access.',
      'Integrated Stripe payment workflows and QR-based tipping, along with OTP authentication.',
      'Managed application state using Redux Toolkit to support data sharing across dashboard components.',
    ],
  },
  {
    title: 'Celebrity Calendar',
    tagline: 'Event & booking mobile app',
    category: 'Professional',
    domain: 'Events',
    year: '2026',
    color: '#E11D48',
    visual: 'calendar',
    tech: ['React Native', 'Redux Toolkit', 'Firebase', 'Axios'],
    points: [
      'Developed cross-platform mobile app features for event discovery, booking, and calendar-based workflows.',
      'Integrated Firebase Cloud Messaging for booking updates and event reminder notifications.',
      'Implemented role-based navigation for celebrities, managers, and team members.',
    ],
  },
  {
    title: 'e-Beru',
    tagline: 'Agricultural multi-role platform',
    category: 'Professional',
    domain: 'Agriculture',
    year: '2025',
    color: '#16A34A',
    visual: 'eberu',
    tech: ['React.js', 'Redux Toolkit', 'React Query', 'Socket.io'],
    points: [
      'Developed separate dashboards for farmers, consultants, and administrators with role-specific access and data views.',
      'Implemented real-time chat and notifications using Socket.io to support communication between platform users.',
      'Used React Query for server-state caching and data fetching to reduce unnecessary API requests.',
    ],
  },
  {
    title: 'Prajaakeeya',
    tagline: 'Civic voting & engagement platform',
    category: 'Professional',
    domain: 'Civic-tech',
    year: '2025',
    color: '#EA8A0B',
    visual: 'civic',
    link: 'https://prajaakeeya.org',
    tech: ['React.js', 'TypeScript', 'Zustand', 'Firebase'],
    points: [
      'Developed features for a multi-role civic platform supporting administrators, candidates, and voters, including voting and issue reporting workflows.',
      'Implemented multilingual support and responsive layouts to improve accessibility across devices and language preferences.',
    ],
  },
  {
    title: 'Rentr',
    tagline: 'Peer-to-peer rental marketplace',
    category: 'Personal',
    domain: 'Marketplace · Full-stack',
    year: '2026',
    color: '#0E9F9A',
    visual: 'rentr',
    tech: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
    points: [
      'Developed a rental marketplace with booking workflows, booking conflict detection, real-time chat, and user reviews.',
      'Implemented JWT-based authentication, REST API endpoints, and location-based property search using MongoDB geospatial queries.',
    ],
  },
]

export const education = [
  {
    degree: 'Master of Computer Applications',
    short: 'MCA',
    institute: 'Dayananda Sagar College of Engineering, Bangalore',
    period: '2023 — 2025',
    detail: 'CGPA 9.91 / 10',
  },
  {
    degree: 'B.Sc. — Physics, Chemistry & Mathematics',
    short: 'B.Sc.',
    institute: 'Anjuman College for Women, Bangalore',
    period: '2019 — 2022',
    detail: 'Score 92%',
  },
]
