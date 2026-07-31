import { profile } from '../data/site'
import { Reveal } from './Reveal'

export function Contact() {
  const links = [
    {
      label: 'email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      label: 'linkedin',
      value: profile.linkedinLabel,
      href: profile.linkedin,
    },
    {
      label: 'github',
      value: profile.githubLabel,
      href: profile.github,
    },
    {
      label: 'phone',
      value: profile.phone,
      href: `tel:${profile.phoneRaw}`,
    },
  ]

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal as="p" className="eyebrow">
          // contact
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl"
        >
          Have a role or a project in mind? Let’s talk.
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {links.map((link, i) => (
            <Reveal key={link.label} y={16} delay={i * 0.04}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex items-baseline justify-between gap-4 bg-panel px-6 py-6 transition-colors hover:bg-ink"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted group-hover:text-bone/60">
                  {link.label}
                </span>
                <span className="text-right font-mono text-sm text-ink group-hover:text-bone">
                  {link.value}
                  <span className="ml-2 inline-block text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          delay={0.15}
          className="mt-8 font-mono text-sm text-muted"
        >
          {profile.location}
        </Reveal>
      </div>
    </section>
  )
}
