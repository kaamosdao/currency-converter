import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IConvertationState, IParsedQuery, IRequestError } from '../interfaces/interfaces';
import routes from '../utils/routes';

export const convertCurrency = createAsyncThunk(
  'convertCurrency',
  async (data: IParsedQuery, { rejectWithValue }) => {
    const { from, to, amount } = data;
    try {
      const response = await axios.get(routes.convert, {
        params: { from, to, amount },
        headers: { apikey: process.env.REACT_APP_RATES_KEY },
      });
      const result = `${amount} ${from} in ${to} = ${response.data.result}`;
      return result;
    } catch (err) {
      const error = err as AxiosError;

      return rejectWithValue({
        message: error.message,
        code: String(error.response!.status),
      });
    }
  },
);

const initialState: IConvertationState = {
  result: '',
  loadingStatus: 'idle',
  error: null,
};

const convertationSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(convertCurrency.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(convertCurrency.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(convertCurrency.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.payload as IRequestError;
      });
  },
});

export default convertationSlice.reducer;
