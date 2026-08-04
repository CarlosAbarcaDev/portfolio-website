import { skills } from '../data/site'
import { Reveal } from './Reveal'

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-y border-line bg-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal as="p" className="eyebrow">
              // skills
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="mt-3 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl"
            >
              Toolbox
            </Reveal>
          </div>
          <Reveal as="p" delay={0.1} className="hidden pb-1 font-mono text-xs text-muted sm:block">
            $ tools --list --production
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal
              key={group.category}
              y={16}
              delay={(i % 2) * 0.05}
              className="panel flex flex-col gap-4 rounded-xl p-5 transition-colors hover:border-line-strong md:p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-cream">
                  {group.category}
                </h3>
                <span className="font-mono text-[10px] text-signal">
                  ⌘ {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[13px] text-cream/90 transition-colors hover:border-signal/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          delay={0.1}
          className="mt-8 font-mono text-xs text-muted"
        >
          <span className="text-signal">▸</span> current focus: Node.js + Express
          + TypeScript + MongoDB
        </Reveal>
      </div>
    </section>
  )
}
