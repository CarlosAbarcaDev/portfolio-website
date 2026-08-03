import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  eventLog,
  heroReadouts,
  marqueeItems,
  profile,
} from '../data/site'
import { Reveal } from './Reveal'

gsap.registerPlugin(ScrollTrigger)

function EventLog() {
  const [shown, setShown] = useState<string[]>([])
  const [current, setCurrent] = useState('')

  useEffect(() => {
    let lineIndex = 0
    let charIndex = 0
    let timer = 0

    const step = () => {
      if (lineIndex >= eventLog.length) {
        timer = window.setTimeout(() => {
          lineIndex = 0
          charIndex = 0
          setShown([])
          setCurrent('')
          step()
        }, 2800)
        return
      }

      const line = eventLog[lineIndex]
      if (charIndex <= line.length) {
        setCurrent(line.slice(0, charIndex))
        charIndex += 1
        timer = window.setTimeout(step, 16)
      } else {
        setShown((prev) => [...prev, line])
        lineIndex += 1
        charIndex = 0
        setCurrent('')
        timer = window.setTimeout(step, 240)
      }
    }

    step()
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="font-mono text-[12px] leading-relaxed text-bone/80">
      {shown.map((line, i) => (
        <p key={i} className="text-bone">
          {line}
        </p>
      ))}
      {current && <p className="text-bone">{current}</p>}
      <p className="text-bone/60">
        {shown.length >= eventLog.length ? '' : current ? '' : '> '}
        <span className="text-signal">▊</span>
      </p>
    </div>
  )
}

export function Hero() {
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 40 },
        {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 md:pt-32"
    >
      <div className="hero-glow" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal as="p" className="eyebrow mb-6 flex items-center gap-2">
              <span className="signal-dot" />
              carlos-abarca / full-stack portfolio
            </Reveal>

            <Reveal as="h1" delay={0.05}>
              <span className="block font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-8xl">
                Front-End craft.
              </span>
              <span className="block font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-8xl">
                Full-Stack{' '}
                <span className="text-signal">reach.</span>
              </span>
            </Reveal>

            <Reveal as="p" delay={0.12} className="mt-7 max-w-xl text-lg leading-relaxed text-body">
              Senior developer with {profile.yearsProgramming} years building
              dashboards, admin panels and booking systems —{' '}
              <strong className="font-semibold text-ink">
                {profile.yearsFullStack} of them as a full-stack engineer
              </strong>{' '}
              shipping React, TypeScript and REST APIs end to end.
            </Reveal>

            <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="rounded-full bg-ink px-6 py-3 font-mono text-sm font-medium text-bone transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                See the work
              </a>
              <a
                href="/Carlos_Abarca_CV.pdf"
                download="Carlos_Abarca_CV.pdf"
                className="rounded-full border border-ink px-6 py-3 font-mono text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-bone active:scale-[0.98]"
              >
                Download CV ↓
              </a>
              <a
                href="#contact"
                className="group flex items-center gap-1 font-mono text-sm text-ink underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-muted"
              >
                Get in touch
                <span className="text-signal transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <span className="ml-1 hidden w-full font-mono text-xs text-muted md:inline md:w-auto">
                {profile.location}
              </span>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div
              ref={cardRef}
              className="panel overflow-hidden rounded-xl shadow-[0_24px_60px_-30px_rgba(23,49,44,0.4)]"
            >
              <div className="flex items-center justify-between border-b border-line bg-panel px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D95B43]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-signal" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ok" />
                </div>
                <span className="font-mono text-[11px] text-muted">
                  developer-status / v2.6
                </span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
                  {heroReadouts.map((r) => (
                    <div key={r.label} className="bg-panel p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {r.label}
                      </p>
                      <p className="mt-1 font-display text-3xl font-bold text-ink">
                        {r.value}
                        <span className="ml-1 text-sm font-medium text-muted">
                          {r.unit}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-line bg-ink p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/60">
                      event log
                    </span>
                    <span className="font-mono text-[10px] text-bone/60">
                      tail -f
                    </span>
                  </div>
                  <div className="min-h-[168px]">
                    <EventLog />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line bg-panel px-4 py-2.5">
                <span className="font-mono text-[11px] text-muted">
                  logged in as{' '}
                  <span className="text-ink">carlos.abarca</span>
                </span>
                <span className="font-mono text-[11px] text-muted">
                  region: SV / remote
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-16 md:mt-20">
        <div className="overflow-hidden border-y border-line bg-panel">
          <div className="marquee-track flex w-max items-center gap-10 py-3.5">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-10 font-mono text-sm text-muted"
              >
                <span>{item}</span>
                <span className="text-signal">✦</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
