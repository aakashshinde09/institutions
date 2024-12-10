import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import magicSvg from 'vite-plugin-magical-svg'

const getAlias = (name: string) => {
  return {
    find: `@${name}`,
    replacement: new URL(`./src/${name}`, import.meta.url).pathname,
  }
}

const alias = ['app', 'pages', 'entities', 'shared', 'features', 'widgets']

export default defineConfig({
  plugins: [react(), tsconfigPaths(), magicSvg({ target: 'react' })],
  resolve: {
    alias: alias.map((alia) => getAlias(alia)),
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
