import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './exchangeRatesSlice';
import convertationReducer from './convertationSlice';

const store = configureStore({
  reducer: {
    rates: exchangeRatesReducer,
    convertation: convertationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
