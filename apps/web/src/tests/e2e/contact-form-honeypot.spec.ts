import { test, expect } from '@playwright/test';

test.describe('Contact form honeypot protection', () => {
	test('honeypot field should be hidden from view', async ({ page }) => {
		await page.goto('http://localhost:3000/contact');

		const honeypotField = page.locator('input[name="website"]');
		await expect(honeypotField).toBeAttached();

		// Deliberately NOT asserted with `toBeHidden()`. A honeypot has to stay
		// fillable-looking to a bot, so it must not use `display: none` or
		// `visibility: hidden` — bots skip those. It is hidden from people by being
		// positioned off-screen and fully transparent, which Playwright still counts
		// as visible because the element keeps a non-empty bounding box.
		const box = await honeypotField.boundingBox();
		expect(box).not.toBeNull();
		expect(box!.x + box!.width).toBeLessThan(0);

		const honeypotContainer = honeypotField.locator('..');
		await expect(honeypotContainer).toHaveAttribute('aria-hidden', 'true');
		await expect(honeypotContainer).toHaveCSS('opacity', '0');
	});

	test('honeypot field should have tabindex -1', async ({ page }) => {
		await page.goto('http://localhost:3000/contact');

		const honeypotField = await page.locator('input[name="website"]');
		const tabIndex = await honeypotField.getAttribute('tabindex');
		expect(tabIndex).toBe('-1');
	});

	test('should silently reject submission when honeypot is filled', async ({ page }) => {
		await page.goto('http://localhost:3000/contact');

		await page.fill('input[name="name"]', 'Bot McBotface');
		await page.fill('input[name="email"]', 'bot@example.com');
		await page.fill('textarea[name="message"]', 'This is a spam message');

		await page.evaluate(() => {
			const honeypot = document.querySelector('input[name="website"]') as HTMLInputElement;
			if (honeypot) honeypot.value = 'https://spam-site.com';
		});

		await page.click('button[type="submit"]');

		await expect(
			page.locator('text=Your email message has been sent successfully'),
		).toBeVisible({
			timeout: 10000,
		});
	});

	test('should successfully submit when honeypot is empty', async ({ page }) => {
		await page.goto('http://localhost:3000/contact');

		await page.fill('input[name="name"]', 'John Coltrane');
		await page.fill('input[name="email"]', 'john@coltrane.com');
		await page.fill('textarea[name="message"]', 'This is a legitimate message');

		const honeypotValue = await page.inputValue('input[name="website"]');
		expect(honeypotValue).toBe('');

		await page.click('button[type="submit"]');

		await expect(
			page.locator('text=Your email message has been sent successfully'),
		).toBeVisible({
			timeout: 10000,
		});
	});
});
