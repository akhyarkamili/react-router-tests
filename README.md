# React Router Testing Example

This project demonstrates testing strategies for React Router v7, focusing on end-to-end testing with Playwright.

## Tech Stack

- React + TypeScript + Vite
- React Router v7
- Playwright (E2E Testing)

## Tests Implemented

### End-to-End Tests

1. **404 Page Testing**
   ```typescript
   test('should show 404 page for non-existent routes', async ({ page }) => {
     await page.goto('/non-existent-route');
     await expect(page.getByText('404')).toBeVisible();
   });
   ```

2. **Route Navigation and State**
   ```typescript
   test('should reset state during navigation', async ({ page }) => {
     await page.goto('/');
     await page.getByRole('button', { name: 'Increment' }).click();
     await expect(page.getByText('Count: 1')).toBeVisible();
     
     await page.getByRole('link', { name: 'About' }).click();
     await page.getByRole('link', { name: 'Home' }).click();
     await expect(page.getByText('Count: 0')).toBeVisible();
   });
   ```

## Running the Tests

```bash
npm install
npm run dev
npx playwright test
```

## Key Learnings

- React Router v7 resets component state during navigation by default
- Playwright effectively tests both client-side navigation and direct URL access
- Component state management needs to be handled separately if persistence is needed during navigation
