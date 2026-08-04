import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      window.__lenis = undefined
      lenis.destroy()
    }
  }, [])
}

declare global {
  interface Window {
    __lenis?: { stop: () => void; start: () => void }
  }
}
