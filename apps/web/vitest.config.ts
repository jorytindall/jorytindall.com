import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		// Unit tests only. Playwright owns src/tests/e2e/*.spec.ts and must not be picked up.
		include: ['src/**/*.test.{ts,tsx}'],
		environment: 'node',
	},
});
