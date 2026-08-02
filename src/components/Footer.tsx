import { profile } from '../data/site'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © 2026 {profile.name}
        </p>
        <div className="flex items-center gap-5 font-mono text-xs text-muted">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <span className="hidden sm:inline">
            <span className="text-signal">▊</span> built with React + TypeScript +
            Vite
          </span>
        </div>
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
