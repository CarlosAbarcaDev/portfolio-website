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
  const [open, setOpen] = useState(false)
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
          <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
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

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full border border-ink px-4 py-1.5 font-mono text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-bone sm:block"
            >
              Hire me
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition-colors hover:bg-panel active:scale-[0.96] md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-full bg-ink transition-transform duration-200 ${
                    open ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[5px] h-0.5 w-full bg-ink transition-opacity duration-200 ${
                    open ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[10px] h-0.5 w-full bg-ink transition-transform duration-200 ${
                    open ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-line bg-bone/95 backdrop-blur-sm md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b border-line py-3 font-mono text-sm transition-colors last:border-0 ${
                    active === link.href ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span className="text-signal">→</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 mb-2 rounded-full bg-ink px-4 py-2.5 text-center font-mono text-sm font-medium text-bone active:scale-[0.98]"
              >
                Hire me
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
