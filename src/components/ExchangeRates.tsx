import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import IRate from '../interfaces/interfaces';

const ExchangeRates: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState<string>('');
  const [rates, setRates] = useState<IRate>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const getCurrency = async () => {
      const geoLocationApiAdress = 'https://ipgeolocation.abstractapi.com/v1';
      const response = await axios.get(geoLocationApiAdress, {
        params: {
          api_key: process.env.REACT_APP_GEO_KEY,
        },
      });
      setBaseCurrency(response.data.currency.currency_code);
    };
    getCurrency();
  }, []);

  useEffect(() => {
    if (baseCurrency) {
      const getTarget = (base: string) => {
        if (base === 'EUR') {
          return 'USD';
        }
        if (base === 'USD') {
          return 'EUR';
        }
        return 'USD,EUR';
      };
      const getExchangeRates = async (currency: string) => {
        const ratesApiAdress = 'https://exchange-rates.abstractapi.com/v1/live';
        const response = await axios.get(ratesApiAdress, {
          params: {
            api_key: process.env.REACT_APP_RATES_KEY,
            base: currency,
            target: getTarget(baseCurrency),
          },
        });
        setRates(response.data.exchange_rates);
      };
      getExchangeRates(baseCurrency);
    }
  }, [baseCurrency]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      readonly currency: { readonly value: string };
    };
    setBaseCurrency(target.currency.value);
    inputRef.current!.value = '';
  };

  return (
    <div className="card w-25  text-center">
      <div className="card-body">
        <h5 className="card-title">Exchange Rates</h5>
      </div>
      <ul className="list-group list-group-flush">
        {rates.USD && (
          <li className="list-group-item">
            USD:&nbsp;
            {rates.USD}
          </li>
        )}
        {rates.EUR && (
          <li className="list-group-item">
            EUR:&nbsp;
            {rates.EUR}
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
