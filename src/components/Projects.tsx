import { useState } from 'react'
import { projects } from '../data/projects'
import { Reveal } from './Reveal'
import { Lightbox } from './Lightbox'

function Gallery({ images, label }: { images: string[]; label: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [main, setMain] = useState(0)

  return (
    <div className="mt-8">
      <button
        onClick={() => setLightboxIndex(main)}
        className="group block w-full overflow-hidden rounded-lg border border-line bg-panel text-left"
        aria-label={`Open ${label} screenshot viewer`}
      >
        <img
          src={images[main]}
          alt={`${label} — screenshot ${main + 1}`}
          className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>

      <div className="mt-3 flex items-stretch gap-2 overflow-x-auto pb-2">
        {images.slice(1).map((src, i) => (
          <button
            key={src}
            onClick={() => {
              setMain(i + 1)
            }}
            aria-label={`Show screenshot ${i + 2}`}
            className={`shrink-0 overflow-hidden rounded-md border transition-all ${
              main === i + 1
                ? 'border-ink ring-2 ring-ink/20'
                : 'border-line opacity-80 hover:opacity-100'
            }`}
          >
            <img src={src} alt="" className="h-14 w-24 object-cover object-top" />
          </button>
        ))}
      </div>

      <p className="mt-1 font-mono text-[11px] text-muted">
        {images.length} screenshots · click to view full size
      </p>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}

function ProjectPanel({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  return (
    <Reveal
      as="article"
      y={24}
      className="border-t border-line py-12 md:py-16"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-mono text-xs text-signal">
          P.{String(index + 1).padStart(2, '0')} · {project.kicker}
        </p>
        <span className="font-mono text-xs text-muted">{project.role}</span>
      </div>

      <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {project.name}
      </h3>

      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-body">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      {project.images.length > 0 ? (
        <Gallery images={project.images} label={project.name} />
      ) : project.visual ? (
        <div className="mt-8">
          <div className="overflow-hidden rounded-lg border border-line bg-panel">
            <div className="flex items-center gap-1.5 border-b border-line bg-panel px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D95B43]" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal" />
              <span className="h-2.5 w-2.5 rounded-full bg-ok" />
              <span className="ml-3 font-mono text-[11px] text-muted">
                operatortool.local / cozumel
              </span>
            </div>
            <div className="grid place-items-center bg-bone px-6 py-12">
              <img
                src={project.visual}
                alt="Operator Mobile Tool visual"
                className="max-h-40 rounded-md border border-line bg-white p-3"
              />
            </div>
          </div>
          <p className="mt-2 font-mono text-[11px] text-muted">
            React + TypeScript + Vite companion tool · internal preview
          </p>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 text-[15px] leading-relaxed text-body md:grid-cols-2">
        {project.description.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </Reveal>
  )
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal as="p" className="eyebrow">
          // projects
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        >
          Documented work
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-body"
        >
          Three systems shipped in the field — each with its own documentation
          and the screenshots to prove it.
        </Reveal>

        {projects.map((project, i) => (
          <ProjectPanel key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
