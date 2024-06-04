import { test, expect } from '@playwright/test';

test.describe('Primary navigation links', () => {
  const routes = [
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Music', path: '/music' },
    { name: 'Events', path: '/events' },
    { name: 'Speaking', path: '/speaking' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ]

  
  routes.forEach(route => {
    test(`should navigate to ${route.name}`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.click('button[aria-label="Toggle navigation menu"]');
      await page.click(`a[href="${route.path}"]`);
      await expect(page).toHaveURL(`http://localhost:3000${route.path}`);
    });
  })
})

test.describe('Footer navigation links', () => {
  const routes = [
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Music', path: '/music' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' }
  ]

  routes.forEach(route => {
    test(`should navigate to ${route.name}`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.click(`footer a[href="${route.path}"]`);
      await expect(page).toHaveURL(`http://localhost:3000${route.path}`);
    });
  });
})