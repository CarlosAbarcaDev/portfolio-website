import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('')
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)

        const probe = window.scrollY + window.innerHeight * 0.4
        let current = ''
        for (const link of links) {
          const el = document.getElementById(link.href.slice(1))
          if (el && el.offsetTop <= probe) current = link.href
        }
        if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
          current = '#contact'
        }
        setActive(current)

        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-0.5 w-full bg-line">
        <div
          className="h-full bg-ink transition-[width] duration-150 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <nav className="border-b border-line bg-bone/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-ink font-mono text-xs font-bold text-bone">
              CA
            </span>
            <span className="font-mono text-xs tracking-tight text-ink">
              carlos<span className="text-signal">_</span>abarca
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 font-mono text-[12px] transition-colors ${
                  active === link.href
                    ? 'bg-ink text-bone'
                    : 'text-muted hover:bg-panel hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="rounded-full border border-ink px-4 py-1.5 font-mono text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-bone"
          >
            Hire me
          </a>
        </div>
      </nav>
    </header>
  )
}
