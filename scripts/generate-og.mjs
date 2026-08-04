import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Carlos Abarca - Senior Front-End and Full Stack Developer">
  <defs>
    <linearGradient id="amber" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#F6C469"/>
      <stop offset="0.6" stop-color="#F2A93B"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.85" cy="0" r="0.7">
      <stop offset="0" stop-color="#F2A93B" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#F2A93B" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.05" cy="1.1" r="0.8">
      <stop offset="0" stop-color="#43B389" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#43B389" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0A100E"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>

  <rect x="40" y="40" width="1120" height="550" rx="18" fill="none" stroke="#EDEAE1" stroke-opacity="0.12"/>

  <g font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">
    <text x="72" y="86" font-size="18" letter-spacing="4" fill="#7E8B81">carlos_abarca / full-stack portfolio</text>
    <circle cx="1010" cy="80" r="5" fill="#43B389"/>
    <text x="1026" y="86" font-size="16" letter-spacing="2" fill="#43B389">OPEN TO WORK</text>
  </g>

  <g font-family="'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" font-weight="700">
    <text x="68" y="316" font-size="100" fill="#EDEAE1">Front-End craft.</text>
    <text x="68" y="432" font-size="100" fill="#EDEAE1">Full-Stack <tspan fill="url(#amber)">reach.</tspan></text>
  </g>

  <g font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace" font-size="22" fill="#B6C1B8">
    <text x="72" y="500">7 yrs programming</text>
    <text x="330" y="500" fill="#F2A93B">✦</text>
    <text x="362" y="500">4 yrs full-stack</text>
    <text x="588" y="500" fill="#F2A93B">✦</text>
    <text x="620" y="500">12+ modules shipped</text>
  </g>

  <g font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace" font-size="18" fill="#7E8B81">
    <text x="72" y="566">carlos.abarca00@gmail.com</text>
    <text x="430" y="566">·</text>
    <text x="456" y="566">github.com/CarlosAbarcaDev</text>
    <text x="890" y="566" fill="#EDEAE1">carlosabarca.is-a.dev</text>
  </g>
</svg>`

const out = path.resolve(root, 'public/og-image.png')
await sharp(Buffer.from(svg), { density: 150 }).png().toFile(out)
console.log(`og-image: wrote ${out}`)
