/* eslint-disable no-unused-vars */
import { SerializedError } from '@reduxjs/toolkit';
import { loadingType, thunkError } from './types';

interface IRate {
  readonly [rateName: string]: number;
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

export interface IConvertationResponse {
  readonly date: string,
  readonly historical: string,
  readonly info: {
    readonly rate: number,
    readonly timestamp: number
  },
  readonly query: {
    readonly amount: number,
    readonly from: string,
    readonly to: string
  },
  readonly result: number,
  readonly success: boolean
}

export interface IRatesResponse {
  readonly base: string,
  readonly date: string,
  readonly rates: {
    readonly [rate: string]: number,
  },
  readonly success: boolean,
  readonly timestamp: number
}

export interface IGeolocationResponse {
  readonly ip_address: string,
  readonly city: string,
  readonly city_geoname_id: number,
  readonly region: string,
  readonly region_iso_code: string,
  readonly region_geoname_id: number,
  readonly postal_code: string,
  readonly country: string,
  readonly country_code: string,
  readonly country_geoname_id: number,
  readonly country_is_eu: boolean,
  readonly continent: string,
  readonly continent_code: string,
  readonly continent_geoname_id: number,
  readonly longitude: number,
  readonly latitude: number,
  readonly security: {
    readonly is_vpn: boolean
  },
  readonly timezone: {
    readonly name: string,
    readonly abbreviation: string,
    readonly gmt_offset: number,
    readonly current_time: string,
    readonly is_dst: boolean
  },
  readonly flag: {
    readonly emoji: string,
    readonly unicode: string,
    readonly png: string,
    readonly svg: string
  },
  readonly currency: {
    readonly currency_name: string,
    readonly currency_code: string
  },
  readonly connection: {
    readonly autonomous_system_number: number,
    readonly autonomous_system_organization: string,
    readonly connection_type: string,
    readonly isp_name: string,
    readonly organization_name: string
  }
}

export default IRate;
