import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type LightboxProps = {
  images: string[]
  initialIndex: number
  onClose: () => void
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const total = images.length
  const drag = useRef<{ x: number; y: number } | null>(null)

  const go = (delta: number) => {
    setIndex((prev) => (prev + delta + total) % total)
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

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0]
    drag.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = drag.current
    drag.current = null
    if (!start) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (dy > 80 && Math.abs(dy) > Math.abs(dx)) onClose()
  }

  const name = images[index].split('/').pop() ?? ''

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-deep/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-xs text-cream/70">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ·{' '}
          {name}
        </span>
        <button
          onClick={onClose}
          className="rounded-full border border-cream/30 px-4 py-1.5 font-mono text-xs text-cream transition-colors hover:bg-cream hover:text-base"
          aria-label="Close viewer"
        >
          Esc / Close
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-5 pb-8 touch-pan-y"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cream/30 px-4 py-2 font-mono text-lg text-cream transition-colors hover:bg-cream hover:text-base md:left-8"
          aria-label="Previous screenshot"
        >
          ←
        </button>

        <img
          src={images[index]}
          alt={`Screenshot ${index + 1}: ${name}`}
          className="max-h-[78vh] max-w-[calc(100%-6rem)] rounded-lg border border-cream/20 object-contain shadow-2xl"
        />

        <button
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cream/30 px-4 py-2 font-mono text-lg text-cream transition-colors hover:bg-cream hover:text-base md:right-8"
          aria-label="Next screenshot"
        >
          →
        </button>

        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-cream/30 font-mono text-sm text-cream transition-colors hover:bg-cream hover:text-base md:hidden"
          aria-label="Close viewer"
        >
          ✕
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
              i === index ? 'w-6 bg-signal' : 'w-1.5 bg-cream/30 hover:bg-cream/60'
            }`}
          />
        ))}
      </div>
    </div>,
    document.body,
  )
}
