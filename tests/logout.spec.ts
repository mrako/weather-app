import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login.page';

test('navigate to settings, logout and verify login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login();
  await loginPage.isLoggedIn();

  await page.goto('/settings');

  await page.click('button#logout');

  await expect(page.locator('#email')).toBeVisible();
  await expect(page).toHaveURL('/login');
});
