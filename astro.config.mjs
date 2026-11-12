// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://roshanashraf.pages.dev',
  output: 'static',
  integrations: [mdx()],
  image: {
    formats: ['avif', 'webp'],
    quality: 92,
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
