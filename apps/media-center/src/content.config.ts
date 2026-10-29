import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
	// Astro 6 removed implicit `type: 'content'` collections — every collection needs an
	// explicit loader now. `id` comes from the filename without its extension, so a
	// `getting-started.mdx` entry has the id `getting-started` and routes straight to
	// `/docs/getting-started`.
	loader: glob({ base: './src/content/docs', pattern: '**/*.mdx' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		order: z.number(),
		category: z.string().default('general'),
	}),
});

export const collections = { docs };
