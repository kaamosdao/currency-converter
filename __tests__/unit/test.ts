import { expect, test } from '@jest/globals';
import { getExchangeCurrencies } from '../../src/slices/exchangeRatesSlice';
import errorHandler from '../../src/utils/errorHandlers';
import parseQuery from '../../src/utils/parseQuery';

test('errorHandler function', () => {
  expect(errorHandler('400')).toBe('Incorrect parameters in request, please try again');
  expect(errorHandler('401')).toBe('Internal error, please try later');
  expect(errorHandler('429')).toBe('Internal error, please try later');
});

test('parseQuery function', () => {
  expect(parseQuery('15 rub to usd')).toEqual({ from: 'RUB', to: 'USD', amount: '15' });
  expect(parseQuery('15 rUb to UsD')).toEqual({ from: 'RUB', to: 'USD', amount: '15' });
});

test('parseQuery function', () => {
  expect(getExchangeCurrencies('RUB')).toBe('USD,EUR');
  expect(getExchangeCurrencies('USD')).toBe('EUR');
  expect(getExchangeCurrencies('EUR')).toBe('USD');
});
