/* eslint-disable no-unused-vars */
import { SerializedError } from '@reduxjs/toolkit';
import { loadingType, thunkError } from './types';

interface IRate {
  readonly [rateName: string]: string;
}

export interface IExchangeRatesState {
  readonly baseCurrency: string;
  readonly rates: IRate;
  readonly loadingStatus: loadingType;
  readonly error: thunkError;
}

export interface IRequestError extends SerializedError {
  readonly message: string;
  readonly code: string;
}

export interface IConvertationState {
  readonly result: string;
  readonly loadingStatus: loadingType;
  readonly error: thunkError;
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
