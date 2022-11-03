import React from 'react';
import { useAppSelector } from '../hooks';
import IRate from '../interfaces/interfaces';

const ExchangeRates: React.FC = () => {
  const baseCurrency: string = useAppSelector((state) => state.rates.baseCurrency);
  const rates: IRate = useAppSelector((state) => state.rates.rates);

  const getConvertedCurency = (
    currency: string,
    convertCurrency: string,
    rate: string
  ): string => {
    const amount = (1 / Number(rate)).toFixed(2);
    return `1 ${convertCurrency} = ${amount} ${currency}`;
  };

  return (
    <>
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
    </>
  );
};

export default ExchangeRates;
