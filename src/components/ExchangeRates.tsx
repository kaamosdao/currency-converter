import React, { useEffect } from 'react';
import axios from 'axios';

const ExchangeRates: React.FC = () => {
  useEffect(() => {
    const getCurrency = async () => {
      const geoLocationApiAdress = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_GEO_KEY}`;
      const response = await axios.get(geoLocationApiAdress);
      return response.data.currency.currency_code;
    };
    const getExchangeRates = async (baseCurrency: string) => {
      const exchangeRatesApiAdress = `https://exchange-rates.abstractapi.com/v1/live?api_key=${process.env.REACT_APP_RATES_KEY}&base=${baseCurrency}`;
      const response = await axios.get(exchangeRatesApiAdress);
      console.log(response.data.exchange_rates);
    };
    getCurrency().then((base) => getExchangeRates(base));
  });

  return <p>Exchange Rates</p>;
};

export default ExchangeRates;
