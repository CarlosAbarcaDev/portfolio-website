import { skills } from '../data/site'
import { Reveal } from './Reveal'

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-y border-line bg-panel py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <Reveal as="p" className="eyebrow">
          // skills
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        >
          Toolbox
        </Reveal>

        <dl className="mt-10">
          {skills.map((group, i) => (
            <Reveal
              key={group.category}
              y={16}
              className={`grid gap-2 border-t border-line py-5 md:grid-cols-[200px_1fr] md:gap-10 ${
                i === skills.length - 1 ? 'border-b' : ''
              }`}
            >
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {group.category}
              </dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-sm text-ink"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
