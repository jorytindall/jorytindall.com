import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'no-undef': 'off',
			'svelte/valid-prop-names-in-kit-pages': 'off',
			'svelte/no-navigation-without-resolve': 'off',
		},
	},
	// Plain TypeScript files need the TS parser outright. `.svelte` files keep the
	// svelte parser from flat/recommended and get the TS parser nested, so that
	// `<script lang="ts">` blocks parse. Only the parser is pulled in, not the
	// typescript-eslint rule sets — this config exists to make `pnpm verify` run,
	// not to add new rules.
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: ts.parser,
		},
		rules: {
			// The base rule reads parameter names in `interface` method signatures
			// as unused variables. `svelte-check` covers unused code in TS properly.
			'no-unused-vars': 'off',
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
	{
		ignores: [
			'.DS_Store',
			'node_modules/',
			'build/',
			'.svelte-kit/',
			'package/',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock',
		],
	},
];
