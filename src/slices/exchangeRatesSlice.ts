import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IExchangeRatesState, ILocalStorageData, IRequestError } from '../interfaces/interfaces';
import routes from '../utils/routes';

export const fetchAndSetBaseCurrency = createAsyncThunk(
  'fetchAndSetBaseCurrency',
  async (localStorage: ILocalStorageData, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.geolocation, {
        params: {
          api_key: process.env.REACT_APP_GEO_KEY,
        },
      });
      const baseCurrency: string = response.data.currency.currency_code;
      localStorage.setData(baseCurrency);
      return baseCurrency;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue({
        message: error.message,
        code: String(error.response!.status),
      });
    }
  },
);

const getExchangeCurrencies = (base: string) => {
  if (base === 'EUR') {
    return 'USD';
  }
  if (base === 'USD') {
    return 'EUR';
  }
  return 'USD,EUR';
};

export const fetchRates = createAsyncThunk(
  'fetchRates',
  async (baseCurrency: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.rates, {
        params: {
          base: baseCurrency,
          symbols: getExchangeCurrencies(baseCurrency),
        },
        headers: { apikey: process.env.REACT_APP_RATES_KEY },
      });

      const { rates } = response.data;
      return rates;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue({
        message: error.message,
        code: String(error.response!.status),
      });
    }
  },
);

const initialState: IExchangeRatesState = {
  baseCurrency: '',
  rates: {},
  loadingStatus: 'idle',
  error: null,
};

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndSetBaseCurrency.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAndSetBaseCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchAndSetBaseCurrency.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.payload as IRequestError;
      })
      .addCase(fetchRates.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.rates = action.payload;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.payload as IRequestError;
      });
  },
});

export const { setBaseCurrency } = exchangeRatesSlice.actions;

export default exchangeRatesSlice.reducer;
