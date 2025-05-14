// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'
import clerk from '@clerk/astro'
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
// astro.config.mjs
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [clerk(), react()],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
})