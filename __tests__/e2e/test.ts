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
  expect(await page.$('text=Convertation: ')).not.toBeNull();

  await page.click('.link-exchange');
  // await expect(page.locator('.btn')).toHaveText('Change');
  await expect(page.locator('.form-control')).toHaveId('currency');
});

test.describe('good requests, data handling', () => {
  test.beforeAll(async () => {
    // nock(routes.geolocation)
    //   .get('')
    //   .query({ api_key: process.env.REACT_APP_GEO_KEY })
    //   .delay(2000)
    //   .reply(200, { data: { currency: { currency_code: 'RUB' } } });

    // nock(routes.rates, {
    //   reqheaders: {
    //     apikey: process.env.REACT_APP_RATES_KEY as string,
    //   },
    // })
    //   .get('')
    //   .query({
    //     base: 'RUB',
    //     symbols: 'USD,EUR',
    //   })
    //   .delay(2000)
    //   .reply(200, { data: { rates: { USD: 0.001611, EUR: 0.001655 } } });

    // nock(routes.convert, {
    //   reqheaders: {
    //     apikey: process.env.REACT_APP_RATES_KEY as string,
    //   },
    // })
    //   .get('')
    //   .query({
    //     from: 'RUB',
    //     to: 'USD',
    //     amount: 100,
    //   })
    //   // .delay(2000)
    //   .reply(200, { data: { result: 1.64123 } });
  });

  test.afterAll(async () => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test('currency convertation', async ({ page }) => {
    nock('https://api.apilayer.com/exchangerates_data', {
      reqheaders: {
        apikey: process.env.REACT_APP_RATES_KEY as string,
      },
    })
      .get('/convert')
      .query({
        from: 'RUB',
        to: 'USD',
        amount: 100,
      })
      // .delay(2000)
      .reply(200, { data: { result: 1.64123 } });

    await page.fill('.form-control', '15 rub in usd');
    await page.click('.btn');
    await expect(page.getByRole('status')).toHaveClass('spinner-border text-primary');
    await expect(page.locator('.spinner-border')).toHaveText('Loading...');
    // expect(await page.$('text=Convertation: Internal error, please try later')).not.toBeNull();
  });
});

// test.describe('bad requests, handling errors', () => {
//   test.beforeAll(async ({ page }) => {
//     nock(routes.geolocation)
//       .get('')
//       .query({ api_key: process.env.REACT_APP_GEO_KEY })
//       .delay(2000)
//       .replyWithError({ code: 400, message: 'Bad request' });
// 429 The request was aborted due to insufficient API credits.

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
