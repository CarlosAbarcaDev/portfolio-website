import { aboutSpecs, strengths } from '../data/site'
import { Reveal } from './Reveal'

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div>
      <Reveal as="p" className="eyebrow">
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        delay={0.05}
        className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </Reveal>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="// about" title="The short version" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <Reveal className="flex items-end gap-4">
              <p className="font-display text-6xl font-bold leading-none text-ink sm:text-7xl">
                07<span className="text-signal">.</span>
              </p>
              <p className="pb-1 font-mono text-sm text-muted">
                years writing software
              </p>
            </Reveal>
            <Reveal className="mt-2 flex items-end gap-4">
              <p className="font-display text-6xl font-bold leading-none text-ink sm:text-7xl">
                04<span className="text-signal">.</span>
              </p>
              <p className="pb-1 font-mono text-sm text-muted">
                of them as full-stack
              </p>
            </Reveal>

            <Reveal className="mt-8 max-w-xl text-lg leading-relaxed text-body">
              <p>{summary()}</p>
            </Reveal>

            <Reveal className="mt-8">
              <p className="eyebrow mb-4">strengths</p>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {strengths.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 font-mono text-sm text-ink"
                  >
                    <span className="text-signal">▹</span>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <dl className="panel overflow-hidden rounded-xl">
              {aboutSpecs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`px-5 py-4 ${i > 0 ? 'border-t border-line' : ''}`}
                >
                  <dt className="eyebrow mb-2">{spec.label}</dt>
                  {spec.lines.map((line) => (
                    <dd key={line} className="text-[15px] leading-snug text-ink">
                      {line}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function summary() {
  return `Results-driven developer with more than 7 years building dashboards,
  admin panels and management systems in React, TypeScript and Laravel.
  Offers full-stack solutions — from pixel-perfect UIs to RESTful APIs — with
  clean, maintainable architecture. Recognized for mastering new technologies
  independently and consistently expanding beyond the role. The last 4 years
  have been spent developing as a full-stack engineer, delivering features
  end to end.`
}
