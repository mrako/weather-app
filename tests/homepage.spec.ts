import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login.page';

test('frontpage should show correct data', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login();
  await loginPage.isLoggedIn();

  // Verify there are two tempboxes
  const tempboxes = page.locator('div.col[role="button"]');
  await expect(tempboxes).toHaveCount(3);

  // Verify there is one temperature
  const temperature = page.locator('div.temperature[role="button"]');
  await expect(temperature).toHaveCount(1);

  // Verify there is one icon
  const icon = page.locator('#weather');
  await expect(icon).toHaveCount(1);

  // Verify at least four forecast boxes
  const forecastCount = await page.locator('.forecast-box').count();
  expect(forecastCount >= 4).toBeTruthy();
});
