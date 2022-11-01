import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import routes from '../routes';

const Convertation: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const convertCurrency = async (from: string, to: string, amount: string) => {
    const response = await axios.get(routes.convert, {
      params: { from, to, amount },
      headers: { apikey: '638MYx3XDtSkA31Ow406rVqKW0bdeGpl' },
    });
    return response.data.result;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const setCurrency = async (from: string, to: string, amount: string) => {
      const convertedResult = await convertCurrency(from, to, amount);
      setResult(convertedResult);
    };

    event.preventDefault();
    const target = event.target as typeof event.target & {
      readonly converter: { readonly value: string };
    };
    const values = target.converter.value.trim().split(' ');

    setCurrency(values[1], values[3], values[0]);
  };

  useEffect(() => {
    console.log('render ConvertationPage');
  });

  return (
    <div className="d-flex flex-column">
      <form className="row g-3 align-items-center" onSubmit={onSubmit}>
        <div className="col-auto">
          <label htmlFor="converter" className="col-form-label">
            Converter
          </label>
        </div>
        <div className="col-auto">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            id="converter"
            name="converter"
            placeholder="15 usd in eur"
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary ms-3">
            Convert
          </button>
        </div>
      </form>
      <p className="result">{result}</p>
    </div>
  );
};

export default Convertation;
