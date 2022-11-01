import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes';
import { IConvertResult } from '../interfaces/interfaces';

const Convertation: React.FC = () => {
  const [convertResult, setConvertResult] = useState<IConvertResult | null>(null);

  const onSubmit = () => {
    const convertCurrency = async (from: string, to: string, amount: string) => {
      const response = await axios.get(routes.convert, {
        params: { from, to, amount },
        headers: { apikey: '638MYx3XDtSkA31Ow406rVqKW0bdeGpl' },
      });
      setConvertResult({ from, to, amount: response.data.result });
    };
    // convertCurrency();
  };

  useEffect(() => {
    console.log('render ConvertationPage');
  });

  return <p>Convertation</p>;
};

export default Convertation;
