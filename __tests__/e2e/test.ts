/* eslint-disable @typescript-eslint/no-floating-promises */
import { test, expect } from '@playwright/test';
import routes from '../../src/utils/routes';

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

test.describe('good requests, data handling', () => {
  test('currency convertation', async ({ page }) => {
    await page.route(`${routes.convert}**`, (route) => {
      setTimeout(() => {
        route.fulfill({
          body: JSON.stringify({
            result: 1.64123,
            success: true,
          }),
        });
      }, 2000);
    });
    page.on('request', (request) => {
      console.log(request.url());
    });
    await page.fill('.form-control', '100 rub in usd');
    await page.click('.btn');
    await expect(page.getByRole('status')).toHaveClass('spinner-border text-primary');
    await expect(page.locator('.spinner-border')).toHaveText('Loading...');
    await expect(page.locator('.result')).toHaveText(
      'Convertation: 100 RUB in USD = 1.64123',
      { timeout: 3000 },
    );
  });
});
