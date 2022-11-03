import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IRate, { IExchangeRatesState } from '../interfaces/interfaces';

const initialState: IExchangeRatesState = {
  baseCurrency: '',
  rates: {},
};

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
    setRates: (state, action: PayloadAction<IRate>) => {
      state.rates = action.payload;
    },
  },
});

export const { setBaseCurrency, setRates } = exchangeRatesSlice.actions;

export default exchangeRatesSlice.reducer;
