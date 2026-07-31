import { useEffect, useState } from 'react'

type LightboxProps = {
  images: string[]
  initialIndex: number
  onClose: () => void
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const total = images.length

  const go = (next: number) => {
    setIndex((next + total) % total)
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const lenis = (window as { __lenis?: { stop: () => void; start: () => void } })
      .__lenis
    lenis?.stop()

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      lenis?.start()
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const name = images[index].split('/').pop() ?? ''

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-xs text-bone/70">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ·{' '}
          {name}
        </span>
        <button
          onClick={onClose}
          className="rounded-full border border-bone/30 px-4 py-1.5 font-mono text-xs text-bone transition-colors hover:bg-bone hover:text-ink"
          aria-label="Close viewer"
        >
          Esc / Close
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-5 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-bone/30 px-4 py-2 font-mono text-lg text-bone transition-colors hover:bg-bone hover:text-ink md:left-8"
          aria-label="Previous screenshot"
        >
          ←
        </button>

        <img
          src={images[index]}
          alt={`Screenshot ${index + 1}: ${name}`}
          className="max-h-[78vh] max-w-[calc(100%-6rem)] rounded-lg border border-bone/20 object-contain shadow-2xl"
        />

        <button
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-bone/30 px-4 py-2 font-mono text-lg text-bone transition-colors hover:bg-bone hover:text-ink md:right-8"
          aria-label="Next screenshot"
        >
          →
        </button>
      </div>

      <div
        className="flex items-center justify-center gap-2 px-5 pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to screenshot ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-signal' : 'w-1.5 bg-bone/30 hover:bg-bone/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
