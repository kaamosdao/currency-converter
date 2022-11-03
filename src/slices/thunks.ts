import { ILocalStorageData, IMakeRequest } from '../interfaces/interfaces';
import { setBaseCurrency, setRates } from './exchangeRatesSlice';
import AppThunk from '../interfaces/types';

const fetchAndSetBaseCurrency = (
  httpClient: IMakeRequest,
  localStorage: ILocalStorageData,
): AppThunk =>
  async (dispatch) => {
    const baseCurrency = await httpClient.getCurrency();
    localStorage.setData(baseCurrency);
    dispatch(setBaseCurrency(baseCurrency));
  };

export const fetchRates = (base: string, httpClient: IMakeRequest): AppThunk =>
  async (dispatch) => {
    const rates = await httpClient.getExchangeRates(base);
    dispatch(setRates(rates));
  };

export default fetchAndSetBaseCurrency;
