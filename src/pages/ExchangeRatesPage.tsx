import React, { useEffect } from 'react';
import { useAppSelector, useLocalStorage, useAppDispatch } from '../hooks';
import { loadingType, thunkError } from '../interfaces/types';
import errorHandler from '../utils/errorHandlers';
import ExchangeRates from '../components/exchangeRates';
import ExchangeRatesForm from '../components/excangeRatesForm';
import Spinner from '../components/Spinner';
import { fetchAndSetBaseCurrency, fetchRates, setBaseCurrency } from '../slices/exchangeRatesSlice';

const ExchangeRatesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();
  const loadingStatus: loadingType = useAppSelector((state) => state.rates.loadingStatus);
  const error: thunkError = useAppSelector((state) => state.rates.error);
  const baseCurrency: string = useAppSelector((state) => state.rates.baseCurrency);

  useEffect(() => {
    if (localStorage.hasData()) {
      const currency = localStorage.getData();
      dispatch(setBaseCurrency(currency));
    } else {
      dispatch(fetchAndSetBaseCurrency(localStorage));
    }
  }, [dispatch, localStorage]);

  useEffect(() => {
    if (baseCurrency) {
      dispatch(fetchRates(baseCurrency));
    }
  }, [dispatch, baseCurrency]);

  if (loadingStatus === 'failed' && error) {
    return (
      <div className="card w-25  text-center">
        <p className="text-danger m-3">
          Error:&nbsp;
          {errorHandler(error.code)}
        </p>
        <ExchangeRatesForm />
      </div>
    );
  }

  return (
    <div>
      {loadingStatus === 'loading' ? (
        <Spinner />
      ) : (
        <div className="card w-25  text-center">
          <ExchangeRates />
          <ExchangeRatesForm />
        </div>
      )}
    </div>
  );
};

export default ExchangeRatesPage;
