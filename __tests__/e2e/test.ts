import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4242/');
});

test('page elements', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('Currency Converter');
  await expect(page.locator('.link-convertation')).toHaveText('Convertation');
  await expect(page.locator('.link-exchange')).toHaveText('ExchangeRates');
  await expect(page.locator('.btn')).toHaveText('Convert');
  await expect(page.locator('.form-control')).toHaveId('converterQuery');
  await expect(page.locator('.result')).toHaveText('Convertation: ');

  await page.click('.link-exchange');
  await expect(page.locator('.btn')).toHaveText('Change');
  await expect(page.locator('.form-control')).toHaveId('currency');
});
