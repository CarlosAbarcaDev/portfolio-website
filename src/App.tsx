import { useLenis } from './hooks/useLenis'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  useLenis()

  return (
    <div className="min-h-screen bg-base">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-base"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  )
}
