import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IRate from '../interfaces/interfaces';

const ExchangeRates: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState('');
  const [rates, setRates] = useState<IRate>({});
  const [targetRates, setTargetRates] = useState(['EUR', 'USD']);

  useEffect(() => {
    const getCurrency = async () => {
      const geoLocationApiAdress = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_GEO_KEY}`;
      const response = await axios.get(geoLocationApiAdress);
      setBaseCurrency(response.data.currency.currency_code);
    };
    getCurrency();
  }, []);

  useEffect(() => {
    if (baseCurrency === 'EUR') {
      setTargetRates(['USD']);
    }
    if (baseCurrency === 'USD') {
      setTargetRates(['EUR']);
    }
  }, [baseCurrency]);

  useEffect(() => {
    if (baseCurrency) {
      const target = targetRates.join(',');
      const getExchangeRates = async (currency: string) => {
        const exchangeRatesApiAdress = `https://exchange-rates.abstractapi.com/v1/live?api_key=${process.env.REACT_APP_RATES_KEY}&base=${currency}&target=${target}`;
        const response = await axios.get(exchangeRatesApiAdress);
        setRates(response.data.exchange_rates);
      };
      getExchangeRates(baseCurrency);
    }
  }, [baseCurrency, targetRates]);

  return (
    <div className="card w-25  text-center">
      <div className="card-body">
        <h5 className="card-title">Exchange Rates</h5>
      </div>
      <ul className="list-group list-group-flush">
        {targetRates.map((rate) => (
          <li className="list-group-item" key={rate}>
            {rate}
            :
            {' '}
            {rates[rate]}
          </li>
        ))}
      </ul>
      <div className="card-body">
        <p className="card-text">
          Your base curency:
          {' '}
          {baseCurrency}
        </p>
      </div>
    </div>
  );
};

export default ExchangeRates;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ExchangeRates: React.FC = () => {
//   const [baseCurrency, setBaseCurrency] = useState('');
//   const [exchangeRates, setExchangeRates] = useState({});

//   useEffect(() => {
//     const getCurrency = async () => {
//       const geoLocationApiAdress = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_GEO_KEY}`;
//       const response = await axios.get(geoLocationApiAdress);
//       setBaseCurrency(response.data.currency.currency_code);
//     };

//     const getExchangeRates = async (currency: string) => {
//       const exchangeRatesApiAdress = `https://exchange-rates.abstractapi.com/v1/live?api_key=${process.env.REACT_APP_RATES_KEY}&base=${currency}`;
//       const response = await axios.get(exchangeRatesApiAdress);
//       setExchangeRates(response.data.exchange_rates);
//     };

//     getCurrency();
//     getExchangeRates(baseCurrency);
//   }, [baseCurrency]);

//   return (
//     <div className="">
//       <p>{baseCurrency}</p>
//       <p>{JSON.stringify(exchangeRates)}</p>
//     </div>
//   );
// };

// export default ExchangeRates;
