import { createServer } from 'vite'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const vite = await createServer({
  root,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
  const appHtml = render()

  const templatePath = path.resolve(root, 'dist/index.html')
  const template = readFileSync(templatePath, 'utf-8')
  const marker = '<div id="root"></div>'

  if (!template.includes(marker)) {
    throw new Error('Root marker not found in dist/index.html — already prerendered?')
  }

  const html = template.replace(marker, () => `<div id="root">${appHtml}</div>`)
  writeFileSync(templatePath, html)
  console.log(
    `prerender: injected ${(appHtml.length / 1024).toFixed(1)} kB of markup into dist/index.html`,
  )
} finally {
  await vite.close()
}
