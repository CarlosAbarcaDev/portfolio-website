import { profile } from '../data/site'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © 2026 {profile.name}
        </p>
        <p className="font-mono text-xs text-muted">
          <span className="text-signal">▊</span> built with React + TypeScript +
          Vite
        </p>
        <a
          href="#top"
          className="font-mono text-xs text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-muted"
        >
          back to top ↑
        </a>
      </div>
    </footer>
  )
}
