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
      const data = JSON.stringify({
        result: 1.64123,
        success: true,
      });
      setTimeout(() => {
        route.fulfill({
          body: data,
        });
      }, 2000);
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

  test('get exchange rates', async ({ page }) => {
    await page.route(`${routes.geolocation}**`, (route) => {
      const data = JSON.stringify({
        currency: {
          currency_code: 'RUB',
        },
      });
      setTimeout(() => {
        route.fulfill({
          body: data,
        });
      }, 1000);
    });
    await page.route(`${routes.rates}?base=RUB&symbols=USD,EUR`, (route) => {
      const data = JSON.stringify({
        rates: {
          USD: 0.01666,
          EUR: 0.01611,
        },
      });
      setTimeout(() => {
        route.fulfill({
          body: data,
        });
      }, 1000);
    });
    await page.route(`${routes.rates}?base=USD&symbols=EUR`, (route) => {
      const data = JSON.stringify({
        rates: {
          EUR: 1.041,
        },
      });
      setTimeout(() => {
        route.fulfill({
          body: data,
        });
      }, 1000);
    });
    await page.route(`${routes.rates}?base=EUR&symbols=USD`, (route) => {
      const data = JSON.stringify({
        rates: {
          USD: 0.959,
        },
      });
      setTimeout(() => {
        route.fulfill({
          body: data,
        });
      }, 1000);
    });
    page.on('request', (request) => {
      console.log(request.url());
    });

    await page.click('.link-exchange');
    await expect(page.getByRole('status')).toHaveClass('spinner-border text-primary');
    await expect(page.locator('.spinner-border')).toHaveText('Loading...');
    await expect(page.locator('.list-group > li')).toHaveText(
      ['1 USD = 60.02 RUB', '1 EUR = 62.07 RUB'],
      { timeout: 3000 },
    );

    await page.fill('.form-control', 'USD');
    await page.click('.btn');
    await expect(page.getByRole('status')).toHaveClass('spinner-border text-primary');
    await expect(page.locator('.spinner-border')).toHaveText('Loading...');
    await expect(page.locator('.list-group')).toHaveText(
      ['1 EUR = 0.96 USD'],
      { timeout: 3000 },
    );

    await page.fill('.form-control', 'EUR');
    await page.click('.btn');
    await expect(page.getByRole('status')).toHaveClass('spinner-border text-primary');
    await expect(page.locator('.spinner-border')).toHaveText('Loading...');
    await expect(page.locator('.list-group')).toHaveText(
      ['1 USD = 1.04 EUR'],
      { timeout: 3000 },
    );
  });
});
