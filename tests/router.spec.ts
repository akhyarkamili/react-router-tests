import { test, expect } from '@playwright/test';

test('should show 404 page for non-existent routes', async ({ page }) => {
  // Direct navigation to non-existent route
  await page.goto('/non-existent-route');
  
  // Check that we see the 404 text
  await expect(page.getByText('404')).toBeVisible();
  await expect(page.getByText('Page not found')).toBeVisible();
});

test('should reset state during navigation', async ({ page }) => {
  // Start at home page
  await page.goto('/');
  
  // Click increment button
  await page.getByRole('button', { name: 'Increment' }).click();
  await expect(page.getByText('Count: 1')).toBeVisible();
  
  // Navigate to about page
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByText('About Page')).toBeVisible();
  
  // Navigate back home and verify state is reset
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByText('Count: 0')).toBeVisible();
}); 