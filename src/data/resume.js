// Single source of truth for all portfolio content.
// Update this file to update the portfolio.

export const profile = {
  name: 'Lanchana Ganesh Naik',
  role: 'Junior Software Engineer',
  specialty: 'React.js · React Native',
  location: 'Bangalore, India',
  email: 'lanchanagnaik@gmail.com',
  phone: '+91 80955 12810',
  resumeUrl: '/assets/Lanchana-Ganesh-Naik-Resume.pdf',
  photo: '/assets/profile-alt.jpg',
  socials: {
    linkedin: 'https://linkedin.com/in/lanchananaik',
    github: 'https://github.com/LanchuNaik',
  },
  summary:
    'Junior Software Engineer with 1+ year of professional experience building production-grade web and mobile applications using React.js and React Native. Delivered real-world products across fintech, agriculture, and event management domains involving Stripe payment integration, real-time WebSocket communication, and multi-role architectures.',
  summaryExtra:
    'Strong proficiency in REST API integration, state management (Redux Toolkit, Zustand), and responsive UI development, with complementary full-stack exposure across Node.js, Express.js, and MongoDB.',
}

// Quick headline stats for the hero/about sections
export const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '6+', label: 'Products Shipped' },
  { value: '3', label: 'Industry Domains' },
]

// Grouped skills. `level` (0-100) drives the animated progress bars.
export const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'React Native', level: 88 },
      { name: 'TypeScript', level: 82 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'HTML5 & CSS3', level: 90 },
    ],
  },
  {
    category: 'State Management',
    skills: [
      { name: 'Redux Toolkit', level: 88 },
      { name: 'Zustand', level: 82 },
      { name: 'React Query', level: 80 },
    ],
  },
  {
    category: 'Backend & Database',
    skills: [
      { name: 'Node.js', level: 74 },
      { name: 'Express.js', level: 72 },
      { name: 'MongoDB', level: 74 },
    ],
  },
  {
    category: 'APIs, Integrations & Tools',
    skills: [
      { name: 'REST APIs / Axios', level: 90 },
      { name: 'Stripe Payments', level: 82 },
      { name: 'Firebase', level: 80 },
      { name: 'WebSockets (Socket.io)', level: 80 },
      { name: 'Material UI / Tailwind', level: 86 },
      { name: 'JWT & OTP Auth', level: 82 },
      { name: 'Git · Figma · Postman', level: 85 },
    ],
  },
]

// Flat marquee list of technologies for the animated tech-stack ribbon
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
  'REST APIs',
  'JWT',
  'Git',
  'Figma',
]

export const experience = [
  {
    role: 'Frontend Developer',
    company: 'DigiTalentio IT Solutions',
    location: 'Bangalore, India',
    period: 'May 2025 – Present',
    current: true,
    points: [
      'Develop and maintain scalable web and mobile applications using React.js and React Native in a production environment.',
      'Integrate Stripe payment gateway, Firebase services, and REST APIs across multiple client-facing products.',
      'Implement real-time features (chat, notifications) using WebSockets (Socket.io) in multi-role platforms.',
      'Build and maintain a shared component library, improving development velocity and UI consistency across projects.',
      'Collaborate with backend teams and designers (Figma) to deliver end-to-end features on schedule.',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'DigiTalentio IT Solutions',
    location: 'Bangalore, India',
    period: 'Nov 2024 – Jan 2025',
    current: false,
    points: [
      'Built frontend features using React.js and React Native under senior developer mentorship.',
      'Implemented authentication flows (JWT, OTP), API integration, and responsive UI screens.',
      'Contributed to production builds for payment-enabled and real-time applications.',
    ],
  },
  {
    role: 'Frontend Intern',
    company: 'Gonagoor Technology Solutions Pvt. Ltd.',
    location: 'Bangalore, India',
    period: 'Earlier',
    current: false,
    points: [
      'Learned the fundamentals of React Native and mobile app development.',
      'Designed UI screens and prototypes using Figma.',
    ],
  },
]

export const projects = [
  {
    title: 'Tipsy',
    tagline: 'Multi-Role Tipping & Payment Platform (USA)',
    type: 'Professional',
    year: '2026',
    tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'Stripe', 'Firebase'],
    points: [
      'Built dashboards for three distinct user roles (end users, staff, business owners) with role-based routing.',
      'Integrated Stripe payment gateway and QR-code-based tipping workflows; implemented OTP authentication.',
      'Managed complex global state with Redux Toolkit, reducing unnecessary re-renders and API calls.',
    ],
  },
  {
    title: 'Celebrity Calendar',
    tagline: 'Event & Booking Mobile App',
    type: 'Professional',
    year: '2026',
    tech: ['React Native', 'Redux Toolkit', 'Firebase', 'Axios', 'Figma'],
    points: [
      'Developed a cross-platform mobile app for event discovery and ticket booking with calendar-based workflows.',
      'Integrated Firebase push notifications for real-time booking updates and event reminders.',
      'Implemented role-based navigation for celebrities, managers, and team members.',
    ],
  },
  {
    title: 'Prajaakeeya',
    tagline: 'Civic Voting & Engagement Platform',
    type: 'Professional',
    year: '2025',
    link: 'https://prajaakeeya.org',
    tech: ['React.js', 'TypeScript', 'Zustand', 'Firebase'],
    points: [
      'Implemented a multi-role voting system (Admin, Candidate, Voter) with candidate registration and issue reporting.',
      'Added multi-language support and a fully responsive layout for broader accessibility.',
    ],
  },
  {
    title: 'e-BerU',
    tagline: 'Agricultural Multi-Role Platform',
    type: 'Professional',
    year: '2025',
    tech: ['React.js', 'Redux Toolkit', 'React Query', 'Socket.io'],
    points: [
      'Developed separate dashboards for farmers, consultants, and administrators with distinct access control.',
      'Implemented a real-time chat and notification system using WebSockets (Socket.io).',
      'Optimized data fetching and server-state caching with React Query, reducing load times.',
    ],
  },
  {
    title: 'Rentr',
    tagline: 'Peer-to-Peer Rental Marketplace (Full-Stack)',
    type: 'Personal',
    year: '2026',
    tech: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
    points: [
      'Built a complete full-stack rental platform: booking lifecycle with conflict detection, real-time chat with booking-based access, and a review system.',
      'Developed RESTful APIs with JWT authentication; implemented geolocation-based search using MongoDB Geo queries.',
    ],
  },
  {
    title: 'TeamHub',
    tagline: 'HR Management System',
    type: 'Personal',
    year: '2025',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Redux Toolkit'],
    points: [
      'Full-stack HRMS with employee, leave, and payroll management; role-based access control (Admin / HR / Employee).',
      'Built an admin analytics dashboard with data visualization; designed REST APIs and MongoDB schemas for enterprise workflows.',
    ],
  },
]

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institute: 'Dayananda Sagar College of Engineering, Bangalore',
    period: '2024 – 2025',
    detail: 'CGPA: 9.91 / 10',
  },
  {
    degree: 'B.Sc. — Physics, Chemistry & Mathematics (PCM)',
    institute: 'Anjuman College for Women, Bangalore',
    period: '2019 – 2022',
    detail: 'Score: 92%',
  },
]
