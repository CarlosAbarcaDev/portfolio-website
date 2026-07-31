export type Project = {
  id: string
  name: string
  kicker: string
  summary: string
  description: string[]
  role: string
  stack: string[]
  images: string[]
  visual?: string
}

const adminMap = import.meta.glob<string>('../assets/projects/admin-panel/*.png', {
  eager: true,
  import: 'default',
})
const bookingsMap = import.meta.glob<string>('../assets/projects/bookings-forms/*.png', {
  eager: true,
  import: 'default',
})
const operatorMap = import.meta.glob<string>('../assets/projects/operator-tool/*.png', {
  eager: true,
  import: 'default',
})
const operatorVisual = Object.values(operatorMap)[0]

const ordered = (map: Record<string, string>) =>
  Object.keys(map)
    .sort()
    .map((key) => map[key])
    .slice(0, 6)

export const projects: Project[] = [
  {
    id: 'admin-panel',
    name: 'Adventure Station · Admin Panel',
    kicker: 'Tourism backoffice / CRM',
    summary:
      'Web admin panel for a tourism operator: the control room for tours, providers, operators and the commercial catalog.',
    description: [
      'Full backoffice for Adventure Station (Paradise Solutions). The largest module — Tours — manages the catalog, pricing, high season, schedules, addons and web publishing across tabs. Sidebar navigation is driven by per-user module permissions.',
      'Delivered on React + Redux with a component system of reusable tables, modals and forms, wired to the Laravel REST API with Axios.',
    ],
    role: 'Full-stack developer',
    stack: ['React 17', 'Redux', 'Bootstrap 5', 'Formik + Yup', 'Axios', 'SCSS'],
    images: ordered(adminMap),
  },
  {
    id: 'bookings-forms',
    name: 'Bookings Forms',
    kicker: 'Embedded reservation engine',
    summary:
      'Embedded React booking forms for tour websites (Cancun, Cozumel, Mazatlan, Puerto Vallarta, Cabo, Playa del Carmen) — date, time, quantities, addons and live price to checkout.',
    description: [
      'A conversion-focused single-flow SPA loaded inside an iframe on each destination’s reserve page. Eight template variants are chosen at runtime from the API and branded per site (accent color, banners, book-now buttons).',
      'Includes a MasterCalendar with seasonal logic, reusable addon components synced to local state, and a POST to the API that hands off to checkout via the parent page.',
    ],
    role: 'Full-stack developer',
    stack: ['React 17', 'styled-components', 'Bootstrap 5', 'Tempus Dominus', 'Axios'],
    images: ordered(bookingsMap),
  },
  {
    id: 'operator-tool',
    name: 'Operator Mobile Tool',
    kicker: 'Field tool for tour operators',
    summary:
      'A mobile-first companion tool for tour operators at the Cozumel site — React + TypeScript + Vite, built to work alongside the reservation platforms.',
    description: [
      'Lightweight operator-facing tool covering day-to-day field operations for the Cozumel site, developed on the React + TypeScript + Vite stack with Tailwind CSS and react-hook-form.',
    ],
    role: 'Front-end developer',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'react-hook-form'],
    images: [],
    visual: operatorVisual,
  },
]
