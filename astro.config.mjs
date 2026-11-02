// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://roshanashraf.pages.dev',
  output: 'static',
  integrations: [mdx()],
  image: {
    // Prefer modern formats for the image pipeline smoke test / future covers
    formats: ['avif', 'webp'],
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
