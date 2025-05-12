// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'
import clerk from '@clerk/astro'
// astro.config.mjs
export default defineConfig({
  integrations: [clerk()],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
})

