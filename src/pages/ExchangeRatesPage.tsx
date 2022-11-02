import React, { useEffect, useRef, useState } from 'react';
import IRate from '../interfaces/interfaces';
import useHttp from '../hooks';
import MakeRequest from '../makeRequest';

const ExchangeRates: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState<string>('');
  const [rates, setRates] = useState<IRate>({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const httpClient: MakeRequest = useHttp();

  useEffect(() => {
    httpClient.getCurrency().then((base) => setBaseCurrency(base));
  }, [httpClient]);

  useEffect(() => {
    if (baseCurrency) {
      httpClient.getExchangeRates(baseCurrency).then((data) => setRates(data));
    }
  }, [baseCurrency, httpClient]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      readonly currency: { readonly value: string };
    };
    setBaseCurrency(target.currency.value);
    inputRef.current!.value = '';
  };

  const getConvertedCurency = (currency: string, convertCurrency: string, rate: string): string => {
    const amount = (1 / Number(rate)).toFixed(2);
    return `1 ${convertCurrency} = ${amount} ${currency}`;
  };

  return (
    <div className="card w-25  text-center">
      <div className="card-body">
        <h5 className="card-title">Exchange Rates</h5>
      </div>
      <ul className="list-group list-group-flush">
        {rates.USD && (
          <li className="list-group-item">
            {getConvertedCurency(baseCurrency, 'USD', rates.USD)}
          </li>
        )}
        {rates.EUR && (
          <li className="list-group-item">
            {getConvertedCurency(baseCurrency, 'EUR', rates.EUR)}
          </li>
        )}
      </ul>
      <div className="card-body">
        <p className="card-text">
          Your base currency:&nbsp;
          <b>{baseCurrency}</b>
        </p>
        <form className="d-flex" onSubmit={onSubmit}>
          <label htmlFor="currency" className="visually-hidden">
            Currency
          </label>
          <input
            ref={inputRef}
            type="text"
            className="form-control form-control-sm"
            id="currency"
            name="currency"
            placeholder="new currency"
          />
          <div className="col-auto">
            <button type="submit" className="btn btn-primary ms-3 btn-sm">
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExchangeRates;
