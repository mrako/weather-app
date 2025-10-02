import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login.page';

test('clicking tempbox should open metrics page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login();
  await loginPage.isLoggedIn();

  // Click the first tempbox
  const tempbox = page.locator('div.col[role="button"]').first();
  await tempbox.click();

  // Verify redirection to the metrics page (assuming the URL changes)
  await expect(page).toHaveURL(/\/tags\/.+/);
});
