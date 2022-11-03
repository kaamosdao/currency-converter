/* eslint-disable no-unused-vars */
import { AxiosInstance } from 'axios';

interface IRate {
  readonly [rateName: string]: string;
}

export interface IExchangeRatesState {
  readonly baseCurrency: string;
  readonly rates: IRate;
}

export interface IRoutes {
  readonly [routeName: string]: string;
}

export interface IFormConvert {
  readonly converterQuery: string;
}

export interface IFormExchange {
  readonly currency: string;
}

export interface IMakeRequest {
  readonly client: AxiosInstance;

  readonly routes: IRoutes;

  readonly convertCurrency: (from: string, to: string, amount: string) => Promise<number>;
  readonly getCurrency: () => Promise<string>;
  readonly getExchangeRates: (baseCurrency: string) => Promise<IRate>;
}

export interface IParsedQuery {
  readonly from: string;
  readonly to: string;
  readonly amount: string;
}

export interface ILocalStorageData {
  readonly key: string;

  readonly setData: (data: string) => void;
  readonly getData: () => string;
  readonly hasData: () => boolean;
}

export default IRate;
