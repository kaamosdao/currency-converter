import { test, expect } from '@playwright/test';
import nock from 'nock';
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

  await page.click('.link-exchange');
  await expect(page.locator('.btn')).toHaveText('Change');
  await expect(page.locator('.form-control')).toHaveId('currency');
});

// test.describe('handle todos', () => {
//   test.beforeAll(async ({ page }) => {
//     nock(routes.geolocation)
//       .get('')
//       .query({ api_key: process.env.REACT_APP_GEO_KEY })
//       .delay(2000)
//       .reply(200, { data: { currency: { currency_code: 'RUB' } } });

//     nock(routes.rates, {
//       reqheaders: {
//         apikey: process.env.REACT_APP_RATES_KEY as string,
//       },
//     })
//       .get('')
//       .query({
//         base: 'RUB',
//         symbols: 'USD,EUR',
//       })
//       .delay(2000)
//       .reply(200, { data: { rates: { USD: 0.001611, EUR: 0.001655 } } });

//     nock(routes.convert, {
//       reqheaders: {
//         apikey: process.env.REACT_APP_RATES_KEY as string,
//       },
//     })
//       .get('')
//       .query({
//         from: 'RUB',
//         to: 'USD',
//         amount: 100,
//       })
//       .delay(2000)
//       .reply(200, { data: { result: 1.64 } });
//   });

//   test.afterAll(async () => {
//     nock.cleanAll();
//     nock.enableNetConnect();
//   });

//   test('add correct task', async ({ page }) => {
//     expect(await page.$('text=buy beer')).not.toBeNull();
//     expect(await page.$('text=feed cat')).not.toBeNull();
//     expect(await page.$('text=drink beer')).not.toBeNull();
//   });

//   test('add incorrect task', async ({ page }) => {
//     await page.fill('input[type="text"]', '');
//     await page.click('button[type="submit"]');
//     expect(await page.$('text=Should not be empty')).not.toBeNull();

//     await page.fill('input[type="text"]', '1234567890123456789012345678901');
//     await page.click('button[type="submit"]');
//     expect(await page.$('text=Should not exceed 30 symbols')).not.toBeNull();
//   });

//   test('check task', async ({ page }) => {
//     expect(await page.isChecked('#todo1')).toBeTruthy();
//     expect(await page.isChecked('#todo2')).toBeTruthy();
//     expect(await page.isChecked('#todo3')).toBeFalsy();
//   });

//   test('filter task', async ({ page }) => {
//     await page.check('#radioCompleted');
//     expect(await page.isChecked('#radioCompleted')).toBeTruthy();
//     expect(await page.$('text=buy beer')).not.toBeNull();
//     expect(await page.$('text=feed cat')).not.toBeNull();
//     expect(await page.$('text=drink beer')).toBeNull();

//     await page.check('#radioUnfinished');
//     expect(await page.isChecked('#radioUnfinished')).toBeTruthy();
//     expect(await page.$('text=buy beer')).toBeNull();
//     expect(await page.$('text=feed cat')).toBeNull();
//     expect(await page.$('text=drink beer')).not.toBeNull();

//     await page.check('#radioAll');
//     expect(await page.isChecked('#radioAll')).toBeTruthy();
//     expect(await page.$('text=buy beer')).not.toBeNull();
//     expect(await page.$('text=feed cat')).not.toBeNull();
//     expect(await page.$('text=drink beer')).not.toBeNull();
//   });

//   test('count task', async ({ page }) => {
//     expect(await page.$('text=Completed: 2')).not.toBeNull();
//     expect(await page.$('text=Unfinished: 1')).not.toBeNull();

//     await page.uncheck('#todo1');
//     await page.uncheck('#todo2');
//     expect(await page.$('text=Completed: 0')).not.toBeNull();
//     expect(await page.$('text=Unfinished: 3')).not.toBeNull();
//   });
// });

// test.describe('handle errors', () => {
//   test.beforeAll(async ({ page }) => {
//     nock(routes.geolocation)
//       .get('')
//       .query({ api_key: process.env.REACT_APP_GEO_KEY })
//       .delay(2000)
//       .replyWithError({ code: 400, message: 'Bad request' }); // 429 The request was aborted due to insufficient API credits.

//     nock(routes.rates, {
//       reqheaders: {
//         apikey: process.env.REACT_APP_RATES_KEY as string,
//       },
//     })
//       .get('')
//       .query({ api_key: process.env.REACT_APP_GEO_KEY })
//       .delay(2000)
//       .replyWithError({
//         code: 400,
//         message:
//           'The request was unacceptable, often due to missing a required parameter.',
//       }); // 429 API request limit exceeded. See section Rate Limiting for more info.

//     nock(routes.convert, {
//       reqheaders: {
//         apikey: process.env.REACT_APP_RATES_KEY as string,
//       },
//     })
//       .get('')
//       .query({
//         from: 'RUB',
//         to: 'USD',
//         amount: 100,
//       })
//       .delay(2000)
//       .replyWithError({
//         code: 400,
//         message:
//           'The request was unacceptable, often due to missing a required parameter.',
//       }); // 429 API request limit exceeded. See section Rate Limiting for more info.
//   });

//   test.afterAll(async () => {
//     nock.cleanAll();
//     nock.enableNetConnect();
//   });
// });
