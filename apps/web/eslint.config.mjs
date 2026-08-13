import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
	...nextVitals,
	globalIgnores([
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
		'.turbo/**',
		// Generated Playwright artifacts — gitignored, but ESLint's flat config
		// does not read .gitignore, so they have to be listed here too.
		'playwright-report/**',
		'test-results/**',
		'blob-report/**',
		'playwright/.cache/**',
	]),
]);

export default eslintConfig;
