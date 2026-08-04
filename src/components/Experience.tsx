import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../data/site'
import { Reveal } from './Reveal'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function ScrubRow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          keyframes: [
            { opacity: 1, y: 0, duration: 1 },
            { opacity: 0, y: -24, duration: 1 },
          ],
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-y border-line bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal as="p" className="eyebrow">
              // experience
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="mt-3 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl"
            >
              Release history
            </Reveal>
          </div>
          <Reveal as="p" delay={0.1} className="hidden pb-1 font-mono text-xs text-muted sm:block">
            ordered by most recent
          </Reveal>
        </div>

        <ol className="mt-12">
          {experience.map((job, i) => (
            <li key={job.company}>
              <ScrubRow className="grid gap-4 border-t border-line py-8 md:grid-cols-[180px_1fr] md:gap-10">
                <div className="md:pt-1">
                  <p className="font-mono text-xs text-signal">{job.version}</p>
                  <p className="mt-1.5 font-mono text-xs text-muted">{job.period}</p>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-cream">
                      {job.company}
                    </h3>
                    <span className="font-mono text-sm text-muted">
                      {job.role}
                    </span>
                  </div>
                  <ul className="mt-4 max-w-2xl space-y-2.5">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[15px] leading-relaxed text-soft"
                      >
                        <span className="mt-0.5 shrink-0 font-mono text-xs text-signal">
                          ▸
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrubRow>
              {i === experience.length - 1 ? (
                <div className="h-px w-full bg-line" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
