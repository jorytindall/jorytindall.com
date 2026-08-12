import { test, expect } from '@playwright/test';

test.describe('Primary navigation links', () => {
	const routes = [
		{ name: 'About', path: '/about' },
		{ name: 'Portfolio', path: '/portfolio' },
		{ name: 'Music', path: '/music' },
		{ name: 'Events', path: '/events' },
		{ name: 'Speaking', path: '/speaking' },
		{ name: 'Blog', path: '/blog' },
		{ name: 'Contact', path: '/contact' },
	];

	routes.forEach((route) => {
		test(`should navigate to ${route.name}`, async ({ page }) => {
			await page.goto('http://localhost:3000');
			await page.click('button[aria-label="Toggle navigation menu"]');
			await page.click(`a[href="${route.path}"]`);
			await expect(page).toHaveURL(`http://localhost:3000${route.path}`);
		});
	});
});

test.describe('Footer navigation links', () => {
	const routes = [
		{ name: 'About', path: '/about' },
		{ name: 'Portfolio', path: '/portfolio' },
		{ name: 'Music', path: '/music' },
		{ name: 'Resume', path: '/resume' },
		{ name: 'Contact', path: '/contact' },
	];

	routes.forEach((route) => {
		test(`should navigate to ${route.name}`, async ({ page }) => {
			await page.goto('http://localhost:3000');

			// A click that lands during hydration is swallowed: React has attached its
			// handler and calls preventDefault, but the router is not ready to route
			// yet, so nothing happens and no error is raised. The primary-nav tests
			// above avoid this by accident — they click the menu toggle first, which
			// cannot work until hydration finishes. Here there is nothing to click
			// first, so retry the click until it actually navigates.
			await expect(async () => {
				await page.click(`footer a[href="${route.path}"]`);
				await expect(page).toHaveURL(`http://localhost:3000${route.path}`, {
					timeout: 2000,
				});
			}).toPass({ timeout: 20000 });
		});
	});
});
