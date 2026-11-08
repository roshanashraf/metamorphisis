import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    // *.content.md is a working draft, not a project page.
    pattern: ['**/*.{md,mdx}', '!**/*.content.md'],
    base: './src/content/projects',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number(),
      role: z.string(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      status: z.enum(['stub', 'published']).default('stub'),
      seo: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { projects };
