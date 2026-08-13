import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './src/tests',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/*
	 * The Next dev server compiles routes lazily, so the first navigation to a cold
	 * route can take well over the 5s default while several workers hit it at once.
	 * That is startup cost, not the thing under test.
	 */
	expect: { timeout: 15_000 },
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],

	/*
	 * Run the dev server before starting the tests. Locally, secrets come from
	 * Infisical; in CI they are already in the environment via GitHub secrets, and
	 * `infisical` is not installed there at all.
	 */
	webServer: {
		command: process.env.CI ? 'pnpm dev:ci' : 'infisical run -- pnpm dev',
		url: 'http://127.0.0.1:3000',
		// The contact form tests submit for real. Without this the suite delivers
		// three live emails per run, one per browser.
		env: { E2E_TEST_MODE: 'true' },
		// Never reuse a server this config did not start. A `pnpm web:dev` already
		// on :3000 would not have E2E_TEST_MODE set, and the suite would silently go
		// back to sending real mail. Failing with "port already in use" is the safer
		// outcome — stop the dev server and re-run.
		reuseExistingServer: false,
	},
});
