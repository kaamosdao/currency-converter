/* eslint-disable functional/no-class */
/* eslint-disable functional/no-this-expression */
import { AxiosInstance } from 'axios';
import IRate, { IRoutes } from './interfaces/interfaces';

class MakeRequest {
  readonly client: AxiosInstance;

  readonly routes: IRoutes;

  constructor(client: AxiosInstance, routes: IRoutes) {
    this.client = client;
    this.routes = routes;
  }

  async convertCurrency(from: string, to: string, amount: string): Promise<number> {
    const response = await this.client.get(this.routes.convert, {
      params: { from, to, amount },
      headers: { apikey: process.env.REACT_APP_RATES_KEY },
    });
    return response.data.result;
  }

  async getCurrency(): Promise<string> {
    const response = await this.client.get(this.routes.geolocation, {
      params: {
        api_key: process.env.REACT_APP_GEO_KEY,
      },
    });
    return response.data.currency.currency_code;
  }

  async getExchangeRates(baseCurrency: string): Promise<IRate> {
    const getExchangeCurrencies = (base: string) => {
      if (base === 'EUR') {
        return 'USD';
      }
      if (base === 'USD') {
        return 'EUR';
      }
      return 'USD,EUR';
    };

    const response = await this.client.get(this.routes.rates, {
      params: {
        base: baseCurrency,
        symbols: getExchangeCurrencies(baseCurrency),
      },
      headers: { apikey: process.env.REACT_APP_RATES_KEY },
    });

    return response.data.rates;
  }
}

export default MakeRequest;
